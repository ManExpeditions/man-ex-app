import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import experienceAPI from "../../api/experienceAPI";

const initialState = {
  loading: false,
  experiences: null,
  error: null,
};

export const experiencesGet = createAsyncThunk(
  "experiencesGet/experiencesGet",
  async (_, { rejectWithValue }) => {
    try {
      const data = await experienceAPI.getExperiences();
      return data;
    } catch (err) {
      if (!err.response) {
        throw err.message;
      }
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const experiencesGetSlice = createSlice({
  name: "experiencesGet",
  initialState,
  reducers: {
    resetExperiencesGet: (state) => {
      state.loading = false;
      state.experiences = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(experiencesGet.pending, (state) => {
        state.loading = true;
        state.experiences = null;
        state.error = null;
      })
      .addCase(experiencesGet.rejected, (state, action) => {
        state.loading = false;
        state.experiences = null;
        if (action.payload) {
          state.error = action.payload;
        } else {
          state.error = "Unable to get experiences. Try later.";
        }
      })
      .addCase(experiencesGet.fulfilled, (state, action) => {
        state.loading = false;
        state.experiences = action.payload;
        state.error = null;
      });
  },
});

export const { resetExperiencesGet } = experiencesGetSlice.actions;

export default experiencesGetSlice.reducer;
