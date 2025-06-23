import { rtkQueryApi } from '@/shared/api/rtkQuery';

const BASE_URL = '/api/fatsecret/rest';

const fatsecretApi = rtkQueryApi.injectEndpoints({
  endpoints: build => ({
    getFoods: build.query<unknown, string>({
      query: search_expression => ({
        url: `${BASE_URL}/foods/search/v3`,
        params: { search_expression, format: 'json' }
      })
    })
  })
});

export const { useGetFoodsQuery } = fatsecretApi;
