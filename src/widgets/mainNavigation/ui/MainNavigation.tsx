import { TabBar } from 'antd-mobile';
import { FileOutline, HistogramOutline, UserOutline } from 'antd-mobile-icons';
import { memo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ROUTE } from '@/shared/const/router.ts';

const items = [
  {
    key: ROUTE.DIARY.path(),
    title: ROUTE.DIARY.name,
    icon: <FileOutline />
  },
  {
    key: ROUTE.STATISTIC.path(),
    title: ROUTE.STATISTIC.name,
    icon: <HistogramOutline />
  },
  {
    key: ROUTE.PROFILE.path(),
    title: ROUTE.PROFILE.name,
    icon: <UserOutline />
  }
];

export const MainNavigation = memo(() => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <TabBar activeKey={location.pathname} onChange={key => navigate(key)}>
      {items.map(item => (
        <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
      ))}
    </TabBar>
  );
});
