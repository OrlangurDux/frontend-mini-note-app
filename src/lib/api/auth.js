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

export function setTfa(status) {
  return apiRequest({
    ...ENDPOINTS.setTfa,
    form: { status },
  });
}

// `token` is the short-lived mfa access_token from /users/login, not a
// bearer session token — no Authorization header goes out with this call.
export function verifyOtp(token, code) {
  return apiRequest({
    ...ENDPOINTS.verifyOtp,
    form: { token, code },
    auth: false,
  });
}
