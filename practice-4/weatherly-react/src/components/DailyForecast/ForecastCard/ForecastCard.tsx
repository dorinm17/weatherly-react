import styles from "./ForecastCard.module.css";

interface ForecastCardProps {
  weekday: string;
  icon: string;
  description: string;
  maxTemp: number;
  minTemp: number;
}

function ForecastCard(props: ForecastCardProps) {
  return (
    <div className={styles.day}>
      <div className={styles.weatherForTheDay}>
        <p>{props.weekday}</p>
        <img className={styles.icon} src={props.icon} alt="" />
      </div>

      <div className={styles.weatherCondition}>
        <p className={styles.p}>{props.description}</p>
        <p className={styles.p}>
          <span className={styles.temperature}>{props.maxTemp}&deg;</span> /{" "}
          {props.minTemp}&deg; <span className={styles.temperature}>C</span>
        </p>
      </div>
    </div>
  );
}

export default ForecastCard;
