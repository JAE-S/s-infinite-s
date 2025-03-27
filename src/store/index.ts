/**
 * Redux Store Configuration
 *
 * Central Redux store setup for the application.
 * Features:
 * - Configures the global Redux store
 * - Combines session and API reducers
 * - Sets up RTK Query middleware and listeners
 * - Exports TypeScript types for state and dispatch
 */

// Redux Core Imports
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
// Relative Imports
import { productApi } from './apis/product_api';

export const store = configureStore({
  reducer: {
    [productApi.reducerPath]: productApi.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(productApi.middleware),
});

// Enable refetchOnFocus/refetchOnReconnect behaviors
setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
