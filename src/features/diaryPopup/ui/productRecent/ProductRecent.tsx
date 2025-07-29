import { ErrorBlock, List } from 'antd-mobile';
import cls from './style.module.scss';
import {
  type DiaryRecord,
  useGetRecentDiaryEntriesQuery
} from '@/entities/diary';
import { type Product } from '@/entities/product';
import { getCaloriesPerPortion } from '@/shared/lib/catalog.ts';
import { AppListSkeleton } from '@/shared/ui/appSkeleton';

interface ProductRecentProps {
  onChange?: (product: Product, weight?: number) => void;
}
export const ProductRecent = (props: ProductRecentProps) => {
  const { onChange } = props;
  const { data, error, isFetching } = useGetRecentDiaryEntriesQuery();

  const onClickProduct = (el: DiaryRecord) => {
    onChange?.(el.product, el.weight);
  };

  if (isFetching) {
    return <AppListSkeleton />;
  }

  if (error) {
    return <ErrorBlock status='default' description={JSON.stringify(error)} />;
  }

  if (!data?.entries?.length) {
    return (
      <ErrorBlock status='busy' title='Недавних продуктов нет' description='' />
    );
  }

  return (
    <List className={cls.productList}>
      {data.entries.map(item => (
        <List.Item
          key={item.id}
          description={getCaloriesPerPortion(item.calories, item.weight)}
          onClick={() => onClickProduct(item)}
        >
          {item.product?.product_name}
        </List.Item>
      ))}
    </List>
  );
};
