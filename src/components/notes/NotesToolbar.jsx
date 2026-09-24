import Link from 'next/link';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { Icon } from '../Icon';
import { TAGS_ENABLED } from '../../config';

const STAR_D = 'M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14 2 9.27l6.91-1.01L12 2Z';

export function NotesToolbar({
  t, query, onQuery, status, onStatus, favoriteOnly, onFavoriteOnly, categoryId, onCategoryId, categories,
  tag, onTag, allTags, sort, onSort, view, onView, onNew,
}) {
  return (
    <Stack spacing={2}>
      <Stack direction={{ xs: 'column', md: 'row' }} alignItems={{ md: 'center' }} spacing={2}>
        <Stack spacing={0.25} sx={{ flex: 1 }}>
          <Typography variant="h4" sx={{ fontWeight: 700, letterSpacing: '-0.02em', fontSize: { xs: 24, sm: 30 } }}>{t.nTitle}</Typography>
          <Typography variant="body2" color="text.secondary">{t.nSubtitle}</Typography>
        </Stack>
        <Stack direction="row" spacing={1}>
          <Link href="/categories" style={{ textDecoration: 'none' }}>
            <Button variant="outlined" sx={{ textTransform: 'none', borderRadius: 2, fontWeight: 600 }}>{t.catTitle}</Button>
          </Link>
          <Button variant="contained" disableElevation onClick={onNew}
            startIcon={<Icon d="M12 5v14M5 12h14" size={18} sw={2} />}
            sx={{ textTransform: 'none', borderRadius: 2, fontWeight: 600, px: 2.25 }}>
            {t.nNew}
          </Button>
        </Stack>
      </Stack>

      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} alignItems={{ sm: 'center' }}>
        <TextField value={query} onChange={(e) => onQuery(e.target.value)} placeholder={t.nSearch}
          fullWidth size="small"
          InputProps={{
            sx: { borderRadius: 2, bgcolor: 'background.paper' },
            startAdornment: (
              <InputAdornment position="start">
                <Icon d="M11 4a7 7 0 1 1 0 14 7 7 0 0 1 0-14ZM21 21l-4.3-4.3" size={18} sw={1.8} />
              </InputAdornment>
            ),
            endAdornment: query ? (
              <InputAdornment position="end">
                <IconButton size="small" onClick={() => onQuery('')}>
                  <Icon d="M6 6l12 12M18 6 6 18" size={16} sw={1.8} />
                </IconButton>
              </InputAdornment>
            ) : null,
          }}
        />
        <Stack direction="row" spacing={1} alignItems="center">
          {/* `displayEmpty` is required for a Select to show anything at all
              when its value is '' — MUI only renders a value when the field
              is "filled" (non-empty) or this flag is set, so without it the
              "All categories" option renders as a blank box. It only takes
              effect via `SelectProps` — TextField doesn't forward a bare
              `displayEmpty` prop down to the underlying Select at all, so it
              silently does nothing there (verified against MUI's own
              TextField source: unrecognized props like that land on the
              outer root, not the inner Select). `bgcolor` has to live on the
              same nested selector as `borderRadius` (not the outer TextField
              root) or the square-cornered outer box shows through behind
              the rounded input — most visible in light mode, where that box
              is white against the barely-different page background. */}
          <TextField select size="small" SelectProps={{ displayEmpty: true }} value={categoryId} onChange={(e) => onCategoryId(e.target.value)}
            sx={{ minWidth: 160, '& .MuiOutlinedInput-root': { borderRadius: 2, bgcolor: 'background.paper' } }}>
            <MenuItem value="">{t.nCategoryAll}</MenuItem>
            {categories.map((c) => <MenuItem key={c.id} value={c.id}>{c.name}</MenuItem>)}
          </TextField>
          <TextField select size="small" value={sort} onChange={(e) => onSort(e.target.value)} sx={{ minWidth: 180, '& .MuiOutlinedInput-root': { borderRadius: 2, bgcolor: 'background.paper' } }}>
            <MenuItem value="updated">{t.nSortUpdated}</MenuItem>
            <MenuItem value="newest">{t.nSortNewest}</MenuItem>
            <MenuItem value="oldest">{t.nSortOldest}</MenuItem>
            <MenuItem value="az">{t.nSortAZ}</MenuItem>
          </TextField>
          {/* ToggleButton has no size that lines up with TextField's 40px
              "small" — pin height explicitly instead of guessing via size.
              Corner radius matches the 20px (borderRadius: 2) used by the
              search field and selects above, so the end buttons read as
              proper pill caps instead of the near-square corners a plain
              8px radius gives at this height. */}
          <ToggleButtonGroup value={view} exclusive
            onChange={(_, v) => v && onView(v)} sx={{
              bgcolor: 'background.paper', borderRadius: 2,
              '& .MuiToggleButton-root': { minHeight: 40, px: 1.5 },
            }}>
            <ToggleButton value="grid" sx={{ borderRadius: '20px 0 0 20px !important', textTransform: 'none' }}>
              <Icon d="M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z" size={16} sw={1.8} />
            </ToggleButton>
            <ToggleButton value="list" sx={{ borderRadius: '0 20px 20px 0 !important', textTransform: 'none' }}>
              <Icon d="M4 6h16M4 12h16M4 18h16" size={16} sw={1.8} />
            </ToggleButton>
          </ToggleButtonGroup>
        </Stack>
      </Stack>

      <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', rowGap: 1 }}>
        <Chip label={t.nAll} variant={status === 'all' ? 'filled' : 'outlined'} color={status === 'all' ? 'primary' : 'default'} onClick={() => onStatus('all')} />
        <Chip label={t.nStatusDraft} variant={status === 'draft' ? 'filled' : 'outlined'} color={status === 'draft' ? 'primary' : 'default'} onClick={() => onStatus('draft')} />
        <Chip label={t.nStatusPublic} variant={status === 'public' ? 'filled' : 'outlined'} color={status === 'public' ? 'primary' : 'default'} onClick={() => onStatus('public')} />
        <Chip label={t.nStatusArchive} variant={status === 'archive' ? 'filled' : 'outlined'} color={status === 'archive' ? 'primary' : 'default'} onClick={() => onStatus('archive')} />
        <Chip icon={<Icon d={STAR_D} size={14} fill={favoriteOnly ? 'currentColor' : 'none'} />}
              label={t.nFavoritesOnly} variant={favoriteOnly ? 'filled' : 'outlined'} color={favoriteOnly ? 'primary' : 'default'}
              onClick={() => onFavoriteOnly(!favoriteOnly)} />
        {TAGS_ENABLED && (
          <>
            <Box sx={{ width: 1, height: 24, bgcolor: 'divider', mx: 0.5, alignSelf: 'center' }} />
            {allTags.map((tg) => (
              <Chip key={tg} label={'#' + tg} size="small"
                    variant={tag === tg ? 'filled' : 'outlined'}
                    color={tag === tg ? 'primary' : 'default'}
                    onClick={() => onTag(tag === tg ? '' : tg)}
                    sx={{ fontFamily: 'JetBrains Mono, monospace' }} />
            ))}
          </>
        )}
      </Stack>
      {TAGS_ENABLED && <Typography variant="caption" color="text.secondary">{t.nTagsHint}</Typography>}
    </Stack>
  );
}
