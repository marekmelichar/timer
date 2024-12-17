import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

// Configure Redux store :
const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
  },
});

/**
 * Data types
 */
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Correctly typed React hooks
// Use these instead of the original ones from react-redux library
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
