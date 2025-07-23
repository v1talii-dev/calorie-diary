import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { rtkQueryApi } from '@/shared/api/rtkQuery.ts';

export const store = configureStore({
  reducer: combineReducers({
    [rtkQueryApi.reducerPath]: rtkQueryApi.reducer
  }),
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat([rtkQueryApi.middleware])
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
