// src/screens/ForgotEmailScreen.jsx — step 1: enter the email to recover.
const { useState } = React;
const { Box, Stack, Button, TextField, Link, CircularProgress } = window.MUI;

function ForgotEmailScreen({ t }) {
  const [email, setEmail] = useState(window.AuthStore.get('fpEmail', ''));
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const onSubmit = (ev) => {
    ev.preventDefault();
    if (!emailRegex.test(email)) { setError(t.invalidEmail); return; }
    setLoading(true);
    setTimeout(() => {
      window.AuthStore.set('fpEmail', email);
      window.Router.go('forgot-code');
    }, 700);
  };

  return (
    <Stack spacing={2.5} data-screen-label="04 Forgot email">
      <window.ScreenHead title={t.fpTitle} subtitle={t.fpSubtitle} step={0} totalSteps={3} />
      <Box component="form" onSubmit={onSubmit} noValidate>
        <Stack spacing={2.25}>
          <TextField label={t.email} type="email" value={email}
            onChange={(e) => { setEmail(e.target.value); if (error) setError(''); }}
            error={!!error} helperText={error || ' '}
            fullWidth autoFocus autoComplete="email"
            InputProps={{ sx: { borderRadius: 2 } }} />
          <Button type="submit" variant="contained" disableElevation fullWidth disabled={loading} size="large"
            sx={{ textTransform: 'none', fontWeight: 600, borderRadius: 2, py: 1.25, fontSize: 15 }}>
            {loading ? (<><CircularProgress size={18} sx={{ color: 'inherit', mr: 1.25 }} />{t.fpSending}</>) : t.fpSubmit}
          </Button>
        </Stack>
      </Box>
      <Stack direction="row" justifyContent="center">
        <Link {...window.Router.linkTo('login.html')} underline="hover" sx={{ fontSize: 14, fontWeight: 600 }}>
          ← {t.fpBack}
        </Link>
      </Stack>
    </Stack>
  );
}

window.ForgotEmailScreen = ForgotEmailScreen;
