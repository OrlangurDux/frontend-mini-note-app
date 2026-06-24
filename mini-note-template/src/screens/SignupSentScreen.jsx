// src/screens/SignupSentScreen.jsx — post-signup "check your inbox" notice.
// CSS keyframe fade-in (see SuccessScreen for rationale).
const { Box, Stack, Typography, Button } = window.MUI;

function SignupSentScreen({ t }) {
  const email = window.AuthStore.get('signupEmail', 'you@example.com');
  return (
    <Stack alignItems="center" spacing={2.5} sx={{ py: 1 }} data-screen-label="03 Sign up sent">
      <Box sx={{
        width: 56, height: 56, borderRadius: '50%',
        bgcolor: 'primary.light', color: 'primary.contrastText',
        display: 'grid', placeItems: 'center',
        boxShadow: '0 0 0 8px rgba(25,118,210,.08)',
      }}>
        <window.Icon d="M4 6h16v12H4z M4 6l8 7 8-7" size={26} sw={1.8} />
      </Box>
      <Stack spacing={0.75} alignItems="center" sx={{ textAlign: 'center' }}>
        <Typography variant="h6" sx={{ fontWeight: 700 }}>{t.regDoneTitle}</Typography>
        <Typography variant="body2" color="text.secondary">{t.regDoneBody}</Typography>
        <Typography sx={{
          px: 1.25, py: 0.5, mt: 0.5, borderRadius: 1,
          bgcolor: 'action.hover', fontFamily: 'JetBrains Mono, monospace', fontSize: 13,
        }}>{email}</Typography>
        <Typography variant="caption" color="text.secondary" sx={{ mt: 1.5 }}>{t.regDoneHint}</Typography>
      </Stack>
      <Button {...window.Router.linkTo('login.html')} variant="outlined"
              sx={{ textTransform: 'none', borderRadius: 2, mt: 1 }}>
        {t.fpBack}
      </Button>
    </Stack>
  );
}

window.SignupSentScreen = SignupSentScreen;
