import { Button } from 'antd-mobile';
import { memo } from 'react';
import { useDispatch } from 'react-redux';
import { type AppDispatch } from '@/app';
import { logout } from '@/entities/user';

export const ProfileActions = memo(() => {
  const dispatch = useDispatch<AppDispatch>();

  const onLogout = () => {
    dispatch(logout());
  };

  return (
    <Button block type='submit' onClick={onLogout}>
      Выйти
    </Button>
  );
});
