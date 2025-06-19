import { Layout } from 'antd';
import React from 'react';
import cls from './style.module.scss';

const { Content } = Layout;

type MainLayoutProps = {
  children: React.ReactNode;
  bottomNav?: React.ReactNode;
};

export const MainLayout = ({ children, bottomNav }: MainLayoutProps) => {
  return (
    <Layout className={cls.mainLayout}>
      <Content>{children}</Content>
      {bottomNav}
    </Layout>
  );
};
