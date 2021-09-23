import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import postsReducer from './postsSlice';

export const store = configureStore({
  reducer: {
    posts: postsReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) => (process.env.NODE_ENV !== 'production' ? getDefaultMiddleware().concat(logger) : getDefaultMiddleware()),
});
