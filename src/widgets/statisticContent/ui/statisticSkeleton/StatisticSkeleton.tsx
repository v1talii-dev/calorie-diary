import { Skeleton } from 'antd-mobile';
import cls from './style.module.scss';
import { AppFlex } from '@/shared/ui/appFlex';

type StatisticSkeletonProps = {
  bars?: number;
};

export const StatisticSkeleton = (props: StatisticSkeletonProps) => {
  const { bars = 7 } = props;
  return (
    <AppFlex align='center'>
      <Skeleton animated className={cls.text} />
      <AppFlex direction='row' align='center' justify='flex-start'>
        {Array.from({ length: bars }).map((_, index) => (
          <Skeleton key={index} animated className={cls.bar} />
        ))}
      </AppFlex>
    </AppFlex>
  );
};
