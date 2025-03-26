// React Core Imports
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
// Relative Imports
import type { RootState, AppDispatch } from './index.ts';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
