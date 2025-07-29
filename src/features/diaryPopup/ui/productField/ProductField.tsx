import { CapsuleTabs, List, Popup } from 'antd-mobile';
import { useState } from 'react';
import cls from './style.module.scss';
import { type Product } from '@/entities/product';
import { ProductSearch } from '@/features/diaryPopup/ui/productSearch/ProductSearch.tsx';
import { getCaloriesPerPortion } from '@/shared/lib/catalog.ts';

interface ProductFieldProps {
  value?: Product;
  onChange?: (value: Product) => void;
}

export const ProductField = (props: ProductFieldProps) => {
  const { value, onChange } = props;
  const [visiblePopup, setVisiblePopup] = useState(false);

  const onChangeProduct = (product: Product) => {
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
        onMaskClick={() => setVisiblePopup(false)}
        onClose={() => setVisiblePopup(false)}
      >
        <CapsuleTabs className={cls.tabsContainer}>
          <CapsuleTabs.Tab
            title='Недавние'
            key='productLatest'
            className={cls.tabContent}
          >
            TODO
          </CapsuleTabs.Tab>
          <CapsuleTabs.Tab
            title='Поиск'
            key='productSearch'
            className={cls.tabContent}
          >
            <ProductSearch onChange={onChangeProduct}></ProductSearch>
          </CapsuleTabs.Tab>
        </CapsuleTabs>
      </Popup>
    </>
  );
};
