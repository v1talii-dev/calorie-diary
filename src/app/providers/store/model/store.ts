import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { authReducer } from '@/entities/user';
import { rtkQueryApi } from '@/shared/api/rtkQuery.ts';

export const store = configureStore({
  reducer: combineReducers({
    [rtkQueryApi.reducerPath]: rtkQueryApi.reducer,
    auth: authReducer
  }),
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat([rtkQueryApi.middleware])
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
