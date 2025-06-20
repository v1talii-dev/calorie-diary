import cls from './style.module.scss';
import { LoginForm } from '@/features/loginForm';

export const LoginPage = () => {
  return (
    <div className={cls.loginPage}>
      <LoginForm className={cls.loginForm} />
    </div>
  );
};
