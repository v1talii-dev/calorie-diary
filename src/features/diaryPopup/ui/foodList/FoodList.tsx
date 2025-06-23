import { useGetFoodsQuery } from '@/entities/product';

export const FoodList = () => {
  // TODO
  const { data: foods } = useGetFoodsQuery('Bombbar');
  console.log({ foods });

  return <pre>{JSON.stringify(foods, null, 2)}</pre>;
};
