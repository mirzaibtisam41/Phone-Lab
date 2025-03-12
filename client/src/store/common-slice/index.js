import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  isLoading: false,
  featureImageList: [],
};

export const getFeatureImages = createAsyncThunk(
  '/order/getFeatureImages',
  async () => {
    const response = await axios.get(
      import.meta.env.VITE_BACKEND_URL + `/api/common/feature/get`
    );

    return response.data;
  }
);

export const addFeatureImage = createAsyncThunk(
  import.meta.env.VITE_BACKEND_URL + '/order/addFeatureImage',
  async (image) => {
    const response = await axios.post(
      import.meta.env.VITE_BACKEND_URL + `/api/common/feature/add`,
      { image }
    );

    return response.data;
  }
);

export const deleteFeatureImage = createAsyncThunk(
  import.meta.env.VITE_BACKEND_URL + '/order/deleteFeatureImage',
  async (imageId) => {
    const response = await axios.delete(
      import.meta.env.VITE_BACKEND_URL + `/api/common/feature/delete/${imageId}`
    );
    return response.data;
  }
);

const commonSlice = createSlice({
  name: 'commonSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFeatureImages.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFeatureImages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.featureImageList = action.payload.data;
      })
      .addCase(getFeatureImages.rejected, (state) => {
        state.isLoading = false;
        state.featureImageList = [];
      });
  },
});

export default commonSlice.reducer;
