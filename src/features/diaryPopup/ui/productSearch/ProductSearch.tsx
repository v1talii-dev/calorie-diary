import { ErrorBlock, InfiniteScroll, List, SearchBar } from 'antd-mobile';
import { useCallback, useMemo, useState } from 'react';
import cls from './style.module.scss';
import {
  type ProductEntry,
  useGetProductsInfiniteQuery
} from '@/entities/product';
import { getCaloriesPerPortion, getProductName } from '@/shared/lib/catalog.ts';
import SearchIcon from '@/shared/media/icons/search.svg';
import { AppFlex } from '@/shared/ui/appFlex';
import { AppListSkeleton } from '@/shared/ui/appSkeleton';

interface ProductFieldProps {
  onChange?: (value: ProductEntry) => void;
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
  } = useGetProductsInfiniteQuery({
    search: filterSearch
  });

  const products = useMemo(() => {
    return (
      data?.pages?.reduce((result: ProductEntry[], current) => {
        result = result.concat(current.content ?? []);
        return result;
      }, []) ?? []
    );
  }, [data]);

  const onClickProduct = useCallback(
    (product: ProductEntry) => {
      onChange?.(product);
    },
    [onChange]
  );

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
      ) : !products.length ? (
        <ErrorBlock image={SearchIcon} title='Выполните поиск' description='' />
      ) : (
        <List key={filterSearch} className={cls.productList}>
          {products.map(product => (
            <List.Item
              key={product.id}
              description={getCaloriesPerPortion(product.nutrients?.energy)}
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
