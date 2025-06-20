import { BrowserRouter } from 'react-router-dom';
import { AntdProvider } from '../../providers/antd';
import { RouterProvider } from '../../providers/router';
import { StoreProvider } from '../../providers/store';
import { MainLayout } from '@/widgets/mainLayout';
import { MainNavigation } from '@/widgets/mainNavigation';

export const App = () => {
  return (
    <StoreProvider>
      <AntdProvider>
        <BrowserRouter>
          <MainLayout bottomNav={<MainNavigation />}>
            <RouterProvider />
          </MainLayout>
        </BrowserRouter>
      </AntdProvider>
    </StoreProvider>
  );
};
