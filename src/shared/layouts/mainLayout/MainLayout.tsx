import { Layout } from 'antd';
import React from 'react';

const { Content } = Layout;

type MainLayoutProps = {
  children: React.ReactNode;
  bottomNav?: React.ReactNode;
};

export const MainLayout = ({ children, bottomNav }: MainLayoutProps) => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Content style={{ paddingBottom: bottomNav ? 56 : 0 }}>
        {children}
      </Content>
      {bottomNav}
    </Layout>
  );
};
