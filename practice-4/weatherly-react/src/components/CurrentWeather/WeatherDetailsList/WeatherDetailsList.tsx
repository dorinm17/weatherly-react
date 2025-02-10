import styles from "./WeatherDetailsList.module.css";

type Time = `${number}:${number}`;
type Image = `${string}.svg` | `${string}.png` | `${string}.jpg`;
interface WeatherDetailProps {
  icon: Image;
  label: string;
  unitValue?: number;
  unit?: string;
  strValue?: string;
  hourValue?: Time;
}
type WeatherDetailsListProps = { details: WeatherDetailProps[] };

function WeatherDetailsList(props: WeatherDetailsListProps) {
  const details = props.details.map((detail: WeatherDetailProps, index: number) => {
    if (detail.unit) {
      return (
        <li className={styles.detail} key={index}>
          <img className={styles.detailIcon} src={detail.icon} alt="" />{" "}
          {detail.label}: {detail.unitValue}{detail.unit}
        </li>
      );
    }

    if (detail.hourValue) {
      return (
        <li className={styles.detail} key={index}>
          <img src={detail.icon} alt="" /> {detail.label}: {detail.hourValue}
        </li>
      );
    }

    return (
      <li className={styles.detail} key={index}>
        <img src={detail.icon} alt="" /> {detail.label}: {detail.strValue}
      </li>
    );
  });

  return <ul className={styles.detailsList}>{details}</ul>;
}

export default WeatherDetailsList;
