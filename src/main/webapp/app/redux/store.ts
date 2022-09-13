import { configureStore } from '@reduxjs/toolkit';
import poolReducer from './slices/poolSlice';

export default configureStore({
  reducer: {
    pool: poolReducer,
  },
});
