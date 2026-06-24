import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import { Avatar } from '../components/profile/Avatar';
import { useAuth } from '../contexts/AuthContext';
import * as profileApi from '../lib/api/profile';
import * as authApi from '../lib/api/auth';

function Card({ title, subtitle, danger, children }) {
  return (
    <Box sx={{
      borderRadius: 3, p: { xs: 2.5, sm: 3.5 },
      border: 1, borderColor: danger ? 'error.main' : 'divider',
      bgcolor: 'background.paper', boxShadow: '0 6px 20px rgba(15,23,42,.04)',
    }}>
      <Stack spacing={0.25} sx={{ mb: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 700, color: danger ? 'error.main' : 'text.primary' }}>{title}</Typography>
        {subtitle && <Typography variant="body2" color="text.secondary">{subtitle}</Typography>}
      </Stack>
      {children}
    </Box>
  );
}

export function ProfileScreen({ t, mode, lang, onToggleMode, onToggleLang }) {
  const router = useRouter();
  const { user, setUser, logout } = useAuth();
  const fileRef = useRef(null);

  const [name, setName] = useState('');
  const [avatarFile, setAvatarFile] = useState(null);
  const [savingAbout, setSavingAbout] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [savingPassword, setSavingPassword] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [error, setError] = useState('');
  const [toast, setToast] = useState('');

  useEffect(() => { setName(user?.name || ''); }, [user]);

  const initials = (user?.name || user?.email || '?').trim().charAt(0).toUpperCase();

  const onPickAvatar = (e) => {
    const file = e.target.files?.[0];
    if (file) setAvatarFile(file);
  };

  const saveAbout = async (ev) => {
    ev.preventDefault();
    setSavingAbout(true);
    setError('');
    try {
      await profileApi.updateProfile({ name, avatar: avatarFile || undefined });
      const fresh = await profileApi.getProfile();
      setUser(fresh?.data || null);
      setAvatarFile(null);
      setToast(t.pSavedToast);
    } catch (err) {
      setError(err.message || t.errGeneric);
    } finally {
      setSavingAbout(false);
    }
  };

  const savePassword = async (ev) => {
    ev.preventDefault();
    if (!newPassword) return;
    setSavingPassword(true);
    setError('');
    try {
      await authApi.changePassword(newPassword);
      setNewPassword('');
      setToast(t.pPasswordChanged);
    } catch (err) {
      setError(err.message || t.errGeneric);
    } finally {
      setSavingPassword(false);
    }
  };

  const deleteAccount = async () => {
    try {
      await profileApi.deleteProfile();
    } finally {
      setConfirmDelete(false);
      logout();
      router.push('/login');
    }
  };

  return (
    <Box sx={{
      flex: 1, position: 'relative', bgcolor: 'background.default',
      backgroundImage: mode === 'dark'
        ? 'radial-gradient(1000px 600px at 90% 0%, rgba(25,118,210,.10), transparent 60%)'
        : 'radial-gradient(1000px 600px at 90% 0%, rgba(144,202,249,.18), transparent 60%)',
    }}>
      <Container maxWidth="sm" sx={{ py: { xs: 3, sm: 5 } }}>
        <Stack spacing={3}>
          {error && <Alert severity="error" variant="outlined" sx={{ borderRadius: 2 }}>{error}</Alert>}

          <Card title={t.pSecAbout} subtitle={t.pSecAboutSub}>
            <Box component="form" onSubmit={saveAbout}>
              <Stack spacing={2.5}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Avatar src={avatarFile ? URL.createObjectURL(avatarFile) : user?.avatar} initials={initials} size={72} ring editable onEdit={() => fileRef.current?.click()} />
                  <input ref={fileRef} type="file" accept="image/*" hidden onChange={onPickAvatar} />
                  <Stack spacing={0}>
                    <Typography sx={{ fontWeight: 600 }}>{user?.email}</Typography>
                    <Typography variant="caption" color="text.secondary">{t.pAvatarChange}</Typography>
                  </Stack>
                </Stack>
                <TextField label={t.pName} value={name} onChange={(e) => setName(e.target.value)} fullWidth />
                <Button type="submit" disabled={savingAbout} variant="contained" disableElevation
                        sx={{ textTransform: 'none', borderRadius: 2, alignSelf: 'flex-start' }}>{t.pSave}</Button>
              </Stack>
            </Box>
          </Card>

          <Card title={t.pSecSecurity} subtitle={t.pSecSecuritySub}>
            <Box component="form" onSubmit={savePassword}>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField type="password" label={t.pNewPassword} value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)} fullWidth />
                <Button type="submit" disabled={savingPassword || !newPassword} variant="outlined"
                        sx={{ textTransform: 'none', borderRadius: 2, whiteSpace: 'nowrap' }}>{t.pChangePassword}</Button>
              </Stack>
            </Box>
          </Card>

          <Card title={t.pSecPrefs} subtitle={t.pSecPrefsSub}>
            <Stack spacing={2}>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography sx={{ fontSize: 14.5, fontWeight: 500 }}>{t.pLanguage}</Typography>
                <TextField select size="small" value={lang} onChange={() => onToggleLang()} sx={{ minWidth: 160 }}>
                  <MenuItem value="en">English</MenuItem>
                  <MenuItem value="ru">Русский</MenuItem>
                </TextField>
              </Stack>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography sx={{ fontSize: 14.5, fontWeight: 500 }}>{t.pTheme}</Typography>
                <TextField select size="small" value={mode} onChange={() => onToggleMode()} sx={{ minWidth: 160 }}>
                  <MenuItem value="light">{t.pThemeLight}</MenuItem>
                  <MenuItem value="dark">{t.pThemeDark}</MenuItem>
                </TextField>
              </Stack>
            </Stack>
          </Card>

          <Card title={t.pSecDanger} subtitle={t.pSecDangerSub} danger>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Stack spacing={0.25}>
                <Typography sx={{ fontSize: 14.5, fontWeight: 500 }}>{t.pDelete}</Typography>
                <Typography variant="caption" color="text.secondary">{t.pDeleteHint}</Typography>
              </Stack>
              <Button variant="outlined" color="error" onClick={() => setConfirmDelete(true)} sx={{ textTransform: 'none', borderRadius: 2 }}>{t.pDelete}</Button>
            </Stack>
          </Card>
        </Stack>
      </Container>

      <Dialog open={confirmDelete} onClose={() => setConfirmDelete(false)} PaperProps={{ sx: { borderRadius: 3, p: 1 } }}>
        <DialogTitle sx={{ fontWeight: 700 }}>{t.pDeleteConfirmT}</DialogTitle>
        <DialogContent><DialogContentText>{t.pDeleteConfirmB}</DialogContentText></DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={() => setConfirmDelete(false)} sx={{ textTransform: 'none' }}>{t.pCancel}</Button>
          <Button onClick={deleteAccount} variant="contained" color="error" disableElevation sx={{ textTransform: 'none', borderRadius: 2 }}>{t.pDelete}</Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={!!toast} autoHideDuration={2200} onClose={() => setToast('')} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert severity="success" variant="filled" sx={{ borderRadius: 2 }}>{toast}</Alert>
      </Snackbar>
    </Box>
  );
}
