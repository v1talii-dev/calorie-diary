import { Button, List, Popup } from 'antd-mobile';
import { useState } from 'react';
import cls from './style.module.scss';
import { type Product, useGetFoodsQuery } from '@/entities/product';
import { getCaloriesValue, getWeightValue } from '@/shared/lib/catalog.ts';
import { AppFlex } from '@/shared/ui/appFlex';

interface ProductFieldProps {
  value?: Product;
  onChange?: (value: Product) => void;
}

export const ProductField = (props: ProductFieldProps) => {
  const { value, onChange } = props;
  const [visiblePopup, setVisiblePopup] = useState(false);
  const { data: foods } = useGetFoodsQuery('Bombbar');

  const onClickProduct = (product: Product) => {
    onChange?.(product);
    setVisiblePopup(false);
  };

  const getCalories = (product: Product) => {
    if (!product.nutriments?.['energy-kcal_100g']) {
      return '';
    }
    return `${getCaloriesValue(
      product.nutriments?.['energy-kcal_100g']
    )} / ${getWeightValue(100)}`;
  };

  const getNutrients = (product: Product) => {
    if (
      !product.nutriments.proteins_100g ||
      !product.nutriments.fat_100g ||
      !product.nutriments.carbohydrates_100g
    ) {
      return '';
    }
    return (
      <AppFlex className={cls.nutrients} direction='column' gap={null}>
        <AppFlex direction='row' justify='space-between' gap={8}>
          <span>Б</span>
          <span>{Math.floor(product.nutriments.proteins_100g)}</span>
        </AppFlex>
        <AppFlex direction='row' justify='space-between' gap={8}>
          <span>Ж</span>
          <span>{Math.floor(product.nutriments.fat_100g)}</span>
        </AppFlex>
        <AppFlex direction='row' justify='space-between' gap={8}>
          <span>У</span>
          <span>{Math.floor(product.nutriments.carbohydrates_100g)}</span>
        </AppFlex>
      </AppFlex>
    );
  };

  return (
    <>
      <div>{value?.product_name}</div>

      <Button
        onClick={() => {
          setVisiblePopup(true);
        }}
      >
        Выбрать продукт
      </Button>

      <Popup
        visible={visiblePopup}
        onMaskClick={() => {
          setVisiblePopup(false);
        }}
        onClose={() => {
          setVisiblePopup(false);
        }}
      >
        <List header='Продукты'>
          {foods?.products?.map(product => (
            <List.Item
              key={product.id}
              description={getCalories(product)}
              extra={getNutrients(product)}
              onClick={() => onClickProduct(product)}
            >
              {product.product_name}
            </List.Item>
          ))}
        </List>
      </Popup>
    </>
  );
};
