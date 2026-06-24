// src/components/notes/NoteCard.jsx — single-note tile in grid or list view.
const { Box, Stack, Typography, IconButton, Chip, Menu, MenuItem, Tooltip } = window.MUI;

function NoteCard({ t, note, view, lang, onOpen, onEdit, onStar, onDuplicate, onArchive, onDelete }) {
  const [anchor, setAnchor] = React.useState(null);
  const close = () => setAnchor(null);
  const updated = window.NotesStore.relativeTime(note.updated, lang);
  const words = window.NotesStore.wordCount(note.content);

  const Star = (
    <Tooltip arrow title={note.starred ? t.nUnstar : t.nStar}>
      <IconButton size="small" onClick={(e) => { e.stopPropagation(); onStar(note); }} sx={{ color: note.starred ? '#f59e0b' : 'text.disabled' }}>
        <window.Icon d="M12 3l2.6 5.5L20 9.3l-4 4 .9 5.7L12 16.5 7.1 19l.9-5.7-4-4 5.4-.8L12 3Z"
                     fill={note.starred ? 'currentColor' : 'none'} stroke="currentColor" sw={1.6} size={18} />
      </IconButton>
    </Tooltip>
  );
  const More = (
    <>
      <IconButton size="small" onClick={(e) => { e.stopPropagation(); setAnchor(e.currentTarget); }} aria-label={t.nMore} sx={{ color: 'text.secondary' }}>
        <window.Icon d="M5 12h.01M12 12h.01M19 12h.01" sw={3} size={18} />
      </IconButton>
      <Menu anchorEl={anchor} open={!!anchor} onClose={close} onClick={(e) => e.stopPropagation()}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} transformOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <MenuItem onClick={() => { close(); onOpen(note); }}>{t.nOpen}</MenuItem>
        <MenuItem onClick={() => { close(); onEdit(note); }}>{t.nEditAct}</MenuItem>
        <MenuItem onClick={() => { close(); onDuplicate(note); }}>{t.nDuplicate}</MenuItem>
        <MenuItem onClick={() => { close(); onArchive(note); }}>{note.archived ? t.nAll : t.nArchiveAct}</MenuItem>
        <MenuItem onClick={() => { close(); onDelete(note); }} sx={{ color: 'error.main' }}>{t.nDeleteAct}</MenuItem>
      </Menu>
    </>
  );

  if (view === 'list') {
    return (
      <Stack direction="row" alignItems="center" spacing={2}
        onClick={() => onOpen(note)}
        sx={{
          px: 2, py: 1.75, borderRadius: 2, cursor: 'pointer',
          border: 1, borderColor: 'divider', bgcolor: 'background.paper',
          transition: 'border-color .15s, transform .15s, box-shadow .15s',
          '&:hover': { borderColor: 'primary.main', transform: 'translateY(-1px)', boxShadow: '0 8px 24px rgba(15,23,42,.06)' },
        }}>
        {Star}
        <Stack spacing={0.25} sx={{ flex: 1, minWidth: 0 }}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography sx={{ fontWeight: 600, fontSize: 15, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {note.title || t.nUntitled}
            </Typography>
            {note.shared && <Chip size="small" label="Shared" variant="outlined" sx={{ height: 18, fontSize: 10 }} />}
            {note.archived && <Chip size="small" label={t.nArchive} variant="outlined" sx={{ height: 18, fontSize: 10 }} />}
          </Stack>
          <Typography variant="body2" color="text.secondary" sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {note.excerpt}
          </Typography>
        </Stack>
        <Stack direction="row" spacing={0.5} sx={{ flexShrink: 0 }}>
          {note.tags.slice(0, 2).map((tg) => (
            <Chip key={tg} label={'#' + tg} size="small" variant="outlined"
                  sx={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, height: 22 }} />
          ))}
        </Stack>
        <Typography variant="caption" color="text.secondary" sx={{ minWidth: 100, textAlign: 'right', fontFamily: 'JetBrains Mono, monospace', fontSize: 11 }}>
          {updated}
        </Typography>
        {More}
      </Stack>
    );
  }

  return (
    <Box onClick={() => onOpen(note)}
      sx={{
        p: 2.25, borderRadius: 3, cursor: 'pointer',
        border: 1, borderColor: 'divider', bgcolor: 'background.paper',
        height: '100%', display: 'flex', flexDirection: 'column', gap: 1.25,
        transition: 'border-color .15s, transform .15s, box-shadow .15s',
        '&:hover': { borderColor: 'primary.main', transform: 'translateY(-2px)', boxShadow: '0 12px 30px rgba(15,23,42,.08)' },
      }}>
      <Stack direction="row" alignItems="flex-start" spacing={1}>
        <Typography sx={{ fontWeight: 700, fontSize: 16, lineHeight: 1.3, flex: 1, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {note.title || t.nUntitled}
        </Typography>
        {Star}
      </Stack>
      <Typography variant="body2" color="text.secondary" sx={{
        flex: 1, display: '-webkit-box', WebkitLineClamp: 4, WebkitBoxOrient: 'vertical', overflow: 'hidden',
      }}>{note.excerpt}</Typography>
      <Stack direction="row" spacing={0.5} sx={{ flexWrap: 'wrap', rowGap: 0.5 }}>
        {note.tags.map((tg) => (
          <Chip key={tg} label={'#' + tg} size="small" variant="outlined"
                sx={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, height: 22 }} />
        ))}
      </Stack>
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mt: 0.5, pt: 1, borderTop: 1, borderColor: 'divider' }}>
        <Stack direction="row" spacing={1} alignItems="center" sx={{ color: 'text.secondary' }}>
          <Typography variant="caption" sx={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11 }}>{updated}</Typography>
          <Box sx={{ width: 3, height: 3, borderRadius: '50%', bgcolor: 'text.disabled' }} />
          <Typography variant="caption" sx={{ fontSize: 11 }}>{words} {t.nWords}</Typography>
        </Stack>
        {More}
      </Stack>
    </Box>
  );
}

window.NoteCard = NoteCard;
