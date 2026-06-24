import { AppShell } from '../components/AppShell';
import { LoginScreen } from '../screens/LoginScreen';

export default function LoginPage() {
  return (
    <AppShell variant="public">
      {({ t }) => <LoginScreen t={t} />}
    </AppShell>
  );
}
