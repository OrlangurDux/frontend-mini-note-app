import { AppShell } from '../components/AppShell';
import { ForgotCodeScreen } from '../screens/ForgotCodeScreen';

export default function ForgotCodePage() {
  return (
    <AppShell variant="public">
      {({ t }) => <ForgotCodeScreen t={t} />}
    </AppShell>
  );
}

// Force SSR (skip Automatic Static Optimization) — this app is entirely
// auth/client-state driven, and static prerendering of useRouter()-using
// components fails at build time without a mounted router.
export async function getServerSideProps() {
  return { props: {} };
}
