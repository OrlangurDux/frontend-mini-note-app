import { AppShell } from '../components/AppShell';
import { SignupSentScreen } from '../screens/SignupSentScreen';

export default function SignupSentPage() {
  return (
    <AppShell variant="public">
      {({ t }) => <SignupSentScreen t={t} />}
    </AppShell>
  );
}

// Force SSR (skip Automatic Static Optimization) — this app is entirely
// auth/client-state driven, and static prerendering of useRouter()-using
// components fails at build time without a mounted router.
export async function getServerSideProps() {
  return { props: {} };
}
