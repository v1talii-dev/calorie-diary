import { PullToRefresh } from 'antd-mobile';
import dayjs from 'dayjs';
import { memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from '@/app';
import {
  getFilters,
  setFilters,
  useGetDiaryEntriesQuery,
  util
} from '@/entities/diary';
import { DiaryStatistic } from '@/features/diaryStatistic';
import { AppFlex } from '@/shared/ui/appFlex';
import { DiaryContent } from '@/widgets/diaryContent';

export const DiaryPage = memo(() => {
  const dispatch = useDispatch<AppDispatch>();
  const filters = useSelector(getFilters);
  const { refetch: refetchDiaryEntries } = useGetDiaryEntriesQuery({
    dateStart: filters.dateStart,
    dateEnd: filters.dateEnd
  });

  useEffect(() => {
    const result = {
      dateStart: dayjs().toISOString(),
      dateEnd: dayjs().toISOString()
    };
    dispatch(setFilters(result));
    return () => {
      // сброс кэша, чтобы не было мерцаний интерфейса
      dispatch(util.invalidateTags(['diary']));
    };
  }, [dispatch]);

  return (
    <PullToRefresh onRefresh={() => refetchDiaryEntries()}>
      <AppFlex align='center'>
        <DiaryStatistic />
        <DiaryContent />
      </AppFlex>
    </PullToRefresh>
  );
});
