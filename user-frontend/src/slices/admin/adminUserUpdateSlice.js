import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import adminAPI from '../../api/adminAPI';

const initialState = {
  loading: false,
  user: null,
  error: null
};

export const adminUserUpdate = createAsyncThunk(
  'adminUserUpdate/adminUserUpdate',
  async ({ userId, userData }, { rejectWithValue, getState }) => {
    const {
      signinSlice: { user }
    } = getState();
    try {
      const data = await adminAPI.updateUser(userId, user.token, userData);
      return data;
    } catch (err) {
      if (!err.response) {
        throw err.message;
      }
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const adminUserUpdateSlice = createSlice({
  name: 'adminUserUpdate',
  initialState,
  reducers: {
    resetAdminUserUpdate: (state) => {
      state.loading = false;
      state.user = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(adminUserUpdate.pending, (state) => {
        state.loading = true;
        state.user = null;
        state.error = null;
      })
      .addCase(adminUserUpdate.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        if (action.payload) {
          state.error = action.payload;
        } else {
          state.error = 'User not updated. Try later.';
        }
      })
      .addCase(adminUserUpdate.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      });
  }
});

export const { resetAdminUserUpdate } = adminUserUpdateSlice.actions;

export default adminUserUpdateSlice.reducer;
