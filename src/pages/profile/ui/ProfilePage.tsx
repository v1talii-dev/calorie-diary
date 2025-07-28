import { memo } from 'react';
import { useGetUserSettingsQuery } from '@/entities/user';
import { ProfileActions } from '@/features/profileActions';
import { AppFlex } from '@/shared/ui/appFlex';

export const ProfilePage = memo(() => {
  const { data: userSettings } = useGetUserSettingsQuery();

  return (
    <AppFlex>
      <pre>{JSON.stringify(userSettings, null, 2)}</pre>
      <ProfileActions />
    </AppFlex>
  );
});
