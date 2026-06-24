import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Chip from '@mui/material/Chip';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Divider from '@mui/material/Divider';
import { Icon } from '../components/Icon';
import { useCategories } from '../contexts/CategoriesContext';
import { NoteTags } from '../lib/notesTags';
import * as notesApi from '../lib/api/notes';

function renderMarkdown(md) {
  if (!md) return [];
  const blocks = md.split(/\n{2,}/);
  return blocks.map((block) => {
    const trimmed = block.trim();
    if (/^# /.test(trimmed)) return { kind: 'h1', text: trimmed.slice(2) };
    if (/^## /.test(trimmed)) return { kind: 'h2', text: trimmed.slice(3) };
    if (/^### /.test(trimmed)) return { kind: 'h3', text: trimmed.slice(4) };
    if (/^> /.test(trimmed)) return { kind: 'quote', text: trimmed.replace(/^> /gm, '') };
    if (/^- /m.test(trimmed) && trimmed.split('\n').every((l) => /^- /.test(l) || !l.trim())) {
      return { kind: 'ul', items: trimmed.split('\n').filter(Boolean).map((l) => l.replace(/^- /, '')) };
    }
    return { kind: 'p', text: trimmed };
  });
}

function MarkdownView({ blocks }) {
  return (
    <Stack spacing={2}>
      {blocks.map((b, i) => {
        if (b.kind === 'h1') return <Typography key={i} variant="h4" sx={{ fontWeight: 700, letterSpacing: '-0.02em', mt: 1 }}>{b.text}</Typography>;
        if (b.kind === 'h2') return <Typography key={i} variant="h5" sx={{ fontWeight: 700, letterSpacing: '-0.015em', mt: 1 }}>{b.text}</Typography>;
        if (b.kind === 'h3') return <Typography key={i} variant="h6" sx={{ fontWeight: 600 }}>{b.text}</Typography>;
        if (b.kind === 'quote') return <Box key={i} sx={{ borderLeft: 3, borderColor: 'primary.main', pl: 2, color: 'text.secondary', fontStyle: 'italic' }}>{b.text}</Box>;
        if (b.kind === 'ul') return <Box key={i} component="ul" sx={{ pl: 3, m: 0 }}>{b.items.map((it, j) => <Box component="li" key={j} sx={{ mb: 0.5 }}>{it}</Box>)}</Box>;
        return <Typography key={i} variant="body1" sx={{ lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>{b.text}</Typography>;
      })}
    </Stack>
  );
}

export function NoteDetailScreen({ t, mode, id, startEditing }) {
  const router = useRouter();
  const { categories, byId: categoryById } = useCategories();

  const [note, setNote] = useState(null);
  const [loadError, setLoadError] = useState('');
  const [editing, setEditing] = useState(!!startEditing);
  const [draft, setDraft] = useState(null);
  const [tags, setTags] = useState([]);
  const [confirm, setConfirm] = useState(false);
  const [toast, setToast] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!id) return;
    notesApi.getNote(id)
      .then((res) => { setNote(res.data); setDraft(res.data); setTags(NoteTags.get(id)); })
      .catch((err) => setLoadError(err.message || t.nNotFound));
  }, [id, t.nNotFound]);

  if (loadError) {
    return (
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Stack alignItems="center" spacing={2}>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>404</Typography>
          <Typography variant="body2" color="text.secondary">{loadError}</Typography>
          <Button variant="contained" disableElevation onClick={() => router.push('/notes')} sx={{ textTransform: 'none', borderRadius: 2 }}>{t.nBack}</Button>
        </Stack>
      </Container>
    );
  }
  if (!note || !draft) return null;

  const begin = () => { setDraft(note); setEditing(true); };
  const cancel = () => { setDraft(note); setEditing(false); };

  const save = async () => {
    setSaving(true);
    try {
      await notesApi.updateNote(id, { title: draft.title, note: draft.note, status: draft.status });
      NoteTags.set(id, tags);
      const fresh = await notesApi.getNote(id);
      setNote(fresh.data);
      setDraft(fresh.data);
      setEditing(false);
      setToast(t.nSavedToast);
    } catch (err) {
      setLoadError(err.message || t.errGeneric);
    } finally {
      setSaving(false);
    }
  };

  const remove = async () => {
    await notesApi.deleteNote(id);
    NoteTags.remove(id);
    setConfirm(false);
    router.push('/notes');
  };

  const duplicate = async () => {
    const res = await notesApi.createNote({ title: note.title + ' (copy)', note: note.note, categoryId: note.category_id || '', status: note.status });
    if (res?.data?.id) router.push('/notes/' + res.data.id);
  };

  const blocks = renderMarkdown(note.note);
  const categoryName = categoryById[note.category_id]?.name;

  return (
    <Box sx={{
      flex: 1, position: 'relative', bgcolor: 'background.default',
      backgroundImage: mode === 'dark'
        ? 'radial-gradient(1000px 600px at 10% 0%, rgba(25,118,210,.08), transparent 60%)'
        : 'radial-gradient(1000px 600px at 10% 0%, rgba(144,202,249,.18), transparent 60%)',
    }}>
      <Container maxWidth="md" sx={{ py: { xs: 3, sm: 5 } }}>
        <Stack spacing={3}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Button onClick={() => router.push('/notes')} variant="text"
                    startIcon={<Icon d="M15 6l-6 6 6 6" size={16} sw={2} />}
                    sx={{ textTransform: 'none', color: 'text.secondary', fontWeight: 500 }}>{t.nBack}</Button>
            <Box sx={{ flex: 1 }} />
            <Chip size="small" label={editing ? t.nEditing : t.nReadOnly} variant="outlined"
                  sx={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: editing ? 'primary.main' : 'text.secondary', borderColor: editing ? 'primary.main' : 'divider' }} />
            {editing ? (
              <Stack direction="row" spacing={1}>
                <Button onClick={cancel} variant="text" sx={{ textTransform: 'none' }}>{t.nCancel}</Button>
                <Button onClick={save} disabled={saving} variant="contained" disableElevation sx={{ textTransform: 'none', borderRadius: 2, fontWeight: 600 }}>{t.nDone}</Button>
              </Stack>
            ) : (
              <Stack direction="row" spacing={1}>
                <Button onClick={begin} variant="outlined" startIcon={<Icon d="M4 20h4l10-10-4-4L4 16v4Z" size={16} sw={1.7} />} sx={{ textTransform: 'none', borderRadius: 2 }}>{t.nEditNote}</Button>
                <Button onClick={duplicate} variant="outlined" sx={{ textTransform: 'none', borderRadius: 2 }}>{t.nDuplicate}</Button>
                <Button onClick={() => setConfirm(true)} variant="outlined" color="error" sx={{ textTransform: 'none', borderRadius: 2 }}>{t.nDeleteAct}</Button>
              </Stack>
            )}
          </Stack>

          {loadError && <Alert severity="error" variant="outlined" sx={{ borderRadius: 2 }}>{loadError}</Alert>}

          <Box sx={{
            bgcolor: 'background.paper', border: 1, borderColor: 'divider', borderRadius: 4,
            p: { xs: 3, sm: 5 },
            boxShadow: mode === 'dark' ? '0 24px 60px rgba(0,0,0,.45)' : '0 24px 60px rgba(15,23,42,.06)',
          }}>
            {editing ? (
              <Stack spacing={2.5}>
                <TextField value={draft.title} onChange={(e) => setDraft({ ...draft, title: e.target.value })}
                  placeholder={t.nUntitled} variant="standard" fullWidth
                  InputProps={{ disableUnderline: true, sx: { fontSize: 30, fontWeight: 700, letterSpacing: '-0.02em' } }} />
                <Stack direction="row" spacing={2}>
                  <TextField select size="small" label={t.nStatus} value={draft.status}
                    onChange={(e) => setDraft({ ...draft, status: e.target.value })} sx={{ minWidth: 160 }}>
                    <MenuItem value="draft">{t.nStatusDraft}</MenuItem>
                    <MenuItem value="public">{t.nStatusPublic}</MenuItem>
                    <MenuItem value="archive">{t.nStatusArchive}</MenuItem>
                  </TextField>
                  <TextField size="small" label={t.nCategory} value={categoryName || t.nCategoryNone} disabled sx={{ minWidth: 200 }} />
                </Stack>
                <Stack direction="row" spacing={0.75} sx={{ flexWrap: 'wrap', rowGap: 0.75 }}>
                  {tags.map((tg) => (
                    <Chip key={tg} label={'#' + tg} size="small" onDelete={() => setTags(tags.filter((x) => x !== tg))}
                          sx={{ fontFamily: 'JetBrains Mono, monospace' }} />
                  ))}
                  <TextField placeholder="+ tag" variant="standard" size="small"
                    onKeyDown={(e) => { if (e.key === 'Enter' && e.target.value.trim()) {
                      const v = e.target.value.trim().replace(/^#/, '');
                      if (!tags.includes(v)) setTags([...tags, v]);
                      e.target.value = '';
                    } }}
                    InputProps={{ disableUnderline: true, sx: { fontFamily: 'JetBrains Mono, monospace', fontSize: 13, ml: 0.5 } }} />
                </Stack>
                <TextField value={draft.note} onChange={(e) => setDraft({ ...draft, note: e.target.value })}
                  placeholder="# Title&#10;&#10;Write in markdown…" multiline minRows={14} fullWidth variant="outlined"
                  InputProps={{ sx: { borderRadius: 2, fontFamily: 'JetBrains Mono, monospace', fontSize: 14, lineHeight: 1.7 } }} />
              </Stack>
            ) : (
              <Stack spacing={2}>
                <Typography variant="h3" sx={{ fontWeight: 700, letterSpacing: '-0.02em', fontSize: { xs: 28, sm: 36 } }}>
                  {note.title || t.nUntitled}
                </Typography>
                <Stack direction="row" spacing={0.75} sx={{ flexWrap: 'wrap', rowGap: 0.75 }}>
                  <Chip size="small" label={{ draft: t.nStatusDraft, public: t.nStatusPublic, archive: t.nStatusArchive }[note.status] || note.status} variant="outlined" />
                  {categoryName && <Chip size="small" label={categoryName} variant="outlined" />}
                  {tags.map((tg) => <Chip key={tg} label={'#' + tg} size="small" sx={{ fontFamily: 'JetBrains Mono, monospace' }} />)}
                </Stack>
                <Divider />
                <MarkdownView blocks={blocks} />
              </Stack>
            )}
          </Box>

          <Stack direction="row" spacing={2} justifyContent="space-between" sx={{ color: 'text.secondary', fontSize: 12 }}>
            <Typography variant="caption" sx={{ fontFamily: 'JetBrains Mono, monospace' }}>{t.nUpdated}: {note.updated_at ? new Date(note.updated_at).toLocaleString() : '—'}</Typography>
            <Typography variant="caption" sx={{ fontFamily: 'JetBrains Mono, monospace' }}>{t.nCreated}: {note.created_at ? new Date(note.created_at).toLocaleString() : '—'}</Typography>
          </Stack>
        </Stack>
      </Container>

      <Dialog open={confirm} onClose={() => setConfirm(false)} PaperProps={{ sx: { borderRadius: 3, p: 1 } }}>
        <DialogTitle sx={{ fontWeight: 700 }}>{t.nDeleteConfirmT}</DialogTitle>
        <DialogContent><DialogContentText>{t.nDeleteConfirmB}</DialogContentText></DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={() => setConfirm(false)} sx={{ textTransform: 'none' }}>{t.nCancel}</Button>
          <Button onClick={remove} variant="contained" color="error" disableElevation sx={{ textTransform: 'none', borderRadius: 2 }}>{t.nDelete}</Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={!!toast} autoHideDuration={1800} onClose={() => setToast('')} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert severity="success" variant="filled" sx={{ borderRadius: 2 }}>{toast}</Alert>
      </Snackbar>
    </Box>
  );
}
