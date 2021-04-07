import React from "react";

const DailyForecastCard = ({ displayDayName, imgUrl, displayDegree }) => {
  return (
    <div className="forecast-card">
      <span>{displayDayName}</span>
      <img src={imgUrl} alt="Daily weather icon" />
      <span>{displayDegree}&#8451;</span>
    </div>
  );
};

export default DailyForecastCard;
