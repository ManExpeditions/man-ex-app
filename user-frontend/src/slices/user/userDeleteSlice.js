import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import userAPI from '../../api/userAPI';

const initialState = {
  loading: false,
  success: null,
  error: null
};

export const deleteUser = createAsyncThunk(
  'deleteUser/deleteUser',
  async (_, { rejectWithValue, getState }) => {
    const {
      signinSlice: { user }
    } = getState();
    try {
      const data = await userAPI.deleteUser(user.id, user.token);
      return data;
    } catch (err) {
      if (!err.response) {
        throw err.message;
      }
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const userDeleteSlice = createSlice({
  name: 'deleteUser',
  initialState,
  reducers: {
    resetUserDelete: (state) => {
      state.loading = false;
      state.success = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.success = null;
        if (action.payload) {
          state.error = action.payload;
        } else {
          state.error = 'Delete failed. Try again later.';
        }
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload;
        state.error = null;
      });
  }
});

export const { resetUserDelete } = userDeleteSlice.actions;

export default userDeleteSlice.reducer;
