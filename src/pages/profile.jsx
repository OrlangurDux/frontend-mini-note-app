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
