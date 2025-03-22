import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  isLoading: false,
  reviews: [],
};

export const addReview = createAsyncThunk(
  '/order/addReview',
  async (formdata, {rejectWithValue}) => {
    try {
      // Attempt to send the POST request
      const response = await axios.post(
        import.meta.env.VITE_BACKEND_URL + `/api/shop/review/add`,
        formdata
      );

      // Return the response data if successful
      return response.data;
    } catch (error) {
      // Handle any errors by rejecting with the error message
      // This could be a 4xx, 5xx, or network error
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getReviews = createAsyncThunk('/order/getReviews', async (id) => {
  const response = await axios.get(
    import.meta.env.VITE_BACKEND_URL + `/api/shop/review/${id}`
  );

  return response.data;
});

const reviewSlice = createSlice({
  name: 'reviewSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getReviews.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getReviews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reviews = action.payload.data;
      })
      .addCase(getReviews.rejected, (state) => {
        state.isLoading = false;
        state.reviews = [];
      });
  },
});

export default reviewSlice.reducer;
