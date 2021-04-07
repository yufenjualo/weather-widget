import React from "react";
import { render, queryByTitle } from "@testing-library/react";
import DailyForecastCard from "./DailyForecastCard";

it("checkCardRender", () => {
  const { queryByTitle } = render(<DailyForecastCard />);
  const card = queryByTitle("testDailyWeatherCard");
  expect(card).toBeTruthy();
});
