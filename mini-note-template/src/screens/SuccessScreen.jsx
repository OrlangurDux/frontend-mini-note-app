// src/screens/SuccessScreen.jsx — post-login workspace landing.
// Uses a CSS keyframe fade-in instead of MUI's <Fade> Transition because
// the host injects mount-time attributes that can leave Fade's transition
// in a pending state with computed opacity 0.
const { Box, Stack, Typography, Button } = window.MUI;

function SuccessScreen({ t }) {
  const email = window.AuthStore.get('email', 'demo@nimbus.app');
  const signOut = () => {
    window.AuthStore.clear('email');
    window.Router.go('login');
  };
  return (
    <Stack alignItems="center" spacing={2.5} sx={{ py: 2 }} data-screen-label="08 Success">
      <Box sx={{
        width: 56, height: 56, borderRadius: '50%',
        bgcolor: 'success.light', color: 'success.dark',
        display: 'grid', placeItems: 'center',
        boxShadow: '0 0 0 8px rgba(46,125,50,.08)',
      }}>
        <window.Icon d="M5 12.5 10 17.5 19 7.5" sw={2.2} size={28} />
      </Box>
      <Stack spacing={0.5} alignItems="center">
        <Typography variant="h6" sx={{ fontWeight: 700 }}>{t.successTitle}</Typography>
        <Typography variant="body2" color="text.secondary" textAlign="center">{t.successBody}</Typography>
        <Typography variant="caption" sx={{
          mt: 1, px: 1.25, py: 0.5, borderRadius: 1,
          bgcolor: 'action.hover', fontFamily: 'JetBrains Mono, monospace',
        }}>{email}</Typography>
      </Stack>
      <Stack direction="row" spacing={1.25} sx={{ pt: 1 }}>
        <Button variant="outlined" onClick={signOut} sx={{ textTransform: 'none', borderRadius: 2 }}>{t.signOut}</Button>
        <Button variant="contained" disableElevation sx={{ textTransform: 'none', borderRadius: 2 }}>{t.continue}</Button>
      </Stack>
    </Stack>
  );
}

window.SuccessScreen = SuccessScreen;
