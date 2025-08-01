import { PullToRefresh } from 'antd-mobile';
import { memo } from 'react';
import { useSelector } from 'react-redux';
import { useGetDiaryEntriesQuery } from '@/entities/diary';
import { DiaryStatistic } from '@/features/diaryStatistic';
import { getFilters } from '@/pages/diary';
import { AppFlex } from '@/shared/ui/appFlex';
import { DiaryContent } from '@/widgets/diaryContent';

export const DiaryPage = memo(() => {
  const filters = useSelector(getFilters);
  const { refetch: refetchDiaryEntries } = useGetDiaryEntriesQuery({
    date: filters.date
  });

  return (
    <PullToRefresh onRefresh={() => refetchDiaryEntries()}>
      <AppFlex align='center'>
        <DiaryStatistic />
        <DiaryContent />
      </AppFlex>
    </PullToRefresh>
  );
});
