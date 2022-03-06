import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import adminAPI from '../../api/adminAPI';

const initialState = {
  loading: false,
  group: null,
  error: null
};

export const adminGroupDelete = createAsyncThunk(
  'adminGroupDelete/adminGroupDelete',
  async ({ experienceId, groupId }, { rejectWithValue, getState }) => {
    const {
      signinSlice: { user }
    } = getState();
    try {
      const data = await adminAPI.deleteGroup(
        experienceId,
        groupId,
        user.token
      );
      return data;
    } catch (err) {
      if (!err.response) {
        throw err.message;
      }
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const adminGroupDeleteSlice = createSlice({
  name: 'adminGroupDelete',
  initialState,
  reducers: {
    resetAdminGroupDelete: (state) => {
      state.loading = false;
      state.group = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(adminGroupDelete.pending, (state) => {
        state.loading = true;
        state.group = null;
        state.error = null;
      })
      .addCase(adminGroupDelete.rejected, (state, action) => {
        state.loading = false;
        state.group = null;
        if (action.payload) {
          state.error = action.payload;
        } else {
          state.error = 'Group not deleted. Try later.';
        }
      })
      .addCase(adminGroupDelete.fulfilled, (state, action) => {
        state.loading = false;
        state.group = action.payload;
        state.error = null;
      });
  }
});

export const { resetAdminGroupDelete } = adminGroupDeleteSlice.actions;

export default adminGroupDeleteSlice.reducer;
