import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { BrandMark } from './BrandMark';
import { Icon } from './Icon';
import { Avatar } from './profile/Avatar';
import { OfflineBadge } from './OfflineBadge';
import { useAuth } from '../contexts/AuthContext';
import { resolveAssetUrl } from '../lib/domains';

// `variant`: 'public' (landing/login/signup/forgot — shows sign in/up CTA)
// or 'app' (notes/profile — shows nav + account menu).
export function AppHeader({ mode, lang, t, variant = 'public', onToggleTheme, onToggleLang }) {
  const router = useRouter();
  const { isAuthenticated, logout, user } = useAuth();
  const [anchor, setAnchor] = useState(null);

  const showApp = variant === 'app' && isAuthenticated;
  const initials = (user?.name || user?.email || '?').trim().charAt(0).toUpperCase();

  const onSignOut = () => {
    setAnchor(null);
    logout();
    router.push('/login');
  };

  return (
    <AppBar
      position="sticky"
      elevation={0}
      color="transparent"
      sx={{
        backdropFilter: 'saturate(180%) blur(14px)',
        WebkitBackdropFilter: 'saturate(180%) blur(14px)',
        backgroundColor: mode === 'dark' ? 'rgba(11,18,32,.72)' : 'rgba(255,255,255,.72)',
        borderBottom: 1,
        borderColor: mode === 'dark' ? 'rgba(255,255,255,.08)' : 'rgba(15,23,42,.08)',
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ minHeight: { xs: 60, sm: 68 }, gap: 2 }}>
          <Link href={showApp ? '/notes' : '/'} style={{ display: 'flex', alignItems: 'center' }}>
            <BrandMark mode={mode} />
          </Link>
          <Box sx={{ flex: 1 }} />
          <Stack direction="row" alignItems="center" spacing={{ xs: 0.5, sm: 1 }}>
            <Tooltip title={lang === 'en' ? 'Русский' : 'English'} arrow>
              <IconButton size="small" onClick={onToggleLang} aria-label="toggle language" sx={{ color: 'text.secondary' }}>
                <Typography sx={{ fontSize: 12, fontWeight: 600, letterSpacing: '.08em' }}>
                  {lang === 'en' ? 'RU' : 'EN'}
                </Typography>
              </IconButton>
            </Tooltip>
            <Tooltip title={mode === 'dark' ? 'Light' : 'Dark'} arrow>
              <IconButton size="small" onClick={onToggleTheme} aria-label="toggle theme" sx={{ color: 'text.secondary' }}>
                {mode === 'dark'
                  ? <Icon d="M12 3v2M12 19v2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M3 12h2M19 12h2M5.6 18.4 7 17M17 7l1.4-1.4">
                      <circle cx="12" cy="12" r="4" />
                    </Icon>
                  : <Icon d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
                }
              </IconButton>
            </Tooltip>
            {showApp && <OfflineBadge t={t} />}
            <Box sx={{ width: 1, height: 20, bgcolor: 'divider', mx: { xs: 0.5, sm: 1 } }} />
            {showApp ? (
              <Stack direction="row" alignItems="center" spacing={1.25}>
                <Link href="/notes" style={{ textDecoration: 'none' }}>
                  <Button variant="text" sx={{ textTransform: 'none', fontWeight: 600, borderRadius: 2, fontSize: 14, color: 'text.primary' }}>
                    {t.nTitle}
                  </Button>
                </Link>
                <Box sx={{ cursor: 'pointer' }} onClick={(e) => setAnchor(e.currentTarget)}>
                  <Avatar src={resolveAssetUrl(user?.avatar)} initials={initials} size={32} />
                </Box>
                <Menu anchorEl={anchor} open={!!anchor} onClose={() => setAnchor(null)}
                      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} transformOrigin={{ vertical: 'top', horizontal: 'right' }}>
                  <MenuItem onClick={() => setAnchor(null)} component={Link} href="/profile">{t.pNavAbout}</MenuItem>
                  <MenuItem onClick={onSignOut}>{t.signOut}</MenuItem>
                </Menu>
              </Stack>
            ) : (
              <Stack direction="row" alignItems="center" spacing={1}>
                <Link href="/login" style={{ textDecoration: 'none' }}>
                  <Button variant="text" sx={{ textTransform: 'none', fontWeight: 600, borderRadius: 2, fontSize: 14 }}>{t.signIn}</Button>
                </Link>
                <Link href="/signup" style={{ textDecoration: 'none' }}>
                  <Button variant="contained" disableElevation
                    sx={{ textTransform: 'none', fontWeight: 600, borderRadius: 2, px: 2.25, py: 0.9, fontSize: 14 }}>
                    {t.register}
                  </Button>
                </Link>
              </Stack>
            )}
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
