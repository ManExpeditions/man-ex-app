import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import servicesAPI from '../../api/servicesAPI';

const initialState = {
  loading: false,
  places: null,
  error: null
};

export const location = createAsyncThunk(
  'location/location',
  async (location, { rejectWithValue, getState }) => {
    const {
      signinSlice: { user }
    } = getState();
    try {
      const data = await servicesAPI.locationAutoComplete(user.token, location);
      return data;
    } catch (err) {
      if (!err.response) {
        throw err.message;
      }
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    resetLocation: (state) => {
      state.loading = false;
      state.places = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(location.pending, (state) => {
        state.loading = true;
      })
      .addCase(location.rejected, (state, action) => {
        state.loading = false;
        state.places = null;
        if (action.payload) {
          state.error = action.payload;
        } else {
          state.error = 'Unable to find location.';
        }
      })
      .addCase(location.fulfilled, (state, action) => {
        state.loading = false;
        state.places = action.payload;
      });
  }
});

export const { resetLocation } = locationSlice.actions;

export default locationSlice.reducer;
