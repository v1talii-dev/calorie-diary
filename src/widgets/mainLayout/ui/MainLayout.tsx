import { type ReactNode } from 'react';
import cls from './style.module.scss';
import { useAuth } from '@/entities/user';

type MainLayoutProps = {
  top?: ReactNode;
  children: ReactNode;
  bottom?: ReactNode;
};

export const MainLayout = (props: MainLayoutProps) => {
  const { top, children, bottom } = props;
  const { isAuth } = useAuth();

  return (
    <div className={cls.app}>
      {isAuth && top && <div className={cls.top}>{top}</div>}
      <div className={cls.body}>{children}</div>
      {isAuth && bottom && (
        <div className={cls.bottom}>
          <div className={cls.bottomContent}>{bottom}</div>
        </div>
      )}
    </div>
  );
};
