import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import experienceAPI from '../../api/experienceAPI';

const initialState = {
  loading: false,
  experience: null,
  error: null
};

export const experienceGet = createAsyncThunk(
  'experienceGet/experienceGet',
  async (id, { rejectWithValue }) => {
    try {
      const data = await experienceAPI.getExperience(id);
      return data;
    } catch (err) {
      if (!err.response) {
        throw err.message;
      }
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const experienceGetSlice = createSlice({
  name: 'experienceGet',
  initialState,
  reducers: {
    resetExperienceGet: (state) => {
      state.loading = false;
      state.experience = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(experienceGet.pending, (state) => {
        state.loading = true;
        state.experience = null;
        state.error = null;
      })
      .addCase(experienceGet.rejected, (state, action) => {
        state.loading = false;
        state.experience = null;
        if (action.payload) {
          state.error = action.payload;
        } else {
          state.error = 'Unable to get experience. Try later.';
        }
      })
      .addCase(experienceGet.fulfilled, (state, action) => {
        state.loading = false;
        state.experience = action.payload;
        state.error = null;
      });
  }
});

export const { resetExperienceGet } = experienceGetSlice.actions;

export default experienceGetSlice.reducer;
