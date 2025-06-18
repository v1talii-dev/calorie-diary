import { AntDesign } from '../../providers/antDesign/AntDesign';
import { MainLayout } from '@/shared/layouts/mainLayout/MainLayout';
import { MainNavigation } from '@/widgets/mainNavigation/MainNavigation';

export const App = () => {
  return (
    <AntDesign>
      <MainLayout bottomNav={<MainNavigation />}>
        <div style={{ padding: 16 }}>
          <h1>TODO: content</h1>
        </div>
      </MainLayout>
    </AntDesign>
  );
};
