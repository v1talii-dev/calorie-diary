import { ConfigProvider, unstableSetRender } from 'antd-mobile'; // Support since version ^5.40.0
import ruRU from 'antd-mobile/es/locales/ru-RU';
import { memo, type ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import './reset.scss';
import './variables.scss';

// https://mobile.ant.design/guide/v5-for-19/
unstableSetRender((node, container) => {
  // @ts-ignore
  container._reactRoot ||= createRoot(container);
  // @ts-ignore
  const root = container._reactRoot;
  root.render(node);
  return async () => {
    await new Promise(resolve => setTimeout(resolve, 0));
    root.unmount();
  };
});

interface AntdProviderProps {
  children: ReactNode;
}

// TODO: обновить пакет после выхода antd-mobile@^5.39.1. Сейчас используется временная сборка для поддержки react 19.
// Подробнее: https://github.com/ant-design/ant-design-mobile/pull/6860
export const AntdProvider = memo((props: AntdProviderProps) => {
  const { children } = props;

  return <ConfigProvider locale={ruRU}>{children}</ConfigProvider>;
});
