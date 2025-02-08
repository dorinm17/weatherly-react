import styles from "./TodayForecast.module.css";
import RightNowForecastCard from "./RightNowForecastCard/RightNowForecastCard";
import HourlyForecastCard from "./HourlyForecastCard/HourlyForecastCard";
import sunAndClouds from "/src/assets/sun-and-clouds.svg";
import moonAndClouds from "/src/assets/moon-and-clouds.svg";
import moon from "/src/assets/moon.svg";

type Image = `${string}.svg` | `${string}.png` | `${string}.jpg`;
function TodayForecast() {
  return (
    <section className={styles.todayForecast}>
      <RightNowForecastCard
        city="Paris"
        countryCode="FR"
        temperature={6}
        description="Partly sunny"
        precipitation={5}
        maxTemp={6}
        minTemp={-1}
        icon={sunAndClouds as Image}
      />

      <div className="hourlyForecast">
        <HourlyForecastCard
          time="16:00"
          icon={sunAndClouds as Image}
          temperature={6}
        />
        <HourlyForecastCard
          time="17:00"
          icon={sunAndClouds as Image}
          temperature={6}
        />
        <HourlyForecastCard
          time="18:00"
          icon={moonAndClouds as Image}
          temperature={6}
        />
        <HourlyForecastCard time="19:00" icon={moon as Image} temperature={5} />
        <HourlyForecastCard time="20:00" icon={moon as Image} temperature={4} />
        <HourlyForecastCard time="21:00" icon={moon as Image} temperature={4} />
        <HourlyForecastCard time="22:00" icon={moon as Image} temperature={3} />
        <HourlyForecastCard
          time="23:00"
          icon={moonAndClouds as Image}
          temperature={2}
        />
        <HourlyForecastCard time="00:00" icon={moon as Image} temperature={1} />
        <HourlyForecastCard time="01:00" icon={moon as Image} temperature={1} />
      </div>
    </section>
  );
}

export default TodayForecast;
