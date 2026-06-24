// src/components/profile/ProfileSidebar.jsx — sticky vertical nav with anchor scroll.
const { Box, Stack, Typography } = window.MUI;

const ITEMS = [
  { id: 'about',    key: 'pNavProfile',       d: 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM4 21a8 8 0 0 1 16 0' },
  { id: 'contact',  key: 'pNavAccount',       d: 'M3 6h18v12H3zM3 6l9 7 9-7' },
  { id: 'prefs',    key: 'pNavNotifications', d: 'M6 8a6 6 0 1 1 12 0c0 7 3 7 3 9H3c0-2 3-2 3-9ZM10 20a2 2 0 0 0 4 0' },
  { id: 'security', key: 'pNavSecurity',      d: 'M12 3 4 6v6c0 5 3.5 8.5 8 9 4.5-.5 8-4 8-9V6l-8-3Z' },
  { id: 'billing',  key: 'pNavBilling',       d: 'M3 7h18v10H3zM3 11h18M7 15h4' },
  { id: 'apps',     key: 'pNavApps',          d: 'M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z' },
  { id: 'sessions', key: 'pNavSessions',      d: 'M4 5h16v10H4zM2 19h20M9 19v-4M15 19v-4' },
  { id: 'danger',   key: 'pNavDanger',        d: 'M12 3 2 21h20L12 3ZM12 10v5M12 17v.5' },
];

function ProfileSidebar({ t, active, onNavigate }) {
  return (
    <Box component="nav" sx={{
      position: { md: 'sticky' }, top: { md: 88 },
      borderRadius: 3, p: 1, border: 1, borderColor: 'divider',
      bgcolor: 'background.paper',
      boxShadow: '0 6px 20px rgba(15,23,42,.04)',
    }}>
      <Stack spacing={0.25}>
        {ITEMS.map((it) => {
          const isActive = active === it.id;
          const danger = it.id === 'danger';
          return (
            <Box key={it.id} component="a" href={'#' + it.id}
                 onClick={(e) => { e.preventDefault(); onNavigate(it.id); }}
                 sx={{
                   display: 'flex', alignItems: 'center', gap: 1.25,
                   px: 1.25, py: 1, borderRadius: 2,
                   textDecoration: 'none', cursor: 'pointer',
                   color: danger ? 'error.main' : (isActive ? 'primary.main' : 'text.primary'),
                   bgcolor: isActive ? (danger ? 'rgba(239,68,68,.08)' : 'rgba(25,118,210,.08)') : 'transparent',
                   fontWeight: isActive ? 600 : 500,
                   transition: 'background-color .15s, color .15s',
                   '&:hover': { bgcolor: danger ? 'rgba(239,68,68,.06)' : 'action.hover' },
                 }}>
              <window.Icon d={it.d} size={18} sw={1.7} />
              <Typography sx={{ fontSize: 14, fontWeight: 'inherit', color: 'inherit' }}>{t[it.key]}</Typography>
            </Box>
          );
        })}
      </Stack>
    </Box>
  );
}

window.ProfileSidebar = ProfileSidebar;
window.ProfileSidebarItems = ITEMS;
