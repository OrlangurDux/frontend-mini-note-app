import { ENDPOINTS } from '../../config';
import { apiRequest } from '../apiClient';

export function getProfile() {
  return apiRequest(ENDPOINTS.profile);
}

// `avatar` is an optional File; multipart is required because of it.
export function updateProfile({ name, avatar }) {
  return apiRequest({
    ...ENDPOINTS.updateProfile,
    form: { name, avatar },
    multipart: true,
  });
}

export function deleteProfile() {
  return apiRequest(ENDPOINTS.deleteProfile);
}
