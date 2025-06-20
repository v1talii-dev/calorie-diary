import { ConfigProvider } from 'antd-mobile';
import { memo, type ReactNode } from 'react';
import './reset.scss';

interface AntdProviderProps {
  children: ReactNode;
}

// TODO: обновить пакет после выхода antd-mobile@^5.39.1. Сейчас используется временная сборка для поддержки react 19.
// Подробнее: https://github.com/ant-design/ant-design-mobile/pull/6860
export const AntdProvider = memo((props: AntdProviderProps) => {
  const { children } = props;

  return <ConfigProvider>{children}</ConfigProvider>;
});
