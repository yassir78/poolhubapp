import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import { serializeAxiosError } from 'app/helpers/utils/reducer.util';
import { Storage } from 'react-jhipster';

const AUTH_TOKEN_KEY = 'jhi-authenticationToken';

export const initialState = {
  loading: false,
  isAuthenticated: false,
  loginSuccess: false,
  loginError: false, // Errors returned from server side
  showModalLogin: false,
  account: {} as any,
  errorMessage: null as unknown as string, // Errors returned from server side
  redirectMessage: null as unknown as string,
  sessionHasBeenFetched: false,
  logoutUrl: null as unknown as string,
  protectedRoute: Storage.local.get('protectedRoute'),
};

interface IAuthParams {
  username: string;
  password: string;
  rememberMe?: boolean;
}

export const authenticate = createAsyncThunk(
  'authentication/login',
  async (auth: IAuthParams) => axios.post<any>('api/authenticate', auth),
  {
    serializeError: serializeAxiosError,
  }
);

export const getSession = () => async (dispatch, getState) => {
  console.log("i'm inside the getSession function 😊😊");
  if (Storage.local.get(AUTH_TOKEN_KEY)) {
    await dispatch(getAccount());
  }
};
export const login =
  (username, password, rememberMe = false) =>
  async dispatch => {
    // @ts-ignore
    dispatch(clearAuthentication());
    console.log("i'm inside the login action 😊😊");
    const result = await dispatch(authenticate({ username, password, rememberMe }));
    const response = result.payload as AxiosResponse;
    const bearerToken = response?.headers?.authorization;
    if (bearerToken && bearerToken.slice(0, 7) === 'Bearer ') {
      const jwt = bearerToken.slice(7, bearerToken.length);
      Storage.local.set(AUTH_TOKEN_KEY, jwt);
    }
    // @ts-ignore
    dispatch(getSession());
  };

export const clearAuthToken = () => {
  if (Storage.local.get(AUTH_TOKEN_KEY)) {
    Storage.local.remove(AUTH_TOKEN_KEY);
  }
  if (Storage.session.get(AUTH_TOKEN_KEY)) {
    Storage.session.remove(AUTH_TOKEN_KEY);
  }
};

export const logout = () => {
  clearAuthToken();
  //dispatch(logoutSession());
};

export const getAccount = createAsyncThunk('authentication/get_account', async () => axios.get<any>('api/account'), {
  serializeError: serializeAxiosError,
});

export const clearAuthentication = () => async (dispatch, getState) => {
  clearAuthToken();
  //dispatch(authError(messageKey));
  dispatch(clearAuth());
};

export const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    setProtectedRoute: (state, action) => {
      state.protectedRoute = action.payload;
    },
    logoutSession() {
      return {
        ...initialState,
        showModalLogin: true,
      };
    },
    authError(state, action) {
      return {
        ...state,
        showModalLogin: true,
        redirectMessage: action.payload,
      };
    },
    clearAuth(state) {
      return {
        ...state,
        loading: false,
        showModalLogin: true,
        isAuthenticated: false,
        errorMessage: null,
        loginError: false,
      };
    },
  },
  extraReducers(builder) {
    builder
      .addCase(authenticate.rejected, (state, action) => ({
        ...initialState,
        errorMessage: action.error.message,
        showModalLogin: true,
        loginError: true,
      }))
      .addCase(authenticate.fulfilled, state => ({
        ...state,
        loading: false,
        loginError: false,
        showModalLogin: false,
        loginSuccess: true,
      }))
      .addCase(getAccount.rejected, (state, action) => ({
        ...state,
        loading: false,
        isAuthenticated: false,
        sessionHasBeenFetched: true,
        showModalLogin: true,
        errorMessage: action.error.message,
      }))
      .addCase(getAccount.fulfilled, (state, action) => {
        const isAuthenticated = action.payload && action.payload.data && action.payload.data.activated;
        return {
          ...state,
          isAuthenticated,
          loading: false,
          sessionHasBeenFetched: true,
          account: action.payload.data,
        };
      })
      .addCase(authenticate.pending, state => {
        state.loading = true;
      })
      .addCase(getAccount.pending, state => {
        state.loading = true;
      });
  },
});

export const { logoutSession, authError, clearAuth, setProtectedRoute } = authSlice.actions;
export const selectAccount = state => state.auth.account;
export const selectLoginError = state => state.auth.loginError;
export const selectLoginSuccess = state => state.auth.loginSuccess;
export const selectLoading = state => state.auth.loading;
export const isAuthenticated = state => state.auth.isAuthenticated;
export const getProtectedRoute = state => state.auth.protectedRoute;

export default authSlice.reducer;
