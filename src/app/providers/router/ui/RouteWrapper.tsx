import type { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/entities/user';
import { ROUTE } from '@/shared/const/router.ts';

interface RouteWrapperProps {
  children: ReactNode;
  isPrivate: boolean;
}

export const RouteWrapper = (props: RouteWrapperProps) => {
  const { children, isPrivate } = props;
  const { isAuth } = useAuth();
  const location = useLocation();

  if (!isAuth && isPrivate) {
    return (
      <Navigate to={ROUTE.LOGIN.path()} replace state={{ from: location }} />
    );
  }

  if (isAuth && location.pathname === ROUTE.LOGIN.path()) {
    return (
      <Navigate
        to={location.state?.from ?? ROUTE.DIARY.path()}
        replace
        state={{ from: location }}
      />
    );
  }

  return children;
};
