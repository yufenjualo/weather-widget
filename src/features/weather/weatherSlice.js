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
    loading: true,
    error: null,
    userName: null,
  },
  reducers: {
    changeUserName: (state) => {
      state.userName = "Yufen";
    },
  },
  extraReducers: {
    [fetchCurrentWeather.pending]: (state, { payload, meta }) => {
      state.loading = true;
    },
    [fetchCurrentWeather.fulfilled]: (state, { payload, meta }) => {
      state.loading = false;
      state.current = payload.data;
    },
    [fetchCurrentWeather.rejected]: (state, { error, meta }) => {
      state.loading = false;
      state.error = error;
    },
  },
});

export const { changeUserName } = weatherSlice.actions; //for test purpose to check if it's working or not

export default weatherSlice.reducer;
