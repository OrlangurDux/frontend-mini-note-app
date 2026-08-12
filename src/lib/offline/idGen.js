// Ids for entities created while offline. Prefixed so they're trivially
// distinguishable from real backend ids (Mongo ObjectIds) everywhere —
// the sync engine looks for this prefix to know a create is still pending.
const LOCAL_PREFIX = 'local:';
let counter = 0;

export function newLocalId() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) return LOCAL_PREFIX + crypto.randomUUID();
  counter += 1;
  return LOCAL_PREFIX + Date.now().toString(36) + '-' + counter.toString(36) + '-' + Math.random().toString(36).slice(2, 10);
}

export function isLocalId(id) {
  return typeof id === 'string' && id.startsWith(LOCAL_PREFIX);
}
