import { type Product, type ProductList } from '../../types';
import { rtkQueryApi } from '@/shared/api/rtkQuery';

const BASE_URL = '/api/openfoodfacts';

const openFoodFactsApi = rtkQueryApi.injectEndpoints({
  endpoints: build => ({
    getFoods: build.infiniteQuery<
      ProductList,
      { search?: string },
      { page: number; size: number }
    >({
      infiniteQueryOptions: {
        initialPageParam: {
          page: 1,
          size: 10
        },
        getNextPageParam: (firstPage, _, lastPageParam) => {
          if (firstPage.page_size * firstPage.page >= firstPage.count) {
            return undefined;
          }
          return {
            ...lastPageParam,
            page: lastPageParam.page + 1
          };
        }
      },
      query: ({ queryArg, pageParam }) => ({
        url: `${BASE_URL}/cgi/search.pl`,
        params: {
          search_terms: queryArg.search,
          page: pageParam.page,
          page_size: pageParam.size,
          json: 1
        }
      }),
      transformResponse: (result: ProductList) => ({
        ...result,
        products: result?.products?.map((el: Product) => ({
          id: el.id,
          product_name: el.product_name,
          nutriments: {
            proteins_100g: el.nutriments.proteins_100g ?? null,
            fat_100g: el.nutriments.fat_100g ?? null,
            carbohydrates_100g: el.nutriments.carbohydrates_100g ?? null,
            'energy-kcal_100g': el.nutriments['energy-kcal_100g'] ?? null
          }
        }))
      })
    })
  })
});

export const { useGetFoodsInfiniteQuery } = openFoodFactsApi;
