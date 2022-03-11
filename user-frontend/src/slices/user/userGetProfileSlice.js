import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import userAPI from '../../api/userAPI';

const initialState = {
  loading: false,
  userProfile: null,
  error: null
};

export const userGetProfile = createAsyncThunk(
  'userGetProfile/userGetProfile',
  async (id, { getState, rejectWithValue }) => {
    const {
      signinSlice: { user }
    } = getState();
    try {
      const data = await userAPI.getUserProfile(id, user.token);
      return data;
    } catch (err) {
      if (!err.response) {
        throw err.message;
      }
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const userGetProfileSlice = createSlice({
  name: 'userGetProfile',
  initialState,
  reducers: {
    resetUserGetProfile: (state) => {
      state.loading = false;
      state.userProfile = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(userGetProfile.pending, (state) => {
        state.loading = true;
        state.userProfile = null;
        state.error = null;
      })
      .addCase(userGetProfile.rejected, (state, action) => {
        state.loading = false;
        state.userProfile = null;
        if (action.payload) {
          state.error = action.payload;
        } else {
          state.error = 'Unable to get user. Try later.';
        }
      })
      .addCase(userGetProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.userProfile = action.payload;
        state.error = null;
      });
  }
});

export const { resetUserGetProfile } = userGetProfileSlice.actions;

export default userGetProfileSlice.reducer;
