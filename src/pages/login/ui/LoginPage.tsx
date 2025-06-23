import { memo } from 'react';
import cls from './style.module.scss';
import { LoginForm } from '@/features/loginForm';
import { AppFlex } from '@/shared/ui/appFlex';

export const LoginPage = memo(() => {
  return (
    <AppFlex align='center' justify='center' fullHeight={true}>
      <LoginForm className={cls.loginForm} />
    </AppFlex>
  );
});
