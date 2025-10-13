import { HashRouter } from 'react-router-dom';
import { AntdProvider } from '../../providers/antd';
import { FirebaseAuthProvider } from '../../providers/firebase';
import { RouterProvider } from '../../providers/router';
import { StoreProvider } from '../../providers/store';
import '../../providers/dayjs';
import { MainHeader } from '@/widgets/mainHeader';
import { MainLayout } from '@/widgets/mainLayout';
import { MainNavigation } from '@/widgets/mainNavigation';
import './variables.scss';

export const App = () => {
  return (
    <FirebaseAuthProvider>
      <StoreProvider>
        <AntdProvider>
          <HashRouter>
            <MainLayout top={<MainHeader />} bottom={<MainNavigation />}>
              <RouterProvider />
            </MainLayout>
          </HashRouter>
        </AntdProvider>
      </StoreProvider>
    </FirebaseAuthProvider>
  );
};
