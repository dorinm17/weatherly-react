import styles from "./CurrentWeather.module.css";
import WeatherDetailsList from "./WeatherDetailsList/WeatherDetailsList";
import humidity from "../../assets/humidity.svg";
import temperature from "../../assets/temperature.svg";
import sunrise from "../..//assets/sunrise.svg";
import wind from "../..//assets/wind.svg";
import airQuality from "../..//assets/air-quality.svg";
import sunset from "../../assets/sunset.svg";
import gusts from "../..//assets/gusts.svg";
import cloudiness from "../../assets/uv-index.svg";
import * as React from "react";
import { useContext } from "react";
import {
  WeatherData,
  HourlyForecast,
  CurrentForecast,
  AirPollutionFailproof,
  WeatherContext,
  Time,
  Image,
} from "../../utils/types";
import {
  convertToLocalTime,
  convertAQI,
  checkIfZeroTemp,
} from "../../utils/helpers";

export interface WeatherDetailProps {
  icon: Image;
  label: string;
  unitValue?: number;
  unit?: string;
  strValue?: string;
  hourValue?: Time;
}

function CurrentWeather() {
  const data: WeatherData = useContext(WeatherContext)
    ?.weatherData as WeatherData;
  const hourlyForecast: HourlyForecast = data?.hourlyForecast as HourlyForecast;
  const currentWeather: CurrentForecast =
    data?.currentWeather as CurrentForecast;
  const airPollution: AirPollutionFailproof =
    data?.airPollution as AirPollutionFailproof;

  const details: WeatherDetailProps[] = [
    {
      icon: humidity as Image,
      label: "Humidity",
      unitValue: currentWeather.main.humidity,
      unit: "%",
    },
    {
      icon: temperature as Image,
      label: "Feels like",
      unitValue: checkIfZeroTemp(currentWeather.main.feels_like),
      unit: "°C",
    },
    {
      icon: sunrise as Image,
      label: "Rise",
      hourValue: convertToLocalTime(
        currentWeather.sys.sunrise as number,
        currentWeather.timezone
      ),
    },
    {
      icon: wind as Image,
      label: "Wind",
      unitValue: parseFloat(currentWeather.wind.speed.toFixed(0)),
      unit: "km/h",
    },
    {
      icon: airQuality as Image,
      label: "Air quality",
      strValue:
        airPollution === "-" ? "-" : convertAQI(airPollution.list[0].main.aqi),
    },
    {
      icon: sunset as Image,
      label: "Set",
      hourValue: convertToLocalTime(
        currentWeather.sys.sunset as number,
        currentWeather.timezone
      ),
    },
    {
      icon: gusts as Image,
      label: "Gusts",
      unitValue: parseFloat(hourlyForecast.list[0].wind.gust.toFixed(0)),
      unit: "km/h",
    },
    {
      icon: cloudiness as Image,
      label: "Cloudiness",
      unitValue: currentWeather.clouds.all,
      unit: "%",
    },
  ];

  return (
    <section data-testid="current-weather" className={styles.currentWeather}>
      <WeatherDetailsList details={details} />
    </section>
  );
}

export default React.memo(CurrentWeather);
