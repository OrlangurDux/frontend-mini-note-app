// src/components/notes/NotesPagination.jsx — page picker + result count.
const { Stack, Typography, Button, IconButton, MenuItem, TextField } = window.MUI;

function NotesPagination({ t, page, pageCount, total, perPage, onPage, onPerPage }) {
  const pages = [];
  const window_ = 1;
  for (let i = 0; i < pageCount; i++) {
    if (i === 0 || i === pageCount - 1 || Math.abs(i - page) <= window_) pages.push(i);
    else if (pages[pages.length - 1] !== '…') pages.push('…');
  }
  return (
    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems={{ sm: 'center' }} justifyContent="space-between" sx={{ pt: 2 }}>
      <Stack direction="row" spacing={1.5} alignItems="center">
        <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'JetBrains Mono, monospace' }}>
          {total} {t.nResults}
        </Typography>
        <TextField select size="small" value={perPage} onChange={(e) => onPerPage(Number(e.target.value))}
                   sx={{ minWidth: 96, '& .MuiOutlinedInput-root': { borderRadius: 2 } }}>
          {[6, 12, 24, 48].map((n) => <MenuItem key={n} value={n}>{n}/{t.nPage}</MenuItem>)}
        </TextField>
      </Stack>

      <Stack direction="row" spacing={0.5} alignItems="center">
        <IconButton size="small" disabled={page === 0} onClick={() => onPage(page - 1)} aria-label={t.nPrev}>
          <window.Icon d="M15 6l-6 6 6 6" size={18} sw={2} />
        </IconButton>
        {pages.map((p, i) => p === '…'
          ? <Typography key={'e' + i} sx={{ px: 0.75, color: 'text.secondary' }}>…</Typography>
          : <Button key={p} size="small" disableElevation
              variant={p === page ? 'contained' : 'text'}
              onClick={() => onPage(p)}
              sx={{ minWidth: 32, height: 32, px: 0, textTransform: 'none', borderRadius: 1.5, fontWeight: 600, fontFamily: 'JetBrains Mono, monospace' }}>
              {p + 1}
            </Button>
        )}
        <IconButton size="small" disabled={page >= pageCount - 1} onClick={() => onPage(page + 1)} aria-label={t.nNext}>
          <window.Icon d="M9 6l6 6-6 6" size={18} sw={2} />
        </IconButton>
      </Stack>
    </Stack>
  );
}

window.NotesPagination = NotesPagination;
