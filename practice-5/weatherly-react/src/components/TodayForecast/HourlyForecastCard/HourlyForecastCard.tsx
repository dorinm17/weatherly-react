import styles from "./HourlyForecastCard.module.css";
import { Time, Image } from "../../../utils/types";

interface HourlyForecastCardProps {
  time: Time;
  icon: Image;
  temperature: number;
}

function HourlyForecastCard(props: HourlyForecastCardProps) {
  return (
    <div className={styles.div}>
      <p>{props.time}</p>
      <img className={styles.icon} src={props.icon} alt="" />
      <p>{props.temperature}&deg;C</p>
    </div>
  );
}

export default HourlyForecastCard;
