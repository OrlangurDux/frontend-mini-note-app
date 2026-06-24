// src/screens/ProfileScreen.jsx — inner profile page: header card + sidebar + sections.
const { Box, Container, Grid, Stack, Snackbar, Alert } = window.MUI;

function ProfileScreen({ t, mode, lang, onToggleMode, onToggleLang }) {
  const [active, setActive] = React.useState('about');
  const [editing, setEditing] = React.useState(false);
  const [toast, setToast] = React.useState(false);

  const navigate = (id) => {
    setActive(id);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Highlight the section closest to the top of the viewport.
  React.useEffect(() => {
    const onScroll = () => {
      const ids = (window.ProfileSidebarItems || []).map(i => i.id);
      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top;
        if (top - 120 <= 0) current = id;
      }
      setActive(current);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const onToggleEdit = () => {
    if (editing) setToast(true);
    setEditing(e => !e);
  };

  return (
    <Box sx={{
      flex: 1, position: 'relative',
      bgcolor: 'background.default',
      backgroundImage: mode === 'dark'
        ? 'radial-gradient(1000px 600px at 90% 0%, rgba(25,118,210,.10), transparent 60%)'
        : 'radial-gradient(1000px 600px at 90% 0%, rgba(144,202,249,.18), transparent 60%)',
    }} data-screen-label="09 Profile">
      <Container maxWidth="lg" sx={{ py: { xs: 3, sm: 5 } }}>
        <Stack spacing={3}>
          <window.ProfileHeader t={t} mode={mode} editing={editing} onToggleEdit={onToggleEdit} />
          <Grid container spacing={3}>
            <Grid item xs={12} md={3}>
              <window.ProfileSidebar t={t} active={active} onNavigate={navigate} />
            </Grid>
            <Grid item xs={12} md={9}>
              <window.ProfileSections t={t} lang={lang} mode={mode} editing={editing}
                                      onToggleLang={onToggleLang} onToggleMode={onToggleMode} />
            </Grid>
          </Grid>
        </Stack>
      </Container>
      <Snackbar open={toast} autoHideDuration={2200} onClose={() => setToast(false)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert severity="success" variant="filled" sx={{ borderRadius: 2 }}>{t.pSavedToast}</Alert>
      </Snackbar>
    </Box>
  );
}

window.ProfileScreen = ProfileScreen;
