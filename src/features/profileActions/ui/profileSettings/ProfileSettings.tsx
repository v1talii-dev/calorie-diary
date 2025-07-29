import { Button, Form, Input, Popup } from 'antd-mobile';
import { useEffect, useState } from 'react';
import {
  useAddUserSettingsEntryMutation,
  useEditUserSettingsEntryMutation,
  useGetUserSettingsEntryQuery
} from '@/entities/user';

export const ProfileSettings = () => {
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const { data: userSettings, isLoading: isLoadingUserSettings } =
    useGetUserSettingsEntryQuery();
  const [addUserSettingsEntry, { isLoading: isLoadingAdd }] =
    useAddUserSettingsEntryMutation();
  const [editUserSettingsEntry, { isLoading: isLoadingEdit }] =
    useEditUserSettingsEntryMutation();

  const handleSubmit = async () => {
    try {
      const formProps = form.getFieldsValue(true);
      const payload = {
        id: formProps?.id,
        calories_limit: Number(formProps.calories_limit)
      };
      const apiMethod = payload.id
        ? editUserSettingsEntry
        : addUserSettingsEntry;
      await apiMethod(payload).unwrap();
      setVisible(false);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (visible && userSettings) {
      form.setFieldsValue(userSettings);
    }
  }, [form, userSettings, visible]);

  return (
    <>
      <Button
        block
        disabled={isLoadingUserSettings}
        onClick={() => setVisible(true)}
      >
        Настройки
      </Button>

      <Popup
        visible={visible}
        destroyOnClose
        position='bottom'
        onMaskClick={() => setVisible(false)}
      >
        <Form
          form={form}
          onFinish={handleSubmit}
          footer={
            <Button
              type='submit'
              block
              color='primary'
              disabled={isLoadingAdd || isLoadingEdit}
              loading={isLoadingAdd || isLoadingEdit}
            >
              Сохранить
            </Button>
          }
        >
          <Form.Header>Настройки профиля</Form.Header>

          <Form.Item
            name='calories_limit'
            label='Лимит калорий в день'
            rules={[{ required: true, message: 'Укажите лимит' }]}
          >
            <Input type='number' placeholder='Например, 2000' />
          </Form.Item>
        </Form>
      </Popup>
    </>
  );
};
