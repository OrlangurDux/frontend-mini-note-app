// Shared cache logic for `notes` and `categories` — same shape, same
// write-through/dirty/tombstone rules, just different stores & search
// fields. See notesCache.js / categoriesCache.js for the instances.
import { tx, reqToPromise } from './db';

export function createEntityCache(storeName, { searchFields = [] } = {}) {
  async function listAll({ includeDeleted = false } = {}) {
    const all = await tx([storeName], 'readonly', (s) => reqToPromise(s[storeName].getAll())) || [];
    return includeDeleted ? all : all.filter((r) => !r._deleted);
  }

  async function getOne(id) {
    return tx([storeName], 'readonly', (s) => reqToPromise(s[storeName].get(id)));
  }

  async function putOne(record) {
    await tx([storeName], 'readwrite', (s) => reqToPromise(s[storeName].put(record)));
    return record;
  }

  async function removeOne(id) {
    return tx([storeName], 'readwrite', (s) => reqToPromise(s[storeName].delete(id)));
  }

  // Write-through from a successful network response. Never overwrites a
  // record that has an unsynced local change (`_dirty`) or is queued for
  // deletion (`_deleted`) — the mutation queue is the source of truth for
  // those until it drains.
  async function mergeFromServer(records) {
    return tx([storeName], 'readwrite', async (s) => {
      for (const r of records) {
        const existing = await reqToPromise(s[storeName].get(r.id));
        if (existing && (existing._dirty || existing._deleted)) continue;
        await reqToPromise(s[storeName].put(r));
      }
    });
  }

  async function search(q) {
    const needle = (q || '').trim().toLowerCase();
    const all = await listAll();
    if (!needle) return all;
    return all.filter((r) => searchFields.some((f) => String(r[f] || '').toLowerCase().includes(needle)));
  }

  return { listAll, getOne, putOne, removeOne, mergeFromServer, search };
}
