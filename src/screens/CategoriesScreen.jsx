import { useState } from 'react';
import Link from 'next/link';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Alert from '@mui/material/Alert';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import { Icon } from '../components/Icon';
import { useCategories } from '../contexts/CategoriesContext';

const EMPTY_FORM = { id: null, name: '', parentId: '', sort: 0 };

export function CategoriesScreen({ t, mode }) {
  const { categories, byId, create, update, remove } = useCategories();
  const [form, setForm] = useState(null); // null = closed, EMPTY_FORM-shaped = open
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const [confirm, setConfirm] = useState(null);

  const openNew = () => { setForm({ ...EMPTY_FORM }); setError(''); };
  const openEdit = (c) => { setForm({ id: c.id, name: c.name, parentId: c.parent_id || '', sort: c.sort || 0 }); setError(''); };
  const close = () => setForm(null);

  const save = async (ev) => {
    ev.preventDefault();
    if (!form.name.trim()) return;
    setSaving(true);
    setError('');
    try {
      const payload = { name: form.name.trim(), parentId: form.parentId || '', sort: form.sort };
      if (form.id) await update(form.id, payload);
      else await create(payload);
      setForm(null);
    } catch (err) {
      setError(err.message || t.errGeneric);
    } finally {
      setSaving(false);
    }
  };

  const doDelete = async () => {
    if (!confirm) return;
    try {
      await remove(confirm.id);
      setConfirm(null);
    } catch (err) {
      setError(err.message || t.errGeneric);
      setConfirm(null);
    }
  };

  return (
    <Box sx={{
      flex: 1, position: 'relative', bgcolor: 'background.default',
      backgroundImage: mode === 'dark'
        ? 'radial-gradient(1000px 600px at 90% 0%, rgba(25,118,210,.10), transparent 60%)'
        : 'radial-gradient(1000px 600px at 90% 0%, rgba(144,202,249,.18), transparent 60%)',
    }}>
      <Container maxWidth="md" sx={{ py: { xs: 3, sm: 5 } }}>
        <Stack spacing={3}>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Stack spacing={0.25}>
              <Typography variant="h4" sx={{ fontWeight: 700, letterSpacing: '-0.02em', fontSize: { xs: 24, sm: 30 } }}>{t.catTitle}</Typography>
              <Link href="/notes" style={{ fontSize: 13 }}>← {t.nBack}</Link>
            </Stack>
            <Button variant="contained" disableElevation onClick={openNew}
              startIcon={<Icon d="M12 5v14M5 12h14" size={18} sw={2} />}
              sx={{ textTransform: 'none', borderRadius: 2, fontWeight: 600 }}>{t.catNew}</Button>
          </Stack>

          {error && <Alert severity="error" variant="outlined" sx={{ borderRadius: 2 }}>{error}</Alert>}

          {categories.length === 0 ? (
            <Typography color="text.secondary">{t.catEmpty}</Typography>
          ) : (
            <Stack spacing={1}>
              {categories.map((c) => (
                <Stack key={c.id} direction="row" alignItems="center" spacing={2}
                  sx={{ px: 2, py: 1.5, border: 1, borderColor: 'divider', borderRadius: 2, bgcolor: 'background.paper' }}>
                  <Stack spacing={0} sx={{ flex: 1, minWidth: 0 }}>
                    <Typography sx={{ fontWeight: 600 }}>{c.name}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      {c.parent_id ? (byId[c.parent_id]?.name || c.parent_id) : t.catNone} · {t.catSort}: {c.sort ?? 0}
                    </Typography>
                  </Stack>
                  <IconButton size="small" onClick={() => openEdit(c)} aria-label={t.catEdit}>
                    <Icon d="M4 20h4l10-10-4-4L4 16v4Z" size={16} sw={1.7} />
                  </IconButton>
                  <IconButton size="small" onClick={() => setConfirm(c)} aria-label={t.catDelete} sx={{ color: 'error.main' }}>
                    <Icon d="M6 6l12 12M18 6 6 18" size={16} sw={1.8} />
                  </IconButton>
                </Stack>
              ))}
            </Stack>
          )}
        </Stack>
      </Container>

      <Dialog open={!!form} onClose={close} PaperProps={{ sx: { borderRadius: 3 } }} fullWidth maxWidth="xs">
        {form && (
          <Box component="form" onSubmit={save}>
            <DialogTitle sx={{ fontWeight: 700 }}>{form.id ? t.catEdit : t.catNew}</DialogTitle>
            <DialogContent>
              <Stack spacing={2} sx={{ pt: 1 }}>
                <TextField label={t.catName} value={form.name} autoFocus
                  onChange={(e) => setForm({ ...form, name: e.target.value })} fullWidth />
                <TextField select label={t.catParent} value={form.parentId}
                  onChange={(e) => setForm({ ...form, parentId: e.target.value })} fullWidth>
                  <MenuItem value="">{t.catNone}</MenuItem>
                  {categories.filter((c) => c.id !== form.id).map((c) => (
                    <MenuItem key={c.id} value={c.id}>{c.name}</MenuItem>
                  ))}
                </TextField>
                <TextField type="number" label={t.catSort} value={form.sort}
                  onChange={(e) => setForm({ ...form, sort: Number(e.target.value) })} fullWidth />
              </Stack>
            </DialogContent>
            <DialogActions sx={{ px: 3, pb: 2 }}>
              <Button onClick={close} sx={{ textTransform: 'none' }}>{t.catCancel}</Button>
              <Button type="submit" disabled={saving} variant="contained" disableElevation sx={{ textTransform: 'none', borderRadius: 2 }}>{t.catSave}</Button>
            </DialogActions>
          </Box>
        )}
      </Dialog>

      <Dialog open={!!confirm} onClose={() => setConfirm(null)} PaperProps={{ sx: { borderRadius: 3, p: 1 } }}>
        <DialogTitle sx={{ fontWeight: 700 }}>{t.catDeleteConfirmT}</DialogTitle>
        <DialogContent><DialogContentText>{t.catDeleteConfirmB}</DialogContentText></DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={() => setConfirm(null)} sx={{ textTransform: 'none' }}>{t.catCancel}</Button>
          <Button onClick={doDelete} variant="contained" color="error" disableElevation sx={{ textTransform: 'none', borderRadius: 2 }}>{t.catDelete}</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
