import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { serializeAxiosError } from 'app/helpers/utils/reducer.util';
import { Storage } from 'react-jhipster';

const apiUrl = 'api/pool';

const initialState = {
  loading: false,
  errorMessage: null,
};

export const saveOrder = createAsyncThunk(
  'register/save_order',
  async (data: {
    login?: string;
    email?: string;
    password?: string;
    address?: string;
    lastName?: string;
    firstName?: string;
    imageUrl?: string;
  }) => axios.post<any>(`${apiUrl}/`, data),
  { serializeError: serializeAxiosError }
);

export const poolSlice = createSlice({
  name: 'order',
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(saveOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.errorMessage = null;
        Storage.local.set('order', action.payload.data);
      })
      .addCase(saveOrder.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.error.message;
      })
      .addCase(saveOrder.pending, state => {
        state.loading = true;
      });
  },
});
