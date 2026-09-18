import { AppShell } from '../components/AppShell';
import { PrivacyPolicyScreen } from '../screens/PrivacyPolicyScreen';

export default function PrivacyPage() {
  return (
    <AppShell variant="public" landing>
      {({ t, mode, lang }) => <PrivacyPolicyScreen t={t} mode={mode} lang={lang} />}
    </AppShell>
  );
}

// Force SSR (skip Automatic Static Optimization) — this app is entirely
// auth/client-state driven, and static prerendering of useRouter()-using
// components fails at build time without a mounted router.
export async function getServerSideProps() {
  return { props: {} };
}
