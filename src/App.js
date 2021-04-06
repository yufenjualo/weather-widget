import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { fetchCurrentWeather } from "./features/weather/weatherSlice";
import logo from "./images/logo_weather_app.png";
import "./App.css";

function App() {
  const [inputCity, setInputCity] = useState("");
  const { current } = useSelector((state) => state.weather);
  const dispatch = useDispatch();

  const setRoundValue = (value) => {
    return Math.floor(parseFloat(value));
  };

  const convertTimestamp = (value) => {
    return moment(value).format("LT");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(fetchCurrentWeather({ query: inputCity }));
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div className="Search-block">
          <form onSubmit={handleSubmit}>
            <input
              className="Search-bar"
              onChange={(e) => setInputCity(e.target.value)}
              type="text"
            />
            <input className="Search-submit" type="submit" value="Search" />
          </form>
        </div>
      </header>

      <div className="Container">
        <section>
          {current && (
            <div className="Weather-result">
              <h2>Hanoi</h2>
              <div className="Current-information">
                <div className="Weather-icon">
                  <span>Weather logo</span>
                  <h2>{current.weather[0].main}</h2>
                </div>
                <div className="Weather-degree-info">
                  {setRoundValue(current.main.temp)}c
                </div>
                <div className="Weather-additional-info">
                  <span>Wind: {current.wind.speed} m/s</span>
                  <span>Sunrise: {convertTimestamp(current.sys.sunrise)}</span>
                  <span>Sunset: {convertTimestamp(current.sys.sunset)}</span>
                </div>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default App;
