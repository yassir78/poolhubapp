import { configureStore } from '@reduxjs/toolkit';
import poolReducer from './slices/poolSlice';
import authReducer from './slices/authSlice';
import registerReducer from 'app/redux/slices/registerSlice';

export default configureStore({
  reducer: {
    pool: poolReducer,
    auth: authReducer,
    register: registerReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          'pools/fetch_pool_list/fulfilled',
          'pools/fetch_pool_list_by_search/fulfilled',
          'authentication/login/pending',
          'authentication/login/fulfilled',
          'authentication/login/rejected',
          'authentication/account/pending',
          'authentication/account/fulfilled',
          'authentication/account/rejected',
          'authentication/get_account/fulfilled',
          'authentication/get_account/pending',
          'authentication/get_account/rejected',
        ],
      },
    }),
});
