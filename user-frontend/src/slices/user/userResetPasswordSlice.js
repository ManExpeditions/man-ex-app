import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import userAPI from '../../api/userAPI';

const initialState = {
  loading: false,
  message: null,
  error: null
};

export const userResetPassword = createAsyncThunk(
  'userResetPassword/userResetPassword',
  async ({ token, password }, { rejectWithValue, getState }) => {
    try {
      const data = await userAPI.userResetPassword(token, password);
      return data;
    } catch (err) {
      if (!err.response) {
        throw err.message;
      }
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const userForgotPasswordSlice = createSlice({
  name: 'userResetPassword',
  initialState,
  reducers: {
    resetUserResetPassword: (state) => {
      state.loading = false;
      state.message = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(userResetPassword.pending, (state) => {
        state.loading = true;
        state.message = null;
        state.error = null;
      })
      .addCase(userResetPassword.rejected, (state, action) => {
        state.loading = false;
        state.message = null;
        if (action.payload) {
          state.error = action.payload;
        } else {
          state.error = 'Password Reset Failed. Try again later.';
        }
      })
      .addCase(userResetPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload;
        state.error = null;
      });
  }
});

export const { resetUserResetPassword } = userForgotPasswordSlice.actions;

export default userForgotPasswordSlice.reducer;
