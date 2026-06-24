import { ENDPOINTS } from '../../config';
import { apiRequest } from '../apiClient';

export function listCategories() {
  return apiRequest(ENDPOINTS.categoriesList);
}

export function getCategory(id) {
  return apiRequest({ ...ENDPOINTS.categoryGet, pathParams: { id } });
}

export function createCategory({ name, parentId, sort }) {
  return apiRequest({
    ...ENDPOINTS.categoriesCreate,
    form: { name, parent_id: parentId, sort },
  });
}

export function updateCategory(id, { name, parentId, sort }) {
  return apiRequest({
    ...ENDPOINTS.categoryUpdate,
    pathParams: { id },
    form: { name, parent_id: parentId, sort },
  });
}

export function deleteCategory(id) {
  return apiRequest({ ...ENDPOINTS.categoryDelete, pathParams: { id } });
}
