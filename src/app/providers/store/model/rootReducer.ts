import { combineReducers } from '@reduxjs/toolkit';
import { authReducer } from '@/entities/user';

export const rootReducer = combineReducers({
  auth: authReducer
});

export type RootState = ReturnType<typeof rootReducer>;
