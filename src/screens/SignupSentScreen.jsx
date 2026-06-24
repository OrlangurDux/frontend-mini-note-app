import { useState } from 'react';
import { useRouter } from 'next/router';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import { useEffect } from 'react';
import { Icon } from '../components/Icon';
import { useAuth } from '../contexts/AuthContext';
import * as profileApi from '../lib/api/profile';
import { FlowStore } from '../lib/flowStore';

// Mock confirmation step (SIGNUP_CONFIRMATION_MODE=mock-code). The backend
// does not send or verify a real code yet — any non-empty value is
// accepted. This is groundwork for a future real confirmation endpoint.
export function SignupSentScreen({ t }) {
  const router = useRouter();
  const { login } = useAuth();
  const email = typeof router.query.email === 'string' ? router.query.email : '';
  const name = typeof router.query.name === 'string' ? router.query.name : '';
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setPassword(FlowStore.get('signupPassword', ''));
  }, []);

  const onConfirm = async (ev) => {
    ev.preventDefault();
    if (!code.trim()) return;
    setLoading(true);
    setError('');
    try {
      await login(email, password);
      FlowStore.clear('signupPassword');
      try { await profileApi.updateProfile({ name }); } catch (e) { /* non-fatal */ }
      router.push('/notes');
    } catch (err) {
      setLoading(false);
      setError(err.message || t.errGeneric);
    }
  };

  return (
    <Stack alignItems="center" spacing={2.5} sx={{ py: 1 }}>
      <Box sx={{
        width: 56, height: 56, borderRadius: '50%', bgcolor: 'primary.light', color: 'primary.contrastText',
        display: 'grid', placeItems: 'center', boxShadow: '0 0 0 8px rgba(25,118,210,.08)',
      }}>
        <Icon d="M4 6h16v12H4z M4 6l8 7 8-7" size={26} sw={1.8} />
      </Box>
      <Stack spacing={0.75} alignItems="center" sx={{ textAlign: 'center' }}>
        <Typography variant="h6" sx={{ fontWeight: 700 }}>{t.mcTitle}</Typography>
        <Typography variant="body2" color="text.secondary">{t.mcSubtitle}</Typography>
        {email && (
          <Typography sx={{ px: 1.25, py: 0.5, mt: 0.5, borderRadius: 1, bgcolor: 'action.hover', fontFamily: 'JetBrains Mono, monospace', fontSize: 13 }}>
            {email}
          </Typography>
        )}
      </Stack>
      <Box component="form" onSubmit={onConfirm} sx={{ width: '100%' }}>
        <Stack spacing={2}>
          {error && <Alert severity="error" variant="outlined" sx={{ borderRadius: 2, fontSize: 13.5 }}>{error}</Alert>}
          <TextField label={t.mcLabel} value={code} onChange={(e) => setCode(e.target.value)}
            fullWidth autoFocus InputProps={{ sx: { borderRadius: 2, fontFamily: 'JetBrains Mono, monospace' } }} />
          <Button type="submit" variant="contained" disableElevation fullWidth disabled={loading || !code.trim() || !password} size="large"
            sx={{ textTransform: 'none', borderRadius: 2, mt: 0.5, px: 3, py: 1, fontWeight: 600 }}>
            {loading ? (<><CircularProgress size={18} sx={{ color: 'inherit', mr: 1.25 }} />{t.mcSubmitting}</>) : t.mcSubmit}
          </Button>
        </Stack>
      </Box>
    </Stack>
  );
}
