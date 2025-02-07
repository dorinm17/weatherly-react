import ForecastCard from "./ForecastCard/ForecastCard";
import styles from "./DailyForecast.module.css";

function DailyForecast() {
  return (
    <section className={styles.fiveDayForecast}>
      <ForecastCard
        weekday="Today"
        icon="/src/assets/sun-and-clouds.svg"
        description="Partly sunny"
        maxTemp={6}
        minTemp={-1}
      />
      <ForecastCard 
        weekday="Saturday"
        icon="/src/assets/rain.svg"
        description="Rain showers"
        maxTemp={3}
        minTemp={2}
      />
      <ForecastCard 
        weekday="Sunday"
        icon="/src/assets/rain.svg"
        description="Rain showers"
        maxTemp={4}
        minTemp={4}
      />
      <ForecastCard 
        weekday="Monday"
        icon="/src/assets/clouds.svg"
        description="Cloudy"
        maxTemp={5}
        minTemp={3}
      />
      <ForecastCard 
        weekday="Tuesday"
        icon="/src/assets/rain-and-snow.svg"
        description="Rain and snow"
        maxTemp={6}
        minTemp={6}
      />
    </section>
  );
}

export default DailyForecast;
