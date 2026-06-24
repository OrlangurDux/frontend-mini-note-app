import { AppShell } from '../components/AppShell';
import { ForgotEmailScreen } from '../screens/ForgotEmailScreen';

export default function ForgotPage() {
  return (
    <AppShell variant="public">
      {({ t }) => <ForgotEmailScreen t={t} />}
    </AppShell>
  );
}
