import cls from './style.module.scss';
import { LoginForm } from '@/widgets/loginForm';

export const LoginPage = () => {
  return (
    <div className={cls.loginPage}>
      <LoginForm className={cls.loginForm} />
    </div>
  );
};
