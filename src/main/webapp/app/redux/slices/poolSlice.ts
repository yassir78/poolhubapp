import { createAsyncThunk, createSlice, isFulfilled, isPending, isRejected } from '@reduxjs/toolkit';
import { defaultValue } from 'app/models/pool.model';
import axios from 'axios';
import { PoolInitialState } from 'app/types/types';

const apiUrl = 'api/pool';

const initialState: PoolInitialState = {
  loading: false,
  errorMessage: null,
  list: [],
  entity: defaultValue,
  isPoolSearch: false,
  poolSearch: {
    forms: [],
    categories: [],
    label: '',
    priceMin: null,
    priceMax: null,
    volumeMin: null,
    volumeMax: null,
  },
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
  pool: null,
};

export const getPools = createAsyncThunk('pools/fetch_pool_list', async (payload, { getState }) => {
  const state = getState();
  // @ts-ignore
  const page = state.pool.pagination.pageable.pageNumber;
  // @ts-ignore
  const requestUrl = `${apiUrl}/page/${state.pool.pagination.pageable.pageNumber}/size/6`;
  return axios.get(requestUrl);
});
export const getPoolsBySearch = createAsyncThunk('pools/fetch_pool_list_by_search', async (payload, { getState }) => {
  const state = getState();
  // @ts-ignore
  const page = state.pool.pagination.pageable.pageNumber;
  // @ts-ignore
  const poolSearchOtions = state.pool.poolSearch;
  // @ts-ignore
  const requestUrl = `${apiUrl}/search/page/${page}/size/6`;
  return axios({
    method: 'POST',
    url: requestUrl,
    data: {
      label: poolSearchOtions.label,
      forms: poolSearchOtions.forms,
      categories: poolSearchOtions.categories,
      priceMin: poolSearchOtions.priceMin,
      priceMax: poolSearchOtions.priceMax,
      volumeMin: poolSearchOtions.volumeMin,
      volumeMax: poolSearchOtions.volumeMax,
    },
  });
});

export const poolSlice = createSlice({
  name: 'pool',
  initialState: initialState,
  reducers: {
    moveToPage: (state, action) => {
      state.pagination.pageable.pageNumber = action.payload;
    },
    setPoolSearch: (state, action) => {
      state.poolSearch.label = action.payload.search;
      state.poolSearch.priceMin = action.payload.priceMin;
      state.poolSearch.priceMax = action.payload.priceMax;
      state.poolSearch.volumeMin = action.payload.volumeMin;
      state.poolSearch.volumeMax = action.payload.volumeMax;
      state.poolSearch.forms = action.payload.forms;
      state.poolSearch.categories = action.payload.categories;
      state.isPoolSearch = true;
      state.pagination.pageable = {
        pageNumber: 0,
      };
    },
    setPool: (state, action) => {
      state.pool = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addMatcher(isFulfilled(getPools, getPoolsBySearch), (state, action) => {
        state.loading = false;
        // @ts-ignore
        state.pagination = action.payload.data;
        // @ts-ignore
        state.list = action.payload.data.content;
      })
      .addMatcher(isPending(getPools, getPoolsBySearch), state => {
        state.errorMessage = null;
        state.loading = true;
      })
      .addMatcher(isRejected(getPools, getPoolsBySearch), (state, action) => {
        state.loading = false;
        //state.errorMessage = action.error;
        // update error field
      });
  },
});
export const selectPoolsList = state => state.pool.list;
export const selectPoolsLoading = state => state.pool.loading;
export const selectPoolsPagination = state => state.pool.pagination;
export const selectPoolsSearch = state => state.pool.isPoolSearch;
export const selectPoolsSearchOptions = state => state.pool.poolSearch;
export const selectPool = state => state.pool.pool;
export const { moveToPage, setPoolSearch, setPool } = poolSlice.actions;

export default poolSlice.reducer;
