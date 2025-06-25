import { type RootState } from '@/app';

export const authToken = (state: RootState) => state.auth.token;
