import { AppShell } from '../components/AppShell';
import { ForgotCodeScreen } from '../screens/ForgotCodeScreen';

export default function ForgotCodePage() {
  return (
    <AppShell variant="public">
      {({ t }) => <ForgotCodeScreen t={t} />}
    </AppShell>
  );
}
