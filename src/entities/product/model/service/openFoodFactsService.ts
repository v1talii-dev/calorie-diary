import { rtkQueryApi } from '@/shared/api/rtkQuery';

const BASE_URL = '/api/openfoodfacts';

const openFoodFactsApi = rtkQueryApi.injectEndpoints({
  endpoints: build => ({
    getFoods: build.query<unknown, string>({
      query: search => ({
        url: `${BASE_URL}/cgi/search.pl`,
        params: {
          search_terms: search,
          json: 1
        }
      })
    })
  })
});

export const { useGetFoodsQuery } = openFoodFactsApi;
