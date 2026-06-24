import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import * as categoriesApi from '../lib/api/categories';
import { useAuth } from './AuthContext';

const CategoriesContext = createContext(null);

export function CategoriesProvider({ children }) {
  const { isAuthenticated } = useAuth();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const res = await categoriesApi.listCategories();
      setCategories(res?.data?.items || []);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) refresh();
    else setCategories([]);
  }, [isAuthenticated, refresh]);

  const byId = useMemo(() => {
    const map = {};
    categories.forEach((c) => { map[c.id] = c; });
    return map;
  }, [categories]);

  const create = useCallback(async (payload) => {
    await categoriesApi.createCategory(payload);
    await refresh();
  }, [refresh]);

  const update = useCallback(async (id, payload) => {
    await categoriesApi.updateCategory(id, payload);
    await refresh();
  }, [refresh]);

  const remove = useCallback(async (id) => {
    await categoriesApi.deleteCategory(id);
    await refresh();
  }, [refresh]);

  return (
    <CategoriesContext.Provider value={{ categories, byId, loading, refresh, create, update, remove }}>
      {children}
    </CategoriesContext.Provider>
  );
}

export function useCategories() {
  return useContext(CategoriesContext);
}
