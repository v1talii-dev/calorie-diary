import { Button, Form, Input, Toast } from 'antd-mobile';
import { EyeInvisibleOutline, EyeOutline } from 'antd-mobile-icons';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { memo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { type AppDispatch } from '@/app';
import { type AuthProps, login } from '@/entities/user';
import { auth } from '@/shared/api/firebase.ts';
import { ROUTE } from '@/shared/const/router.ts';

interface LoginFormProps {
  className?: string;
}
export const LoginForm = memo((props: LoginFormProps) => {
  const { className } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const location = useLocation();

  const toggleVisibility = () => {
    setVisible(v => !v);
  };

  const onFinish = async (payload: AuthProps) => {
    try {
      setIsLoading(true);

      await signInWithEmailAndPassword(auth, payload.email, payload.password);

      // TODO: перевести источник истины авторизации на firebase
      dispatch(login(payload));
      navigate(location.state?.from?.pathname ?? ROUTE.DIARY.path(), {
        replace: true
      });
    } catch (error) {
      Toast.show({
        //@ts-ignore
        content: error.message,
        position: 'bottom'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form
      className={className}
      name='login'
      layout='vertical'
      initialValues={{ email: '', password: '' }}
      onFinish={onFinish}
      footer={
        <Button
          block
          type='submit'
          color='primary'
          size='large'
          disabled={isLoading}
          loading={isLoading}
        >
          Вход
        </Button>
      }
    >
      <Form.Header>Вход</Form.Header>

      <Form.Item
        label='Email'
        name='email'
        rules={[
          { required: true, message: 'Пожалуйста, введите email' },
          { type: 'email', message: 'Неверный формат email' }
        ]}
      >
        <Input placeholder='Введите email' />
      </Form.Item>

      <Form.Item
        label='Пароль'
        name='password'
        extra={
          <Button type='button' fill='none' onClick={toggleVisibility}>
            {visible ? <EyeOutline /> : <EyeInvisibleOutline />}
          </Button>
        }
        rules={[{ required: true, message: 'Пожалуйста, введите пароль' }]}
      >
        <Input
          type={visible ? 'text' : 'password'}
          placeholder='Введите пароль'
        />
      </Form.Item>
    </Form>
  );
});
