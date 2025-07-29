import { Button } from 'antd-mobile';
import { signOut } from 'firebase/auth';
import { useState } from 'react';
import { auth } from '@/shared/api/firebase.ts';

export const ProfileLogout = () => {
  const [isLoading, setIsLoading] = useState(false);

  const onLogout = async () => {
    try {
      setIsLoading(true);
      await signOut(auth);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button block disabled={isLoading} loading={isLoading} onClick={onLogout}>
      Выйти
    </Button>
  );
};
