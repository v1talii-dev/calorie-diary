import { ErrorBlock, InfiniteScroll, List, SearchBar } from 'antd-mobile';
import { useMemo, useState } from 'react';
import cls from './style.module.scss';
import { type Product, useGetFoodsInfiniteQuery } from '@/entities/product';
import { getCaloriesPerPortion, getProductName } from '@/shared/lib/catalog.ts';
import SearchIcon from '@/shared/media/icons/search.svg';
import { AppFlex } from '@/shared/ui/appFlex';
import { AppListSkeleton } from '@/shared/ui/appSkeleton';

interface ProductFieldProps {
  onChange?: (value: Product) => void;
}

export const ProductSearch = (props: ProductFieldProps) => {
  const { onChange } = props;
  const [filterSearch, setFilterSearch] = useState<string>('');
  const {
    data,
    error,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage
  } = useGetFoodsInfiniteQuery(
    {
      search: filterSearch
    },
    {
      skip: !filterSearch
    }
  );

  const products = useMemo(() => {
    return (
      data?.pages?.reduce((result: Product[], current) => {
        result = result.concat(current.products ?? []);
        return result;
      }, []) ?? []
    );
  }, [data]);

  const onClickProduct = (product: Product) => {
    onChange?.(product);
  };

  const onLoadMore = async () => {
    if (isFetchingNextPage) {
      return Promise.resolve();
    }
    await fetchNextPage();
  };

  return (
    <AppFlex direction='column' fullHeight gap={16}>
      <SearchBar
        placeholder='Поиск продуктов'
        autoFocus
        onSearch={setFilterSearch}
        onClear={() => setFilterSearch('')}
      />

      {isFetching && !isFetchingNextPage ? (
        <AppListSkeleton />
      ) : error ? (
        <ErrorBlock status='default' description={JSON.stringify(error)} />
      ) : !filterSearch || !products.length ? (
        <ErrorBlock image={SearchIcon} title='Выполните поиск' description='' />
      ) : (
        <List key={filterSearch} className={cls.productList}>
          {products.map(product => (
            <List.Item
              key={product.id}
              description={getCaloriesPerPortion(
                product.nutriments?.['energy-kcal_100g'] || 0
              )}
              onClick={() => onClickProduct(product)}
            >
              {getProductName(product)}
            </List.Item>
          ))}
          <InfiniteScroll hasMore={hasNextPage} loadMore={onLoadMore} />
        </List>
      )}
    </AppFlex>
  );
};
