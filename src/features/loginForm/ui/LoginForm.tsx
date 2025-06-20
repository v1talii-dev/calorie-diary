import { Button, Form, Input } from 'antd-mobile';
import { memo } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { type AppDispatch } from '@/app';
import { login } from '@/entities/user';
import { ROUTE } from '@/shared/const/router.ts';

interface LoginFormProps {
  className?: string;
}
// TODO
type LoginFormValues = {
  username: string;
  password: string;
};

export const LoginForm = memo((props: LoginFormProps) => {
  const { className } = props;
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const location = useLocation();

  const onFinish = (values: LoginFormValues) => {
    console.log('onFinish:', values);
    dispatch(login());
    navigate(location.state?.from?.pathname ?? ROUTE.DIARY.path(), {
      replace: true
    });
  };

  return (
    <Form
      className={className}
      name='login'
      layout='vertical'
      initialValues={{ username: '', password: '' }}
      onFinish={onFinish}
      footer={
        <Button block type='submit' color='primary' size='large'>
          Вход
        </Button>
      }
    >
      <Form.Header>Вход</Form.Header>

      <Form.Item
        label='Имя пользователя'
        name='username'
        rules={[
          { required: true, message: 'Пожалуйста, введите имя пользователя!' }
        ]}
      >
        <Input placeholder='Введите имя пользователя' />
      </Form.Item>

      <Form.Item
        label='Пароль'
        name='password'
        rules={[{ required: true, message: 'Пожалуйста, введите пароль!' }]}
      >
        <Input type='password' placeholder='Введите пароль' />
      </Form.Item>
    </Form>
  );
});
