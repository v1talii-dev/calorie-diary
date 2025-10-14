import { PullToRefresh } from 'antd-mobile';
import dayjs from 'dayjs';
import { memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from '@/app';
import {
  getFilters,
  setFilters,
  useGetDiaryEntriesQuery
} from '@/entities/diary';
import { StatisticContent } from '@/widgets/statisticContent';

export const StatisticPage = memo(() => {
  const dispatch = useDispatch<AppDispatch>();
  const filters = useSelector(getFilters);
  const { refetch: refetchDiaryEntries } = useGetDiaryEntriesQuery({
    dateStart: filters.dateStart,
    dateEnd: filters.dateEnd
  });

  useEffect(() => {
    const result = {
      dateStart: dayjs().subtract(7, 'day').toISOString(),
      dateEnd: dayjs().toISOString()
    };
    dispatch(setFilters(result));
  }, [dispatch]);

  return (
    <PullToRefresh onRefresh={() => refetchDiaryEntries()}>
      <StatisticContent />
    </PullToRefresh>
  );
});
