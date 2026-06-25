import { ProtectedShell } from '../components/ProtectedShell';
import { ProfileScreen } from '../screens/ProfileScreen';

export default function ProfilePage() {
  return (
    <ProtectedShell>
      {({ t, mode, lang, toggleMode, toggleLang }) => (
        <ProfileScreen t={t} mode={mode} lang={lang} onToggleMode={toggleMode} onToggleLang={toggleLang} />
      )}
    </ProtectedShell>
  );
}

// Force SSR (skip Automatic Static Optimization) — this app is entirely
// auth/client-state driven, and static prerendering of useRouter()-using
// components fails at build time without a mounted router.
export async function getServerSideProps() {
  return { props: {} };
}
