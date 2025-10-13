import { ErrorBlock } from 'antd-mobile';
import dayjs from 'dayjs';
import ReactECharts from 'echarts-for-react';
import { memo, useMemo } from 'react';
import { StatisticSkeleton } from '../statisticSkeleton/StatisticSkeleton.tsx';
import { useGetDiaryEntriesQuery } from '@/entities/diary';
import { useGetUserSettingsEntryQuery } from '@/entities/user';
import SearchIcon from '@/shared/media/icons/search.svg';

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
        confine: true,
        trigger: 'axis'
      },
      xAxis: {
        type: 'category',
        data: diary?.totalByDay.map(item => item.date),
        axisLabel: {
          formatter: (value: string) => dayjs(value).format('dd')
        }
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: 'Фактическое потребление',
          type: 'bar',
          data: diary?.totalByDay.map(item => item.calories),
          itemStyle: {
            color: '#00b578'
          }
        },
        {
          name: 'Лимит',
          type: 'line',
          data: Array(diary?.totalByDay.length).fill(
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
    return <StatisticSkeleton bars={diary?.totalByDay.length} />;
  }

  if (!diary?.entries?.length) {
    return (
      <ErrorBlock image={SearchIcon} title='Дневник пуст' description='' />
    );
  }

  return <ReactECharts option={option} style={{ height: 400 }} />;
});
