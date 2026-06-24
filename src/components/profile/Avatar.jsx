import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { Icon } from '../Icon';

export function Avatar({ src, initials = '?', size = 96, ring, editable, onEdit }) {
  return (
    <Box sx={{ position: 'relative', width: size, height: size }}>
      <Box sx={{
        width: size, height: size, borderRadius: '50%',
        background: src ? undefined : 'linear-gradient(135deg, #1976d2 0%, #42a5f5 60%, #90caf9 100%)',
        backgroundImage: src ? `url(${src})` : undefined,
        backgroundSize: 'cover', backgroundPosition: 'center',
        display: 'grid', placeItems: 'center',
        color: '#fff', fontWeight: 800, fontSize: size * 0.38, letterSpacing: '-.01em',
        boxShadow: '0 1px 0 rgba(255,255,255,.4) inset, 0 12px 30px rgba(25,118,210,.35)',
        outline: ring ? '4px solid rgba(255,255,255,.85)' : 'none',
      }}>{!src && initials}</Box>
      {editable && (
        <IconButton size="small" onClick={onEdit} sx={{
          position: 'absolute', right: -4, bottom: -4,
          bgcolor: 'background.paper', border: 1, borderColor: 'divider',
          '&:hover': { bgcolor: 'background.paper' }, boxShadow: 2,
        }}>
          <Icon size={16} d="M4 20h4l10-10-4-4L4 16v4Z" sw={1.7} />
        </IconButton>
      )}
    </Box>
  );
}
