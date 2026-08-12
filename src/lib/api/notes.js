// Offline-aware facade over notesRemote.js — same function signatures the
// screens already call, but every read falls back to the IndexedDB cache
// and every write falls back to an optimistic local record + a queued
// mutation when the network is unreachable. See lib/offline/syncManager.js
// for how the queue gets replayed once connectivity returns.
import * as remote from './notesRemote';
import { NotesCache, remapCategoryRefs } from '../offline/notesCache';
import { enqueueMutation } from '../offline/mutationQueue';
import { newLocalId, isLocalId } from '../offline/idGen';
import { withOfflineFallback, resolveRedirectedId } from '../offline/offlineApi';

function nowIso() { return new Date().toISOString(); }

async function resolveId(id) {
  return resolveRedirectedId(NotesCache, id);
}

export async function listNotes({ page, perPage }) {
  return withOfflineFallback(
    () => remote.listNotes({ page, perPage }).then((res) => {
      NotesCache.mergeFromServer(res?.data?.items || []);
      return res;
    }),
    async () => {
      const items = await NotesCache.listAll();
      items.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
      const start = (page - 1) * perPage;
      return { success: true, status: 200, data: { items: items.slice(start, start + perPage), total: items.length } };
    },
  );
}

export async function searchNotes(q) {
  return withOfflineFallback(
    () => remote.searchNotes(q).then((res) => {
      const list = Array.isArray(res?.data) ? res.data : res?.data?.items || [];
      NotesCache.mergeFromServer(list);
      return res;
    }),
    async () => ({ success: true, status: 200, data: await NotesCache.search(q) }),
  );
}

export async function getNote(rawId) {
  const id = await resolveId(rawId);
  return withOfflineFallback(
    () => remote.getNote(id).then((res) => {
      if (res?.data) NotesCache.mergeFromServer([res.data]);
      return res;
    }),
    async () => {
      const cached = await NotesCache.getOne(id);
      if (!cached) throw new Error('Not found offline');
      return { success: true, status: 200, data: cached };
    },
  );
}

export async function createNote({ title, note, categoryId, status }) {
  return withOfflineFallback(
    () => remote.createNote({ title, note, categoryId, status }).then((res) => {
      if (res?.data) NotesCache.putOne({ ...res.data, _dirty: false, _deleted: false });
      return res;
    }),
    async () => {
      const id = newLocalId();
      const record = {
        id, title, note, category_id: categoryId || '', status,
        created_at: nowIso(), updated_at: nowIso(),
        _dirty: true, _deleted: false,
      };
      await NotesCache.putOne(record);
      await enqueueMutation('note', 'create', id, { title, note, categoryId, status });
      return { success: true, status: 200, data: record };
    },
  );
}

export async function updateNote(rawId, { title, note, categoryId, status }) {
  const id = await resolveId(rawId);
  return withOfflineFallback(
    () => remote.updateNote(id, { title, note, categoryId, status }).then(async (res) => {
      // The backend's PUT response `data` is just a status string ("Note ID:
      // ... updated"), not the note — spreading it would scatter its
      // characters across the record as numeric keys. Only merge it in if
      // it's ever actually an object, and start from the existing cached
      // record so fields the response doesn't carry (e.g. created_at)
      // survive the write instead of disappearing.
      const existing = await NotesCache.getOne(id);
      const serverData = res?.data && typeof res.data === 'object' ? res.data : {};
      NotesCache.putOne({
        ...(existing || {}),
        id, title, note, category_id: categoryId || '', status,
        updated_at: nowIso(), _dirty: false, _deleted: false,
        ...serverData,
      });
      return res;
    }),
    async () => {
      const existing = await NotesCache.getOne(id);
      const record = {
        ...(existing || { id, created_at: nowIso() }),
        id, title, note, category_id: categoryId || '', status,
        updated_at: nowIso(), _dirty: true, _deleted: false,
      };
      await NotesCache.putOne(record);
      await enqueueMutation('note', 'update', id, { title, note, categoryId, status });
      return { success: true, status: 200, data: record };
    },
  );
}

export async function deleteNote(rawId) {
  const id = await resolveId(rawId);
  return withOfflineFallback(
    () => remote.deleteNote(id).then((res) => {
      NotesCache.removeOne(id);
      return res;
    }),
    async () => {
      if (isLocalId(id)) {
        await NotesCache.removeOne(id);
      } else {
        const existing = await NotesCache.getOne(id);
        await NotesCache.putOne({ ...(existing || { id }), _deleted: true, _dirty: true });
      }
      await enqueueMutation('note', 'delete', id, null);
      return { success: true, status: 200, data: null };
    },
  );
}

export { remapCategoryRefs };
