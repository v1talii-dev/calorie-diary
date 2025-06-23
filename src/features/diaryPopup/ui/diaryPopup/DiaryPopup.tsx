import { Popup } from 'antd-mobile';
import type { ProductValues } from '../../model/types';
import { ProductForm } from '../productForm/ProductForm.tsx';

interface DiaryPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DiaryPopup = (props: DiaryPopupProps) => {
  const { isOpen, onClose } = props;

  const onSaveProductForm = (values: ProductValues) => {
    console.log({ values });
    onClose();
  };

  return (
    <Popup visible={isOpen} onMaskClick={onClose}>
      <ProductForm onSave={onSaveProductForm} />
    </Popup>
  );
};
