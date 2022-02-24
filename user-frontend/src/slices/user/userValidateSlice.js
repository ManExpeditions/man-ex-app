import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import userAPI from '../../api/userAPI';

const initialState = {
  loading: false,
  success: null,
  error: null
};

export const validateUser = createAsyncThunk(
  'validateUser/validateUser',
  async (password, { rejectWithValue, getState }) => {
    const {
      signinSlice: { user }
    } = getState();
    try {
      const data = await userAPI.validateUser(user.id, user.token, password);
      return data;
    } catch (err) {
      if (!err.response) {
        throw err.message;
      }
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const userValidateSlice = createSlice({
  name: 'validateUser',
  initialState,
  reducers: {
    resetUserValidate: (state) => {
      state.loading = false;
      state.success = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(validateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(validateUser.rejected, (state, action) => {
        state.loading = false;
        state.success = null;
        if (action.payload) {
          state.error = action.payload;
        } else {
          state.error = 'Validation failed. Try again later.';
        }
      })
      .addCase(validateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload;
        state.error = null;
      });
  }
});

export const { resetUserValidate } = userValidateSlice.actions;

export default userValidateSlice.reducer;
