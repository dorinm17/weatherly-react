import ForecastCard from "./ForecastCard/ForecastCard";
import styles from "./DailyForecast.module.css";
import { useContext } from "react";
import * as React from "react";
import {
  FiveDayForecast,
  WeatherContext,
  WeatherData,
} from "../../utils/types";
import {
  getWeekday,
  chooseImage,
  capitalize,
  checkIfZeroTemp,
} from "../../utils/helpers";

function DailyForecast() {
  const data = useContext(WeatherContext)?.weatherData as WeatherData;
  const dailyForecast: FiveDayForecast = data?.dailyForecast as FiveDayForecast;

  return (
    <section data-testid="daily-forecast" className={styles.fiveDayForecast}>
      {dailyForecast.list.slice(0, 5).map((forecast, index) => (
        <ForecastCard
          key={forecast.dt}
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

export default React.memo(DailyForecast);
