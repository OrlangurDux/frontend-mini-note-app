// src/screens/ForgotCodeScreen.jsx — step 2: enter the 6-digit code.
const { useState, useEffect } = React;
const { Box, Stack, Typography, Button, Link, CircularProgress } = window.MUI;

function ForgotCodeScreen({ t }) {
  const email = window.AuthStore.get('fpEmail', 'you@example.com');
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [cooldown, setCooldown] = useState(30);

  useEffect(() => {
    if (cooldown <= 0) return;
    const id = setTimeout(() => setCooldown(c => c - 1), 1000);
    return () => clearTimeout(id);
  }, [cooldown]);

  const onSubmit = (ev) => {
    ev.preventDefault();
    if (code.length !== 6) { setError(t.fpCodeInvalid); return; }
    setLoading(true);
    setTimeout(() => {
      if (code === '123456') window.Router.go('forgot-new');
      else { setLoading(false); setError(t.fpCodeInvalid); }
    }, 700);
  };

  return (
    <Stack spacing={2.5} data-screen-label="05 Forgot code">
      <window.ScreenHead
        title={t.fpCodeTitle}
        subtitle={<>{t.fpCodeSubtitle} <Typography component="span" sx={{ fontFamily: 'JetBrains Mono, monospace', fontWeight: 600, color: 'text.primary' }}>{email}</Typography></>}
        step={1} totalSteps={3} />
      <Box component="form" onSubmit={onSubmit} noValidate>
        <Stack spacing={2}>
          <window.CodeInput value={code} onChange={(v) => { setCode(v); if (error) setError(''); }} error={!!error} />
          {error && <Typography variant="caption" color="error" sx={{ textAlign: 'center' }}>{error}</Typography>}
          <Typography variant="caption" sx={{ color: 'text.secondary', textAlign: 'center', fontStyle: 'italic' }}>
            {t.devHint}
          </Typography>
          <Button type="submit" variant="contained" disableElevation fullWidth disabled={loading || code.length !== 6} size="large"
            sx={{ textTransform: 'none', fontWeight: 600, borderRadius: 2, py: 1.25, fontSize: 15, mt: 0.5 }}>
            {loading ? (<><CircularProgress size={18} sx={{ color: 'inherit', mr: 1.25 }} />{t.fpCodeVerifying}</>) : t.fpCodeVerify}
          </Button>
        </Stack>
      </Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ pt: 0.5 }}>
        <Link {...window.Router.linkTo('forgot.html')} underline="hover" sx={{ fontSize: 14, fontWeight: 500 }}>
          ← {email}
        </Link>
        {cooldown > 0 ? (
          <Typography variant="caption" color="text.secondary">{t.fpCodeResendIn} {cooldown}s</Typography>
        ) : (
          <Link component="button" type="button" underline="hover" onClick={() => setCooldown(30)}
                sx={{ fontSize: 14, fontWeight: 600 }}>{t.fpCodeResend}</Link>
        )}
      </Stack>
    </Stack>
  );
}

window.ForgotCodeScreen = ForgotCodeScreen;
