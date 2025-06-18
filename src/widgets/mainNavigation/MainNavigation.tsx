import { HomeOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';

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
