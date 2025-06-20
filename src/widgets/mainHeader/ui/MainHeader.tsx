import { NavBar } from 'antd-mobile';
import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { ROUTE } from '@/shared/const/router.ts';

export const MainHeader = () => {
  const location = useLocation();

  const routeMetadata = useMemo(() => {
    const routes = Object.values(ROUTE);
    return routes.find(el => el.path() === location.pathname);
  }, [location]);

  return <NavBar back={null}>{routeMetadata?.name}</NavBar>;
};
