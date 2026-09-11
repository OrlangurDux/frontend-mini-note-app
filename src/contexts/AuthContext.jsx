import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { AuthStorage } from '../lib/authStorage';
import { setUnauthorizedHandler } from '../lib/apiClient';
import * as authApi from '../lib/api/auth';
import * as profileApi from '../lib/api/profile';
import { drainQueue } from '../lib/offline/syncManager';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  const logout = useCallback(() => {
    // Only the token goes — notes/categories caches and the pending
    // mutation queue live in IndexedDB and survive on purpose, so a
    // re-login (even after a token expired while offline) still has
    // everything queued up to push. See NoteContext/syncManager.
    AuthStorage.clear();
    setIsAuthenticated(false);
    setUser(null);
  }, []);

  useEffect(() => {
    setUnauthorizedHandler(() => logout());
    // A token whose locally-recorded expiry has passed while the browser
    // is offline can't actually be verified right now — treat the session
    // as still-authenticated so the user keeps access to their cached
    // notes and queued edits. The next real request once back online will
    // get a genuine 401 (see setUnauthorizedHandler above) if the token
    // really is dead, and that's when we actually log out.
    const online = typeof navigator === 'undefined' ? true : navigator.onLine;
    const hasToken = !!AuthStorage.getToken();
    setIsAuthenticated(AuthStorage.isValid() || (hasToken && !online));
    setReady(true);
  }, [logout]);

  useEffect(() => {
    if (!isAuthenticated) return;
    profileApi.getProfile().then((res) => setUser(res?.data || null)).catch(() => {});
  }, [isAuthenticated]);

  // Shared by both the direct-login and post-2FA paths: only a real Bearer
  // response should ever be persisted as the session token.
  const completeLogin = useCallback((res) => {
    AuthStorage.set(res.access_token, res.expires_in);
    setIsAuthenticated(true);
    // Push anything that piled up offline under a previous (possibly
    // since-expired) session right away, rather than waiting for the next
    // online/offline browser event to trigger a drain.
    drainQueue();
    return res;
  }, []);

  // When the account has 2FA enabled, /users/login responds with
  // token_type "mfa" and a short-lived (~60s) token instead of a session —
  // that token is NOT a bearer credential, it's only good for one call to
  // /users/otp alongside the current TOTP code. Never store it as the auth
  // token: the caller (LoginScreen) checks `token_type` on the result and
  // routes to the code-entry step instead of treating this as signed in.
  const login = useCallback(async (email, password) => {
    const res = await authApi.login(email, password);
    if (res.token_type === 'mfa') return res;
    return completeLogin(res);
  }, [completeLogin]);

  const verifyOtp = useCallback(async (mfaToken, code) => {
    const res = await authApi.verifyOtp(mfaToken, code);
    return completeLogin(res);
  }, [completeLogin]);

  const register = useCallback(async (email, password) => {
    return authApi.register(email, password);
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, ready, login, verifyOtp, register, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

// Pages call this to gate access; redirects to /login once hydration is
// done and there's no valid session.
export function useRequireAuth() {
  const { isAuthenticated, ready } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (ready && !isAuthenticated) router.replace('/login');
  }, [ready, isAuthenticated, router]);

  return { ready, isAuthenticated };
}
