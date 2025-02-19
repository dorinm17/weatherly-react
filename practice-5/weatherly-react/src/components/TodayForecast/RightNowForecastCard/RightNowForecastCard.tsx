import styles from "./RightNowForecastCard.module.css";
import { Image } from "../../../utils/types";

export interface RightNowForecastCardProps {
  city: string;
  countryCode: string;
  temperature: number;
  description: string;
  precipitation: number;
  maxTemp: number;
  minTemp: number;
  icon: Image;
}

function RightNowForecastCard(props: RightNowForecastCardProps) {
  return (
    <div className={styles.rightNow}>
      <div>
        <h3 data-testid="current-city" className={styles.city}>
          {props.city}
          <span id={styles.countryCode}> {props.countryCode}</span>{" "}
          {props.temperature}
          &deg;C
        </h3>
        <p className={styles.p}>{props.description}</p>
        <p className={styles.p}>Precipitation: {props.precipitation}%</p>
        <p className={styles.p}>
          H:{props.maxTemp}&deg; L:{props.minTemp}&deg;
        </p>
      </div>

      <img
        data-testid="icon"
        className={styles.rightNowIcon}
        src={props.icon}
        alt=""
      />
    </div>
  );
}

export default RightNowForecastCard;
