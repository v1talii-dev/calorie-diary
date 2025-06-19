import { BrowserRouter } from 'react-router-dom';
import { AntProvider } from '../../providers/ant';
import { RouterProvider } from '../../providers/router';
import { StoreProvider } from '../../providers/store';
import { MainLayout } from '@/shared/layouts/mainLayout';
import { MainNavigation } from '@/widgets/mainNavigation';

export const App = () => {
  return (
    <StoreProvider>
      <AntProvider>
        <BrowserRouter>
          <MainLayout bottomNav={<MainNavigation />}>
            <RouterProvider />
          </MainLayout>
        </BrowserRouter>
      </AntProvider>
    </StoreProvider>
  );
};
