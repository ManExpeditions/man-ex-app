import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import experienceAPI from '../../api/experienceAPI';

const initialState = {
  loading: false,
  experience: null,
  error: null
};

export const experienceInterestedUser = createAsyncThunk(
  'experienceInterestedUser/experienceInterestedUser',
  async (experienceId, { rejectWithValue, getState }) => {
    const {
      signinSlice: { user }
    } = getState();
    try {
      const data = await experienceAPI.experienceInterestedUser(
        experienceId,
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

export const experienceInterestedUserSlice = createSlice({
  name: 'experienceInterestedUser',
  initialState,
  reducers: {
    resetExperienceInterestedUser: (state) => {
      state.loading = false;
      state.experience = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(experienceInterestedUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(experienceInterestedUser.rejected, (state, action) => {
        state.loading = false;
        state.experience = null;
        if (action.payload) {
          state.error = action.payload;
        } else {
          state.error = 'Failed. Try again later.';
        }
      })
      .addCase(experienceInterestedUser.fulfilled, (state, action) => {
        state.loading = false;
        state.experience = action.payload;
        state.error = null;
      });
  }
});

export const { resetExperienceInterestedUser } =
  experienceInterestedUserSlice.actions;

export default experienceInterestedUserSlice.reducer;
