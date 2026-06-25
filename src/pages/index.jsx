import { AppShell } from '../components/AppShell';
import { LandingScreen } from '../screens/LandingScreen';

export default function IndexPage() {
  return (
    <AppShell variant="public" landing>
      {({ t, mode }) => <LandingScreen t={t} mode={mode} />}
    </AppShell>
  );
}

// Force SSR (skip Automatic Static Optimization) — this app is entirely
// auth/client-state driven, and static prerendering of useRouter()-using
// components fails at build time without a mounted router.
export async function getServerSideProps() {
  return { props: {} };
}
