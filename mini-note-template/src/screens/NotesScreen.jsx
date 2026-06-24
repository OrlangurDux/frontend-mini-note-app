// src/screens/NotesScreen.jsx — list page: toolbar + grid/list + pagination + delete dialog + toasts.
const { Box, Container, Stack, Typography, Button, Grid, Snackbar, Alert, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } = window.MUI;

function NotesScreen({ t, mode, lang }) {
  const [allNotes, setAllNotes] = React.useState(() => window.NotesStore.load());
  const [query, setQuery]       = React.useState('');
  const [tag, setTag]           = React.useState('all');
  const [sort, setSort]         = React.useState('updated');
  const [view, setView]         = React.useState('grid');
  const [page, setPage]         = React.useState(0);
  const [perPage, setPerPage]   = React.useState(12);
  const [confirm, setConfirm]   = React.useState(null);
  const [toast, setToast]       = React.useState('');

  React.useEffect(() => { setPage(0); }, [query, tag, sort]);

  const filtered = React.useMemo(() => {
    let xs = allNotes.slice();
    if (tag === 'starred')        xs = xs.filter((n) => n.starred && !n.archived);
    else if (tag === 'shared')    xs = xs.filter((n) => n.shared && !n.archived);
    else if (tag === 'archived')  xs = xs.filter((n) => n.archived);
    else if (tag.startsWith('tag:')) { const k = tag.slice(4); xs = xs.filter((n) => n.tags.includes(k) && !n.archived); }
    else                           xs = xs.filter((n) => !n.archived);
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      xs = xs.filter((n) =>
        n.title.toLowerCase().includes(q)
        || n.excerpt.toLowerCase().includes(q)
        || n.content.toLowerCase().includes(q)
        || n.tags.some((tg) => tg.toLowerCase().includes(q))
      );
    }
    const cmp = {
      updated: (a, b) => new Date(b.updated) - new Date(a.updated),
      newest:  (a, b) => new Date(b.created) - new Date(a.created),
      oldest:  (a, b) => new Date(a.created) - new Date(b.created),
      az:      (a, b) => a.title.localeCompare(b.title),
    };
    xs.sort(cmp[sort] || cmp.updated);
    return xs;
  }, [allNotes, query, tag, sort]);

  const total     = filtered.length;
  const pageCount = Math.max(1, Math.ceil(total / perPage));
  const safePage  = Math.min(page, pageCount - 1);
  const slice     = filtered.slice(safePage * perPage, safePage * perPage + perPage);

  const open      = (n) => { window.location.href = 'note.html?id=' + encodeURIComponent(n.id); };
  const edit      = (n) => { window.location.href = 'note.html?id=' + encodeURIComponent(n.id) + '&edit=1'; };
  const onNew     = ()  => {
    const now  = new Date().toISOString();
    const note = {
      id: 'n' + Math.random().toString(36).slice(2, 8),
      title: '', tags: [], starred: false, shared: false, archived: false,
      excerpt: '', content: '', created: now, updated: now,
    };
    window.NotesStore.upsert(note);
    window.location.href = 'note.html?id=' + encodeURIComponent(note.id) + '&edit=1';
  };
  const star      = (n) => { const next = Object.assign({}, n, { starred: !n.starred, updated: new Date().toISOString() }); window.NotesStore.upsert(next); setAllNotes(window.NotesStore.load()); };
  const archive   = (n) => { const next = Object.assign({}, n, { archived: !n.archived, updated: new Date().toISOString() }); window.NotesStore.upsert(next); setAllNotes(window.NotesStore.load()); setToast(next.archived ? t.nArchiveAct : t.nAll); };
  const duplicate = (n) => { window.NotesStore.duplicate(n.id); setAllNotes(window.NotesStore.load()); setToast(t.nDuplicatedToast); };
  const askDelete = (n) => setConfirm(n);
  const doDelete  = ()  => { if (!confirm) return; window.NotesStore.remove(confirm.id); setAllNotes(window.NotesStore.load()); setConfirm(null); setToast(t.nDeletedToast); };

  return (
    <Box sx={{
      flex: 1, position: 'relative',
      bgcolor: 'background.default',
      backgroundImage: mode === 'dark'
        ? 'radial-gradient(1000px 600px at 90% 0%, rgba(25,118,210,.10), transparent 60%)'
        : 'radial-gradient(1000px 600px at 90% 0%, rgba(144,202,249,.18), transparent 60%)',
    }} data-screen-label="10 Notes list">
      <Container maxWidth="lg" sx={{ py: { xs: 3, sm: 5 } }}>
        <Stack spacing={3}>
          <window.NotesToolbar t={t}
            query={query} onQuery={setQuery}
            tag={tag} onTag={setTag}
            sort={sort} onSort={setSort}
            view={view} onView={setView}
            onNew={onNew}
            allTags={window.NotesStore.TAGS} />

          {slice.length === 0 ? (
            <Stack alignItems="center" spacing={1.5} sx={{ py: 8, color: 'text.secondary' }}>
              <window.Icon d="M11 4a7 7 0 1 1 0 14 7 7 0 0 1 0-14ZM21 21l-4.3-4.3" size={36} sw={1.4} />
              <Typography sx={{ fontWeight: 600 }}>{t.nEmptyTitle}</Typography>
              <Typography variant="body2">{t.nEmptyBody}</Typography>
              <Button variant="outlined" sx={{ textTransform: 'none', borderRadius: 2, mt: 1 }} onClick={() => { setQuery(''); setTag('all'); }}>{t.nClear}</Button>
            </Stack>
          ) : view === 'grid' ? (
            <Grid container spacing={2.25}>
              {slice.map((n) => (
                <Grid item xs={12} sm={6} md={4} key={n.id}>
                  <window.NoteCard t={t} note={n} view="grid" lang={lang}
                    onOpen={open} onEdit={edit} onStar={star} onDuplicate={duplicate} onArchive={archive} onDelete={askDelete} />
                </Grid>
              ))}
            </Grid>
          ) : (
            <Stack spacing={1.25}>
              {slice.map((n) => (
                <window.NoteCard key={n.id} t={t} note={n} view="list" lang={lang}
                  onOpen={open} onEdit={edit} onStar={star} onDuplicate={duplicate} onArchive={archive} onDelete={askDelete} />
              ))}
            </Stack>
          )}

          {total > 0 && (
            <window.NotesPagination t={t} page={safePage} pageCount={pageCount} total={total}
              perPage={perPage} onPage={setPage} onPerPage={setPerPage} />
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

window.NotesScreen = NotesScreen;
