import { Form, Input, PullToRefresh } from 'antd-mobile';
import { memo, useEffect } from 'react';
import cls from './style.module.scss';
import { useGetUserSettingsEntryQuery } from '@/entities/user';
import { ProfileActions } from '@/features/profileActions';
import { auth } from '@/shared/api/firebase.ts';
import { AppFlex } from '@/shared/ui/appFlex';
import { AppFormSkeleton } from '@/shared/ui/appSkeleton';

export const ProfilePage = memo(() => {
  const {
    data: userSettings,
    isFetching: isFetchingUserSettings,
    refetch: refreshUserSettings
  } = useGetUserSettingsEntryQuery();
  const [form] = Form.useForm();

  useEffect(() => {
    if (!isFetchingUserSettings) {
      form.setFieldsValue({
        email: auth?.currentUser?.email,
        calorie_limit: userSettings?.calories_limit
      });
    }
  }, [form, userSettings, isFetchingUserSettings]);

  return (
    <PullToRefresh onRefresh={() => refreshUserSettings()}>
      {isFetchingUserSettings ? (
        <AppFormSkeleton count={3} />
      ) : (
        <AppFlex>
          <Form form={form} mode='card' className={cls.profileForm}>
            <Form.Item label='Электронная почта' name='email'>
              <Input readOnly></Input>
            </Form.Item>
            <Form.Item label='Лимит калорий на день' name='calorie_limit'>
              <Input readOnly></Input>
            </Form.Item>
          </Form>
          <ProfileActions />
        </AppFlex>
      )}
    </PullToRefresh>
  );
});
