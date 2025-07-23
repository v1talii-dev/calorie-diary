import { Button } from 'antd-mobile';
import { signOut } from 'firebase/auth';
import { memo, useState } from 'react';
import { auth } from '@/shared/api/firebase.ts';

export const ProfileActions = memo(() => {
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
    <Button
      block
      type='submit'
      disabled={isLoading}
      loading={isLoading}
      onClick={onLogout}
    >
      Выйти
    </Button>
  );
});
