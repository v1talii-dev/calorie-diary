import { useSelector } from 'react-redux';
import { authToken } from '../model/selectors/auth.ts';

export const useAuth = () => {
  const token = useSelector(authToken);

  return { isAuth: Boolean(token) };
};
