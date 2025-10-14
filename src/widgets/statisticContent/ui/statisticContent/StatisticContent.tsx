import { ErrorBlock } from 'antd-mobile';
import dayjs from 'dayjs';
import ReactECharts from 'echarts-for-react';
import { memo, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { StatisticSkeleton } from '../statisticSkeleton/StatisticSkeleton.tsx';
import { getFilters, useGetDiaryEntriesQuery } from '@/entities/diary';
import { useGetUserSettingsEntryQuery } from '@/entities/user';
import SearchIcon from '@/shared/media/icons/search.svg';

export const StatisticContent = memo(() => {
  const filters = useSelector(getFilters);
  const { data: diary, isFetching } = useGetDiaryEntriesQuery({
    dateStart: filters.dateStart,
    dateEnd: filters.dateEnd
  });
  const { data: userSettings } = useGetUserSettingsEntryQuery();

  const option = useMemo(
    () => ({
      tooltip: {
        trigger: 'axis',
        confine: true,
        enterable: true,
        position: (point: number[]) => [point[0], 0],
        borderWidth: 0,
        textStyle: { color: '#333', fontSize: 14 },
        //@ts-ignore
        formatter: params => {
          const item = params?.[0];
          if (!item) return '';
          return `
          <div style="font-size:13px;">
            <span style="font-size:24px;">${item.value}</span> <span style="opacity:0.6;">ккал</span><br/>
            <span style="opacity:0.6;">${dayjs(item.name).format('DD.MM.YYYY')}</span>
          </div>
        `;
        }
      },
      xAxis: {
        type: 'category',
        data: diary?.totalByDay.map(i => i.date) ?? [],
        axisLabel: {
          formatter: (value: string) => dayjs(value).format('dd')
        }
      },
      yAxis: { type: 'value' },
      series: [
        {
          name: 'Потребление',
          type: 'bar',
          data: diary?.totalByDay.map(i => i.calories) ?? [],
          itemStyle: { color: '#00b578' }
        },
        {
          name: 'Лимит',
          type: 'line',
          data: diary?.totalByDay.map(() => userSettings?.calories_limit) ?? [],
          symbol: 'none',
          lineStyle: { color: '#ff3141', width: 2, type: 'dashed' }
        }
      ]
    }),
    [diary, userSettings]
  );

  if (isFetching) {
    return <StatisticSkeleton />;
  }

  if (!diary?.entries?.length) {
    return (
      <ErrorBlock image={SearchIcon} title='Дневник пуст' description='' />
    );
  }

  return <ReactECharts option={option} style={{ height: 360 }} />;
});
