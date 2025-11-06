import { ConfigProvider } from 'antd-mobile';
import { type PopupProps } from 'antd-mobile/es/components/popup';
import ruRU from 'antd-mobile/es/locales/ru-RU';
import { memo, type ReactNode } from 'react';
import './reset.scss';
import './variables.scss';

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
