import styles from './TodayForecast.module.css';
import RightNowForecastCard from './RightNowForecastCard/RightNowForecastCard';
import HourlyForecastCard from './HourlyForecastCard/HourlyForecastCard';

function TodayForecast() {
  return (
  <section className="todayForecast">
    <RightNowForecastCard />
    <HourlyForecastCard />
    <HourlyForecastCard />
    <HourlyForecastCard />
    <HourlyForecastCard />
    <HourlyForecastCard />
    <HourlyForecastCard />
    <HourlyForecastCard />
    <HourlyForecastCard />
    <HourlyForecastCard />
    <HourlyForecastCard />
  </section>);
}

export default TodayForecast;
