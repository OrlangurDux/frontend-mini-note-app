import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

export function FloatingLayout({ mode, wide, children }) {
  return (
    <Box sx={{
      flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
      px: 2, py: { xs: 4, sm: 6 }, position: 'relative',
      background: mode === 'dark'
        ? 'radial-gradient(1200px 700px at 20% 110%, rgba(25,118,210,.25), transparent 55%), radial-gradient(900px 600px at 90% 0%, rgba(66,165,245,.18), transparent 60%)'
        : 'radial-gradient(1200px 700px at 20% 110%, rgba(25,118,210,.12), transparent 55%), radial-gradient(900px 600px at 90% 0%, rgba(144,202,249,.25), transparent 60%)',
    }}>
      <Box aria-hidden sx={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: mode === 'dark'
          ? 'linear-gradient(rgba(255,255,255,.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.04) 1px, transparent 1px)'
          : 'linear-gradient(rgba(15,23,42,.045) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,.045) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
        maskImage: 'radial-gradient(ellipse at center, #000 30%, transparent 75%)',
      }} />
      <Paper elevation={0}
        sx={{
          width: '100%', maxWidth: wide ? 480 : 440, p: { xs: 3, sm: 4.5 },
          borderRadius: 4,
          border: 1, borderColor: mode === 'dark' ? 'rgba(255,255,255,.08)' : 'rgba(15,23,42,.06)',
          backgroundColor: mode === 'dark' ? 'rgba(17,25,43,.72)' : 'rgba(255,255,255,.78)',
          backdropFilter: 'blur(18px) saturate(180%)',
          WebkitBackdropFilter: 'blur(18px) saturate(180%)',
          boxShadow: mode === 'dark'
            ? '0 30px 80px rgba(0,0,0,.55), 0 1px 0 rgba(255,255,255,.06) inset'
            : '0 30px 80px rgba(15,23,42,.12), 0 1px 0 rgba(255,255,255,.8) inset',
          position: 'relative',
        }}>
        {children}
      </Paper>
    </Box>
  );
}
