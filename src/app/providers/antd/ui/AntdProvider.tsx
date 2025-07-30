import { ConfigProvider, unstableSetRender } from 'antd-mobile';
import { type PopupProps } from 'antd-mobile/es/components/popup';
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

const customPopupStyle: Partial<PopupProps> = {
  bodyStyle: {
    paddingBottom: 'env(safe-area-inset-bottom)'
  }
};

export const AntdProvider = memo((props: AntdProviderProps) => {
  const { children } = props;

  return (
    <ConfigProvider locale={ruRU} popup={customPopupStyle}>
      {children}
    </ConfigProvider>
  );
});
