import { configureStore } from '@reduxjs/toolkit';
import poolReducer from './slices/poolSlice';

export default configureStore({
  reducer: {
    pool: poolReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['pools/fetch_pool_list/fulfilled', 'pools/fetch_pool_list_by_search/fulfilled'],
      },
    }),
});
