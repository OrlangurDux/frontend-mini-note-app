// src/screens/NoteDetailScreen.jsx — single note: view-by-default,
// edit-on-click. Reads ?id= and ?edit= from the URL; persists via NotesStore.
const { Box, Container, Stack, Typography, Button, IconButton, TextField, Chip, Snackbar, Alert, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Tooltip, Divider, Menu, MenuItem } = window.MUI;

function getQuery() {
  const out = {};
  (window.location.search || '').replace(/^\?/, '').split('&').forEach((kv) => {
    if (!kv) return;
    const [k, v] = kv.split('=');
    out[decodeURIComponent(k)] = decodeURIComponent(v || '');
  });
  return out;
}

function renderMarkdown(md) {
  if (!md) return [];
  const blocks = md.split(/\n{2,}/);
  return blocks.map((block, i) => {
    const trimmed = block.trim();
    if (/^# /.test(trimmed))         return { kind: 'h1', text: trimmed.slice(2) };
    if (/^## /.test(trimmed))        return { kind: 'h2', text: trimmed.slice(3) };
    if (/^### /.test(trimmed))       return { kind: 'h3', text: trimmed.slice(4) };
    if (/^> /.test(trimmed))         return { kind: 'quote', text: trimmed.replace(/^> /gm, '') };
    if (/^- /m.test(trimmed) && trimmed.split('\n').every((l) => /^- /.test(l) || !l.trim())) {
      return { kind: 'ul', items: trimmed.split('\n').filter(Boolean).map((l) => l.replace(/^- /, '')) };
    }
    if (/^\d+\. /m.test(trimmed) && trimmed.split('\n').every((l) => /^\d+\. /.test(l) || !l.trim())) {
      return { kind: 'ol', items: trimmed.split('\n').filter(Boolean).map((l) => l.replace(/^\d+\. /, '')) };
    }
    return { kind: 'p', text: trimmed };
  });
}

function MarkdownView({ blocks }) {
  const inline = (s) => {
    // Minimal **bold**, *italic*, `code`, [link](url)
    const parts = [];
    let rest = s; let i = 0;
    const re = /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/;
    let m;
    while ((m = rest.match(re))) {
      if (m.index > 0) parts.push(rest.slice(0, m.index));
      const tok = m[0];
      if (tok.startsWith('**')) parts.push(<Box component="strong" key={i++}>{tok.slice(2, -2)}</Box>);
      else if (tok.startsWith('`')) parts.push(<Box component="code" key={i++} sx={{ fontFamily: 'JetBrains Mono, monospace', bgcolor: 'action.hover', px: 0.6, py: 0.1, borderRadius: 0.75, fontSize: '.92em' }}>{tok.slice(1, -1)}</Box>);
      else if (tok.startsWith('*'))  parts.push(<Box component="em"  key={i++}>{tok.slice(1, -1)}</Box>);
      else { const mm = tok.match(/^\[([^\]]+)\]\(([^)]+)\)$/); parts.push(<Box component="a" key={i++} href={mm[2]} sx={{ color: 'primary.main' }}>{mm[1]}</Box>); }
      rest = rest.slice(m.index + tok.length);
    }
    if (rest) parts.push(rest);
    return parts;
  };
  return (
    <Stack spacing={2}>
      {blocks.map((b, i) => {
        if (b.kind === 'h1') return <Typography key={i} variant="h4" sx={{ fontWeight: 700, letterSpacing: '-0.02em', mt: 1 }}>{b.text}</Typography>;
        if (b.kind === 'h2') return <Typography key={i} variant="h5" sx={{ fontWeight: 700, letterSpacing: '-0.015em', mt: 1 }}>{b.text}</Typography>;
        if (b.kind === 'h3') return <Typography key={i} variant="h6" sx={{ fontWeight: 600 }}>{b.text}</Typography>;
        if (b.kind === 'quote') return <Box key={i} sx={{ borderLeft: 3, borderColor: 'primary.main', pl: 2, color: 'text.secondary', fontStyle: 'italic' }}>{inline(b.text)}</Box>;
        if (b.kind === 'ul') return <Box key={i} component="ul" sx={{ pl: 3, m: 0 }}>{b.items.map((it, j) => <Box component="li" key={j} sx={{ mb: 0.5 }}>{inline(it)}</Box>)}</Box>;
        if (b.kind === 'ol') return <Box key={i} component="ol" sx={{ pl: 3, m: 0 }}>{b.items.map((it, j) => <Box component="li" key={j} sx={{ mb: 0.5 }}>{inline(it)}</Box>)}</Box>;
        return <Typography key={i} variant="body1" sx={{ lineHeight: 1.7, textWrap: 'pretty' }}>{inline(b.text)}</Typography>;
      })}
    </Stack>
  );
}

function NoteDetailScreen({ t, mode, lang }) {
  const q = getQuery();
  const initial = window.NotesStore.get(q.id);
  const [note, setNote]         = React.useState(initial);
  const [editing, setEditing]   = React.useState(q.edit === '1' || (initial && !initial.title));
  const [draft, setDraft]       = React.useState(initial || null);
  const [confirm, setConfirm]   = React.useState(false);
  const [toast, setToast]       = React.useState('');
  const [anchor, setAnchor]     = React.useState(null);

  if (!note) {
    return (
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Stack alignItems="center" spacing={2}>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>404</Typography>
          <Typography variant="body2" color="text.secondary">Note not found.</Typography>
          <Button variant="contained" disableElevation onClick={() => window.location.href = 'notes.html'} sx={{ textTransform: 'none', borderRadius: 2 }}>{t.nBack}</Button>
        </Stack>
      </Container>
    );
  }

  const begin = () => { setDraft(Object.assign({}, note)); setEditing(true); };
  const cancel = () => { setDraft(Object.assign({}, note)); setEditing(false); };
  const save = () => {
    const next = Object.assign({}, draft, { updated: new Date().toISOString() });
    if (!next.title) next.title = '';
    if (!next.excerpt && next.content) next.excerpt = next.content.replace(/^#+\s.*$/gm, '').trim().split('\n').find((l) => l.trim()) || '';
    window.NotesStore.upsert(next);
    setNote(next); setEditing(false); setToast(t.nSavedToast);
  };
  const star = () => { const next = Object.assign({}, note, { starred: !note.starred, updated: new Date().toISOString() }); window.NotesStore.upsert(next); setNote(next); };
  const duplicate = () => { const c = window.NotesStore.duplicate(note.id); if (c) { setToast(t.nDuplicatedToast); setTimeout(() => window.location.href = 'note.html?id=' + c.id, 700); } };
  const archive = () => { const next = Object.assign({}, note, { archived: !note.archived, updated: new Date().toISOString() }); window.NotesStore.upsert(next); setNote(next); setToast(next.archived ? t.nArchiveAct : t.nAll); };
  const remove = () => { window.NotesStore.remove(note.id); setConfirm(false); setTimeout(() => window.location.href = 'notes.html', 400); };
  const link  = () => { try { navigator.clipboard.writeText(window.location.href); setToast(t.nLink); } catch (e) {} };

  const blocks = renderMarkdown(note.content);
  const updated = window.NotesStore.relativeTime(note.updated, lang);
  const created = window.NotesStore.relativeTime(note.created, lang);
  const words = window.NotesStore.wordCount((editing ? draft : note).content);

  return (
    <Box sx={{
      flex: 1, position: 'relative',
      bgcolor: 'background.default',
      backgroundImage: mode === 'dark'
        ? 'radial-gradient(1000px 600px at 10% 0%, rgba(25,118,210,.08), transparent 60%)'
        : 'radial-gradient(1000px 600px at 10% 0%, rgba(144,202,249,.18), transparent 60%)',
    }} data-screen-label="11 Note detail">
      <Container maxWidth="md" sx={{ py: { xs: 3, sm: 5 } }}>
        <Stack spacing={3}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Button onClick={() => window.location.href = 'notes.html'} variant="text"
                    startIcon={<window.Icon d="M15 6l-6 6 6 6" size={16} sw={2} />}
                    sx={{ textTransform: 'none', color: 'text.secondary', fontWeight: 500 }}>{t.nBack}</Button>
            <Box sx={{ flex: 1 }} />
            <Chip size="small" label={editing ? t.nEditing : t.nReadOnly} variant="outlined"
                  sx={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: editing ? 'primary.main' : 'text.secondary', borderColor: editing ? 'primary.main' : 'divider' }} />
            <Tooltip arrow title={note.starred ? t.nUnstar : t.nStar}>
              <IconButton size="small" onClick={star} sx={{ color: note.starred ? '#f59e0b' : 'text.secondary' }}>
                <window.Icon d="M12 3l2.6 5.5L20 9.3l-4 4 .9 5.7L12 16.5 7.1 19l.9-5.7-4-4 5.4-.8L12 3Z" fill={note.starred ? 'currentColor' : 'none'} stroke="currentColor" sw={1.6} size={20} />
              </IconButton>
            </Tooltip>
            {editing ? (
              <Stack direction="row" spacing={1}>
                <Button onClick={cancel} variant="text" sx={{ textTransform: 'none' }}>{t.nCancel}</Button>
                <Button onClick={save} variant="contained" disableElevation sx={{ textTransform: 'none', borderRadius: 2, fontWeight: 600 }}>{t.nDone}</Button>
              </Stack>
            ) : (
              <Button onClick={begin} variant="outlined" startIcon={<window.Icon d="M4 20h4l10-10-4-4L4 16v4Z" size={16} sw={1.7} />} sx={{ textTransform: 'none', borderRadius: 2 }}>{t.nEditNote}</Button>
            )}
            <IconButton size="small" onClick={(e) => setAnchor(e.currentTarget)} aria-label={t.nMore}>
              <window.Icon d="M5 12h.01M12 12h.01M19 12h.01" sw={3} size={18} />
            </IconButton>
            <Menu anchorEl={anchor} open={!!anchor} onClose={() => setAnchor(null)}
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} transformOrigin={{ vertical: 'top', horizontal: 'right' }}>
              <MenuItem onClick={() => { setAnchor(null); link(); }}>{t.nLink}</MenuItem>
              <MenuItem onClick={() => { setAnchor(null); duplicate(); }}>{t.nDuplicate}</MenuItem>
              <MenuItem onClick={() => { setAnchor(null); archive(); }}>{note.archived ? t.nAll : t.nArchiveAct}</MenuItem>
              <MenuItem onClick={() => { setAnchor(null); setConfirm(true); }} sx={{ color: 'error.main' }}>{t.nDeleteAct}</MenuItem>
            </Menu>
          </Stack>

          <Box sx={{
            bgcolor: 'background.paper', border: 1, borderColor: 'divider', borderRadius: 4,
            p: { xs: 3, sm: 5 },
            boxShadow: mode === 'dark' ? '0 24px 60px rgba(0,0,0,.45)' : '0 24px 60px rgba(15,23,42,.06)',
          }}>
            {editing ? (
              <Stack spacing={2.5}>
                <TextField value={draft.title} onChange={(e) => setDraft(Object.assign({}, draft, { title: e.target.value }))}
                  placeholder={t.nUntitled} variant="standard" fullWidth
                  InputProps={{ disableUnderline: true, sx: { fontSize: 30, fontWeight: 700, letterSpacing: '-0.02em' } }} />
                <Stack direction="row" spacing={0.75} sx={{ flexWrap: 'wrap', rowGap: 0.75 }}>
                  {(draft.tags || []).map((tg) => (
                    <Chip key={tg} label={'#' + tg} size="small" onDelete={() => setDraft(Object.assign({}, draft, { tags: draft.tags.filter((x) => x !== tg) }))}
                          sx={{ fontFamily: 'JetBrains Mono, monospace' }} />
                  ))}
                  <TextField placeholder="+ tag" variant="standard" size="small"
                    onKeyDown={(e) => { if (e.key === 'Enter' && e.target.value.trim()) {
                      const v = e.target.value.trim().replace(/^#/, '');
                      if (!draft.tags.includes(v)) setDraft(Object.assign({}, draft, { tags: [...draft.tags, v] }));
                      e.target.value = '';
                    }}}
                    InputProps={{ disableUnderline: true, sx: { fontFamily: 'JetBrains Mono, monospace', fontSize: 13, ml: 0.5 } }} />
                </Stack>
                <TextField value={draft.content} onChange={(e) => setDraft(Object.assign({}, draft, { content: e.target.value }))}
                  placeholder="# Title&#10;&#10;Write in markdown\u2026" multiline minRows={14} fullWidth variant="outlined"
                  InputProps={{ sx: { borderRadius: 2, fontFamily: 'JetBrains Mono, monospace', fontSize: 14, lineHeight: 1.7 } }} />
              </Stack>
            ) : (
              <Stack spacing={2}>
                <Typography variant="h3" sx={{ fontWeight: 700, letterSpacing: '-0.02em', fontSize: { xs: 28, sm: 36 } }}>
                  {note.title || t.nUntitled}
                </Typography>
                <Stack direction="row" spacing={0.75} sx={{ flexWrap: 'wrap', rowGap: 0.75 }}>
                  {note.tags.map((tg) => <Chip key={tg} label={'#' + tg} size="small" sx={{ fontFamily: 'JetBrains Mono, monospace' }} />)}
                  {note.shared && <Chip size="small" label={t.nShared} variant="outlined" />}
                  {note.archived && <Chip size="small" label={t.nArchive} variant="outlined" />}
                </Stack>
                <Divider />
                <MarkdownView blocks={blocks} />
              </Stack>
            )}
          </Box>

          <Stack direction="row" spacing={2} justifyContent="space-between" sx={{ color: 'text.secondary', fontSize: 12 }}>
            <Typography variant="caption" sx={{ fontFamily: 'JetBrains Mono, monospace' }}>{t.nUpdated}: {updated}</Typography>
            <Typography variant="caption" sx={{ fontFamily: 'JetBrains Mono, monospace' }}>{t.nCreated}: {created}</Typography>
            <Typography variant="caption" sx={{ fontFamily: 'JetBrains Mono, monospace' }}>{words} {t.nWords}</Typography>
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

window.NoteDetailScreen = NoteDetailScreen;
