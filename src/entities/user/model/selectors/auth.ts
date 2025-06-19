import { type RootState } from '@/app';

export const selectIsAuth = (state: RootState) => state.auth.isAuth;
