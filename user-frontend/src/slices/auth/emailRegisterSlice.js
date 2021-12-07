import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authAPI from "../../api/authAPI";

const initialState = {
  loading: false,
  createdUser: null,
  error: null,
};

export const emailRegisterUser = createAsyncThunk(
  "emailRegister/emailRegisterUser",
  async (userData, { rejectWithValue }) => {
    const { email, password } = userData;
    try {
      return await authAPI.registerByEmail(email, password);
    } catch (err) {
      if (!err.response) {
        throw err.message;
      }
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const emailRegisterSlice = createSlice({
  name: "emailRegister",
  initialState,
  reducers: {
    resetEmailRegisterUser: (state) => {
      state.loading = false;
      state.createdUser = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(emailRegisterUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(emailRegisterUser.rejected, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.error = action.payload;
        } else {
          state.error = "Signup failed. Try again later.";
        }
      })
      .addCase(emailRegisterUser.fulfilled, (state, action) => {
        state.loading = false;
        state.createdUser = action.payload;
      });
  },
});

export const { resetEmailRegisterUser } = emailRegisterSlice.actions;

export default emailRegisterSlice.reducer;
