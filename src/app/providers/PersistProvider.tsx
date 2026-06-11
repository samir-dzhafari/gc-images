import { FC, PropsWithChildren } from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from '../store/store.ts';

export const PersistProvider: FC<PropsWithChildren> = ({ children }) => {
	return <PersistGate persistor={persistor}>{children}</PersistGate>;
};
