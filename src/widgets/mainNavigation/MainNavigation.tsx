import { HomeOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '@/entities/user';
import { ROUTE } from '@/shared/const/router.ts';

const items: MenuProps['items'] = [
  {
    label: 'Журнал',
    key: 'home',
    icon: <HomeOutlined />
  },
  {
    label: 'Профиль',
    key: 'profile',
    icon: <UserOutlined />
  }
];

export const MainNavigation = () => {
  const { isAuth } = useAuth();
  const location = useLocation();

  const hasNavigation = useMemo(
    () => isAuth && location.pathname !== ROUTE.LOGIN.path(),
    [isAuth, location.pathname]
  );

  if (!hasNavigation) {
    return <></>;
  }

  return (
    <Menu
      mode='horizontal'
      items={items}
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        borderTop: '1px solid #eee',
        zIndex: 1000
      }}
    />
  );
};
