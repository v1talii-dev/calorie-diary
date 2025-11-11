import { collection, getDocs, query } from 'firebase/firestore';
import { type ProductEntry, type ProductList } from '../../types';
import { db } from '@/shared/api/firebase.ts';
import { rtkQueryApi } from '@/shared/api/rtkQuery';

const productApi = rtkQueryApi
  .enhanceEndpoints({ addTagTypes: ['product'] })
  .injectEndpoints({
    endpoints: build => ({
      getProducts: build.infiniteQuery<
        ProductList,
        { search?: string },
        { page: number; size: number }
      >({
        infiniteQueryOptions: {
          initialPageParam: {
            page: 1,
            size: 20
          },
          getNextPageParam: (firstPage, _, lastPageParam) => {
            if (firstPage.pageSize * firstPage.page >= firstPage.count) {
              return undefined;
            }
            return {
              ...lastPageParam,
              page: lastPageParam.page + 1
            };
          }
        },
        async queryFn(
          { pageParam, queryArg },
          _queryApi,
          _extraOptions,
          _fetchWithBQ
        ) {
          try {
            // TODO filters
            console.log({ queryArg, pageParam });
            const q = query(collection(db, 'product'));
            const snapshot = await getDocs(q);
            const result = snapshot.docs.map(doc => {
              const data = doc.data() as Omit<ProductEntry, 'id'>;
              return {
                ...data,
                id: doc.id
              };
            });
            return {
              // TODO response
              data: {
                count: 0,
                page: 0,
                pageCount: 0,
                pageSize: 0,
                content: result
              }
            };
          } catch (error) {
            console.error(error);
            return {
              error: {
                status: 'CUSTOM_ERROR',
                error: (error as Error).message || error
              }
            };
          }
        }
      })
    })
  });

export const { useGetProductsInfiniteQuery } = productApi;
