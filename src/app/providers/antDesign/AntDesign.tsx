import { App, ConfigProvider } from 'antd';
import { type ReactNode } from 'react';

interface AntDesignProps {
  children: ReactNode;
}

export const AntDesign = (props: AntDesignProps) => {
  const { children } = props;

  return (
    <ConfigProvider>
      <App>{children}</App>
    </ConfigProvider>
  );
};
