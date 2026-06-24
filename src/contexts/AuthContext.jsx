import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { AuthStorage } from '../lib/authStorage';
import { setUnauthorizedHandler } from '../lib/apiClient';
import * as authApi from '../lib/api/auth';
import * as profileApi from '../lib/api/profile';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  const logout = useCallback(() => {
    AuthStorage.clear();
    setIsAuthenticated(false);
    setUser(null);
  }, []);

  useEffect(() => {
    setUnauthorizedHandler(() => logout());
    setIsAuthenticated(AuthStorage.isValid());
    setReady(true);
  }, [logout]);

  useEffect(() => {
    if (!isAuthenticated) return;
    profileApi.getProfile().then((res) => setUser(res?.data || null)).catch(() => {});
  }, [isAuthenticated]);

  const login = useCallback(async (email, password) => {
    const res = await authApi.login(email, password);
    AuthStorage.set(res.access_token, res.expires_in);
    setIsAuthenticated(true);
    return res;
  }, []);

  const register = useCallback(async (email, password) => {
    return authApi.register(email, password);
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, ready, login, register, logout, setUser }}>
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
