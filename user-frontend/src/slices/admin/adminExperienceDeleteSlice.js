import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import adminAPI from '../../api/adminAPI';

const initialState = {
  loading: false,
  experience: null,
  error: null
};

export const adminExperienceDelete = createAsyncThunk(
  'adminExperienceDelete/adminExperienceDelete',
  async (experienceId, { rejectWithValue, getState }) => {
    const {
      signinSlice: { user }
    } = getState();
    try {
      const data = await adminAPI.deleteExperience(experienceId, user.token);
      return data;
    } catch (err) {
      if (!err.response) {
        throw err.message;
      }
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const adminExperienceDeleteSlice = createSlice({
  name: 'adminExperienceDelete',
  initialState,
  reducers: {
    resetAdminExperienceDelete: (state) => {
      state.loading = false;
      state.experience = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(adminExperienceDelete.pending, (state) => {
        state.loading = true;
        state.experience = null;
        state.error = null;
      })
      .addCase(adminExperienceDelete.rejected, (state, action) => {
        state.loading = false;
        state.experience = null;
        if (action.payload) {
          state.error = action.payload;
        } else {
          state.error = 'Experience not deleted. Try later.';
        }
      })
      .addCase(adminExperienceDelete.fulfilled, (state, action) => {
        state.loading = false;
        state.experience = action.payload;
        state.error = null;
      });
  }
});

export const { resetAdminExperienceDelete } =
  adminExperienceDeleteSlice.actions;

export default adminExperienceDeleteSlice.reducer;
