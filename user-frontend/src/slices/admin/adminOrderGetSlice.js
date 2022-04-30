import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import adminAPI from '../../api/adminAPI';

const initialState = {
  loading: false,
  order: null,
  error: null
};

export const adminOrderGet = createAsyncThunk(
  'adminOrderGet/adminOrderGet',
  async (orderId, { getState, rejectWithValue }) => {
    const {
      signinSlice: { user }
    } = getState();
    try {
      const data = await adminAPI.getOrder(orderId, user.token);
      return data;
    } catch (err) {
      if (!err.response) {
        throw err.message;
      }
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const adminOrderGetSlice = createSlice({
  name: 'adminOrderGet',
  initialState,
  reducers: {
    resetAdminOrderGet: (state) => {
      state.loading = false;
      state.order = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(adminOrderGet.pending, (state) => {
        state.loading = true;
        state.order = null;
        state.error = null;
      })
      .addCase(adminOrderGet.rejected, (state, action) => {
        state.loading = false;
        state.order = null;
        if (action.payload) {
          state.error = action.payload;
        } else {
          state.error = 'Unable to get order. Try later.';
        }
      })
      .addCase(adminOrderGet.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
        state.error = null;
      });
  }
});

export const { resetAdminOrderGet } = adminOrderGetSlice.actions;

export default adminOrderGetSlice.reducer;
