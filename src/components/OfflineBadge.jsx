import Chip from '@mui/material/Chip';
import Tooltip from '@mui/material/Tooltip';
import CircularProgress from '@mui/material/CircularProgress';
import { useNetwork } from '../contexts/NetworkContext';

export function OfflineBadge({ t }) {
  const net = useNetwork();
  if (!net) return null;
  const { isOnline, syncing, pendingCount } = net;

  if (!isOnline) {
    const label = pendingCount > 0 ? t.offlineBadge + ' · ' + pendingCount : t.offlineBadge;
    return (
      <Tooltip title={t.offlineTooltip} arrow>
        <Chip size="small" label={label} color="warning" variant="filled"
              sx={{ fontWeight: 600, fontSize: 12 }} />
      </Tooltip>
    );
  }

  if (syncing) {
    return (
      <Tooltip title={t.syncingTooltip} arrow>
        <Chip size="small" label={t.syncingBadge} variant="outlined" color="info"
              icon={<CircularProgress size={12} sx={{ ml: 1 }} />}
              sx={{ fontWeight: 600, fontSize: 12 }} />
      </Tooltip>
    );
  }

  return null;
}
