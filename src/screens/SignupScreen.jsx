import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import InputAdornment from '@mui/material/InputAdornment';
import { ScreenHead } from '../components/ScreenHead';
import { EyeIcon } from '../components/Icon';
import { StrengthMeter } from '../components/StrengthMeter';
import { useAuth } from '../contexts/AuthContext';
import { SIGNUP_CONFIRMATION_MODE } from '../config';
import * as profileApi from '../lib/api/profile';
import { FlowStore } from '../lib/flowStore';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function SignupScreen({ t }) {
  const router = useRouter();
  const { register, login } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [agree, setAgree] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState('');
  const [loading, setLoading] = useState(false);

  const finishAfterRegister = async () => {
    await login(email, password);
    try { await profileApi.updateProfile({ name }); } catch (e) { /* non-fatal */ }
    router.push('/notes');
  };

  const onSubmit = async (ev) => {
    ev.preventDefault();
    setSubmitError('');
    const e = {};
    if (!name.trim()) e.name = t.requiredName;
    if (!EMAIL_RE.test(email)) e.email = t.invalidEmail;
    if (!password) e.password = t.requiredPass;
    else if (password.length < 8) e.password = t.weakPass;
    if (confirm !== password) e.confirm = t.mismatchPass;
    if (!agree) e.agree = t.mustAgree;
    setErrors(e);
    if (Object.keys(e).length) return;
    setLoading(true);
    try {
      await register(email, password);
      if (SIGNUP_CONFIRMATION_MODE === 'mock-code') {
        FlowStore.set('signupPassword', password);
        router.push({ pathname: '/signup-sent', query: { email, name } });
      } else {
        await finishAfterRegister();
      }
    } catch (err) {
      setLoading(false);
      setSubmitError(err.message || t.errGeneric);
    }
  };

  return (
    <Stack spacing={2.5}>
      <ScreenHead title={t.regTitle} subtitle={t.regSubtitle} />
      <Box component="form" onSubmit={onSubmit} noValidate>
        <Stack spacing={2}>
          {submitError && (
            <Alert severity="error" variant="outlined" sx={{ borderRadius: 2, fontSize: 13.5 }}>{submitError}</Alert>
          )}
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
                  <IconButton onClick={() => setShowPass((s) => !s)} edge="end" size="small" tabIndex={-1}>
                    <EyeIcon open={showPass} />
                  </IconButton>
                </InputAdornment>
              ),
            }} />
          <StrengthMeter value={password} labels={t.strengthLabels} />
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
                  <a href="#" onClick={(e) => e.preventDefault()} style={{ fontWeight: 500 }}>{t.terms}</a>
                  {t.and}
                  <a href="#" onClick={(e) => e.preventDefault()} style={{ fontWeight: 500 }}>{t.privacy}</a>
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
        <Link href="/login" style={{ fontSize: 14, fontWeight: 600 }}>{t.signIn}</Link>
      </Stack>
    </Stack>
  );
}
