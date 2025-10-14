import { Skeleton } from 'antd-mobile';
import classNames from 'classnames';
import cls from './style.module.scss';
import { AppFlex } from '@/shared/ui/appFlex';

export const StatisticSkeleton = () => {
  return (
    <AppFlex direction='row' align='flex-end' justify='flex-start'>
      <Skeleton animated className={classNames([cls.bar, cls.barOne])} />
      <Skeleton animated className={classNames([cls.bar, cls.barTwo])} />
      <Skeleton animated className={classNames([cls.bar, cls.barThree])} />
      <Skeleton animated className={classNames([cls.bar, cls.barTwo])} />
      <Skeleton animated className={classNames([cls.bar, cls.barThree])} />
    </AppFlex>
  );
};
