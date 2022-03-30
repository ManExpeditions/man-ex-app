import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import userAPI from '../../api/userAPI';

const initialState = {
  loading: false,
  user: null,
  error: null
};

export const userAddToFavorites = createAsyncThunk(
  'userAddToFavorites/userAddToFavorites',
  async ({ type, id }, { rejectWithValue, getState }) => {
    const {
      signinSlice: { user }
    } = getState();
    try {
      const data = await userAPI.userAddToFavorites(
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

export const userAddToFavoritesSlice = createSlice({
  name: 'userAddToFavorites',
  initialState,
  reducers: {
    resetAddToFavorite: (state) => {
      state.loading = false;
      state.user = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(userAddToFavorites.pending, (state) => {
        state.loading = true;
      })
      .addCase(userAddToFavorites.rejected, (state, action) => {
        state.loading = false;
        if (action.id) {
          state.error = action.id;
        } else {
          state.error = 'Failed. Try again later.';
        }
      })
      .addCase(userAddToFavorites.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.id;
      });
  }
});

export const { resetAddToFavorite } = userAddToFavoritesSlice.actions;

export default userAddToFavoritesSlice.reducer;
