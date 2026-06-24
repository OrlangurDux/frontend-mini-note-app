import { useRouter } from 'next/router';
import { ProtectedShell } from '../../components/ProtectedShell';
import { NoteDetailScreen } from '../../screens/NoteDetailScreen';

export default function NoteDetailPage() {
  const router = useRouter();
  const { id, edit } = router.query;

  return (
    <ProtectedShell>
      {({ t, mode }) => (id ? <NoteDetailScreen t={t} mode={mode} id={id} startEditing={edit === '1'} /> : null)}
    </ProtectedShell>
  );
}
