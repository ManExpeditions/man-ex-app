import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import adminAPI from '../../api/adminAPI';

const initialState = {
  loading: false,
  user: null,
  error: null
};

export const adminUserGet = createAsyncThunk(
  'adminUserGet/adminUserGet',
  async (userId, { getState, rejectWithValue }) => {
    const {
      signinSlice: { user }
    } = getState();
    try {
      const data = await adminAPI.getUser(userId, user.token);
      return data;
    } catch (err) {
      if (!err.response) {
        throw err.message;
      }
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const adminUserGetSlice = createSlice({
  name: 'adminUserGet',
  initialState,
  reducers: {
    resetAdminUserGet: (state) => {
      state.loading = false;
      state.user = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(adminUserGet.pending, (state) => {
        state.loading = true;
        state.user = null;
        state.error = null;
      })
      .addCase(adminUserGet.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        if (action.payload) {
          state.error = action.payload;
        } else {
          state.error = 'Unable to get user. Try later.';
        }
      })
      .addCase(adminUserGet.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      });
  }
});

export const { resetAdminUserGet } = adminUserGetSlice.actions;

export default adminUserGetSlice.reducer;
