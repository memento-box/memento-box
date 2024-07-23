import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchOccasions = createAsyncThunk('boxSetup/fetchOccasions', async () => {
  const response = await axios.get('/api/occasion');
  return response.data;
});

export const submitBoxSetup = createAsyncThunk('boxSetup/submitBoxSetup', async (formData) => {
  const response = await axios.post('/api/box-setup', formData);
  return response.data;
});

const boxSetupSlice = createSlice({
  name: 'boxSetup',
  initialState: {
    occasions: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOccasions.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOccasions.fulfilled, (state, action) => {
        state.loading = false;
        state.occasions = action.payload;
      })
      .addCase(fetchOccasions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(submitBoxSetup.pending, (state) => {
        state.loading = true;
      })
      .addCase(submitBoxSetup.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(submitBoxSetup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default boxSetupSlice.reducer;
