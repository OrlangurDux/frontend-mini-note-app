// Multi-backend domain management. Persisted in the browser so the same
// frontend build can target several Mini Note API instances; the active
// domain is read by apiClient on every request (not cached at import time).
import { DEFAULT_API_BASE_URL, STORAGE_KEYS } from '../config';
import { getItem, getJSON, setItem, setJSON } from './safeStorage';

function seedIfEmpty() {
  const list = getJSON(STORAGE_KEYS.domains, null);
  if (Array.isArray(list) && list.length) return list;
  const seeded = [{ id: 'default', label: 'Default', baseUrl: DEFAULT_API_BASE_URL }];
  setJSON(STORAGE_KEYS.domains, seeded);
  setItem(STORAGE_KEYS.activeDomainId, 'default');
  return seeded;
}

export const Domains = {
  list() {
    return seedIfEmpty();
  },

  getActiveId() {
    const list = seedIfEmpty();
    const id = getItem(STORAGE_KEYS.activeDomainId, list[0].id);
    return list.some((d) => d.id === id) ? id : list[0].id;
  },

  getActive() {
    const list = seedIfEmpty();
    const id = Domains.getActiveId();
    return list.find((d) => d.id === id) || list[0];
  },

  setActiveId(id) {
    setItem(STORAGE_KEYS.activeDomainId, id);
  },

  add({ label, baseUrl }) {
    const list = seedIfEmpty();
    const id = 'd' + Math.random().toString(36).slice(2, 9);
    const next = list.concat([{ id, label: label || baseUrl, baseUrl }]);
    setJSON(STORAGE_KEYS.domains, next);
    return id;
  },

  remove(id) {
    const list = seedIfEmpty().filter((d) => d.id !== id);
    const safe = list.length ? list : [{ id: 'default', label: 'Default', baseUrl: DEFAULT_API_BASE_URL }];
    setJSON(STORAGE_KEYS.domains, safe);
    if (Domains.getActiveId() === id) Domains.setActiveId(safe[0].id);
  },
};
