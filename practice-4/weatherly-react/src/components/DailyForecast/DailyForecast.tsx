import ForecastCard from "./ForecastCard/ForecastCard";
import styles from "./DailyForecast.module.css";
import { useContext, useEffect, useState } from "react";
import {
  WeatherData,
  FiveDayForecast,
  WeatherContext,
} from "../../utils/types";
import {
  getWeekday,
  chooseImage,
  capitalize,
  checkIfZeroTemp,
} from "../../utils/helpers";

function DailyForecast() {
  const { weatherData } = useContext(WeatherContext) ?? {};
  const [previousWeatherData, setPreviousWeatherData] =
    useState<WeatherData | null>(null);

  useEffect(() => {
    if (weatherData) setPreviousWeatherData(weatherData);
  }, [weatherData]);

  const data = weatherData || previousWeatherData;
  
  const dailyForecast: FiveDayForecast = data?.dailyForecast as FiveDayForecast;

  return (
    <section className={styles.fiveDayForecast}>
      {dailyForecast.list.slice(0, 5).map((forecast, index) => (
        <ForecastCard
          key={index}
          weekday={index === 0 ? "Today" : getWeekday(forecast.dt)}
          icon={chooseImage(forecast.weather[0].id as number, true)}
          description={capitalize(forecast.weather[0].description as string)}
          maxTemp={checkIfZeroTemp(forecast.temp.max)}
          minTemp={checkIfZeroTemp(forecast.temp.min)}
        />
      ))}
    </section>
  );
}

export default DailyForecast;
