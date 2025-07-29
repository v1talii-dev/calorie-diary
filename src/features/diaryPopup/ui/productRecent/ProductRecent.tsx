import { ErrorBlock, List } from 'antd-mobile';
import cls from './style.module.scss';
import {
  type DiaryRecord,
  useGetRecentDiaryEntriesQuery
} from '@/entities/diary';
import { type Product } from '@/entities/product';
import { getCaloriesPerPortion } from '@/shared/lib/catalog.ts';

interface ProductRecentProps {
  onChange?: (product: Product, weight?: number) => void;
}
export const ProductRecent = (props: ProductRecentProps) => {
  const { onChange } = props;
  const { data } = useGetRecentDiaryEntriesQuery();

  const onClickProduct = (el: DiaryRecord) => {
    onChange?.(el.product, el.weight);
  };

  return (
    <>
      {!data?.entries?.length ? (
        <ErrorBlock status='empty' title='Ничего не найдено' description='' />
      ) : (
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
      )}
    </>
  );
};
