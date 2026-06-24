import Link from 'next/link';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Icon } from '../components/Icon';

export function ForgotDoneScreen({ t }) {
  return (
    <Stack alignItems="center" spacing={2.5} sx={{ py: 1 }}>
      <Box sx={{
        width: 56, height: 56, borderRadius: '50%', bgcolor: 'success.light', color: 'success.dark',
        display: 'grid', placeItems: 'center', boxShadow: '0 0 0 8px rgba(46,125,50,.08)',
      }}>
        <Icon d="M5 12.5 10 17.5 19 7.5" sw={2.2} size={28} />
      </Box>
      <Stack spacing={0.5} alignItems="center" sx={{ textAlign: 'center' }}>
        <Typography variant="h6" sx={{ fontWeight: 700 }}>{t.fpDoneTitle}</Typography>
        <Typography variant="body2" color="text.secondary">{t.fpDoneBody}</Typography>
      </Stack>
      <Link href="/login" style={{ textDecoration: 'none' }}>
        <Button variant="contained" disableElevation sx={{ textTransform: 'none', borderRadius: 2, mt: 0.5, px: 3, py: 1 }}>
          {t.fpDoneCta}
        </Button>
      </Link>
    </Stack>
  );
}
