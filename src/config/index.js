// Central configuration: API endpoints, defaults, feature flags.
// NEXT_PUBLIC_* vars are inlined at build time by Next.js, so they only
// act as the seed/fallback domain — the user-selected domain (see
// lib/domains.js) takes priority once one has been chosen in the browser.

export const DEFAULT_API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:9077/api/v1';

// 'simple'    — register -> auto-login -> redirect to /notes
// 'mock-code' — register -> signup-sent -> mocked confirmation code (no
//               backend call) -> auto-login -> redirect to /notes
export const SIGNUP_CONFIRMATION_MODE =
  process.env.NEXT_PUBLIC_SIGNUP_CONFIRMATION_MODE || 'simple';

export const PAGINATION_DEFAULTS = {
  page: 1,
  perPage: 12,
};

export const NOTE_STATUSES = ['draft', 'public', 'archive'];

export const STORAGE_KEYS = {
  authToken: 'nimbus:auth:token',
  authExpiresAt: 'nimbus:auth:expiresAt',
  domains: 'nimbus:domains',
  activeDomainId: 'nimbus:domains:active',
  noteTags: 'nimbus:noteTags', // local-only mock, not synced to backend
  pref: (key) => 'nimbus:pref:' + key,
};

// Swagger: Mini Note RESTful API v0.1.2, basePath /api/v1
export const ENDPOINTS = {
  version: { method: 'GET', path: '/version' },

  register: { method: 'POST', path: '/users/register' },
  login: { method: 'POST', path: '/users/login' },
  checkEmail: { method: 'POST', path: '/users/check' },
  forgot: { method: 'POST', path: '/users/forgot' },
  changePassword: { method: 'PUT', path: '/users/password' },
  profile: { method: 'GET', path: '/users/profile' },
  updateProfile: { method: 'PUT', path: '/users/profile' },
  deleteProfile: { method: 'DELETE', path: '/users/profile' },

  notesList: { method: 'GET', path: '/notes' },
  notesCreate: { method: 'POST', path: '/notes' },
  notesSearch: { method: 'GET', path: '/notes/search' },
  noteGet: { method: 'GET', path: '/notes/{id}' },
  noteUpdate: { method: 'PUT', path: '/notes/{id}' },
  noteDelete: { method: 'DELETE', path: '/notes/{id}' },

  categoriesList: { method: 'GET', path: '/categories' },
  categoriesCreate: { method: 'POST', path: '/categories' },
  categoryGet: { method: 'GET', path: '/categories/{id}' },
  categoryUpdate: { method: 'PUT', path: '/categories/{id}' },
  categoryDelete: { method: 'DELETE', path: '/categories/{id}' },
};
