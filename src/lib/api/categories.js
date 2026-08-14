// Offline-aware facade over categoriesRemote.js — mirrors notes.js.
import * as remote from './categoriesRemote';
import { CategoriesCache } from '../offline/categoriesCache';
import { enqueueMutation } from '../offline/mutationQueue';
import { newLocalId, isLocalId } from '../offline/idGen';
import { withOfflineFallback, resolveRedirectedId } from '../offline/offlineApi';

async function resolveId(id) {
  return resolveRedirectedId(CategoriesCache, id);
}

export async function listCategories() {
  return withOfflineFallback(
    () => remote.listCategories().then((res) => {
      CategoriesCache.mergeFromServer(res?.data?.items || []);
      return res;
    }),
    async () => {
      const items = await CategoriesCache.listAll();
      return { success: true, status: 200, data: { items } };
    },
  );
}

export async function getCategory(rawId) {
  const id = await resolveId(rawId);
  return withOfflineFallback(
    () => remote.getCategory(id).then((res) => {
      if (res?.data) CategoriesCache.mergeFromServer([res.data]);
      return res;
    }),
    async () => {
      const cached = await CategoriesCache.getOne(id);
      if (!cached) throw new Error('Not found offline');
      return { success: true, status: 200, data: cached };
    },
  );
}

export async function createCategory({ name, parentId, sort }) {
  return withOfflineFallback(
    () => remote.createCategory({ name, parentId, sort }).then((res) => {
      if (res?.data) CategoriesCache.putOne({ ...res.data, _dirty: false, _deleted: false });
      return res;
    }),
    async () => {
      const id = newLocalId();
      const record = { id, name, parent_id: parentId || '', sort: sort || 0, _dirty: true, _deleted: false };
      await CategoriesCache.putOne(record);
      await enqueueMutation('category', 'create', id, { name, parentId, sort });
      return { success: true, status: 200, data: record };
    },
  );
}

export async function updateCategory(rawId, { name, parentId, sort }) {
  const id = await resolveId(rawId);
  return withOfflineFallback(
    () => remote.updateCategory(id, { name, parentId, sort }).then(async (res) => {
      // Same caveat as notes.js updateNote: the PUT response `data` may
      // just be a status string, not the category — never spread it blindly.
      const existing = await CategoriesCache.getOne(id);
      const serverData = res?.data && typeof res.data === 'object' ? res.data : {};
      CategoriesCache.putOne({
        ...(existing || {}),
        id, name, parent_id: parentId || '', sort: sort || 0,
        _dirty: false, _deleted: false,
        ...serverData,
      });
      return res;
    }),
    async () => {
      const existing = await CategoriesCache.getOne(id);
      const record = { ...(existing || { id }), id, name, parent_id: parentId || '', sort: sort || 0, _dirty: true, _deleted: false };
      await CategoriesCache.putOne(record);
      await enqueueMutation('category', 'update', id, { name, parentId, sort });
      return { success: true, status: 200, data: record };
    },
  );
}

export async function deleteCategory(rawId) {
  const id = await resolveId(rawId);
  return withOfflineFallback(
    () => remote.deleteCategory(id).then((res) => {
      CategoriesCache.removeOne(id);
      return res;
    }),
    async () => {
      if (isLocalId(id)) {
        await CategoriesCache.removeOne(id);
      } else {
        const existing = await CategoriesCache.getOne(id);
        await CategoriesCache.putOne({ ...(existing || { id }), _deleted: true, _dirty: true });
      }
      await enqueueMutation('category', 'delete', id, null);
      return { success: true, status: 200, data: null };
    },
  );
}
