import { HomeOutlined, UserOutlined } from '@ant-design/icons';
import { Menu, type MenuProps } from 'antd';
import type { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import cls from './style.module.scss';
import { type Route, ROUTE } from '@/shared/const/router.ts';

const ItemLabel = ({ item, icon }: { item: Route; icon: ReactNode }) => (
  <Link to={item.path()} className={cls.menuLink}>
    {icon}
    <div className={cls.menuLinkText}>{item.name}</div>
  </Link>
);

const items: MenuProps['items'] = [
  {
    label: (
      <ItemLabel
        item={ROUTE.HOME}
        icon={<HomeOutlined className={cls.menuLinkIcon} />}
      />
    ),
    key: ROUTE.HOME.path()
  },
  {
    label: (
      <ItemLabel
        item={ROUTE.PROFILE}
        icon={<UserOutlined className={cls.menuLinkIcon} />}
      />
    ),
    key: ROUTE.PROFILE.path()
  }
];

export const MainNavigation = () => {
  const location = useLocation();

  return (
    <Menu
      className={cls.mainNavigation}
      selectedKeys={[location.pathname]}
      mode='horizontal'
      items={items}
    />
  );
};
