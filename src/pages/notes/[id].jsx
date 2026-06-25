import { useRouter } from 'next/router';
import { ProtectedShell } from '../../components/ProtectedShell';
import { NoteDetailScreen } from '../../screens/NoteDetailScreen';

export default function NoteDetailPage() {
  const router = useRouter();
  const { id, edit } = router.query;

  return (
    <ProtectedShell>
      {({ t, mode }) => (id ? <NoteDetailScreen key={id} t={t} mode={mode} id={id} startEditing={edit === '1'} /> : null)}
    </ProtectedShell>
  );
}

// Force SSR (skip Automatic Static Optimization) — this app is entirely
// auth/client-state driven, and static prerendering of useRouter()-using
// components fails at build time without a mounted router.
export async function getServerSideProps() {
  return { props: {} };
}
