import { memo, type ReactNode } from 'react';
import cls from './style.module.scss';
import { useFirebaseAuth } from '@/app/providers/firebase';
import { AppFlex } from '@/shared/ui/appFlex';
import { MainLoading } from '@/widgets/mainLoading';

type MainLayoutProps = {
  top?: ReactNode;
  children: ReactNode;
  bottom?: ReactNode;
};

export const MainLayout = memo((props: MainLayoutProps) => {
  const { top, children, bottom } = props;
  const { user, loading } = useFirebaseAuth();

  return (
    <AppFlex className={cls.app} gap={null}>
      {loading ? (
        <MainLoading></MainLoading>
      ) : (
        <>
          {user && top && (
            <div className={cls.top}>
              <div className={cls.section}>{top}</div>
            </div>
          )}

          <div className={cls.body}>
            <div className={cls.section}>{children}</div>
          </div>

          {user && bottom && (
            <div className={cls.bottom}>
              <div className={cls.section}>{bottom}</div>
            </div>
          )}
        </>
      )}
    </AppFlex>
  );
});
