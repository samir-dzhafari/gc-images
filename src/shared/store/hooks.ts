import { useDispatch, useSelector } from 'react-redux';
// eslint-disable-next-line boundaries/element-types
import { store } from '@app/store/store';
// @ts-ignore
import type { AppDispatch, RootState } from './store';

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
