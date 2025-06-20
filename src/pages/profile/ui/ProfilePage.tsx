import { Button } from 'antd-mobile';
import { useDispatch } from 'react-redux';
import { type AppDispatch } from '@/app';
import { logout } from '@/entities/user';

export const ProfilePage = () => {
  const dispatch = useDispatch<AppDispatch>();

  const onLogout = () => {
    dispatch(logout());
  };

  return (
    <Button block type='submit' onClick={onLogout}>
      Выйти
    </Button>
  );
};
