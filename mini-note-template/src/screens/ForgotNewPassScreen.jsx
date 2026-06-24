// src/screens/ForgotNewPassScreen.jsx — step 3: pick a new password.
const { useState } = React;
const { Box, Stack, Button, TextField, IconButton, CircularProgress, InputAdornment } = window.MUI;

function ForgotNewPassScreen({ t }) {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const onSubmit = (ev) => {
    ev.preventDefault();
    const e = {};
    if (!password) e.password = t.requiredPass;
    else if (password.length < 8) e.password = t.weakPass;
    if (confirm !== password) e.confirm = t.mismatchPass;
    setErrors(e);
    if (Object.keys(e).length) return;
    setLoading(true);
    setTimeout(() => window.Router.go('forgot-done'), 800);
  };

  return (
    <Stack spacing={2.5} data-screen-label="06 Forgot new password">
      <window.ScreenHead title={t.fpNewTitle} subtitle={t.fpNewSubtitle} step={2} totalSteps={3} />
      <Box component="form" onSubmit={onSubmit} noValidate>
        <Stack spacing={2}>
          <TextField label={t.password} type={showPass ? 'text' : 'password'} value={password}
            onChange={(e) => { setPassword(e.target.value); if (errors.password) setErrors({ ...errors, password: undefined }); }}
            error={!!errors.password} helperText={errors.password || t.strengthHint}
            fullWidth autoFocus autoComplete="new-password"
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
          <Button type="submit" variant="contained" disableElevation fullWidth disabled={loading} size="large"
            sx={{ textTransform: 'none', fontWeight: 600, borderRadius: 2, py: 1.25, fontSize: 15, mt: 0.5 }}>
            {loading ? (<><CircularProgress size={18} sx={{ color: 'inherit', mr: 1.25 }} />{t.fpNewSubmitting}</>) : t.fpNewSubmit}
          </Button>
        </Stack>
      </Box>
    </Stack>
  );
}

window.ForgotNewPassScreen = ForgotNewPassScreen;
