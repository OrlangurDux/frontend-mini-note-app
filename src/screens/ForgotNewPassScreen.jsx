import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import InputAdornment from '@mui/material/InputAdornment';
import { ScreenHead } from '../components/ScreenHead';
import { EyeIcon } from '../components/Icon';
import { StrengthMeter } from '../components/StrengthMeter';
import { FlowStore } from '../lib/flowStore';
import * as authApi from '../lib/api/auth';

export function ForgotNewPassScreen({ t }) {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [restoreToken, setRestoreToken] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setEmail(FlowStore.get('fpEmail', ''));
    setRestoreToken(FlowStore.get('fpRestoreToken', ''));
  }, []);

  const onSubmit = async (ev) => {
    ev.preventDefault();
    setSubmitError('');
    const e = {};
    if (!password) e.password = t.requiredPass;
    else if (password.length < 8) e.password = t.weakPass;
    if (confirm !== password) e.confirm = t.mismatchPass;
    setErrors(e);
    if (Object.keys(e).length) return;
    setLoading(true);
    try {
      await authApi.resetPassword(email, restoreToken, password);
      FlowStore.clear('fpEmail');
      FlowStore.clear('fpRestoreToken');
      router.push('/forgot-done');
    } catch (err) {
      setLoading(false);
      // Most likely cause: invalid/expired restore_token, since that's only
      // validated by the backend on this final call.
      setSubmitError(err.message || t.errGeneric);
    }
  };

  return (
    <Stack spacing={2.5}>
      <ScreenHead title={t.fpNewTitle} subtitle={t.fpNewSubtitle} step={2} totalSteps={3} />
      <Box component="form" onSubmit={onSubmit} noValidate>
        <Stack spacing={2}>
          {submitError && <Alert severity="error" variant="outlined" sx={{ borderRadius: 2, fontSize: 13.5 }}>{submitError}</Alert>}
          <TextField label={t.password} type={showPass ? 'text' : 'password'} value={password}
            onChange={(e) => { setPassword(e.target.value); if (errors.password) setErrors({ ...errors, password: undefined }); }}
            error={!!errors.password} helperText={errors.password || t.strengthHint}
            fullWidth autoFocus autoComplete="new-password"
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
          <Button type="submit" variant="contained" disableElevation fullWidth disabled={loading} size="large"
            sx={{ textTransform: 'none', fontWeight: 600, borderRadius: 2, py: 1.25, fontSize: 15, mt: 0.5 }}>
            {loading ? (<><CircularProgress size={18} sx={{ color: 'inherit', mr: 1.25 }} />{t.fpNewSubmitting}</>) : t.fpNewSubmit}
          </Button>
        </Stack>
      </Box>
    </Stack>
  );
}
