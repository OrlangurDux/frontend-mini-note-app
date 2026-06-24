import { AppShell } from '../components/AppShell';
import { ForgotNewPassScreen } from '../screens/ForgotNewPassScreen';

export default function ForgotNewPage() {
  return (
    <AppShell variant="public">
      {({ t }) => <ForgotNewPassScreen t={t} />}
    </AppShell>
  );
}
