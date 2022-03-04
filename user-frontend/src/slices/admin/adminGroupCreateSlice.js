import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import adminAPI from '../../api/adminAPI';

const initialState = {
  loading: false,
  adminGroup: null,
  error: null
};

export const adminGroupCreate = createAsyncThunk(
  'adminGroupCreate/adminGroupCreate',
  async (experienceId, { rejectWithValue, getState }) => {
    const {
      signinSlice: { user }
    } = getState();
    try {
      const data = await adminAPI.createGroup(experienceId, user.token);
      return data;
    } catch (err) {
      if (!err.response) {
        throw err.message;
      }
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const adminGroupCreateSlice = createSlice({
  name: 'adminGroupCreate',
  initialState,
  reducers: {
    resetAdminGroupCreate: (state) => {
      state.loading = false;
      state.groupAdmin = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(adminGroupCreate.pending, (state) => {
        state.loading = true;
        state.adminGroup = null;
        state.error = null;
      })
      .addCase(adminGroupCreate.rejected, (state, action) => {
        state.loading = false;
        state.adminGroup = null;
        if (action.payload) {
          state.error = action.payload;
        } else {
          state.error = 'Group not updated. Try later.';
        }
      })
      .addCase(adminGroupCreate.fulfilled, (state, action) => {
        state.loading = false;
        state.adminGroup = action.payload;
        state.error = null;
      });
  }
});

export const { resetAdminGroupCreate } = adminGroupCreateSlice.actions;

export default adminGroupCreateSlice.reducer;
