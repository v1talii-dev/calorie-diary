import { memo } from 'react';
import { ProfileLogout } from '../profileLogout/ProfileLogout.tsx';
import { ProfileSettings } from '../profileSettings/ProfileSettings.tsx';
import { AppFlex } from '@/shared/ui/appFlex';

export const ProfileActions = memo(() => {
  return (
    <AppFlex gap={16}>
      <ProfileSettings></ProfileSettings>
      <ProfileLogout></ProfileLogout>
    </AppFlex>
  );
});
