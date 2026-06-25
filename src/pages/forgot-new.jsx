import { AppShell } from '../components/AppShell';
import { ForgotNewPassScreen } from '../screens/ForgotNewPassScreen';

export default function ForgotNewPage() {
  return (
    <AppShell variant="public">
      {({ t }) => <ForgotNewPassScreen t={t} />}
    </AppShell>
  );
}

// Force SSR (skip Automatic Static Optimization) — this app is entirely
// auth/client-state driven, and static prerendering of useRouter()-using
// components fails at build time without a mounted router.
export async function getServerSideProps() {
  return { props: {} };
}
