// src/components/profile/Avatar.jsx — gradient initials avatar with optional ring + edit camera.
const { Box, IconButton } = window.MUI;

function Avatar({ initials = 'M', size = 96, ring, editable, onEdit }) {
  return (
    <Box sx={{ position: 'relative', width: size, height: size }}>
      <Box sx={{
        width: size, height: size, borderRadius: '50%',
        background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 60%, #90caf9 100%)',
        display: 'grid', placeItems: 'center',
        color: '#fff', fontWeight: 800, fontSize: size * 0.38, letterSpacing: '-.01em',
        boxShadow: '0 1px 0 rgba(255,255,255,.4) inset, 0 12px 30px rgba(25,118,210,.35)',
        outline: ring ? '4px solid rgba(255,255,255,.85)' : 'none',
      }}>{initials}</Box>
      {editable && (
        <IconButton size="small" onClick={onEdit} sx={{
          position: 'absolute', right: -4, bottom: -4,
          bgcolor: 'background.paper', border: 1, borderColor: 'divider',
          '&:hover': { bgcolor: 'background.paper' }, boxShadow: 2,
        }}>
          <window.Icon size={16} d="M12 5v14M5 12h14" />
        </IconButton>
      )}
    </Box>
  );
}

window.NimbusAvatar = Avatar;
