import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import {
  fetchCurrentWeather,
  fetchWeatherForecast,
  setError,
} from "./features/weather/weatherSlice";
import DailyForecastCard from "./components/DailyForecastCard/DailyForecastCard";
import logo from "./images/dark_logo_weather_app.png";
import spinner from "./images/spinner.gif";
import "./App.css";

function App() {
  const [inputCity, setInputCity] = useState("");
  const [forecastData, setForecastData] = useState([]);
  const { current, loading, error } = useSelector((state) => state.weather);
  const dispatch = useDispatch();

  const imgUrl = (icon, size) => {
    if (size !== null) {
      return `http://openweathermap.org/img/wn/${icon}@2x.png`;
    } else {
      return `http://openweathermap.org/img/wn/${icon}.png`;
    }
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
      dispatch(setError());
    } else {
      new Promise((resolve, reject) => {
        return dispatch(fetchCurrentWeather({ query: inputCity }))
          .then((res) => {
            let lat = res.payload.data.coord.lat;
            let lon = res.payload.data.coord.lon;
            return dispatch(
              fetchWeatherForecast({
                lat: lat,
                lon: lon,
              })
            ).then((res) => {
              setForecastData(res.payload.data.daily);
            });
          })
          .catch((err) => {
            setError(err);
          });
      });
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="Logo" />
        <div className="search-block">
          <form onSubmit={handleSubmit}>
            <input
              className="search-bar"
              onChange={(e) => setInputCity(e.target.value)}
              type="text"
            />
            <input className="search-submit" type="submit" value="Search" />
          </form>
        </div>
      </header>

      <div className="container">
        <section>
          {error !== null ? (
            <div className="error-message">City Not Found</div>
          ) : loading === true ? (
            <div className="loading-ico">
              <span className="spinner">
                <img src={spinner} alt="Spinner icon" />
              </span>
            </div>
          ) : (
            current && (
              <div className="weather-result">
                <h2>{current.name}</h2>
                <div className="current-information">
                  <div className="weather-icon-container">
                    <span>
                      <img
                        src={imgUrl(current.weather[0].icon, 2)}
                        alt="Current weather icon"
                      />
                    </span>
                    <h2>{current.weather[0].main}</h2>
                  </div>
                  <div className="weather-degree-info">
                    <span>{setRoundValue(current.main.temp)}&#8451;</span>
                  </div>
                  <div className="weather-additional-info">
                    <span className="wind-info">
                      Wind: {current.wind.speed} m/s
                    </span>
                    <span className="sunrise-info">
                      Sunrise: {convertTimestampToTime(current.sys.sunrise)}
                    </span>
                    <span className="sunset-info">
                      Sunset: {convertTimestampToTime(current.sys.sunset)}
                    </span>
                  </div>
                </div>
                <div className="daily-forecast">
                  {forecastData.length > 0 &&
                    forecastData
                      .slice(0, 5)
                      .map((day, idx) => (
                        <DailyForecastCard
                          key={idx}
                          displayDayName={convertTimestampToDayName(day.dt)}
                          imgUrl={imgUrl(day.weather[0].icon, null)}
                          displayDegree={setRoundValue(day.temp.day)}
                        />
                      ))}
                </div>
              </div>
            )
          )}
        </section>
      </div>
    </div>
  );
}

export default App;
