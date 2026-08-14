// Drains the mutation queue against the real API once connectivity is
// back, and does the initial full-cache warm-up so offline search/browse
// has something to work with. Talks to notesRemote/categoriesRemote
// directly (never the offline-aware lib/api/notes|categories.js) to avoid
// re-queuing its own replayed writes.
import * as notesRemote from '../api/notesRemote';
import * as categoriesRemote from '../api/categoriesRemote';
import { NotesCache, remapCategoryRefs } from './notesCache';
import { CategoriesCache } from './categoriesCache';
import { listMutationsOrdered, removeMutation, remapMutationId, remapMutationForeignKey } from './mutationQueue';
import { isNetworkError } from './offlineApi';

const listeners = new Set();
function emit(event) {
  listeners.forEach((fn) => {
    try { fn(event); } catch (e) { /* a bad listener shouldn't break sync */ }
  });
}
export function subscribeSync(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

let draining = false;
export function isSyncing() { return draining; }

async function replay(m) {
  if (m.entity === 'note') {
    if (m.op === 'create') return notesRemote.createNote(m.payload);
    if (m.op === 'update') return notesRemote.updateNote(m.id, m.payload);
    if (m.op === 'favorite') return notesRemote.toggleFavorite(m.id);
    return notesRemote.deleteNote(m.id);
  }
  if (m.op === 'create') return categoriesRemote.createCategory(m.payload);
  if (m.op === 'update') return categoriesRemote.updateCategory(m.id, m.payload);
  return categoriesRemote.deleteCategory(m.id);
}

async function afterCreateSuccess(m, res) {
  const newId = res?.data?.id;
  if (!newId) return;
  const cache = m.entity === 'note' ? NotesCache : CategoriesCache;
  await cache.putOne({ ...res.data, _dirty: false, _deleted: false });
  // Leave a redirect stub at the old local:<uuid> key instead of just
  // removing it — the UI may still be sitting on a /notes/local:<uuid>
  // URL (opened right after offline creation) when this sync runs in the
  // background, and would otherwise fire the next read/write against an
  // id the server never heard of. resolveRedirectedId() in offlineApi.js
  // follows this before every getNote/updateNote/deleteNote call.
  await cache.putOne({ id: m.id, _deleted: true, _redirectTo: newId });
  await remapMutationId(m.entity, m.id, newId);
  if (m.entity === 'category') {
    await remapMutationForeignKey('note', 'categoryId', m.id, newId);
    await remapCategoryRefs(m.id, newId);
  }
}

async function afterUpdateSuccess(m, res) {
  const cache = m.entity === 'note' ? NotesCache : CategoriesCache;
  const existing = await cache.getOne(m.id);
  // PUT responses on this backend are sometimes just a status string, not
  // the record — never spread that blindly (see notes.js updateNote).
  const serverData = res?.data && typeof res.data === 'object' ? res.data : {};
  await cache.putOne({ ...(existing || {}), ...serverData, id: m.id, _dirty: false, _deleted: false });
}

async function afterDeleteSuccess(m) {
  const cache = m.entity === 'note' ? NotesCache : CategoriesCache;
  await cache.removeOne(m.id);
}

// The `favorite` flag was already flipped optimistically in the cache when
// the toggle was queued — nothing to merge back, just clear `_dirty` now
// that the server agrees.
async function afterFavoriteSuccess(m) {
  const existing = await NotesCache.getOne(m.id);
  if (existing) await NotesCache.putOne({ ...existing, _dirty: false });
}

export async function drainQueue() {
  if (draining) return;
  draining = true;
  emit({ type: 'start' });
  try {
    for (;;) {
      const queue = await listMutationsOrdered();
      if (queue.length === 0) break;
      const m = queue[0];
      try {
        const res = await replay(m);
        if (m.op === 'create') await afterCreateSuccess(m, res);
        else if (m.op === 'update') await afterUpdateSuccess(m, res);
        else if (m.op === 'favorite') await afterFavoriteSuccess(m);
        else await afterDeleteSuccess(m);
        await removeMutation(m.seq);
        emit({ type: 'progress', remaining: queue.length - 1 });
      } catch (err) {
        if (isNetworkError(err)) {
          emit({ type: 'paused' });
          return; // offline again — leave the rest queued for next reconnect
        }
        // Genuine server-side rejection (validation error, already-deleted
        // record, etc.) — drop it so it doesn't block the rest of the
        // queue forever, and surface it instead of failing silently.
        await removeMutation(m.seq);
        emit({ type: 'item-failed', mutation: m, message: err.message });
      }
    }
    await fullResync();
    emit({ type: 'done' });
  } finally {
    draining = false;
  }
}

async function fetchAllNotes() {
  const perPage = 200;
  let page = 1;
  let all = [];
  for (;;) {
    const res = await notesRemote.listNotes({ page, perPage });
    const items = res?.data?.items || [];
    all = all.concat(items);
    const total = res?.data?.total ?? all.length;
    if (items.length < perPage || all.length >= total) break;
    page += 1;
  }
  return all;
}

async function fullResync() {
  try {
    const [notes, catsRes] = await Promise.all([fetchAllNotes(), categoriesRemote.listCategories()]);
    await NotesCache.mergeFromServer(notes);
    await CategoriesCache.mergeFromServer(catsRes?.data?.items || []);
  } catch (e) {
    // best-effort refresh — the queue itself is already empty at this point
  }
}

// Called once on login / app mount while online, so offline search and
// browsing have the full dataset to work with, not just whatever page was
// last viewed.
export async function warmCache() {
  if (typeof navigator !== 'undefined' && navigator.onLine === false) return;
  await fullResync();
}
