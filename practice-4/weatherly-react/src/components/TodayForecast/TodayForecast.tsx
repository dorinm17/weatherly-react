import styles from "./TodayForecast.module.css";
import RightNowForecastCard from "./RightNowForecastCard/RightNowForecastCard";
import HourlyForecastCard from "./HourlyForecastCard/HourlyForecastCard";
import { useContext, useState, useEffect } from "react";
import {
  WeatherData,
  FiveDayForecast,
  CurrentForecast,
  HourlyForecast,
  WeatherContext,
} from "../../utils/types";
import {
  checkIfZeroTemp,
  capitalize,
  dayOrNight,
  chooseImage,
  convertToLocalTime,
} from "../../utils/helpers";

function TodayForecast() {
  const { weatherData } = useContext(WeatherContext) ?? {};
  const [previousWeatherData, setPreviousWeatherData] =
    useState<WeatherData | null>(null);

  useEffect(() => {
    if (weatherData) setPreviousWeatherData(weatherData);
  }, [weatherData]);
  const data = weatherData || previousWeatherData;

  const dailyForecast: FiveDayForecast = data?.dailyForecast as FiveDayForecast;
  const hourlyForecast: HourlyForecast = data?.hourlyForecast as HourlyForecast;
  const currentWeather: CurrentForecast =
    data?.currentWeather as CurrentForecast;

  const daytime: boolean = dayOrNight(
    hourlyForecast.city.sunrise as number,
    hourlyForecast.city.sunset as number
  );

  return (
    <section className={styles.todayForecast}>
      <RightNowForecastCard
        city={hourlyForecast.city.name as string}
        countryCode={hourlyForecast.city.country as string}
        temperature={checkIfZeroTemp(currentWeather.main.temp)}
        description={capitalize(
          currentWeather.weather[0].description as string
        )}
        precipitation={dailyForecast.list[0].pop * 100}
        maxTemp={checkIfZeroTemp(dailyForecast.list[0].temp.max)}
        minTemp={checkIfZeroTemp(dailyForecast.list[0].temp.min)}
        icon={chooseImage(currentWeather.weather[0].id as number, daytime)}
      />

      <div className={styles.hourlyForecast}>
        {hourlyForecast.list.slice(0, 10).map((hour, index) => (
          <HourlyForecastCard
            key={index}
            time={convertToLocalTime(
              hour.dt,
              hourlyForecast.city.timezone as number
            )}
            icon={chooseImage(hour.weather[0].id as number, daytime)}
            temperature={checkIfZeroTemp(hour.main.temp)}
          />
        ))}
      </div>
    </section>
  );
}

export default TodayForecast;
