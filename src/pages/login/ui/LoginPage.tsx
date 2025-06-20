import { Grid } from 'antd-mobile';
import cls from './style.module.scss';
import { LoginForm } from '@/widgets/loginForm';

export const LoginPage = () => {
  return (
    <Grid columns={1} className={cls.loginPage}>
      <Grid.Item>
        <LoginForm className={cls.loginForm} />
      </Grid.Item>
    </Grid>
  );
};
