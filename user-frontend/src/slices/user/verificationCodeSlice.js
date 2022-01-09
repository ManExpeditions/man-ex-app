import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import verifyAPI from "../../api/verifyAPI";

const initialState = {
  loading: false,
  success: null,
  error: null,
};

export const verificationCode = createAsyncThunk(
  "verificationCode/verificationCode",
  async ({ type, phone = null }, { rejectWithValue, getState }) => {
    const {
      signinSlice: { user },
    } = getState();
    try {
      const data = await verifyAPI.verificationCode(
        user.id,
        user.token,
        type,
        phone
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

export const verificationCodeSlice = createSlice({
  name: "verificationCode",
  initialState,
  reducers: {
    resetVerificationCodeErrors: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(verificationCode.pending, (state) => {
        state.loading = true;
      })
      .addCase(verificationCode.rejected, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.error = action.payload;
        } else {
          state.error = "Verification code not sent. Try later.";
        }
      })
      .addCase(verificationCode.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload;
      });
  },
});

export const { resetVerificationCodeErrors } = verificationCodeSlice.actions;

export default verificationCodeSlice.reducer;
