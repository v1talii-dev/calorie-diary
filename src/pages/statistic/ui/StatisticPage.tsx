import { PullToRefresh } from 'antd-mobile';
import { memo } from 'react';
import { StatisticContent } from '@/widgets/statisticContent';

export const StatisticPage = memo(() => {
  return (
    <PullToRefresh>
      <StatisticContent />
    </PullToRefresh>
  );
});
