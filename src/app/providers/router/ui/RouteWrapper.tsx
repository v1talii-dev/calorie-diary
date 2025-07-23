import { memo, type ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useFirebaseAuth } from '@/app/providers/firebase';
import { ROUTE } from '@/shared/const/router.ts';

interface RouteWrapperProps {
  children: ReactNode;
  isPrivate: boolean;
}

export const RouteWrapper = memo((props: RouteWrapperProps) => {
  const { children, isPrivate } = props;
  const { user } = useFirebaseAuth();
  const location = useLocation();

  if (!user && isPrivate) {
    return (
      <Navigate to={ROUTE.LOGIN.path()} replace state={{ from: location }} />
    );
  }

  if (user && location.pathname === ROUTE.LOGIN.path()) {
    return (
      <Navigate
        to={location.state?.from ?? ROUTE.DIARY.path()}
        replace
        state={{ from: location }}
      />
    );
  }

  return children;
});
