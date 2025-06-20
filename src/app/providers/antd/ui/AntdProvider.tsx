import { ConfigProvider } from 'antd-mobile';
import { type ReactNode } from 'react';

interface AntdProviderProps {
  children: ReactNode;
}

export const AntdProvider = (props: AntdProviderProps) => {
  const { children } = props;

  return <ConfigProvider>{children}</ConfigProvider>;
};
