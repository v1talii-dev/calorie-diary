import { CapsuleTabs, List, Popup } from 'antd-mobile';
import { useEffect, useState } from 'react';
import { ProductRecent } from '../productRecent/ProductRecent.tsx';
import { ProductSearch } from '../productSearch/ProductSearch.tsx';
import cls from './style.module.scss';
import { type ProductEntry } from '@/entities/product';
import { getCaloriesPerPortion, getProductName } from '@/shared/lib/catalog.ts';

interface ProductFieldProps {
  value?: ProductEntry;
  openOnInit?: boolean;
  onChange?: (product?: ProductEntry) => void;
  onChangeWeight?: (weight?: number) => void;
}

export const ProductField = (props: ProductFieldProps) => {
  const { value, openOnInit, onChange, onChangeWeight } = props;
  const [visiblePopup, setVisiblePopup] = useState(false);

  const onChangeProduct = (product?: ProductEntry, weight?: number) => {
    onChange?.(product);
    onChangeWeight?.(weight);
    setVisiblePopup(false);
  };

  useEffect(() => {
    if (openOnInit) {
      setVisiblePopup(true);
    }
  }, []);

  return (
    <>
      <List className={cls.formField}>
        <List.Item
          description={getCaloriesPerPortion(value?.nutrients?.energy)}
          onClick={() => {
            setVisiblePopup(true);
          }}
        >
          {value ? getProductName(value) : 'Выбрать продукт'}
        </List.Item>
      </List>

      <Popup
        visible={visiblePopup}
        destroyOnClose
        onMaskClick={() => setVisiblePopup(false)}
        onClose={() => setVisiblePopup(false)}
      >
        <CapsuleTabs className={cls.tabsContainer}>
          <CapsuleTabs.Tab title='Недавние' key='productLatest' destroyOnClose>
            <ProductRecent onChange={onChangeProduct}></ProductRecent>
          </CapsuleTabs.Tab>
          <CapsuleTabs.Tab title='Поиск' key='productSearch' destroyOnClose>
            <ProductSearch onChange={onChangeProduct}></ProductSearch>
          </CapsuleTabs.Tab>
        </CapsuleTabs>
      </Popup>
    </>
  );
};
