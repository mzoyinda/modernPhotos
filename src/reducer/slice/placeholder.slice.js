import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchPlaceholders = createAsyncThunk(
  "fetchPlaceholders",
  async () => {
    const response = await fetch(process.env.REACT_APP_API_URL);
    return response.json();
  }
);

const initialState = {
  isLoading: false,
  album: [],
  error: false
};

export const placeholderSlice = createSlice({
  name: "placeholders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlaceholders.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchPlaceholders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.album = action.payload;
        localStorage.setItem("album", JSON.stringify(action.payload))
      })
      .addCase(fetchPlaceholders.rejected, (state, action) => {
        state.isLoading = false;
        state.album = []
        state.error = true
      });
  },
});

export default placeholderSlice.reducer;
