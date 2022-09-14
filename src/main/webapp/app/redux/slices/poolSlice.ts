import { createAsyncThunk, createSlice, isPending, isRejected } from '@reduxjs/toolkit';
import { defaultValue } from 'app/models/pool.model';
import axios, { AxiosResponse } from 'axios';
import { PoolInitialState } from 'app/types/types';

const apiUrl = 'api/pool';

const initialState: PoolInitialState = {
  loading: false,
  errorMessage: null,
  list: [],
  entity: defaultValue,
  pagination: {
    totalElements: 0,
    totalPages: 0,
    numberOfElements: 0,
    number: 0,
    first: true,
    pageable: {
      pageNumber: 0,
      offset: 0,
      paged: true,
      pageSize: 6,
    },
  },
};

export const getPools = createAsyncThunk('pools/fetch_pool_list', async (payload, { getState }) => {
  const state = getState();
  // @ts-ignore
  const requestUrl = `${apiUrl}/page/${state.pool.pagination.pageable.pageNumber}/size/6`;
  return axios.get(requestUrl);
});

export const poolSlice = createSlice({
  name: 'pool',
  initialState: initialState,
  reducers: {
    moveToPage: (state, action) => {
      state.pagination.pageable.pageNumber = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getPools.fulfilled, (state, action) => {
        state.loading = false;
        // @ts-ignore
        state.pagination = action.payload.data;
        // @ts-ignore
        state.list = action.payload.data.content;
      })
      .addMatcher(isPending(getPools), state => {
        state.errorMessage = null;
        state.loading = true;
      })
      .addMatcher(isRejected(getPools), (state, action) => {
        state.loading = false;
        //state.errorMessage = action.error;
        // update error field
      });
  },
});
export const selectPoolsList = state => state.pool.list;
export const selectPoolsLoading = state => state.pool.loading;
export const selectPoolsPagination = state => state.pool.pagination;

export const { moveToPage } = poolSlice.actions;

export default poolSlice.reducer;
