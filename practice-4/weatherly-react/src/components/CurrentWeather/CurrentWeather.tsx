import styles from "./CurrentWeather.module.css";
import WeatherDetailsList from "./WeatherDetailsList/WeatherDetailsList";
import humidity from "/src/assets/humidity.svg";
import temperature from "/src/assets/temperature.svg";
import sunrise from "/src/assets/sunrise.svg";
import wind from "/src/assets/wind.svg";
import airQuality from "/src/assets/air-quality.svg";
import sunset from "/src/assets/sunset.svg";
import gusts from "/src/assets/gusts.svg";
import cloudiness from "/src/assets/uv-index.svg";

type Time = `${number}:${number}`;
type Image = `${string}.svg` | `${string}.png` | `${string}.jpg`;
export interface WeatherDetailProps {
  icon: Image;
  label: string;
  unitValue?: number;
  unit?: string;
  strValue?: string;
  hourValue?: Time;
}

function CurrentWeather() {
  const details: WeatherDetailProps[] = [
    {
      icon: humidity as Image,
      label: "Humidity",
      unitValue: 73,
      unit: "%",
    },
    {
      icon: temperature as Image,
      label: "Feels like",
      unitValue: 5,
      unit: "°C",
    },
    {
      icon: sunrise as Image,
      label: "Rise",
      hourValue: "08:44",
    },
    {
      icon: wind as Image,
      label: "Wind",
      unitValue: 6,
      unit: "km/h",
    },
    {
      icon: airQuality as Image,
      label: "Air quality",
      strValue: "Poor",
    },
    {
      icon: sunset as Image,
      label: "Set",
      hourValue: "17:01",
    },
    {
      icon: gusts as Image,
      label: "Gusts",
      unitValue: 12,
      unit: "km/h",
    },
    {
      icon: cloudiness as Image,
      label: "Cloudiness",
      unitValue: 0,
      unit: "%",
    },
  ];

  return (
    <section className={styles.currentWeather}>
      <WeatherDetailsList details={details} />
    </section>
  );
}

export default CurrentWeather;
