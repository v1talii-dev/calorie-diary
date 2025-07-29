import { Skeleton } from 'antd-mobile';
import cls from './style.module.scss';
import { AppFlex } from '@/shared/ui/appFlex';

export const StatisticSkeleton = () => {
  return (
    <AppFlex align='center'>
      <Skeleton animated className={cls.circle} />
      <AppFlex direction='row' align='center' gap={8}>
        <Skeleton animated className={cls.leftText} />
        <Skeleton animated className={cls.kcalText} />
      </AppFlex>
    </AppFlex>
  );
};
