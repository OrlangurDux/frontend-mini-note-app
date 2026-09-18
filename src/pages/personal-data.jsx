import { AppShell } from '../components/AppShell';
import { PersonalDataPolicyScreen } from '../screens/PersonalDataPolicyScreen';

export default function PersonalDataPage() {
  return (
    <AppShell variant="public" landing>
      {({ t, mode, lang }) => <PersonalDataPolicyScreen t={t} mode={mode} lang={lang} />}
    </AppShell>
  );
}

// Force SSR (skip Automatic Static Optimization) — this app is entirely
// auth/client-state driven, and static prerendering of useRouter()-using
// components fails at build time without a mounted router.
export async function getServerSideProps() {
  return { props: {} };
}
