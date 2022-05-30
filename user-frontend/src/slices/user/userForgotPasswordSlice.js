import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import userAPI from '../../api/userAPI';

const initialState = {
  loading: false,
  message: null,
  error: null
};

export const userForgotPassword = createAsyncThunk(
  'userForgotPassword/userForgotPassword',
  async (email, { rejectWithValue, getState }) => {
    try {
      const data = await userAPI.userForgotPassword(email);
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
  name: 'userForgotPassword',
  initialState,
  reducers: {
    resetForgotPassword: (state) => {
      state.loading = false;
      state.message = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(userForgotPassword.pending, (state) => {
        state.loading = true;
        state.message = null;
        state.error = null;
      })
      .addCase(userForgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.message = null;
        if (action.payload) {
          state.error = action.payload;
        } else {
          state.error = 'Password Reset Failed. Try again later.';
        }
      })
      .addCase(userForgotPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload;
        state.error = null;
      });
  }
});

export const { resetForgotPassword } = userForgotPasswordSlice.actions;

export default userForgotPasswordSlice.reducer;
