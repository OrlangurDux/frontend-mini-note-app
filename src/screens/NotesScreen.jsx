import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import { Icon } from '../components/Icon';
import { NotesToolbar } from '../components/notes/NotesToolbar';
import { NoteCard } from '../components/notes/NoteCard';
import { NotesPagination } from '../components/notes/NotesPagination';
import { useCategories } from '../contexts/CategoriesContext';
import { NoteTags, SUGGESTED_TAGS } from '../lib/notesTags';
import { PAGINATION_DEFAULTS } from '../config';
import * as notesApi from '../lib/api/notes';

export function NotesScreen({ t, mode }) {
  const router = useRouter();
  const { categories, byId: categoryById } = useCategories();

  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0); // 0-based in UI, backend is 1-based
  const [perPage, setPerPage] = useState(PAGINATION_DEFAULTS.perPage);
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [tag, setTag] = useState('');
  const [sort, setSort] = useState('updated');
  const [view, setView] = useState('grid');
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState('');
  const [confirm, setConfirm] = useState(null);
  const [toast, setToast] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    setLoadError('');
    try {
      if (query.trim()) {
        const res = await notesApi.searchNotes(query.trim());
        const data = res?.data;
        const list = Array.isArray(data) ? data : data?.items || [];
        setItems(list);
        setTotal(list.length);
      } else {
        const res = await notesApi.listNotes({ page: page + 1, perPage });
        setItems(res?.data?.items || []);
        setTotal(res?.data?.total || 0);
      }
    } catch (err) {
      setLoadError(err.message || t.nLoadError);
      setItems([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  }, [page, perPage, query, t.nLoadError]);

  useEffect(() => { load(); }, [load]);
  useEffect(() => { setPage(0); }, [query]);

  // Status/category/tag filters and sorting only apply to the page/results
  // already fetched — the backend has no filter/sort query params yet.
  const filtered = useMemo(() => {
    let xs = items.slice();
    if (status !== 'all') xs = xs.filter((n) => n.status === status);
    if (categoryFilter) xs = xs.filter((n) => n.category_id === categoryFilter);
    if (tag) xs = xs.filter((n) => NoteTags.get(n.id).includes(tag));
    const cmp = {
      updated: (a, b) => new Date(b.updated_at) - new Date(a.updated_at),
      newest: (a, b) => new Date(b.created_at) - new Date(a.created_at),
      oldest: (a, b) => new Date(a.created_at) - new Date(b.created_at),
      az: (a, b) => (a.title || '').localeCompare(b.title || ''),
    };
    xs.sort(cmp[sort] || cmp.updated);
    return xs;
  }, [items, status, categoryFilter, tag, sort]);

  const allTags = useMemo(() => NoteTags.allTags(), [items]);
  const pageCount = Math.max(1, Math.ceil(total / perPage));

  const open = (n) => router.push('/notes/' + n.id);
  const edit = (n) => router.push('/notes/' + n.id + '?edit=1');

  const onNew = async () => {
    try {
      const res = await notesApi.createNote({ title: t.nUntitled, note: '', categoryId: '', status: 'draft' });
      const id = res?.data?.id;
      if (id) router.push('/notes/' + id + '?edit=1');
      else load();
    } catch (err) {
      setLoadError(err.message || t.nLoadError);
    }
  };

  const duplicate = async (n) => {
    try {
      await notesApi.createNote({ title: n.title + ' (copy)', note: n.note, categoryId: n.category_id || '', status: n.status });
      setToast(t.nDuplicatedToast);
      load();
    } catch (err) {
      setLoadError(err.message || t.nLoadError);
    }
  };

  const askDelete = (n) => setConfirm(n);
  const doDelete = async () => {
    if (!confirm) return;
    try {
      await notesApi.deleteNote(confirm.id);
      NoteTags.remove(confirm.id);
      setConfirm(null);
      setToast(t.nDeletedToast);
      load();
    } catch (err) {
      setConfirm(null);
      setLoadError(err.message || t.nLoadError);
    }
  };

  return (
    <Box sx={{
      flex: 1, position: 'relative', bgcolor: 'background.default',
      backgroundImage: mode === 'dark'
        ? 'radial-gradient(1000px 600px at 90% 0%, rgba(25,118,210,.10), transparent 60%)'
        : 'radial-gradient(1000px 600px at 90% 0%, rgba(144,202,249,.18), transparent 60%)',
    }}>
      <Container maxWidth="lg" sx={{ py: { xs: 3, sm: 5 } }}>
        <Stack spacing={3}>
          <NotesToolbar t={t}
            query={query} onQuery={setQuery}
            status={status} onStatus={setStatus}
            categoryId={categoryFilter} onCategoryId={setCategoryFilter} categories={categories}
            tag={tag} onTag={setTag} allTags={allTags}
            sort={sort} onSort={setSort}
            view={view} onView={setView}
            onNew={onNew} />

          {loadError && <Alert severity="error" variant="outlined" sx={{ borderRadius: 2 }}>{loadError}</Alert>}

          {!loading && filtered.length === 0 ? (
            <Stack alignItems="center" spacing={1.5} sx={{ py: 8, color: 'text.secondary' }}>
              <Icon d="M11 4a7 7 0 1 1 0 14 7 7 0 0 1 0-14ZM21 21l-4.3-4.3" size={36} sw={1.4} />
              <Typography sx={{ fontWeight: 600 }}>{t.nEmptyTitle}</Typography>
              <Typography variant="body2">{t.nEmptyBody}</Typography>
              <Button variant="outlined" sx={{ textTransform: 'none', borderRadius: 2, mt: 1 }}
                      onClick={() => { setQuery(''); setStatus('all'); setCategoryFilter(''); setTag(''); }}>{t.nClear}</Button>
            </Stack>
          ) : view === 'grid' ? (
            <Grid container spacing={2.25}>
              {filtered.map((n) => (
                <Grid item xs={12} sm={6} md={4} key={n.id}>
                  <NoteCard t={t} note={n} view="grid"
                    categoryName={categoryById[n.category_id]?.name} tags={NoteTags.get(n.id)}
                    onOpen={open} onEdit={edit} onDuplicate={duplicate} onDelete={askDelete} />
                </Grid>
              ))}
            </Grid>
          ) : (
            <Stack spacing={1.25}>
              {filtered.map((n) => (
                <NoteCard key={n.id} t={t} note={n} view="list"
                  categoryName={categoryById[n.category_id]?.name} tags={NoteTags.get(n.id)}
                  onOpen={open} onEdit={edit} onDuplicate={duplicate} onDelete={askDelete} />
              ))}
            </Stack>
          )}

          {!query.trim() && total > 0 && (
            <NotesPagination t={t} page={page} pageCount={pageCount} total={total}
              perPage={perPage} onPage={setPage} onPerPage={(v) => { setPerPage(v); setPage(0); }} />
          )}
        </Stack>
      </Container>

      <Dialog open={!!confirm} onClose={() => setConfirm(null)} PaperProps={{ sx: { borderRadius: 3, p: 1 } }}>
        <DialogTitle sx={{ fontWeight: 700 }}>{t.nDeleteConfirmT}</DialogTitle>
        <DialogContent><DialogContentText>{t.nDeleteConfirmB}</DialogContentText></DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={() => setConfirm(null)} sx={{ textTransform: 'none' }}>{t.nCancel}</Button>
          <Button onClick={doDelete} variant="contained" color="error" disableElevation sx={{ textTransform: 'none', borderRadius: 2 }}>{t.nDelete}</Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={!!toast} autoHideDuration={2000} onClose={() => setToast('')} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert severity="success" variant="filled" sx={{ borderRadius: 2 }}>{toast}</Alert>
      </Snackbar>
    </Box>
  );
}
