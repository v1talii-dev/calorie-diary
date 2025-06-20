import { DotLoading } from 'antd-mobile';
import { memo } from 'react';
import { AppFlex } from '@/shared/ui/appFlex';

export const MainLoading = memo(() => {
  return (
    <AppFlex align='center' justify='center' full>
      <DotLoading color='primary' style={{ fontSize: 24 }} />
    </AppFlex>
  );
});
