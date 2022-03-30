import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import userAPI from '../../api/userAPI';

const initialState = {
  loading: false,
  user: null,
  error: null
};

export const userRemoveFromFavorites = createAsyncThunk(
  'userRemoveFromFavorites/userRemoveFromFavorites',
  async ({ type, id }, { rejectWithValue, getState }) => {
    const {
      signinSlice: { user }
    } = getState();
    try {
      const data = await userAPI.userRemoveFromFavorites(
        user.id,
        user.token,
        type,
        id
      );
      const token = user.token;
      localStorage.setItem('user', JSON.stringify({ ...data, token }));
      return data;
    } catch (err) {
      if (!err.response) {
        throw err.message;
      }
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const userRemoveFromFavoritesSlice = createSlice({
  name: 'userRemoveFromFavorites',
  initialState,
  reducers: {
    resetRemoveFromFavorites: (state) => {
      state.loading = false;
      state.user = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(userRemoveFromFavorites.pending, (state) => {
        state.loading = true;
      })
      .addCase(userRemoveFromFavorites.rejected, (state, action) => {
        state.loading = false;
        if (action.id) {
          state.error = action.id;
        } else {
          state.error = 'Failed. Try again later.';
        }
      })
      .addCase(userRemoveFromFavorites.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.id;
      });
  }
});

export const { resetRemoveFromFavorites } =
  userRemoveFromFavoritesSlice.actions;

export default userRemoveFromFavoritesSlice.reducer;
