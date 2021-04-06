import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import {
  fetchCurrentWeather,
  fetchWeatherForecast,
} from "./features/weather/weatherSlice";
import logo from "./images/logo_weather_app.png";
import "./App.css";

function App() {
  const [inputCity, setInputCity] = useState("");
  const [forecastData, setForecastData] = useState([]);
  const { current, loading, error } = useSelector((state) => state.weather);
  const dispatch = useDispatch();

  const urlImg = (icon) => {
    return `http://openweathermap.org/img/wn/${icon}.png`;
  };

  const setRoundValue = (value) => {
    return Math.floor(parseFloat(value));
  };

  const convertTimestampToTime = (value) => {
    return moment.unix(value).format("LT");
  };

  const convertTimestampToDayName = (value) => {
    return moment.unix(value).format("ddd");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputCity === "") {
      alert("Please input keyword");
    } else {
      new Promise((resolve, reject) => {
        return dispatch(fetchCurrentWeather({ query: inputCity })).then(
          (res) => {
            let lat = res.payload.data.coord.lat;
            let lon = res.payload.data.coord.lon;

            dispatch(
              fetchWeatherForecast({
                lat: lat,
                lon: lon,
              })
            ).then((res) => {
              // console.log(res.payload.data.daily);
              setForecastData(res.payload.data.daily);
            });
          }
        );
      });
    }
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
          {loading === false && current ? (
            <div className="Weather-result">
              <h2>{current.name}</h2>
              <div className="Current-information">
                <div className="Weather-icon">
                  <span>
                    <img
                      src={urlImg(current.weather[0].icon)}
                      alt="Current weather icon"
                    />
                  </span>
                  <h2>{current.weather[0].main}</h2>
                </div>
                <div className="Weather-degree-info">
                  <span>{setRoundValue(current.main.temp)}&#8451;</span>
                </div>
                <div className="Weather-additional-info">
                  <span>Wind: {current.wind.speed} m/s</span>
                  <span>
                    Sunrise: {convertTimestampToTime(current.sys.sunrise)}
                  </span>
                  <span>
                    Sunset: {convertTimestampToTime(current.sys.sunset)}
                  </span>
                </div>
              </div>
              <div className="Daily-forecast">
                {forecastData.slice(0, 5).map((day, idx) => (
                  <div className="Forecast-card" key={idx}>
                    <span>{convertTimestampToDayName(day.dt)}</span>
                    <span>{setRoundValue(day.temp.day)}&#8451;</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            "No Data"
          )}
        </section>
      </div>
    </div>
  );
}

export default App;
