import { Layout } from 'antd';
import React, { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import cls from './style.module.scss';
import { useAuth } from '@/entities/user';
import { ROUTE } from '@/shared/const/router.ts';

const { Content } = Layout;

type MainLayoutProps = {
  children: React.ReactNode;
  bottomNav?: React.ReactNode;
};

export const MainLayout = ({ children, bottomNav }: MainLayoutProps) => {
  const { isAuth } = useAuth();
  const location = useLocation();

  const isVisibleBottomNav = useMemo(
    () => isAuth && location.pathname !== ROUTE.LOGIN.path(),
    [isAuth, location.pathname]
  );

  return (
    <Layout className={cls.mainLayout}>
      <Content className={cls.content}>{children}</Content>
      {isVisibleBottomNav && bottomNav}
    </Layout>
  );
};
