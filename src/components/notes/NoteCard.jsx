import { useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Chip from '@mui/material/Chip';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Icon } from '../Icon';
import { stripMarkdown } from '../../lib/markdown';
import { TAGS_ENABLED } from '../../config';

const STATUS_COLOR = { draft: 'default', public: 'success', archive: 'warning' };
const STAR_D = 'M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14 2 9.27l6.91-1.01L12 2Z';

function FavoriteButton({ t, favorite, onToggle, size }) {
  return (
    <IconButton size="small" onClick={(e) => { e.stopPropagation(); onToggle(); }}
      aria-label={favorite ? t.nUnfavorite : t.nFavorite} title={favorite ? t.nUnfavorite : t.nFavorite}
      sx={{ color: favorite ? '#f5a623' : 'text.secondary' }}>
      <Icon d={STAR_D} size={size} fill={favorite ? 'currentColor' : 'none'} />
    </IconButton>
  );
}

export function NoteCard({ t, note, view, categoryName, tags, onOpen, onEdit, onDuplicate, onDelete, onToggleFavorite }) {
  const [anchor, setAnchor] = useState(null);
  const close = () => setAnchor(null);
  const updated = note.updated_at ? new Date(note.updated_at).toLocaleString() : '';
  const statusLabel = { draft: t.nStatusDraft, public: t.nStatusPublic, archive: t.nStatusArchive }[note.status] || note.status;

  const More = (
    <>
      <IconButton size="small" onClick={(e) => { e.stopPropagation(); setAnchor(e.currentTarget); }} aria-label={t.nMore} sx={{ color: 'text.secondary' }}>
        <Icon d="M5 12h.01M12 12h.01M19 12h.01" sw={3} size={18} />
      </IconButton>
      <Menu anchorEl={anchor} open={!!anchor} onClose={close} onClick={(e) => e.stopPropagation()}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} transformOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <MenuItem onClick={() => { close(); onOpen(note); }}>{t.nOpen}</MenuItem>
        <MenuItem onClick={() => { close(); onEdit(note); }}>{t.nEditAct}</MenuItem>
        <MenuItem onClick={() => { close(); onDuplicate(note); }}>{t.nDuplicate}</MenuItem>
        <MenuItem onClick={() => { close(); onDelete(note); }} sx={{ color: 'error.main' }}>{t.nDeleteAct}</MenuItem>
      </Menu>
    </>
  );

  if (view === 'list') {
    return (
      <Stack direction="row" alignItems="center" spacing={2} onClick={() => onOpen(note)}
        sx={{
          px: 2, py: 1.75, borderRadius: 2, cursor: 'pointer',
          border: 1, borderColor: 'divider', bgcolor: 'background.paper',
          transition: 'border-color .15s, transform .15s, box-shadow .15s',
          '&:hover': { borderColor: 'primary.main', transform: 'translateY(-1px)', boxShadow: '0 8px 24px rgba(15,23,42,.06)' },
        }}>
        <Stack spacing={0.25} sx={{ flex: 1, minWidth: 0 }}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography sx={{ fontWeight: 600, fontSize: 15, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {note.title || t.nUntitled}
            </Typography>
            <Chip size="small" label={statusLabel} color={STATUS_COLOR[note.status]} variant="outlined" sx={{ height: 18, fontSize: 10 }} />
            {categoryName && <Chip size="small" label={categoryName} variant="outlined" sx={{ height: 18, fontSize: 10 }} />}
          </Stack>
          <Typography variant="body2" color="text.secondary" sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {stripMarkdown(note.note).slice(0, 140)}
          </Typography>
        </Stack>
        {TAGS_ENABLED && (
          <Stack direction="row" spacing={0.5} sx={{ flexShrink: 0 }}>
            {(tags || []).slice(0, 2).map((tg) => (
              <Chip key={tg} label={'#' + tg} size="small" variant="outlined" sx={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, height: 22 }} />
            ))}
          </Stack>
        )}
        <Typography variant="caption" color="text.secondary" sx={{ minWidth: 140, textAlign: 'right', fontFamily: 'JetBrains Mono, monospace', fontSize: 11 }}>
          {updated}
        </Typography>
        <FavoriteButton t={t} favorite={note.favorite} onToggle={() => onToggleFavorite(note)} size={16} />
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
        <FavoriteButton t={t} favorite={note.favorite} onToggle={() => onToggleFavorite(note)} size={18} />
        <Chip size="small" label={statusLabel} color={STATUS_COLOR[note.status]} variant="outlined" sx={{ height: 18, fontSize: 10 }} />
      </Stack>
      {categoryName && <Chip size="small" label={categoryName} variant="outlined" sx={{ alignSelf: 'flex-start', height: 20, fontSize: 11 }} />}
      <Typography variant="body2" color="text.secondary" sx={{ flex: 1, display: '-webkit-box', WebkitLineClamp: 4, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
        {stripMarkdown(note.note)}
      </Typography>
      {TAGS_ENABLED && (
        <Stack direction="row" spacing={0.5} sx={{ flexWrap: 'wrap', rowGap: 0.5 }}>
          {(tags || []).map((tg) => (
            <Chip key={tg} label={'#' + tg} size="small" variant="outlined" sx={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, height: 22 }} />
          ))}
        </Stack>
      )}
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mt: 0.5, pt: 1, borderTop: 1, borderColor: 'divider' }}>
        <Typography variant="caption" sx={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: 'text.secondary' }}>{updated}</Typography>
        {More}
      </Stack>
    </Box>
  );
}
