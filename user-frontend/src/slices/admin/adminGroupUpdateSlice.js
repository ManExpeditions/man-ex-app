import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import adminAPI from '../../api/adminAPI';

const initialState = {
  loading: false,
  group: null,
  error: null
};

export const adminGroupUpdate = createAsyncThunk(
  'adminGroupUpdate/adminGroupUpdate',
  async ({ groupId, groupData }, { rejectWithValue, getState }) => {
    const {
      signinSlice: { user }
    } = getState();
    try {
      const data = await adminAPI.updateGroup(groupId, user.token, groupData);
      return data;
    } catch (err) {
      if (!err.response) {
        throw err.message;
      }
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const adminGroupUpdateSlice = createSlice({
  name: 'adminGroupUpdate',
  initialState,
  reducers: {
    resetAdminGroupUpdate: (state) => {
      state.loading = false;
      state.group = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(adminGroupUpdate.pending, (state) => {
        state.loading = true;
        state.group = null;
        state.error = null;
      })
      .addCase(adminGroupUpdate.rejected, (state, action) => {
        state.loading = false;
        state.group = null;
        if (action.payload) {
          state.error = action.payload;
        } else {
          state.error = 'Group not updated. Try later.';
        }
      })
      .addCase(adminGroupUpdate.fulfilled, (state, action) => {
        state.loading = false;
        state.group = action.payload;
        state.error = null;
      });
  }
});

export const { resetAdminGroupUpdate } = adminGroupUpdateSlice.actions;

export default adminGroupUpdateSlice.reducer;
