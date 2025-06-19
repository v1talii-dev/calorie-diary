import type { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { selectIsAuth } from '@/entities/user';

interface PrivateRouteProps {
  children: ReactNode;
}

export const PrivateRoute = (props: PrivateRouteProps) => {
  const { children } = props;
  const isAuth = useSelector(selectIsAuth);
  const location = useLocation();

  return isAuth ? (
    children
  ) : (
    <Navigate to='/login' replace state={{ from: location }} />
  );
};
