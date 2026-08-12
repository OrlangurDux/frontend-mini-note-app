// Shared glue between the offline-aware lib/api/* facades and the cache —
// deciding when to fall back, and resolving ids that moved after a sync
// remap while some part of the UI is still holding the old (local:) one.
import { ApiError } from '../apiClient';

export function isNetworkError(err) {
  return err instanceof ApiError && err.status === 0;
}

// `navigator.onLine` only reflects the OS network interface, not real
// reachability — it can be wrong in both directions, so it's used purely
// as a fast-path skip, never as the sole signal. A genuine network failure
// from `networkFn` (ApiError status 0) always triggers the same fallback.
export async function withOfflineFallback(networkFn, fallbackFn) {
  if (typeof navigator !== 'undefined' && navigator.onLine === false) {
    return fallbackFn();
  }
  try {
    return await networkFn();
  } catch (err) {
    if (isNetworkError(err)) return fallbackFn();
    throw err;
  }
}

export async function resolveRedirectedId(cache, id) {
  if (!id) return id;
  const rec = await cache.getOne(id);
  return rec && rec._redirectTo ? rec._redirectTo : id;
}
