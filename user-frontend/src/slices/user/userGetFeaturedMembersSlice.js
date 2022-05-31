import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import userAPI from '../../api/userAPI';

const initialState = {
  loading: false,
  users: [],
  error: null
};

export const userGetFeaturedMembers = createAsyncThunk(
  'userGetFeaturedMembers/userGetFeaturedMembers',
  async (_, { rejectWithValue, getState }) => {
    const {
      signinSlice: { user }
    } = getState();
    try {
      const data = await userAPI.getFeaturedMembers(user.token);
      return data;
    } catch (err) {
      if (!err.response) {
        throw err.message;
      }
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const userGetFeaturedMembersSlice = createSlice({
  name: 'userGetFeaturedMembers',
  initialState,
  reducers: {
    resetUserGetFeaturedMembers: (state) => {
      state.loading = false;
      state.users = [];
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(userGetFeaturedMembers.pending, (state) => {
        state.loading = true;
        state.users = [];
        state.error = null;
      })
      .addCase(userGetFeaturedMembers.rejected, (state, action) => {
        state.loading = false;
        state.users = [];
        if (action.payload) {
          state.error = action.payload;
        } else {
          state.error = 'Information not updated. Try later.';
        }
      })
      .addCase(userGetFeaturedMembers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
        state.error = null;
      });
  }
});

export const { resetUserGetFeaturedMembers } =
  userGetFeaturedMembersSlice.actions;

export default userGetFeaturedMembersSlice.reducer;
