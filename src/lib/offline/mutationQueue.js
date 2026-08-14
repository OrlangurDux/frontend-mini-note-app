// Ordered log of writes made while offline, replayed against the real API
// once connectivity returns. Collapsing happens at enqueue time so the
// queue never accumulates redundant work (e.g. an offline note that gets
// edited five times only ever ships its latest payload).
import { tx, reqToPromise } from './db';

async function forId(store, entity, id) {
  const all = await reqToPromise(store.getAll());
  return all.filter((m) => m.entity === entity && m.id === id);
}

export async function enqueueMutation(entity, op, id, payload) {
  return tx(['mutations'], 'readwrite', async (stores) => {
    const store = stores.mutations;
    const existing = await forId(store, entity, id);

    if (op === 'favorite') {
      // Independent of create/update/delete — a toggle just flips a flag,
      // so two queued toggles for the same id cancel out to nothing rather
      // than replaying twice.
      const pending = existing.find((m) => m.op === 'favorite');
      if (pending) {
        await reqToPromise(store.delete(pending.seq));
        return null;
      }
      const rec = { entity, op: 'favorite', id, payload: null, createdAt: Date.now() };
      const seq = await reqToPromise(store.add(rec));
      return { ...rec, seq };
    }

    if (op === 'delete') {
      for (const m of existing) await reqToPromise(store.delete(m.seq));
      // Never made it to the server (still a local-only create) — nothing to send.
      if (existing.some((m) => m.op === 'create')) return null;
      const rec = { entity, op: 'delete', id, payload: null, createdAt: Date.now() };
      const seq = await reqToPromise(store.add(rec));
      return { ...rec, seq };
    }

    if (op === 'update') {
      const pendingCreate = existing.find((m) => m.op === 'create');
      if (pendingCreate) {
        const merged = { ...pendingCreate, payload: { ...pendingCreate.payload, ...payload } };
        await reqToPromise(store.put(merged));
        return merged;
      }
      const pendingUpdate = existing.find((m) => m.op === 'update');
      if (pendingUpdate) {
        const merged = { ...pendingUpdate, payload: { ...pendingUpdate.payload, ...payload }, createdAt: Date.now() };
        await reqToPromise(store.put(merged));
        return merged;
      }
      const rec = { entity, op: 'update', id, payload, createdAt: Date.now() };
      const seq = await reqToPromise(store.add(rec));
      return { ...rec, seq };
    }

    // create
    const rec = { entity, op: 'create', id, payload, createdAt: Date.now() };
    const seq = await reqToPromise(store.add(rec));
    return { ...rec, seq };
  });
}

export async function listMutationsOrdered() {
  const all = await tx(['mutations'], 'readonly', (s) => reqToPromise(s.mutations.getAll())) || [];
  return all.slice().sort((a, b) => a.seq - b.seq);
}

export async function countMutations() {
  return (await listMutationsOrdered()).length;
}

export async function removeMutation(seq) {
  return tx(['mutations'], 'readwrite', (s) => reqToPromise(s.mutations.delete(seq)));
}

// Called once a queued `create` gets a real server id — every later queued
// op that still points at the local id needs to follow it.
export async function remapMutationId(entity, oldId, newId) {
  return tx(['mutations'], 'readwrite', async (stores) => {
    const store = stores.mutations;
    const all = await reqToPromise(store.getAll());
    for (const m of all) {
      if (m.entity === entity && m.id === oldId) {
        await reqToPromise(store.put({ ...m, id: newId }));
      }
    }
  });
}
