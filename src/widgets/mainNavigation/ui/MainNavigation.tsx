import { TabBar } from 'antd-mobile';
import { FileOutline, UserOutline } from 'antd-mobile-icons';
import { useLocation, useNavigate } from 'react-router-dom';
import { ROUTE } from '@/shared/const/router.ts';

const items = [
  {
    key: ROUTE.HOME.path(),
    title: ROUTE.HOME.name,
    icon: <FileOutline />
  },
  {
    key: ROUTE.PROFILE.path(),
    title: ROUTE.PROFILE.name,
    icon: <UserOutline />
  }
];

export const MainNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <TabBar activeKey={location.pathname} onChange={key => navigate(key)}>
      {items.map(item => (
        <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
      ))}
    </TabBar>
  );
};
