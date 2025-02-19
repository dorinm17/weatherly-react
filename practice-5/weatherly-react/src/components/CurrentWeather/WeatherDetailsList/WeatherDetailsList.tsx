import styles from "./WeatherDetailsList.module.css";
import { WeatherDetailProps } from "../CurrentWeather";

type WeatherDetailsListProps = { details: WeatherDetailProps[] };

function WeatherDetailsList(props: WeatherDetailsListProps) {
  const details = props.details.map((detail: WeatherDetailProps) => {
    if (detail.unit) {
      return (
        <li className={styles.detail} key={detail.label}>
          <img
            data-testid="detailIcon"
            className={styles.detailIcon}
            src={detail.icon}
            alt=""
          />{" "}
          {detail.label}: {detail.unitValue}
          {detail.unit}
        </li>
      );
    }

    if (detail.hourValue) {
      return (
        <li className={styles.detail} key={detail.label}>
          <img data-testid="detailIcon" src={detail.icon} alt="" />{" "}
          {detail.label}: {detail.hourValue}
        </li>
      );
    }

    return (
      <li className={styles.detail} key={detail.label}>
        <img data-testid="detailIcon" src={detail.icon} alt="" /> {detail.label}
        : {detail.strValue}
      </li>
    );
  });

  return <ul className={styles.detailsList}>{details}</ul>;
}

export default WeatherDetailsList;
