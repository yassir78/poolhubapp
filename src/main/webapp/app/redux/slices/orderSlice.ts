import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { serializeAxiosError } from 'app/helpers/utils/reducer.util';
import { Storage } from 'react-jhipster';

const apiUrl = 'api/order';

const initialState = {
  loading: false,
  errorMessage: null,
  isSavingOrderFailure: false,
  isSavingOrderSuccess: false,
};

export const saveOrder = createAsyncThunk(
  'register/save_order',
  async (data: {
    login?: string;
    email?: string;
    password?: string;
    address?: string;
    lastName?: string;
    pool?: any;
    phone?: string;
    shippingAddress: string;
    zipCode?: string;
    city?: string;
    firstName?: string;
    sum?: number;
  }) => axios.post<any>(`${apiUrl}/`, data),
  { serializeError: serializeAxiosError }
);

export const orderSlice = createSlice({
  name: 'order',
  initialState: initialState,
  reducers: {
    resetOrder: (state, action) => {
      state.errorMessage = null;
      state.isSavingOrderFailure = false;
      state.isSavingOrderSuccess = false;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(saveOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.errorMessage = null;
        state.isSavingOrderSuccess = true;
        Storage.local.set('order', action.payload.data);
      })
      .addCase(saveOrder.rejected, (state, action) => {
        state.loading = false;
        state.isSavingOrderFailure = true;
        state.errorMessage = action.error.message;
      })
      .addCase(saveOrder.pending, state => {
        state.loading = true;
      });
  },
});

export const getIsSavingOrderFailure = state => state.order.isSavingOrderFailure;
export const getErrorMessage = state => state.order.errorMessage;
export const getIsSavingOrderSuccess = state => state.order.isSavingOrderSuccess;
export const { resetOrder } = orderSlice.actions;
export default orderSlice.reducer;
