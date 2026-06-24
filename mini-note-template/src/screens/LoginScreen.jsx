// src/screens/LoginScreen.jsx — sign-in form.
const { useState } = React;
const {
  Box, Stack, Typography, Button, IconButton, TextField, Checkbox,
  FormControlLabel, Link, Alert, CircularProgress, InputAdornment,
} = window.MUI;

function LoginScreen({ t }) {
  const [email, setEmail] = useState(window.AuthStore.get('email', ''));
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(true);
  const [showPass, setShowPass] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState('');
  const [loading, setLoading] = useState(false);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const onSubmit = (ev) => {
    ev.preventDefault();
    setSubmitError('');
    const e = {};
    if (!emailRegex.test(email)) e.email = t.invalidEmail;
    if (!password) e.password = t.requiredPass;
    setErrors(e);
    if (Object.keys(e).length) return;
    setLoading(true);
    setTimeout(() => {
      if (email.trim().toLowerCase() === 'demo@nimbus.app' && password === 'password') {
        window.AuthStore.set('email', email);
        window.Router.go('success');
      } else {
        setLoading(false);
        setSubmitError(t.badCreds);
      }
    }, 800);
  };

  return (
    <Stack spacing={2.75} data-screen-label="01 Login">
      <window.ScreenHead title={t.welcome} subtitle={t.loginSubtitle} />
      <Box component="form" onSubmit={onSubmit} noValidate>
        <Stack spacing={2.25}>
          {submitError && (
            <Alert severity="error" variant="outlined" sx={{ borderRadius: 2, fontSize: 13.5 }}>{submitError}</Alert>
          )}
          <TextField label={t.email} type="email" value={email}
            onChange={(e) => { setEmail(e.target.value); if (errors.email) setErrors({ ...errors, email: undefined }); }}
            error={!!errors.email} helperText={errors.email || ' '}
            fullWidth autoComplete="email" autoFocus
            InputProps={{ sx: { borderRadius: 2 } }} />
          <TextField label={t.password} type={showPass ? 'text' : 'password'} value={password}
            onChange={(e) => { setPassword(e.target.value); if (errors.password) setErrors({ ...errors, password: undefined }); }}
            error={!!errors.password} helperText={errors.password || ' '}
            fullWidth autoComplete="current-password"
            InputProps={{
              sx: { borderRadius: 2 },
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPass(s => !s)} edge="end" size="small" tabIndex={-1}>
                    {window.EyeIcon(showPass)}
                  </IconButton>
                </InputAdornment>
              ),
            }} />
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mt: -1 }}>
            <FormControlLabel
              control={<Checkbox size="small" checked={remember} onChange={(e) => setRemember(e.target.checked)} />}
              label={<Typography sx={{ fontSize: 14 }}>{t.remember}</Typography>} />
            <Link {...window.Router.linkTo('forgot.html')} underline="hover" sx={{ fontSize: 14, fontWeight: 500 }}>
              {t.forgot}
            </Link>
          </Stack>
          <Button type="submit" variant="contained" disableElevation fullWidth disabled={loading} size="large"
            sx={{ textTransform: 'none', fontWeight: 600, borderRadius: 2, py: 1.25, fontSize: 15, mt: 0.5 }}>
            {loading ? (<><CircularProgress size={18} sx={{ color: 'inherit', mr: 1.25 }} />{t.submitting}</>) : t.submit}
          </Button>
        </Stack>
      </Box>
      <Stack direction="row" justifyContent="center" spacing={0.75} sx={{ pt: 0.5 }}>
        <Typography variant="body2" color="text.secondary">{t.noAccount}</Typography>
        <Link {...window.Router.linkTo('signup.html')} underline="hover" sx={{ fontSize: 14, fontWeight: 600 }}>
          {t.createOne}
        </Link>
      </Stack>
    </Stack>
  );
}

window.LoginScreen = LoginScreen;
