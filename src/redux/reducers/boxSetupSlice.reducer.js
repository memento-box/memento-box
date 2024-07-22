// src/redux/reducers/boxSetupSlice.js

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
    boxSetupData: {}, // Add this line
    loading: false,
    error: null,
  },
  reducers: {
    updateBoxSetupData: (state, action) => {
      state.boxSetupData = action.payload;
    },
  },
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
      .addCase(submitBoxSetup.fulfilled, (state, action) => {
        // Handle submission success, if needed
      })
      .addCase(submitBoxSetup.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export const { updateBoxSetupData } = boxSetupSlice.actions;
export default boxSetupSlice.reducer;
