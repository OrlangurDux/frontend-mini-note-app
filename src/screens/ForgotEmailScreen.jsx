import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import { ScreenHead } from '../components/ScreenHead';
import { FlowStore } from '../lib/flowStore';
import * as authApi from '../lib/api/auth';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ForgotEmailScreen({ t }) {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => { setEmail(FlowStore.get('fpEmail', '')); }, []);

  const onSubmit = async (ev) => {
    ev.preventDefault();
    if (!EMAIL_RE.test(email)) { setError(t.invalidEmail); return; }
    setLoading(true);
    setError('');
    try {
      await authApi.requestRestoreToken(email);
      FlowStore.set('fpEmail', email);
      router.push('/forgot-code');
    } catch (err) {
      setLoading(false);
      setError(err.message || t.errGeneric);
    }
  };

  return (
    <Stack spacing={2.5}>
      <ScreenHead title={t.fpTitle} subtitle={t.fpSubtitle} step={0} totalSteps={3} />
      <Box component="form" onSubmit={onSubmit} noValidate>
        <Stack spacing={2.25}>
          {error && <Alert severity="error" variant="outlined" sx={{ borderRadius: 2, fontSize: 13.5 }}>{error}</Alert>}
          <TextField label={t.email} type="email" value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth autoFocus autoComplete="email"
            InputProps={{ sx: { borderRadius: 2 } }} />
          <Button type="submit" variant="contained" disableElevation fullWidth disabled={loading} size="large"
            sx={{ textTransform: 'none', fontWeight: 600, borderRadius: 2, py: 1.25, fontSize: 15 }}>
            {loading ? (<><CircularProgress size={18} sx={{ color: 'inherit', mr: 1.25 }} />{t.fpSending}</>) : t.fpSubmit}
          </Button>
        </Stack>
      </Box>
      <Stack direction="row" justifyContent="center">
        <Link href="/login" style={{ fontSize: 14, fontWeight: 600 }}>← {t.fpBack}</Link>
      </Stack>
    </Stack>
  );
}
