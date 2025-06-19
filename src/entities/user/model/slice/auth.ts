import { createSlice } from '@reduxjs/toolkit';
import { USER_AUTH } from '@/shared/const/localstorage';

type AuthState = {
  isAuth: boolean;
};

const initialState: AuthState = {
  isAuth: !!localStorage.getItem(USER_AUTH)
};

const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state) {
      localStorage.setItem(USER_AUTH, 'demo_token');
      state.isAuth = true;
    },
    logout(state) {
      localStorage.removeItem(USER_AUTH);
      state.isAuth = false;
    }
  }
});

export const { login, logout } = auth.actions;
export const authReducer = auth.reducer;
