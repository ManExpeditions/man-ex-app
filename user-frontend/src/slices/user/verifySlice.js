import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import verifyAPI from "../../api/verifyAPI";

const initialState = {
  loading: false,
  user: null,
  error: null,
};

export const verify = createAsyncThunk(
  "verify/verify",
  async (
    { type, phone = null, verificationCode },
    { rejectWithValue, getState }
  ) => {
    const {
      signinSlice: { user },
    } = getState();
    try {
      const data = await verifyAPI.verify(
        type,
        phone,
        user.id,
        user.token,
        verificationCode
      );
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
    resetVerify: (state) => {
      state.loading = false;
      state.user = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(verify.pending, (state) => {
        state.loading = true;
      })
      .addCase(verify.rejected, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.error = action.payload;
        } else {
          state.error = "Verification failed. Try again later.";
        }
      })
      .addCase(verify.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      });
  },
});

export const { resetVerifyErrors, resetVerify } = verifySlice.actions;

export default verifySlice.reducer;
