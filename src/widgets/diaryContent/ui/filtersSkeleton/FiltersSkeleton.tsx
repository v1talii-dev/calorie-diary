import { Skeleton } from 'antd-mobile';
import cls from './style.module.scss';
import { AppFlex } from '@/shared/ui/appFlex';

export const FiltersSkeleton = () => {
  return (
    <AppFlex direction='row' align='center' justify='space-between'>
      <Skeleton animated className={cls.date} />
      <Skeleton animated className={cls.button} />
    </AppFlex>
  );
};
