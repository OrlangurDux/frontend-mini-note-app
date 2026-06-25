import { ProtectedShell } from '../../components/ProtectedShell';
import { NotesScreen } from '../../screens/NotesScreen';

export default function NotesPage() {
  return (
    <ProtectedShell>
      {({ t, mode }) => <NotesScreen t={t} mode={mode} />}
    </ProtectedShell>
  );
}

// Force SSR (skip Automatic Static Optimization) — this app is entirely
// auth/client-state driven, and static prerendering of useRouter()-using
// components fails at build time without a mounted router.
export async function getServerSideProps() {
  return { props: {} };
}
