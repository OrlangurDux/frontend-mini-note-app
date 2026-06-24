// Local-only mock for note tags. The backend Note model has no `tags`
// field yet (tracked for a future API addition); until then tags are kept
// per-noteId in localStorage and merged onto notes fetched from the API.
import { STORAGE_KEYS } from '../config';
import { getJSON, setJSON } from './safeStorage';

export const SUGGESTED_TAGS = ['research', 'product', 'engineering', 'design', 'meeting', 'personal', 'reading', 'idea'];

function loadMap() {
  return getJSON(STORAGE_KEYS.noteTags, {});
}

function saveMap(map) {
  setJSON(STORAGE_KEYS.noteTags, map);
}

export const NoteTags = {
  get(noteId) {
    return loadMap()[noteId] || [];
  },
  set(noteId, tags) {
    const map = loadMap();
    map[noteId] = tags;
    saveMap(map);
  },
  remove(noteId) {
    const map = loadMap();
    delete map[noteId];
    saveMap(map);
  },
  allTags() {
    const map = loadMap();
    const set = new Set(SUGGESTED_TAGS);
    Object.values(map).forEach((tags) => tags.forEach((t) => set.add(t)));
    return Array.from(set);
  },
};
