import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userAPI from "../../api/userAPI";

const initialState = {
  loading: false,
  user: null,
  error: null,
};

export const userUpdate = createAsyncThunk(
  "userUpdate/userUpdate",
  async (userData, { rejectWithValue, getState }) => {
    const {
      signinSlice: { user },
    } = getState();
    try {
      const data = await userAPI.updateUser(user.id, user.token, userData);
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

export const userUpdateSlice = createSlice({
  name: "userUpdate",
  initialState,
  reducers: {
    resetUserUpdate: (state) => {
      state.loading = false;
      state.user = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userUpdate.pending, (state) => {
        state.loading = true;
      })
      .addCase(userUpdate.rejected, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.error = action.payload;
        } else {
          state.error = "Information not updated. Try later.";
        }
      })
      .addCase(userUpdate.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      });
  },
});

export const { resetUserUpdate } = userUpdateSlice.actions;

export default userUpdateSlice.reducer;
