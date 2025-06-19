import { Skeleton } from 'antd';
import React, { lazy, type ReactNode, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { PrivateRoute } from './PrivateRoute.tsx';
import { ROUTE } from '@/shared/const/router.ts';

type RouteElement = {
  path: string;
  isPrivate: boolean;
  Component: React.LazyExoticComponent<React.FC>;
};

const ROUTES: RouteElement[] = [
  {
    path: ROUTE.HOME.path(),
    isPrivate: ROUTE.HOME.isPrivate,
    Component: lazy(() => import('@/pages/home'))
  },
  {
    path: ROUTE.LOGIN.path(),
    isPrivate: ROUTE.LOGIN.isPrivate,
    Component: lazy(() => import('@/pages/login'))
  },
  {
    path: ROUTE.NOT_FOUND.path(),
    isPrivate: ROUTE.NOT_FOUND.isPrivate,
    Component: lazy(() => import('@/pages/notFound'))
  }
];

interface RouterProviderProps {
  children: ReactNode;
}

export const RouterProvider = (props: RouterProviderProps) => {
  const { children } = props;

  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <div style={{ padding: 16 }}>
            <Skeleton active paragraph={{ rows: 4 }} />
          </div>
        }
      >
        <Routes>
          {ROUTES.map(({ path, Component, isPrivate }) => (
            <Route
              key={path}
              path={path}
              element={
                isPrivate ? (
                  <PrivateRoute>{<Component />}</PrivateRoute>
                ) : (
                  <Component />
                )
              }
            />
          ))}
        </Routes>

        {children}
      </Suspense>
    </BrowserRouter>
  );
};
