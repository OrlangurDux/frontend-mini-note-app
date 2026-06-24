import { AppShell } from '../components/AppShell';
import { ForgotDoneScreen } from '../screens/ForgotDoneScreen';

export default function ForgotDonePage() {
  return (
    <AppShell variant="public">
      {({ t }) => <ForgotDoneScreen t={t} />}
    </AppShell>
  );
}
