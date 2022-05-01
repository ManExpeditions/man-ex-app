import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import userAPI from '../../api/userAPI';

const initialState = {
  loading: false,
  userOrders: null,
  error: null
};

export const userGetOrders = createAsyncThunk(
  'userGetOrders/userGetOrders',
  async (status, { getState, rejectWithValue }) => {
    const {
      signinSlice: { user }
    } = getState();
    try {
      const data = await userAPI.getUserOrders(user.id, user.token, status);
      return data;
    } catch (err) {
      if (!err.response) {
        throw err.message;
      }
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const userGetOrdersSlice = createSlice({
  name: 'userGetOrders',
  initialState,
  reducers: {
    resetUserGetOrders: (state) => {
      state.loading = false;
      state.userOrders = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(userGetOrders.pending, (state) => {
        state.loading = true;
        state.userOrders = null;
        state.error = null;
      })
      .addCase(userGetOrders.rejected, (state, action) => {
        state.loading = false;
        state.userOrders = null;
        if (action.payload) {
          state.error = action.payload;
        } else {
          state.error = 'Unable to get user orders. Try later.';
        }
      })
      .addCase(userGetOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.userOrders = action.payload;
        state.error = null;
      });
  }
});

export const { resetUserGetOrders } = userGetOrdersSlice.actions;

export default userGetOrdersSlice.reducer;
