import { Popup } from 'antd-mobile';

interface DiaryPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DiaryPopup = (props: DiaryPopupProps) => {
  const { isOpen, onClose } = props;

  return (
    <Popup visible={isOpen} onMaskClick={onClose}>
      TODO: diary popup
    </Popup>
  );
};
