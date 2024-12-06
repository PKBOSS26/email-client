import { configureStore } from '@reduxjs/toolkit';
import emailReducer from './emailSlice';
import themeReducer from './themeSlice';

export const store = configureStore({
  reducer: {
    email: emailReducer,
    theme: themeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;