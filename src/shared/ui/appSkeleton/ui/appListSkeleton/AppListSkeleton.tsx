import { List, Skeleton } from 'antd-mobile';
import cls from './style.module.scss';
import { AppFlex } from '@/shared/ui/appFlex';

export const AppListSkeleton = ({ count = 5 }: { count?: number }) => (
  <List>
    {Array.from({ length: count }).map((_, i) => (
      <List.Item key={i}>
        <AppFlex direction='column' gap={8}>
          <Skeleton animated className={cls.title} />
          <Skeleton animated className={cls.description} />
        </AppFlex>
      </List.Item>
    ))}
  </List>
);
