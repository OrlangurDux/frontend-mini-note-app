import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { AppShell } from './AppShell';
import { useRequireAuth } from '../contexts/AuthContext';

// Wraps AppShell for pages that require a logged-in session: blocks
// rendering until auth state has hydrated, then redirects (handled by
// useRequireAuth) or renders the page.
export function ProtectedShell({ inner = true, wide, children }) {
  const { ready, isAuthenticated } = useRequireAuth();

  if (!ready || !isAuthenticated) {
    return (
      <Box sx={{ minHeight: '100vh', display: 'grid', placeItems: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <AppShell variant="app" inner={inner} wide={wide}>
      {children}
    </AppShell>
  );
}
