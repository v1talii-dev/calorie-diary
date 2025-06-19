import React, { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { RouteWrapper } from './RouteWrapper.tsx';
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
    path: ROUTE.PROFILE.path(),
    isPrivate: ROUTE.PROFILE.isPrivate,
    Component: lazy(() => import('@/pages/profile'))
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

export const RouterProvider = () => {
  return (
    // TODO: fallback loader
    <Suspense fallback={<div>loading...</div>}>
      <Routes>
        {ROUTES.map(({ path, Component, isPrivate }) => (
          <Route
            key={path}
            path={path}
            element={
              <RouteWrapper isPrivate={isPrivate}>
                <Component />
              </RouteWrapper>
            }
          />
        ))}
      </Routes>
    </Suspense>
  );
};
