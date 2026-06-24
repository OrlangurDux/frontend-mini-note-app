// src/components/notes/NotesToolbar.jsx — search box + tag chips + sort + view + new-note CTA.
const { Box, Stack, Typography, TextField, InputAdornment, IconButton, Chip, Button, MenuItem, ToggleButton, ToggleButtonGroup } = window.MUI;

function NotesToolbar({ t, query, onQuery, tag, onTag, sort, onSort, view, onView, onNew, allTags }) {
  return (
    <Stack spacing={2}>
      <Stack direction={{ xs: 'column', md: 'row' }} alignItems={{ md: 'center' }} spacing={2}>
        <Stack spacing={0.25} sx={{ flex: 1 }}>
          <Typography variant="h4" sx={{ fontWeight: 700, letterSpacing: '-0.02em', fontSize: { xs: 24, sm: 30 } }}>{t.nTitle}</Typography>
          <Typography variant="body2" color="text.secondary">{t.nSubtitle}</Typography>
        </Stack>
        <Button variant="contained" disableElevation onClick={onNew}
          startIcon={<window.Icon d="M12 5v14M5 12h14" size={18} sw={2} />}
          sx={{ textTransform: 'none', borderRadius: 2, fontWeight: 600, px: 2.25 }}>
          {t.nNew}
        </Button>
      </Stack>

      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} alignItems={{ sm: 'center' }}>
        <TextField value={query} onChange={(e) => onQuery(e.target.value)} placeholder={t.nSearch}
          fullWidth size="medium"
          InputProps={{
            sx: { borderRadius: 2, bgcolor: 'background.paper' },
            startAdornment: (
              <InputAdornment position="start">
                <window.Icon d="M11 4a7 7 0 1 1 0 14 7 7 0 0 1 0-14ZM21 21l-4.3-4.3" size={18} sw={1.8} />
              </InputAdornment>
            ),
            endAdornment: query ? (
              <InputAdornment position="end">
                <IconButton size="small" onClick={() => onQuery('')}>
                  <window.Icon d="M6 6l12 12M18 6 6 18" size={16} sw={1.8} />
                </IconButton>
              </InputAdornment>
            ) : null,
          }}
        />
        <Stack direction="row" spacing={1} alignItems="center">
          <TextField select size="small" value={sort} onChange={(e) => onSort(e.target.value)} sx={{ minWidth: 180, bgcolor: 'background.paper', '& .MuiOutlinedInput-root': { borderRadius: 2 } }}>
            <MenuItem value="updated">{t.nSortUpdated}</MenuItem>
            <MenuItem value="newest">{t.nSortNewest}</MenuItem>
            <MenuItem value="oldest">{t.nSortOldest}</MenuItem>
            <MenuItem value="az">{t.nSortAZ}</MenuItem>
          </TextField>
          <ToggleButtonGroup value={view} exclusive size="small"
            onChange={(_, v) => v && onView(v)} sx={{ bgcolor: 'background.paper', borderRadius: 2, '& .MuiToggleButton-root': { border: 1, borderColor: 'divider' } }}>
            <ToggleButton value="grid" sx={{ borderRadius: '8px 0 0 8px !important', textTransform: 'none', px: 1.25 }}>
              <window.Icon d="M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z" size={16} sw={1.8} />
            </ToggleButton>
            <ToggleButton value="list" sx={{ borderRadius: '0 8px 8px 0 !important', textTransform: 'none', px: 1.25 }}>
              <window.Icon d="M4 6h16M4 12h16M4 18h16" size={16} sw={1.8} />
            </ToggleButton>
          </ToggleButtonGroup>
        </Stack>
      </Stack>

      <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', rowGap: 1 }}>
        <Chip label={t.nAll}     variant={tag === 'all'      ? 'filled' : 'outlined'} color={tag === 'all'      ? 'primary' : 'default'} onClick={() => onTag('all')} />
        <Chip label={t.nStarred} variant={tag === 'starred'  ? 'filled' : 'outlined'} color={tag === 'starred'  ? 'primary' : 'default'} onClick={() => onTag('starred')}
              icon={<window.Icon d="M12 3l2.6 5.5L20 9.3l-4 4 .9 5.7L12 16.5 7.1 19l.9-5.7-4-4 5.4-.8L12 3Z" size={14} fill="currentColor" stroke="none" />} />
        <Chip label={t.nShared}  variant={tag === 'shared'   ? 'filled' : 'outlined'} color={tag === 'shared'   ? 'primary' : 'default'} onClick={() => onTag('shared')} />
        <Chip label={t.nArchive} variant={tag === 'archived' ? 'filled' : 'outlined'} color={tag === 'archived' ? 'primary' : 'default'} onClick={() => onTag('archived')} />
        <Box sx={{ width: 1, height: 24, bgcolor: 'divider', mx: 0.5, alignSelf: 'center' }} />
        {allTags.map((tg) => (
          <Chip key={tg} label={'#' + tg} size="small"
                variant={tag === ('tag:' + tg) ? 'filled' : 'outlined'}
                color={tag === ('tag:' + tg) ? 'primary' : 'default'}
                onClick={() => onTag('tag:' + tg)}
                sx={{ fontFamily: 'JetBrains Mono, monospace' }} />
        ))}
      </Stack>
    </Stack>
  );
}

window.NotesToolbar = NotesToolbar;
