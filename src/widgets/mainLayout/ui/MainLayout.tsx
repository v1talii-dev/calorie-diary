import { memo, type ReactNode } from 'react';
import cls from './style.module.scss';
import { useAuth } from '@/entities/user';
import { AppFlex } from '@/shared/ui/appFlex';

type MainLayoutProps = {
  top?: ReactNode;
  children: ReactNode;
  bottom?: ReactNode;
};

export const MainLayout = memo((props: MainLayoutProps) => {
  const { top, children, bottom } = props;
  const { isAuth } = useAuth();

  return (
    <AppFlex className={cls.app} gap={null}>
      {isAuth && top && <div className={cls.top}>{top}</div>}
      <div className={cls.body}>{children}</div>
      {isAuth && bottom && (
        <div className={cls.bottom}>
          <div className={cls.bottomContent}>{bottom}</div>
        </div>
      )}
    </AppFlex>
  );
});
