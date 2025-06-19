import { Col, Row } from 'antd';
import cls from './style.module.scss';
import { LoginForm } from '@/widgets/loginForm';

export const LoginPage = () => {
  return (
    <Row justify='center' align='middle' className={cls.loginPage}>
      <Col>
        <LoginForm className={cls.loginForm} />
      </Col>
    </Row>
  );
};
