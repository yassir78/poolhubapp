import { createAsyncThunk, createSlice, isPending, isRejected } from '@reduxjs/toolkit';
import { defaultValue } from 'app/models/pool.model';
import axios from 'axios';

const apiUrl = 'api/pool';

const initialState = {
  loading: false,
  errorMessage: null,
  list: [],
  entity: defaultValue,
};

export const getPools = createAsyncThunk('pools/fetch_pool_list', async () => {
  const requestUrl = `${apiUrl}/`;
  return axios.get(requestUrl);
});

export const poolSlice = createSlice({
  name: 'pool',
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getPools.fulfilled, (state, action) => {
        console.log('action is fulfilled');
        state.loading = false;
        //state.entity = action.payload.data;
      })
      .addMatcher(isPending(getPools), state => {
        console.log('action is pending');
        state.errorMessage = null;
        state.loading = true;
      })
      .addMatcher(isRejected(getPools), (state, action) => {
        console.log('action is rejected');
        state.loading = false;
        //state.errorMessage = action.error;
        // update error field
      });
  },
});

//export const {increment, decrement, incrementByAmount} = poolSlice.actions;

export default poolSlice.reducer;
