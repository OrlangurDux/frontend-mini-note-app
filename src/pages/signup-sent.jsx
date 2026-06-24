import { AppShell } from '../components/AppShell';
import { SignupSentScreen } from '../screens/SignupSentScreen';

export default function SignupSentPage() {
  return (
    <AppShell variant="public">
      {({ t }) => <SignupSentScreen t={t} />}
    </AppShell>
  );
}
