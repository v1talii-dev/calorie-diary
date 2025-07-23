import { BrowserRouter } from 'react-router-dom';
import { AntdProvider } from '../../providers/antd';
import { FirebaseAuthProvider } from '../../providers/firebase';
import { RouterProvider } from '../../providers/router';
import { StoreProvider } from '../../providers/store';
import { MainHeader } from '@/widgets/mainHeader';
import { MainLayout } from '@/widgets/mainLayout';
import { MainNavigation } from '@/widgets/mainNavigation';
import './variables.scss';

export const App = () => {
  return (
    <FirebaseAuthProvider>
      <StoreProvider>
        <AntdProvider>
          <BrowserRouter>
            <MainLayout top={<MainHeader />} bottom={<MainNavigation />}>
              <RouterProvider />
            </MainLayout>
          </BrowserRouter>
        </AntdProvider>
      </StoreProvider>
    </FirebaseAuthProvider>
  );
};
