import { memo } from 'react';
import { DiaryStatistic } from '@/features/diaryStatistic';
import { AppFlex } from '@/shared/ui/appFlex';
import { DiaryContent } from '@/widgets/diaryContent';

export const DiaryPage = memo(() => {
  return (
    <AppFlex align='center'>
      <DiaryStatistic />
      <DiaryContent />
    </AppFlex>
  );
});
