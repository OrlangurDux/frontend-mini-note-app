// src/components/profile/ProfileHeader.jsx — cover band + avatar + identity + actions + stats strip.
const { Box, Stack, Typography, Button, Chip, Divider } = window.MUI;

function StatCell({ value, label }) {
  return (
    <Stack alignItems="center" spacing={0.25} sx={{ px: { xs: 1, sm: 2 }, py: 0.5 }}>
      <Typography sx={{ fontFamily: 'JetBrains Mono, monospace', fontWeight: 600, fontSize: { xs: 18, sm: 20 } }}>{value}</Typography>
      <Typography variant="caption" color="text.secondary" sx={{ letterSpacing: '.02em' }}>{label}</Typography>
    </Stack>
  );
}

function ProfileHeader({ t, mode, editing, onToggleEdit }) {
  return (
    <Box sx={{
      borderRadius: 4, overflow: 'hidden', position: 'relative',
      border: 1, borderColor: 'divider',
      bgcolor: 'background.paper',
      boxShadow: mode === 'dark'
        ? '0 24px 60px rgba(0,0,0,.45), 0 1px 0 rgba(255,255,255,.05) inset'
        : '0 24px 60px rgba(15,23,42,.08), 0 1px 0 rgba(255,255,255,.8) inset',
    }}>
      <Box sx={{
        height: { xs: 120, sm: 160 },
        background: mode === 'dark'
          ? 'radial-gradient(700px 400px at 20% 100%, rgba(25,118,210,.6), transparent 60%), radial-gradient(500px 300px at 90% 0%, rgba(66,165,245,.45), transparent 65%), linear-gradient(135deg, #0b1f3a 0%, #143a73 100%)'
          : 'radial-gradient(700px 400px at 20% 100%, rgba(25,118,210,.45), transparent 60%), radial-gradient(500px 300px at 90% 0%, rgba(144,202,249,.7), transparent 65%), linear-gradient(135deg, #cfe2ff 0%, #e8f0ff 100%)',
        position: 'relative',
      }}>
        <Box aria-hidden sx={{
          position: 'absolute', inset: 0,
          backgroundImage: 'linear-gradient(rgba(255,255,255,.07) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.07) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          maskImage: 'radial-gradient(ellipse at center, #000 30%, transparent 80%)',
        }} />
      </Box>
      <Box sx={{ p: { xs: 2.5, sm: 4 }, pt: 0 }}>
        <Stack direction={{ xs: 'column', sm: 'row' }} alignItems={{ xs: 'flex-start', sm: 'flex-end' }}
               spacing={{ xs: 2, sm: 3 }} sx={{ mt: { xs: -6, sm: -8 } }}>
          <window.NimbusAvatar initials="M" size={104} ring editable />
          <Stack spacing={0.5} sx={{ flex: 1, pb: 0.5 }}>
            <Typography variant="h5" sx={{ fontWeight: 700 }}>{t.pSampleName}</Typography>
            <Stack direction="row" spacing={1} alignItems="center" sx={{ color: 'text.secondary', flexWrap: 'wrap' }}>
              <Typography variant="body2" sx={{ fontFamily: 'JetBrains Mono, monospace' }}>{t.pSampleHandle}</Typography>
              <Box sx={{ width: 3, height: 3, borderRadius: '50%', bgcolor: 'text.secondary' }} />
              <Typography variant="body2">{t.pSampleRole}</Typography>
              <Box sx={{ width: 3, height: 3, borderRadius: '50%', bgcolor: 'text.secondary' }} />
              <Typography variant="body2">{t.pSampleLoc}</Typography>
            </Stack>
            <Stack direction="row" spacing={0.75} sx={{ pt: 0.5 }}>
              <Chip size="small" label="Pro" sx={{ fontWeight: 600, bgcolor: 'primary.main', color: 'primary.contrastText' }} />
              <Chip size="small" label={t.pSamplePronouns} variant="outlined" />
              <Chip size="small" label="2FA" variant="outlined" sx={{ fontFamily: 'JetBrains Mono, monospace' }} />
            </Stack>
          </Stack>
          <Stack direction="row" spacing={1} sx={{ pb: 0.5 }}>
            <Button variant="outlined" sx={{ textTransform: 'none', borderRadius: 2 }}>{t.pShare}</Button>
            <Button variant="contained" disableElevation onClick={onToggleEdit}
                    sx={{ textTransform: 'none', borderRadius: 2 }}>
              {editing ? t.pCancel : t.pEdit}
            </Button>
          </Stack>
        </Stack>
        <Divider sx={{ my: 3 }} />
        <Stack direction="row" justifyContent="space-around" divider={<Divider orientation="vertical" flexItem />}>
          <StatCell value="1,284" label={t.pStatNotes} />
          <StatCell value="3,907" label={t.pStatLinks} />
          <StatCell value="42" label={t.pStatStreak} />
          <StatCell value="5" label={t.pStatTeam} />
        </Stack>
      </Box>
    </Box>
  );
}

window.ProfileHeader = ProfileHeader;
