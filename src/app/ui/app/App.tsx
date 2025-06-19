import { Outlet } from 'react-router-dom';
import { AntProvider } from '../../providers/ant';
import { RouterProvider } from '../../providers/router';
import { StoreProvider } from '../../providers/store';
import { MainLayout } from '@/shared/layouts/mainLayout/MainLayout.tsx';
import { MainNavigation } from '@/widgets/mainNavigation/MainNavigation.tsx';

export const App = () => {
  return (
    <StoreProvider>
      <RouterProvider>
        <AntProvider>
          <MainLayout bottomNav={<MainNavigation />}>
            <Outlet />
          </MainLayout>
        </AntProvider>
      </RouterProvider>
    </StoreProvider>
  );
};
