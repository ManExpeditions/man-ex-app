import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import adminAPI from '../../api/adminAPI';

const initialState = {
  loading: false,
  users: null,
  error: null
};

export const adminUsersGet = createAsyncThunk(
  'adminUsersGet/adminUsersGet',
  async (_, { getState, rejectWithValue }) => {
    const {
      signinSlice: { user }
    } = getState();
    try {
      const data = await adminAPI.getUsers(user.token);
      return data;
    } catch (err) {
      if (!err.response) {
        throw err.message;
      }
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const adminUsersGetSlice = createSlice({
  name: 'adminUsersGet',
  initialState,
  reducers: {
    resetAdminUsersGet: (state) => {
      state.loading = false;
      state.users = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(adminUsersGet.pending, (state) => {
        state.loading = true;
        state.users = null;
        state.error = null;
      })
      .addCase(adminUsersGet.rejected, (state, action) => {
        state.loading = false;
        state.users = null;
        if (action.payload) {
          state.error = action.payload;
        } else {
          state.error = 'Unable to get users. Try later.';
        }
      })
      .addCase(adminUsersGet.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
        state.error = null;
      });
  }
});

export const { resetAdminUsersGet } = adminUsersGetSlice.actions;

export default adminUsersGetSlice.reducer;
