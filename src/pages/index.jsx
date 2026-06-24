import { AppShell } from '../components/AppShell';
import { LandingScreen } from '../screens/LandingScreen';

export default function IndexPage() {
  return (
    <AppShell variant="public" landing>
      {({ t, mode }) => <LandingScreen t={t} mode={mode} />}
    </AppShell>
  );
}
