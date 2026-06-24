import { AppShell } from '../components/AppShell';
import { SignupScreen } from '../screens/SignupScreen';

export default function SignupPage() {
  return (
    <AppShell variant="public">
      {({ t }) => <SignupScreen t={t} />}
    </AppShell>
  );
}
