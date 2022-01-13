import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import assetsAPI from "../../api/assetsAPI";

const initialState = {
  loading: false,
  photo: null,
  error: null,
};

export const photoUpload = createAsyncThunk(
  "photoUpload/photoUpload",
  async ({ type, photoFormData }, { rejectWithValue, getState }) => {
    const {
      signinSlice: { user },
    } = getState();
    try {
      const data = await assetsAPI.singlePhotoUpload(
        user.token,
        type,
        photoFormData
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

export const photoUploadSlice = createSlice({
  name: "photoUpload",
  initialState,
  reducers: {
    resetPhotoUpload: (state) => {
      state.loading = false;
      state.photo = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(photoUpload.pending, (state) => {
        state.loading = true;
      })
      .addCase(photoUpload.rejected, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.error = action.payload;
        } else {
          state.error = "Unable to upload photo.";
        }
      })
      .addCase(photoUpload.fulfilled, (state, action) => {
        state.loading = false;
        state.photo = action.payload;
      });
  },
});

export const { resetPhotoUpload } = photoUploadSlice.actions;

export default photoUploadSlice.reducer;