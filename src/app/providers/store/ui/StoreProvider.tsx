import { memo, type ReactNode } from 'react';
import { Provider } from 'react-redux';
import { store } from '../model/store';

interface StoreProviderProps {
  children: ReactNode;
}

export const StoreProvider = memo((props: StoreProviderProps) => {
  const { children } = props;

  return <Provider store={store}>{children}</Provider>;
});
