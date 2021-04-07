import moment from "moment";

export const setRoundedValue = (value) => {
  return Math.floor(parseFloat(value));
};

export const convertTimestampToTime = (value) => {
  return moment.unix(value).format("LT");
};

export const convertTimestampToDayName = (value) => {
  return moment.unix(value).format("ddd");
};

export const imgWeatherIconUrl = (icon, size) => {
  if (size !== null) {
    return `http://openweathermap.org/img/wn/${icon}@2x.png`;
  } else {
    return `http://openweathermap.org/img/wn/${icon}.png`;
  }
};
