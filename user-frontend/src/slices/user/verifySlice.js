import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userAPI from "../../api/userAPI";

const initialState = {
  loading: false,
  user: null,
  error: null,
};

export const verify = createAsyncThunk(
  "verify/verify",
  async (
    { type, payload, verificationCode },
    { rejectWithValue, getState }
  ) => {
    const {
      signinSlice: { user },
    } = getState();
    try {
      const data = await userAPI.verify(
        type,
        payload,
        user.id,
        user.token,
        verificationCode
      );
      const token = user.token;
      localStorage.setItem("user", JSON.stringify({ ...data, token }));
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
