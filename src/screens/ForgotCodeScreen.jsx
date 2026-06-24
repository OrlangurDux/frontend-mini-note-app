import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { ScreenHead } from '../components/ScreenHead';
import { FlowStore } from '../lib/flowStore';

// The backend's /users/forgot has no separate "verify code" call — the
// restore_token (a 32-char random string mailed to the user) is only
// validated together with the new password on the final step. So this
// screen just collects the token and stores it for the next step.
export function ForgotCodeScreen({ t }) {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');

  useEffect(() => {
    setEmail(FlowStore.get('fpEmail', ''));
  }, []);

  const onSubmit = (ev) => {
    ev.preventDefault();
    if (!code.trim()) return;
    FlowStore.set('fpRestoreToken', code.trim());
    router.push('/forgot-new');
  };

  return (
    <Stack spacing={2.5}>
      <ScreenHead
        title={t.fpCodeTitle}
        subtitle={<>{t.fpCodeSubtitle} <Typography component="span" sx={{ fontFamily: 'JetBrains Mono, monospace', fontWeight: 600, color: 'text.primary' }}>{email}</Typography></>}
        step={1} totalSteps={3} />
      <Box component="form" onSubmit={onSubmit} noValidate>
        <Stack spacing={2}>
          <TextField label={t.fpCodeLabel} value={code} onChange={(e) => setCode(e.target.value)}
            helperText={t.fpCodeHint} fullWidth autoFocus
            InputProps={{ sx: { borderRadius: 2, fontFamily: 'JetBrains Mono, monospace' } }} />
          <Button type="submit" variant="contained" disableElevation fullWidth disabled={!code.trim()} size="large"
            sx={{ textTransform: 'none', fontWeight: 600, borderRadius: 2, py: 1.25, fontSize: 15, mt: 0.5 }}>
            {t.fpCodeContinue}
          </Button>
        </Stack>
      </Box>
      <Stack direction="row" justifyContent="center">
        <Link href="/forgot" style={{ fontSize: 14, fontWeight: 500 }}>← {email}</Link>
      </Stack>
    </Stack>
  );
}
