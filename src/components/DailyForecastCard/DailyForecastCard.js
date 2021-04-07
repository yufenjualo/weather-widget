import React from "react";

const DailyForecastCard = ({
  displayDayName,
  imgWeatherIconUrl,
  displayDegree,
}) => {
  return (
    <div className="forecast-card" title="testDailyWeatherCard">
      <h3>{displayDayName}</h3>
      <img src={imgWeatherIconUrl} alt="Daily weather icon" />
      <span>{displayDegree}&#8451;</span>
    </div>
  );
};

export default DailyForecastCard;
