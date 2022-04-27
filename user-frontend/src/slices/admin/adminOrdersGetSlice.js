import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import adminAPI from '../../api/adminAPI';

const initialState = {
  loading: false,
  orders: null,
  error: null
};

export const adminOrdersGet = createAsyncThunk(
  'adminOrdersGet/adminOrdersGet',
  async (_, { getState, rejectWithValue }) => {
    const {
      signinSlice: { user }
    } = getState();
    try {
      const data = await adminAPI.getOrders(user.token);
      return data;
    } catch (err) {
      if (!err.response) {
        throw err.message;
      }
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const adminOrdersGetSlice = createSlice({
  name: 'adminOrdersGet',
  initialState,
  reducers: {
    resetAdminOrdersGet: (state) => {
      state.loading = false;
      state.orders = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(adminOrdersGet.pending, (state) => {
        state.loading = true;
        state.orders = null;
        state.error = null;
      })
      .addCase(adminOrdersGet.rejected, (state, action) => {
        state.loading = false;
        state.orders = null;
        if (action.payload) {
          state.error = action.payload;
        } else {
          state.error = 'Unable to get orders. Try later.';
        }
      })
      .addCase(adminOrdersGet.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
        state.error = null;
      });
  }
});

export const { resetAdminOrdersGet } = adminOrdersGetSlice.actions;

export default adminOrdersGetSlice.reducer;
