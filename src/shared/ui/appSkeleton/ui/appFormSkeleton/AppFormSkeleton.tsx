import { Skeleton } from 'antd-mobile';
import cls from './style.module.scss';
import { AppFlex } from '@/shared/ui/appFlex';

export const AppFormSkeleton = ({ count = 3 }: { count?: number }) => (
  <AppFlex direction='column' gap={16}>
    {Array.from({ length: count }).map((_, i) => (
      <Skeleton key={i} animated className={cls.block} />
    ))}
  </AppFlex>
);
