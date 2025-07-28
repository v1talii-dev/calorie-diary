import { Popup } from 'antd-mobile';
import { ProductForm } from '../productForm/ProductForm.tsx';
import type { DiaryRecord } from '@/entities/diary';

interface DiaryPopupProps {
  isOpen: boolean;
  value?: DiaryRecord;
  onClose: () => void;
}

export const DiaryPopup = (props: DiaryPopupProps) => {
  const { isOpen, value, onClose } = props;

  const onChangeProductForm = () => {
    onClose();
  };

  return (
    <Popup visible={isOpen} onMaskClick={onClose}>
      <ProductForm value={value} onChange={onChangeProductForm} />
    </Popup>
  );
};
