import { ProtectedShell } from '../components/ProtectedShell';
import { CategoriesScreen } from '../screens/CategoriesScreen';

export default function CategoriesPage() {
  return (
    <ProtectedShell>
      {({ t, mode }) => <CategoriesScreen t={t} mode={mode} />}
    </ProtectedShell>
  );
}
