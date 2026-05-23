import type { ProductEntry } from '@/shared/types/product';

export type { ProductEntry };

export interface ProductList {
  count: number;
  page: number;
  pageCount: number;
  pageSize: number;
  content: ProductEntry[];
}
