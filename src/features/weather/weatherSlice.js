import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import weatherAPI from "../../api";

const sliceName = "weather";

export const fetchCurrentWeather = createAsyncThunk(
  `${sliceName}/fetchCurrentWeather`,
  ({ query }) => weatherAPI.fetchCurrentWeather({ query })
);

export const fetchWeatherForecast = createAsyncThunk(
  `${sliceName}/fetchWeatherForecast`,
  ({ lat, lon }) => weatherAPI.fetchWeatherForecast({ lat, lon })
);

export const weatherSlice = createSlice({
  name: sliceName,
  initialState: {
    current: null,
    loading: false,
    error: null,
  },
  reducers: {
    setError: (state) => {
      state.error = true;
    },
  },
  extraReducers: {
    [fetchCurrentWeather.pending]: (state, { payload, meta }) => {
      state.loading = true;
    },
    [fetchCurrentWeather.fulfilled]: (state, { payload, meta }) => {
      state.loading = false;
      state.current = payload.data;
      state.error = null;
    },
    [fetchCurrentWeather.rejected]: (state, { error, meta }) => {
      state.loading = false;
      state.error = error;
    },
  },
});

export const { setError } = weatherSlice.actions;

export default weatherSlice.reducer;
