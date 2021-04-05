import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchCurrentWeather,
  changeUserName,
} from "./features/weather/weatherSlice";
import logo from "./images/logo_weather_app.png";
import "./App.css";

function App() {
  const [inputCity, setInputCity] = useState("");
  const { current, userName } = useSelector((state) => state.weather);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(changeUserName());
    const getData = dispatch(fetchCurrentWeather({ query: inputCity }));

    console.log(getData);
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
          <div className="Weather-result">City Not Found</div>
          {/* {userName && <div className="Weather-result">{userName}</div>} */}
          {/* <div className="test">{inputCity}</div> */}
        </section>
      </div>
    </div>
  );
}

export default App;
