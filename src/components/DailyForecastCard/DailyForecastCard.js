import React from "react";

const DailyForecastCard = ({
  displayDayName,
  imgWeatherIconUrl,
  displayDegree,
}) => {
  return (
    <div className="forecast-card">
      <span>{displayDayName}</span>
      <img src={imgWeatherIconUrl} alt="Daily weather icon" />
      <span>{displayDegree}&#8451;</span>
    </div>
  );
};

export default DailyForecastCard;
