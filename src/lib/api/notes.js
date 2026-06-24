import { ENDPOINTS } from '../../config';
import { apiRequest } from '../apiClient';

export function listNotes({ page, perPage }) {
  return apiRequest({
    ...ENDPOINTS.notesList,
    query: { page, per_page: perPage },
  });
}

export function searchNotes(q) {
  return apiRequest({
    ...ENDPOINTS.notesSearch,
    query: { q },
  });
}

export function getNote(id) {
  return apiRequest({ ...ENDPOINTS.noteGet, pathParams: { id } });
}

export function createNote({ title, note, categoryId, status }) {
  return apiRequest({
    ...ENDPOINTS.notesCreate,
    form: { title, note, category_id: categoryId, status },
  });
}

// NB: the backend's PUT /notes/{id} only accepts title/note/status —
// category_id can only be set at creation time per the Swagger spec.
export function updateNote(id, { title, note, status }) {
  return apiRequest({
    ...ENDPOINTS.noteUpdate,
    pathParams: { id },
    form: { title, note, status },
  });
}

export function deleteNote(id) {
  return apiRequest({ ...ENDPOINTS.noteDelete, pathParams: { id } });
}
