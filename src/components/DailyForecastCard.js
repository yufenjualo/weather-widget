import React from "react";

const DailyForecastCard = ({ idx, displayDayName, imgUrl, displayDegree }) => {
  return (
    <div className="Forecast-card" key={idx}>
      <span>{displayDayName}</span>
      <img src={imgUrl} alt="Daily weather icon" />
      <span>{displayDegree}&#8451;</span>
    </div>
  );
};

export default DailyForecastCard;
