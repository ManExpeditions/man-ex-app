import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import adminAPI from '../../api/adminAPI';

const initialState = {
  loading: false,
  adminExperience: null,
  error: null
};

export const adminExperienceCreate = createAsyncThunk(
  'adminExperienceCreate/adminExperienceCreate',
  async (_, { rejectWithValue, getState }) => {
    const {
      signinSlice: { user }
    } = getState();
    try {
      const data = await adminAPI.createExperience(user.token);
      return data;
    } catch (err) {
      if (!err.response) {
        throw err.message;
      }
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const adminExperienceCreateSlice = createSlice({
  name: 'adminExperienceCreate',
  initialState,
  reducers: {
    resetAdminExperienceCreate: (state) => {
      state.loading = false;
      state.adminExperience = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(adminExperienceCreate.pending, (state) => {
        state.loading = true;
        state.adminExperience = null;
        state.error = null;
      })
      .addCase(adminExperienceCreate.rejected, (state, action) => {
        state.loading = false;
        state.adminExperience = null;
        if (action.payload) {
          state.error = action.payload;
        } else {
          state.error = 'Experience not updated. Try later.';
        }
      })
      .addCase(adminExperienceCreate.fulfilled, (state, action) => {
        state.loading = false;
        state.adminExperience = action.payload;
        state.error = null;
      });
  }
});

export const { resetAdminExperienceCreate } =
  adminExperienceCreateSlice.actions;

export default adminExperienceCreateSlice.reducer;
