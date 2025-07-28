import { type Product, type ProductList } from '../../types';
import { rtkQueryApi } from '@/shared/api/rtkQuery';

const BASE_URL = '/api/openfoodfacts';

const openFoodFactsApi = rtkQueryApi.injectEndpoints({
  endpoints: build => ({
    getFoods: build.query<ProductList, string>({
      query: search => ({
        url: `${BASE_URL}/cgi/search.pl`,
        params: {
          search_terms: search,
          page_size: 10,
          json: 1
        }
      }),
      transformResponse: (result: ProductList) => ({
        ...result,
        products: result?.products?.map((el: Product) => ({
          id: el.id,
          product_name: el.product_name,
          url: el.url,
          nutriments: {
            proteins_100g: el.nutriments.proteins_100g,
            fat_100g: el.nutriments.fat_100g,
            carbohydrates_100g: el.nutriments.carbohydrates_100g,
            'energy-kcal_100g': el.nutriments['energy-kcal_100g']
          }
        }))
      })
    })
  })
});

export const { useGetFoodsQuery } = openFoodFactsApi;
