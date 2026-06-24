import { ENDPOINTS } from '../../config';
import { apiRequest } from '../apiClient';

export function login(email, password) {
  return apiRequest({
    ...ENDPOINTS.login,
    form: { email, password },
    auth: false,
  });
}

export function register(email, password) {
  return apiRequest({
    ...ENDPOINTS.register,
    form: { email, password },
    auth: false,
  });
}

export function checkEmail(email) {
  return apiRequest({
    ...ENDPOINTS.checkEmail,
    form: { email },
    auth: false,
  });
}

// Step 1 of password recovery: only `email` is sent, backend mails a
// restore_token to the user.
export function requestRestoreToken(email) {
  return apiRequest({
    ...ENDPOINTS.forgot,
    form: { email },
    auth: false,
  });
}

// Step 2: email + the restore_token the user received + the new password,
// all on the same /users/forgot endpoint.
export function resetPassword(email, restoreToken, password) {
  return apiRequest({
    ...ENDPOINTS.forgot,
    form: { email, restore_token: restoreToken, password },
    auth: false,
  });
}

export function changePassword(password) {
  return apiRequest({
    ...ENDPOINTS.changePassword,
    form: { password },
  });
}
