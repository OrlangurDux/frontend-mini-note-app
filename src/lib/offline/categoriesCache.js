import { createEntityCache } from './entityCache';

export const CategoriesCache = createEntityCache('categories', { searchFields: ['name'] });
