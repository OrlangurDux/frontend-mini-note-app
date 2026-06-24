// Fetch wrapper for the Mini Note RESTful API.
// - Base URL is resolved from the active domain on every call (so switching
//   domains in the UI affects the very next request, no reload needed).
// - Most endpoints take `formData` (x-www-form-urlencoded or multipart),
//   only a couple of unused/secondary ones use JSON bodies.
// - Responses follow UniversalDTO: { success, status, data, error }.
import { Domains } from './domains';
import { AuthStorage } from './authStorage';

export class ApiError extends Error {
  constructor(message, { status, code } = {}) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.code = code;
  }
}

let unauthorizedHandler = null;
export function setUnauthorizedHandler(fn) {
  unauthorizedHandler = fn;
}

function buildUrl(path, pathParams, query) {
  const base = Domains.getActive().baseUrl.replace(/\/+$/, '');
  let resolved = path;
  Object.entries(pathParams || {}).forEach(([key, value]) => {
    resolved = resolved.replace('{' + key + '}', encodeURIComponent(value));
  });
  const qs = new URLSearchParams();
  Object.entries(query || {}).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') qs.set(key, value);
  });
  const queryString = qs.toString();
  return base + resolved + (queryString ? '?' + queryString : '');
}

function buildBody(form, asMultipart) {
  if (!form) return undefined;
  if (asMultipart) {
    const fd = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (value !== undefined && value !== null) fd.append(key, value);
    });
    return fd;
  }
  const usp = new URLSearchParams();
  Object.entries(form).forEach(([key, value]) => {
    if (value !== undefined && value !== null) usp.set(key, value);
  });
  return usp;
}

export async function apiRequest({
  method,
  path,
  pathParams,
  query,
  form,
  json,
  multipart = false,
  auth = true,
}) {
  const url = buildUrl(path, pathParams, query);
  const headers = {};
  if (auth) {
    const token = AuthStorage.getToken();
    if (token) headers.Authorization = 'Bearer ' + token;
  }

  let body;
  if (json !== undefined) {
    headers['Content-Type'] = 'application/json';
    body = JSON.stringify(json);
  } else if (form !== undefined) {
    body = buildBody(form, multipart);
    // multipart body sets its own Content-Type (with boundary); the
    // URLSearchParams case lets fetch default to text/plain, so set it.
    if (!multipart) headers['Content-Type'] = 'application/x-www-form-urlencoded';
  }

  let res;
  try {
    res = await fetch(url, { method, headers, body });
  } catch (e) {
    throw new ApiError('Network error: could not reach ' + url, { status: 0 });
  }

  let payload = null;
  try {
    payload = await res.json();
  } catch (e) {
    payload = null;
  }

  if (res.status === 401) {
    if (unauthorizedHandler) unauthorizedHandler();
    throw new ApiError(payload?.error?.message || 'Unauthorized', { status: 401, code: payload?.error?.code });
  }

  if (!res.ok || (payload && payload.success === false)) {
    const message = payload?.error?.message || res.statusText || 'Request failed';
    throw new ApiError(message, { status: res.status, code: payload?.error?.code });
  }

  return payload;
}
