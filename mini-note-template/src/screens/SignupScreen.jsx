// src/screens/SignupScreen.jsx — registration form with strength meter,
// confirm-password, and Terms agreement.
const { useState } = React;
const {
  Box, Stack, Typography, Button, IconButton, TextField, Checkbox,
  FormControlLabel, Link, CircularProgress, InputAdornment,
} = window.MUI;

function SignupScreen({ t }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [agree, setAgree] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const onSubmit = (ev) => {
    ev.preventDefault();
    const e = {};
    if (!name.trim()) e.name = t.requiredName;
    if (!emailRegex.test(email)) e.email = t.invalidEmail;
    if (!password) e.password = t.requiredPass;
    else if (password.length < 8) e.password = t.weakPass;
    if (confirm !== password) e.confirm = t.mismatchPass;
    if (!agree) e.agree = t.mustAgree;
    setErrors(e);
    if (Object.keys(e).length) return;
    setLoading(true);
    setTimeout(() => {
      window.AuthStore.set('signupEmail', email);
      window.AuthStore.set('name', name);
      window.Router.go('signup-sent');
    }, 900);
  };

  return (
    <Stack spacing={2.5} data-screen-label="02 Sign up">
      <window.ScreenHead title={t.regTitle} subtitle={t.regSubtitle} />
      <Box component="form" onSubmit={onSubmit} noValidate>
        <Stack spacing={2}>
          <TextField label={t.name} value={name}
            onChange={(e) => { setName(e.target.value); if (errors.name) setErrors({ ...errors, name: undefined }); }}
            error={!!errors.name} helperText={errors.name || ' '}
            fullWidth autoFocus autoComplete="name"
            InputProps={{ sx: { borderRadius: 2 } }} />
          <TextField label={t.email} type="email" value={email}
            onChange={(e) => { setEmail(e.target.value); if (errors.email) setErrors({ ...errors, email: undefined }); }}
            error={!!errors.email} helperText={errors.email || ' '}
            fullWidth autoComplete="email"
            InputProps={{ sx: { borderRadius: 2 } }} />
          <TextField label={t.password} type={showPass ? 'text' : 'password'} value={password}
            onChange={(e) => { setPassword(e.target.value); if (errors.password) setErrors({ ...errors, password: undefined }); }}
            error={!!errors.password} helperText={errors.password || t.strengthHint}
            fullWidth autoComplete="new-password"
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
          <window.StrengthMeter value={password} labels={t.strengthLabels} />
          <TextField label={t.confirmPassword} type={showPass ? 'text' : 'password'} value={confirm}
            onChange={(e) => { setConfirm(e.target.value); if (errors.confirm) setErrors({ ...errors, confirm: undefined }); }}
            error={!!errors.confirm} helperText={errors.confirm || ' '}
            fullWidth autoComplete="new-password"
            InputProps={{ sx: { borderRadius: 2 } }} />
          <Box>
            <FormControlLabel
              control={<Checkbox size="small" checked={agree}
                         onChange={(e) => { setAgree(e.target.checked); if (errors.agree) setErrors({ ...errors, agree: undefined }); }} />}
              label={
                <Typography sx={{ fontSize: 13.5, color: 'text.secondary', lineHeight: 1.5 }}>
                  {t.agree1}
                  <Link href="#" onClick={(e) => e.preventDefault()} underline="hover" sx={{ fontWeight: 500 }}>{t.terms}</Link>
                  {t.and}
                  <Link href="#" onClick={(e) => e.preventDefault()} underline="hover" sx={{ fontWeight: 500 }}>{t.privacy}</Link>
                  {t.agree2}
                </Typography>
              }
              sx={{ alignItems: 'flex-start', mr: 0, '.MuiCheckbox-root': { pt: 0.25 } }} />
            {errors.agree && (
              <Typography variant="caption" color="error" sx={{ display: 'block', pl: 4, mt: -0.5 }}>
                {errors.agree}
              </Typography>
            )}
          </Box>
          <Button type="submit" variant="contained" disableElevation fullWidth disabled={loading} size="large"
            sx={{ textTransform: 'none', fontWeight: 600, borderRadius: 2, py: 1.25, fontSize: 15, mt: 0.5 }}>
            {loading ? (<><CircularProgress size={18} sx={{ color: 'inherit', mr: 1.25 }} />{t.regSubmitting}</>) : t.regSubmit}
          </Button>
        </Stack>
      </Box>
      <Stack direction="row" justifyContent="center" spacing={0.75}>
        <Typography variant="body2" color="text.secondary">{t.haveAccount}</Typography>
        <Link {...window.Router.linkTo('login.html')} underline="hover" sx={{ fontSize: 14, fontWeight: 600 }}>
          {t.signIn}
        </Link>
      </Stack>
    </Stack>
  );
}

window.SignupScreen = SignupScreen;
