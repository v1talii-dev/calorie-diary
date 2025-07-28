import { Button } from 'antd-mobile';
import { AddSquareOutline } from 'antd-mobile-icons';
import { useCallback, useState } from 'react';
import type { DiaryRecord } from '@/entities/diary';
import { DiaryList } from '@/features/diaryList';
import { DiaryPopup } from '@/features/diaryPopup';
import { AppFlex } from '@/shared/ui/appFlex';

export const DiaryContent = () => {
  const [isOpenDiaryPopup, setIsOpenDiaryPopup] = useState(false);
  const [currentDiary, setCurrentDiary] = useState<DiaryRecord>();

  const onOpenDiaryPopup = useCallback(() => {
    setIsOpenDiaryPopup(true);
  }, []);

  const onCloseDiaryPopup = useCallback(() => {
    setIsOpenDiaryPopup(false);
    setCurrentDiary(undefined);
  }, []);

  const onClickItem = (item: DiaryRecord) => {
    setCurrentDiary(item);
    onOpenDiaryPopup();
  };

  return (
    <AppFlex gap={8} fullWidth={true}>
      <AppFlex direction='row' align='center' justify='space-between'>
        <div>Дневник продуктов</div>
        <Button
          color='primary'
          fill='none'
          size='mini'
          onClick={() => onOpenDiaryPopup()}
        >
          <AddSquareOutline fontSize={32} />
        </Button>
      </AppFlex>

      <DiaryList onClickItem={onClickItem} />

      <DiaryPopup
        isOpen={isOpenDiaryPopup}
        value={currentDiary}
        onClose={onCloseDiaryPopup}
      />
    </AppFlex>
  );
};
