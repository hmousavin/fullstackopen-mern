import { configureStore } from '@reduxjs/toolkit';
import { notificationReducer } from './notificationSlice';
import { authenticationReducer } from './authenticationSlice';

export const store = configureStore({
  reducer: {
    notificationSlice: notificationReducer,
    authenticationSlice: authenticationReducer,
  },
});
