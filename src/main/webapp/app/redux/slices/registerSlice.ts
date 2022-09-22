import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { serializeAxiosError } from 'app/helpers/utils/reducer.util';

const initialState = {
  loading: false,
  registrationSuccess: false,
  registrationFailure: false,
  errorMessage: null,
  profileImage: null,
  profileImageLoading: false,
  profileImageSuccess: false,
  profileImageFailure: false,
};

export type RegisterState = Readonly<typeof initialState>;

// Actions

export const handleRegister = createAsyncThunk(
  'register/create_account',
  async (data: {
    login?: string;
    email?: string;
    password?: string;
    address?: string;
    lastName?: string;
    firstName?: string;
    imageUrl?: string;
  }) => axios.post<any>('api/register', data),
  { serializeError: serializeAxiosError }
);

export const handleUploadProfileImage = createAsyncThunk('register/upload_profile_image', async (data: { file: File }) => {
  const formData = new FormData();
  // @ts-ignore
  formData.append('file', data);
  return axios.put('api/media/upload', formData, {
    onUploadProgress: progressEvent => {
      console.log('Uploading : ' + ((progressEvent.loaded / progressEvent.total) * 100).toString() + '%');
    },
  });
});
export const registerSlice = createSlice({
  name: 'register',
  initialState: initialState as RegisterState,
  reducers: {
    resetRegister() {
      return {
        ...initialState,
        registrationSuccess: false,
        registrationFailure: false,
        errorMessage: null,
        loading: false,
        profileImageFailure: false,
        profileImageLoading: false,
      };
    },
    resetImage() {
      return {
        ...initialState,
        profileImage: null,
        profileImageLoading: false,
        profileImageSuccess: false,
        profileImageFailure: false,
      };
    },
  },
  extraReducers(builder) {
    // @ts-ignore
    builder
      .addCase(handleRegister.pending, state => {
        state.loading = true;
      })
      .addCase(handleRegister.rejected, (state, action) => {
        console.log('rejected');
        // @ts-ignore
        console.log(action.error.response.data.message);
        return {
          ...initialState,
          registrationFailure: true,
          // @ts-ignore
          errorMessage: action.error.response.data.message,
        };
      })
      .addCase(handleRegister.fulfilled, () => ({
        ...initialState,
        registrationSuccess: true,
        successMessage: 'register.messages.success',
      }))
      .addCase(handleUploadProfileImage.pending, state => {
        state.profileImageLoading = true;
      })
      .addCase(handleUploadProfileImage.rejected, (state, action) => {
        return {
          ...state,
          profileImageLoading: false,
          profileImageFailure: true,
        };
      })
      .addCase(handleUploadProfileImage.fulfilled, (state, action) => {
        console.log('fulfilled');
        // @ts-ignore
        console.log(action.payload.data);
        return {
          ...state,
          profileImageLoading: false,
          profileImageSuccess: true,
          // @ts-ignore
          profileImage: action.payload.data,
        };
      });
  },
});

export const isRegisterLoading = (state: any) => state.register.loading;
export const isRegisterSuccess = (state: any) => state.register.registrationSuccess;
export const getIsRegisterFailure = (state: any) => state.register.registrationFailure;
export const getRegisterErrorMessage = (state: any) => state.register.errorMessage;
export const isProfileImageLoading = (state: any) => state.register.profileImageLoading;
export const isProfileImageSuccess = (state: any) => state.register.profileImageSuccess;
export const isProfileImageFailure = (state: any) => state.register.profileImageFailure;
export const getProfileImage = (state: any) => state.register.profileImage;

export const { resetRegister, resetImage } = registerSlice.actions;

// Reducer
export default registerSlice.reducer;
