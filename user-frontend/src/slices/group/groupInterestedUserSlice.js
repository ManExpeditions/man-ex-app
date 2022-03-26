import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import groupAPI from '../../api/groupAPI';

const initialState = {
  loading: false,
  group: null,
  error: null
};

export const groupInterestedUser = createAsyncThunk(
  'groupInterestedUser/groupInterestedUser',
  async (groupId, { rejectWithValue, getState }) => {
    const {
      signinSlice: { user }
    } = getState();
    try {
      const data = await groupAPI.groupInterestedUser(
        groupId,
        user.id,
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

export const groupInterestedUserSlice = createSlice({
  name: 'groupInterestedUser',
  initialState,
  reducers: {
    resetGroupInterestedUser: (state) => {
      state.loading = false;
      state.group = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(groupInterestedUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(groupInterestedUser.rejected, (state, action) => {
        state.loading = false;
        state.group = null;
        if (action.payload) {
          state.error = action.payload;
        } else {
          state.error = 'Failed. Try again later.';
        }
      })
      .addCase(groupInterestedUser.fulfilled, (state, action) => {
        state.loading = false;
        state.group = action.payload;
        state.error = null;
      });
  }
});

export const { resetGroupInterestedUser } = groupInterestedUserSlice.actions;

export default groupInterestedUserSlice.reducer;
