import { ProtectedShell } from '../../components/ProtectedShell';
import { NotesScreen } from '../../screens/NotesScreen';

export default function NotesPage() {
  return (
    <ProtectedShell>
      {({ t, mode }) => <NotesScreen t={t} mode={mode} />}
    </ProtectedShell>
  );
}
