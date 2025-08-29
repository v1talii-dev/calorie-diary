import ReactECharts from 'echarts-for-react';
import { memo, useMemo } from 'react';

// TODO
export const StatisticContent = memo(() => {
  const option = useMemo(() => {
    return {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      xAxis: {
        type: 'category',
        data: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [120, 200, 150, 80, 70, 110, 130],
          type: 'bar'
        }
      ]
    };
  }, []);

  return <ReactECharts option={option} style={{ height: 400 }} />;
});
