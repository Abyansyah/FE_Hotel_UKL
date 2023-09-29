import { USER } from 'service';
import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  isLoadingGet: true,
  isSuccessGet: false,
  isErrorGet: false,
  user: null,
};

const User = createSlice({
  name: 'User',
  initialState,
  reducers: {
    fetchProfile: (state) => {
      return {
        ...state,
        isLoadingGet: true,
        isSuccess: false,
        isError: false,
        errorMessage: null,
      };
    },
    fetchProfileFailed: (state, action) => {
      return {
        ...state,
        isLoadingGet: false,
        isSuccess: false,
        isError: true,
        errorMessage: action?.payload?.meta?.message ?? action?.payload?.message ?? 'Something went wrong',
      };
    },
    fetchProfileSuccess: (state, action) => {
      return {
        ...state,
        isLoadingGet: false,
        isSuccess: true,
        isError: false,
        errorMessage: null,
        user: action?.payload?.data,
      };
    },
  },
});

const { fetchProfile, fetchProfileFailed, fetchProfileSuccess } = User.actions;

export const getProfile = () => {
  return async (dispatch) => {
    dispatch(dispatch(fetchProfile()));
    try {
      const response = await USER.getUser();
      const data = response?.data;
      if (data?.meta?.success) {
        dispatch(fetchProfileSuccess(data));
      } else {
        dispatch(fetchProfileFailed(data));
      }
    } catch (error) {
      dispatch(fetchProfileFailed(error));
    }
  };
};

export const action = User.actions;

export default User.reducer;
