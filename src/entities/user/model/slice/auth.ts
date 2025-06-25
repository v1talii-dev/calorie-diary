import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { AuthProps } from '../../types';
import { AUTH_TOKEN } from '@/shared/const/localstorage';

type AuthState = {
  token?: string;
};

const initialState: AuthState = {
  token: localStorage.getItem(AUTH_TOKEN) || undefined
};

const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: PayloadAction<AuthProps>) {
      const token = btoa(
        `${action.payload.username}:${action.payload.password}`
      );
      state.token = token;
      localStorage.setItem(AUTH_TOKEN, token);
    },
    logout(state) {
      state.token = undefined;
      localStorage.removeItem(AUTH_TOKEN);
    }
  }
});

export const { login, logout } = auth.actions;
export const authReducer = auth.reducer;
