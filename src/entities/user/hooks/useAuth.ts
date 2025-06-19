import { useSelector } from 'react-redux';
import { selectIsAuth } from '../model/selectors/auth.ts';

export const useAuth = () => {
  const isAuth = useSelector(selectIsAuth);

  return { isAuth };
};
