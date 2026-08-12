// Minimal promisified IndexedDB wrapper — no external deps, same spirit as
// the hand-rolled localStorage guard in `lib/safeStorage.js`.
const DB_NAME = 'mininote';
const DB_VERSION = 1;
const STORES = ['notes', 'categories', 'mutations', 'meta'];

let dbPromise = null;

function hasIndexedDB() {
  return typeof indexedDB !== 'undefined';
}

function openDb() {
  if (!hasIndexedDB()) return Promise.resolve(null);
  if (dbPromise) return dbPromise;
  dbPromise = new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains('notes')) db.createObjectStore('notes', { keyPath: 'id' });
      if (!db.objectStoreNames.contains('categories')) db.createObjectStore('categories', { keyPath: 'id' });
      if (!db.objectStoreNames.contains('mutations')) db.createObjectStore('mutations', { keyPath: 'seq', autoIncrement: true });
      if (!db.objectStoreNames.contains('meta')) db.createObjectStore('meta', { keyPath: 'key' });
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
  return dbPromise;
}

export function reqToPromise(req) {
  return new Promise((resolve, reject) => {
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

// Runs `fn({ storeName: IDBObjectStore, ... })` inside a single transaction
// over `storeNames`. Requests issued from awaited calls inside `fn` keep
// the transaction alive (each await is a microtask, which resolves before
// the transaction auto-commits at the next task boundary) — the same
// pattern the `idb` package relies on, just without the dependency.
export async function tx(storeNames, mode, fn) {
  const db = await openDb();
  if (!db) return undefined; // no IndexedDB support (SSR, very old browser) — silently no-op
  const names = Array.isArray(storeNames) ? storeNames : [storeNames];
  return new Promise((resolve, reject) => {
    const t = db.transaction(names, mode);
    const stores = {};
    names.forEach((n) => { stores[n] = t.objectStore(n); });
    let result;
    let failed = false;
    Promise.resolve(fn(stores)).then((r) => { result = r; }).catch((e) => {
      failed = true;
      try { t.abort(); } catch (e2) { /* already aborted/finished */ }
      reject(e);
    });
    t.oncomplete = () => { if (!failed) resolve(result); };
    t.onerror = () => reject(t.error);
    t.onabort = () => { if (!failed) reject(t.error || new Error('IndexedDB transaction aborted')); };
  });
}

export function isSupported() {
  return hasIndexedDB();
}

export const STORE_NAMES = STORES;
