import styles from "./HourlyForecastCard.module.css";

type Hour = `${number}:00`;
type Image = `${string}.svg` | `${string}.png` | `${string}.jpg`;
interface HourlyForecastCardProps {
  time: Hour;
  icon: Image;
  temperature: number;
}

function HourlyForecastCard(props: HourlyForecastCardProps) {
  return (
    <div className={styles.div}>
      <p>{props.time}</p>
      <img className={styles.icon} src={props.icon} alt="" />
      <p>{props.temperature}&deg; C</p>
    </div>
  );
}

export default HourlyForecastCard;
