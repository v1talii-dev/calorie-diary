import dayjs from 'dayjs';
import ReactECharts from 'echarts-for-react';
import { memo, useMemo } from 'react';
import { StatisticSkeleton } from '../statisticSkeleton/StatisticSkeleton.tsx';
import { useGetDiaryEntriesQuery } from '@/entities/diary';
import { useGetUserSettingsEntryQuery } from '@/entities/user';

const date = dayjs();

export const StatisticContent = memo(() => {
  const { data: diary, isFetching } = useGetDiaryEntriesQuery({
    dateStart: date.subtract(7, 'day').toISOString(),
    dateEnd: date.toISOString()
  });
  const { data: userSettings } = useGetUserSettingsEntryQuery();

  const option = useMemo(() => {
    return {
      title: {
        text: 'Потребление калорий за неделю'
      },
      tooltip: {
        trigger: 'axis'
      },
      xAxis: {
        type: 'category',
        data: diary?.totalByDay.days.map((date: string) =>
          dayjs(date).format('dd')
        )
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: 'Фактическое потребление',
          type: 'bar',
          data: diary?.totalByDay.calories,
          itemStyle: {
            color: '#00b578'
          }
        },
        {
          name: 'Лимит',
          type: 'line',
          data: Array(diary?.totalByDay.days.length).fill(
            userSettings?.calories_limit
          ),
          symbol: 'none',
          lineStyle: {
            color: '#ff3141',
            width: 2,
            type: 'dashed'
          }
        }
      ]
    };
  }, [diary, userSettings]);

  if (isFetching) {
    return <StatisticSkeleton bars={diary?.totalByDay.days.length} />;
  }

  return <ReactECharts option={option} style={{ height: 400 }} />;
});
