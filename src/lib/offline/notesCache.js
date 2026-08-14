import { createEntityCache } from './entityCache';
import { tx, reqToPromise } from './db';

export const NotesCache = createEntityCache('notes', { searchFields: ['title', 'note'] });

// A category created offline gets remapped from its local:<uuid> id to a
// real server id once it syncs — any note referencing it locally needs to
// follow, or it'd silently point at a category that no longer resolves.
export async function remapCategoryRefs(oldCategoryId, newCategoryId) {
  return tx(['notes'], 'readwrite', async (s) => {
    const all = await reqToPromise(s.notes.getAll());
    for (const n of all) {
      if (n.category_id === oldCategoryId) {
        await reqToPromise(s.notes.put({ ...n, category_id: newCategoryId }));
      }
    }
  });
}
