import styles from "./CurrentWeather.module.css";
import DetailCard from "./DetailCard/DetailCard";

function CurrentWeather() {
  return (
    <section className={styles.currentWeather}>
      <ul className={styles.detailsList}>
        <DetailCard
          icon="/src/assets/humidity.svg"
          label="Humidity"
          unitValue={73}
          unit="%"
        />
        <DetailCard
          icon="/src/assets/temperature.svg"
          label="Feels like"
          unitValue={5}
          unit="&deg;C"
        />
        <DetailCard
          icon="/src/assets/sunrise.svg"
          label="Rise"
          hourValue="08:44"
        />
        <DetailCard
          icon="/src/assets/wind.svg"
          label="Wind"
          unitValue={6}
          unit="km/h"
        />
        <DetailCard
          icon="/src/assets/air-quality.svg"
          label="Air quality"
          strValue="Poor"
        />
        <DetailCard
          icon="/src/assets/sunset.svg"
          label="Set"
          hourValue="17:01"
        />
        <DetailCard
          icon="/src/assets/gusts.svg"
          label="Gusts"
          unitValue={12}
          unit="km/h"
        />
        <DetailCard
          icon="/src/assets/uv-index.svg"
          label="Cloudiness"
          unitValue={0}
          unit="%"
        />
      </ul>
    </section>
  );
}

export default CurrentWeather;
