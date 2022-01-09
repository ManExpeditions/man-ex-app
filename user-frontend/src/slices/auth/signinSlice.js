import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authAPI from "../../api/authAPI";
import { verify } from "../user/verifySlice";
import { emailRegisterUser } from "./emailRegisterSlice";

const initialState = {
  loading: false,
  user: null,
  error: null,
};

export const signin = createAsyncThunk(
  "signin/signin",
  async (userData, { rejectWithValue }) => {
    const { email, password } = userData;
    try {
      const data = await authAPI.signinByEmail(email, password);
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

export const signinSlice = createSlice({
  name: "signin",
  initialState,
  reducers: {
    resetSigninErrors: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signin.pending, (state) => {
        state.loading = true;
      })
      .addCase(signin.rejected, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.error = action.payload;
        } else {
          state.error = "Signin failed. Try again later.";
        }
      })
      .addCase(emailRegisterUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(signin.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(verify.fulfilled, (state, action) => {
        state.loading = false;
        state.user = { ...state.user, ...action.payload };
      });
  },
});

export const { resetSigninErrors } = signinSlice.actions;

export default signinSlice.reducer;
