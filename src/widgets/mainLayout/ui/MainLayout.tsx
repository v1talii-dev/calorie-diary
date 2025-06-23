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
      {isAuth && top && (
        <div className={cls.top}>
          <div className={cls.section}>{top}</div>
        </div>
      )}

      <div className={cls.body}>
        <div className={cls.section}>{children}</div>
      </div>

      {isAuth && bottom && (
        <div className={cls.bottom}>
          <div className={cls.section}>{bottom}</div>
        </div>
      )}
    </AppFlex>
  );
});
