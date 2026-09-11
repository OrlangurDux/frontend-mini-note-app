import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import InputAdornment from '@mui/material/InputAdornment';
import { ScreenHead } from '../components/ScreenHead';
import { EyeIcon } from '../components/Icon';
import { DomainSwitcher } from '../components/DomainSwitcher';
import { useAuth } from '../contexts/AuthContext';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function LoginScreen({ t }) {
  const router = useRouter();
  const { login, verifyOtp } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState('');
  const [loading, setLoading] = useState(false);

  // Set once /users/login comes back with token_type "mfa" — switches the
  // form to the code-entry step. Holding this only in component state (not
  // AuthContext/storage) keeps it from ever being mistaken for a real
  // session token.
  const [mfaToken, setMfaToken] = useState('');
  const [code, setCode] = useState('');
  const [codeError, setCodeError] = useState('');

  const onSubmit = async (ev) => {
    ev.preventDefault();
    setSubmitError('');
    const e = {};
    if (!EMAIL_RE.test(email)) e.email = t.invalidEmail;
    if (!password) e.password = t.requiredPass;
    setErrors(e);
    if (Object.keys(e).length) return;
    setLoading(true);
    try {
      const res = await login(email, password);
      if (res.token_type === 'mfa') {
        setMfaToken(res.access_token);
        setLoading(false);
        return;
      }
      router.push('/notes');
    } catch (err) {
      setLoading(false);
      setSubmitError(err.message || t.errGeneric);
    }
  };

  const onBackToLogin = () => {
    setMfaToken('');
    setCode('');
    setCodeError('');
  };

  const onSubmitCode = async (ev) => {
    ev.preventDefault();
    setCodeError('');
    if (!code.trim()) { setCodeError(t.mfaRequiredCode); return; }
    setLoading(true);
    try {
      await verifyOtp(mfaToken, code.trim());
      router.push('/notes');
    } catch (err) {
      setLoading(false);
      setCodeError(err.message || t.errGeneric);
    }
  };

  if (mfaToken) {
    return (
      <Stack spacing={2.75}>
        <ScreenHead title={t.mfaTitle} subtitle={t.mfaSubtitle} />
        <Box component="form" onSubmit={onSubmitCode} noValidate>
          <Stack spacing={2.25}>
            {codeError && (
              <Alert severity="error" variant="outlined" sx={{ borderRadius: 2, fontSize: 13.5 }}>{codeError}</Alert>
            )}
            <TextField label={t.mfaCode} value={code}
              onChange={(e) => { setCode(e.target.value); if (codeError) setCodeError(''); }}
              error={!!codeError} helperText={t.mfaExpiredHint}
              fullWidth autoComplete="one-time-code" autoFocus
              inputProps={{ inputMode: 'numeric', maxLength: 6 }}
              InputProps={{ sx: { borderRadius: 2, fontFamily: 'JetBrains Mono, monospace', letterSpacing: '.2em' } }} />
            <Button type="submit" variant="contained" disableElevation fullWidth disabled={loading} size="large"
              sx={{ textTransform: 'none', fontWeight: 600, borderRadius: 2, py: 1.25, fontSize: 15, mt: 0.5 }}>
              {loading ? (<><CircularProgress size={18} sx={{ color: 'inherit', mr: 1.25 }} />{t.mfaSubmitting}</>) : t.mfaSubmit}
            </Button>
            <Button onClick={onBackToLogin} variant="text" sx={{ textTransform: 'none', alignSelf: 'center' }}>{t.mfaBack}</Button>
          </Stack>
        </Box>
      </Stack>
    );
  }

  return (
    <Stack spacing={2.75}>
      <ScreenHead title={t.welcome} subtitle={t.loginSubtitle} />
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
                  <IconButton onClick={() => setShowPass((s) => !s)} edge="end" size="small" tabIndex={-1}>
                    <EyeIcon open={showPass} />
                  </IconButton>
                </InputAdornment>
              ),
            }} />
          <Stack direction="row" justifyContent="flex-end" sx={{ mt: -1 }}>
            <Link href="/forgot" style={{ fontSize: 14, fontWeight: 500 }}>{t.forgot}</Link>
          </Stack>
          <Button type="submit" variant="contained" disableElevation fullWidth disabled={loading} size="large"
            sx={{ textTransform: 'none', fontWeight: 600, borderRadius: 2, py: 1.25, fontSize: 15, mt: 0.5 }}>
            {loading ? (<><CircularProgress size={18} sx={{ color: 'inherit', mr: 1.25 }} />{t.submitting}</>) : t.submit}
          </Button>
        </Stack>
      </Box>
      <DomainSwitcher t={t} />
      <Stack direction="row" justifyContent="center" spacing={0.75} sx={{ pt: 0.5 }}>
        <Typography variant="body2" color="text.secondary">{t.noAccount}</Typography>
        <Link href="/signup" style={{ fontSize: 14, fontWeight: 600 }}>{t.createOne}</Link>
      </Stack>
    </Stack>
  );
}
