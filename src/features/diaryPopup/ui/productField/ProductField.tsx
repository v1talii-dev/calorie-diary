import { ErrorBlock, List, Popup, SearchBar, Skeleton } from 'antd-mobile';
import { useState } from 'react';
import cls from './style.module.scss';
import { type Product, useGetFoodsQuery } from '@/entities/product';
import { getCaloriesPerPortion } from '@/shared/lib/catalog.ts';

interface ProductFieldProps {
  value?: Product;
  onChange?: (value: Product) => void;
}

export const ProductField = (props: ProductFieldProps) => {
  const { value, onChange } = props;
  const [visiblePopup, setVisiblePopup] = useState(false);
  const [filterSearch, setFilterSearch] = useState<string>('');
  const { data: foods, isFetching: isFetchingFoods } =
    useGetFoodsQuery(filterSearch);

  const onClickProduct = (product: Product) => {
    onChange?.(product);
    setVisiblePopup(false);
  };

  return (
    <>
      <List className={cls.formField}>
        <List.Item
          description={getCaloriesPerPortion(
            value?.nutriments?.['energy-kcal_100g'] || 0
          )}
          onClick={() => {
            setVisiblePopup(true);
          }}
        >
          {value ? value?.product_name : 'Выбрать продукт'}
        </List.Item>
      </List>

      <Popup
        visible={visiblePopup}
        bodyStyle={{ height: '90vh', overflow: 'auto' }}
        onMaskClick={() => {
          setVisiblePopup(false);
        }}
        onClose={() => {
          setVisiblePopup(false);
        }}
      >
        <List header='Продукты'>
          <List.Item>
            <SearchBar
              placeholder='Поиск продуктов'
              autoFocus
              onSearch={setFilterSearch}
              onClear={() => setFilterSearch('')}
            />
          </List.Item>

          {isFetchingFoods ? (
            <List.Item>
              <Skeleton.Paragraph lineCount={12} animated />
            </List.Item>
          ) : !foods?.products?.length ? (
            <List.Item>
              <ErrorBlock
                status='empty'
                title='Ничего не найдено'
                description=''
              />
            </List.Item>
          ) : (
            foods?.products?.map(product => (
              <List.Item
                key={product.id}
                description={getCaloriesPerPortion(
                  product.nutriments?.['energy-kcal_100g'] || 0
                )}
                onClick={() => onClickProduct(product)}
              >
                {product.product_name}
              </List.Item>
            ))
          )}
        </List>
      </Popup>
    </>
  );
};
