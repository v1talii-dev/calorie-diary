import { App, ConfigProvider } from 'antd';
import { type ReactNode } from 'react';
import '@ant-design/v5-patch-for-react-19';
import 'antd/dist/reset.css';

interface AntProviderProps {
  children: ReactNode;
}

export const AntProvider = (props: AntProviderProps) => {
  const { children } = props;

  return (
    <ConfigProvider>
      <App>{children}</App>
    </ConfigProvider>
  );
};
