import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { apiRequest } from '../lib/apiClient';
import { ENDPOINTS } from '../config';
import { drainQueue, subscribeSync, warmCache } from '../lib/offline/syncManager';
import { countMutations } from '../lib/offline/mutationQueue';
import { useAuth } from './AuthContext';

const NetworkContext = createContext(null);

// `navigator.onLine` reflects the OS network interface, not real backend
// reachability, so every transition to "online" is confirmed with a cheap
// ping to /version before we trust it and start draining the queue.
export function NetworkProvider({ children }) {
  const [isOnline, setIsOnline] = useState(typeof navigator === 'undefined' ? true : navigator.onLine);
  const [syncing, setSyncing] = useState(false);
  const [pendingCount, setPendingCount] = useState(0);
  const [lastError, setLastError] = useState(null);
  const { isAuthenticated } = useAuth();
  const warmedRef = useRef(false);

  const refreshPendingCount = useCallback(() => {
    countMutations().then(setPendingCount).catch(() => {});
  }, []);

  useEffect(() => { refreshPendingCount(); }, [refreshPendingCount]);

  useEffect(() => subscribeSync((event) => {
    if (event.type === 'start') setSyncing(true);
    if (event.type === 'progress') refreshPendingCount();
    if (event.type === 'paused' || event.type === 'done') { setSyncing(false); refreshPendingCount(); }
    if (event.type === 'item-failed') { setLastError(event.message); refreshPendingCount(); }
  }), [refreshPendingCount]);

  const confirmReachable = useCallback(async () => {
    try {
      await apiRequest({ ...ENDPOINTS.version, auth: false });
      return true;
    } catch (e) {
      return false;
    }
  }, []);

  const goOnline = useCallback(async () => {
    const reachable = await confirmReachable();
    setIsOnline(reachable);
    if (reachable) drainQueue();
  }, [confirmReachable]);

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;
    const onOnline = () => goOnline();
    const onOffline = () => setIsOnline(false);
    window.addEventListener('online', onOnline);
    window.addEventListener('offline', onOffline);
    if (navigator.onLine) goOnline();
    return () => {
      window.removeEventListener('online', onOnline);
      window.removeEventListener('offline', onOffline);
    };
  }, [goOnline]);

  // Safety net for reconnects the browser doesn't fire an `online` event
  // for (flaky wifi, captive portals) — only runs while we believe we're offline.
  useEffect(() => {
    if (isOnline) return undefined;
    const id = setInterval(goOnline, 20000);
    return () => clearInterval(id);
  }, [isOnline, goOnline]);

  useEffect(() => {
    if (isAuthenticated && isOnline && !warmedRef.current) {
      warmedRef.current = true;
      warmCache();
    }
    if (!isAuthenticated) warmedRef.current = false;
  }, [isAuthenticated, isOnline]);

  return (
    <NetworkContext.Provider value={{ isOnline, syncing, pendingCount, lastError, clearLastError: () => setLastError(null) }}>
      {children}
    </NetworkContext.Provider>
  );
}

export function useNetwork() {
  return useContext(NetworkContext);
}
