import styles from "./CurrentWeather.module.css";
import DetailCard from "./DetailCard/DetailCard";
import humidity from "/src/assets/humidity.svg";
import temperature from "/src/assets/temperature.svg";
import sunrise from "/src/assets/sunrise.svg";
import wind from "/src/assets/wind.svg";
import airQuality from "/src/assets/air-quality.svg";
import sunset from "/src/assets/sunset.svg";
import gusts from "/src/assets/gusts.svg";
import cloudiness from "/src/assets/uv-index.svg";

type Image = `${string}.svg` | `${string}.png` | `${string}.jpg`;

function CurrentWeather() {
  return (
    <section className={styles.currentWeather}>
      <ul className={styles.detailsList}>
        <DetailCard
          icon={humidity as Image}
          label="Humidity"
          unitValue={73}
          unit="%"
        />
        <DetailCard
          icon={temperature as Image}
          label="Feels like"
          unitValue={5}
          unit="&deg;C"
        />
        <DetailCard icon={sunrise as Image} label="Rise" hourValue="08:44" />
        <DetailCard
          icon={wind as Image}
          label="Wind"
          unitValue={6}
          unit="km/h"
        />
        <DetailCard
          icon={airQuality as Image}
          label="Air quality"
          strValue="Poor"
        />
        <DetailCard icon={sunset as Image} label="Set" hourValue="17:01" />
        <DetailCard
          icon={gusts as Image}
          label="Gusts"
          unitValue={12}
          unit="km/h"
        />
        <DetailCard
          icon={cloudiness as Image}
          label="Cloudiness"
          unitValue={0}
          unit="%"
        />
      </ul>
    </section>
  );
}

export default CurrentWeather;
