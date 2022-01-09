import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import verifyAPI from "../../api/verifyAPI";

const initialState = {
  loading: false,
  user: null,
  error: null,
};

export const verifyEmail = createAsyncThunk(
  "verify/verifyEmail",
  async (userData, { rejectWithValue }) => {
    const { userId, verificationCode } = userData;
    try {
      const data = await verifyAPI.verifyEmail(userId, verificationCode);
      localStorage.setItem("user", JSON.stringify(data));
      return data;
    } catch (err) {
      if (!err.response) {
        throw err.message;
      }
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const verifySlice = createSlice({
  name: "verify",
  initialState,
  reducers: {
    resetVerifyErrors: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(verifyEmail.pending, (state) => {
        state.loading = true;
      })
      .addCase(verifyEmail.rejected, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.error = action.payload;
        } else {
          state.error = "Verification failed. Try again later.";
        }
      })
      .addCase(verifyEmail.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      });
  },
});

export const { resetVerifyErrors } = verifySlice.actions;

export default verifySlice.reducer;
