import { useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';
import { Icon } from './Icon';
import { useDomains } from '../contexts/DomainContext';

export function DomainSwitcher({ t }) {
  const { domains, activeId, setActive, addDomain, removeDomain } = useDomains();
  const [open, setOpen] = useState(false);
  const [label, setLabel] = useState('');
  const [url, setUrl] = useState('');

  const onAdd = (ev) => {
    ev.preventDefault();
    if (!url.trim()) return;
    const id = addDomain(label.trim(), url.trim());
    setActive(id);
    setLabel('');
    setUrl('');
  };

  return (
    <Box sx={{ border: 1, borderColor: 'divider', borderRadius: 2, p: 1.25 }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between"
             sx={{ cursor: 'pointer' }} onClick={() => setOpen((v) => !v)}>
        <Typography sx={{ fontSize: 13.5, fontWeight: 600, color: 'text.secondary' }}>{t.srvTitle}</Typography>
        <Icon d={open ? 'M18 15 12 9l-6 6' : 'M6 9l6 6 6-6'} size={16} sw={2} />
      </Stack>
      <Collapse in={open}>
        <Stack spacing={1.5} sx={{ pt: 1.5 }}>
          <TextField select size="small" label={t.srvActive} value={activeId || ''}
                     onChange={(e) => setActive(e.target.value)} fullWidth>
            {domains.map((d) => (
              <MenuItem key={d.id} value={d.id}>{d.label} — {d.baseUrl}</MenuItem>
            ))}
          </TextField>
          <Stack spacing={0.5}>
            {domains.map((d) => (
              <Stack key={d.id} direction="row" alignItems="center" justifyContent="space-between"
                     sx={{ fontSize: 12, color: 'text.secondary' }}>
                <Typography variant="caption" sx={{ fontFamily: 'JetBrains Mono, monospace' }}>
                  {d.label} · {d.baseUrl}
                </Typography>
                {domains.length > 1 && (
                  <IconButton size="small" onClick={() => removeDomain(d.id)} aria-label={t.srvRemove}>
                    <Icon d="M6 6l12 12M18 6 6 18" size={14} sw={1.8} />
                  </IconButton>
                )}
              </Stack>
            ))}
          </Stack>
          <Box component="form" onSubmit={onAdd}>
            <Stack spacing={1}>
              <Typography variant="caption" sx={{ fontWeight: 600 }}>{t.srvAdd}</Typography>
              <Stack direction="row" spacing={1}>
                <TextField size="small" placeholder={t.srvLabel} value={label} onChange={(e) => setLabel(e.target.value)} sx={{ flex: 1 }} />
                <TextField size="small" placeholder={t.srvUrl} value={url} onChange={(e) => setUrl(e.target.value)} sx={{ flex: 2 }} />
                <Button type="submit" size="small" variant="outlined" sx={{ textTransform: 'none' }}>{t.srvAddBtn}</Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Collapse>
    </Box>
  );
}
