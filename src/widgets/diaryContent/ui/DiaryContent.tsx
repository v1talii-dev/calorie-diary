import { Button } from 'antd-mobile';
import { AddSquareOutline } from 'antd-mobile-icons';
import { useCallback, useState } from 'react';
import { DiaryPopup } from '@/features/diaryPopup';
import { AppFlex } from '@/shared/ui/appFlex';

export const DiaryContent = () => {
  const [isOpenDiaryPopup, setIsOpenDiaryPopup] = useState(false);

  const onOpenDiaryPopup = useCallback(() => {
    setIsOpenDiaryPopup(true);
  }, []);

  const onCloseDiaryPopup = useCallback(() => {
    setIsOpenDiaryPopup(false);
  }, []);

  return (
    <AppFlex gap={16} fullWidth={true}>
      <AppFlex direction='row' align='center' justify='space-between'>
        <div>Употреблено</div>
        <Button
          color='primary'
          fill='none'
          size='mini'
          onClick={() => onOpenDiaryPopup()}
        >
          <AddSquareOutline fontSize={32} />
        </Button>
      </AppFlex>

      <DiaryPopup isOpen={isOpenDiaryPopup} onClose={onCloseDiaryPopup} />
    </AppFlex>
  );
};
