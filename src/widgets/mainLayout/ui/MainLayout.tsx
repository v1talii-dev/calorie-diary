import { Grid } from 'antd-mobile';
import React, { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import cls from './style.module.scss';
import { useAuth } from '@/entities/user';
import { ROUTE } from '@/shared/const/router.ts';

type MainLayoutProps = {
  children: React.ReactNode;
  bottomNav?: React.ReactNode;
};

export const MainLayout = ({ children, bottomNav }: MainLayoutProps) => {
  const { isAuth } = useAuth();
  const location = useLocation();

  const isVisibleBottomNav = useMemo(
    () => isAuth && location.pathname !== ROUTE.LOGIN.path() && bottomNav,
    [bottomNav, isAuth, location.pathname]
  );

  return (
    <Grid columns={1} gap={8}>
      <Grid.Item className={cls.content}>{children}</Grid.Item>
      {isVisibleBottomNav && <Grid.Item>{bottomNav}</Grid.Item>}
    </Grid>
  );
};
