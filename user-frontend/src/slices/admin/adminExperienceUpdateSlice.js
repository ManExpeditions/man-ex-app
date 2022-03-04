import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import adminAPI from '../../api/adminAPI';

const initialState = {
  loading: false,
  experience: null,
  error: null
};

export const adminExperienceUpdate = createAsyncThunk(
  'adminExperienceUpdate/adminExperienceUpdate',
  async ({ experienceId, experienceData }, { rejectWithValue, getState }) => {
    const {
      signinSlice: { user }
    } = getState();
    try {
      const data = await adminAPI.updateExperience(
        experienceId,
        user.token,
        experienceData
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

export const adminExperienceUpdateSlice = createSlice({
  name: 'adminExperienceUpdate',
  initialState,
  reducers: {
    resetAdminExperienceUpdate: (state) => {
      state.loading = false;
      state.experience = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(adminExperienceUpdate.pending, (state) => {
        state.loading = true;
        state.experience = null;
        state.error = null;
      })
      .addCase(adminExperienceUpdate.rejected, (state, action) => {
        state.loading = false;
        state.experience = null;
        if (action.payload) {
          state.error = action.payload;
        } else {
          state.error = 'Experience not updated. Try later.';
        }
      })
      .addCase(adminExperienceUpdate.fulfilled, (state, action) => {
        state.loading = false;
        state.experience = action.payload;
        state.error = null;
      });
  }
});

export const { resetAdminExperienceUpdate } =
  adminExperienceUpdateSlice.actions;

export default adminExperienceUpdateSlice.reducer;
