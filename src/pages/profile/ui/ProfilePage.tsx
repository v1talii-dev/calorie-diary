import { memo } from 'react';
import { ProfileActions } from '@/features/profileActions';
import { AppFlex } from '@/shared/ui/appFlex';

export const ProfilePage = memo(() => {
  return (
    <AppFlex>
      <ProfileActions />
    </AppFlex>
  );
});
