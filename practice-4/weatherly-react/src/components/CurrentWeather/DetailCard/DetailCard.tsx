import styles from "./DetailCard.module.css";

type TimeStr = `${number}:${number}`;
interface DetailCardProps {
  icon: string;
  label: string;
  unitValue?: number;
  unit?: string;
  strValue?: string;
  hourValue?: TimeStr;
}

function DetailCard(props: DetailCardProps) {
  if (props.unit) {
    return (
      <li className={styles.detail}>
        <img className={styles.detailIcon} src={props.icon} alt="" /> {props.label}: {props.unitValue}{" "}
        {props.unit}
      </li>
    );
  }

  if (props.hourValue) {
    return (
      <li className={styles.detail}>
        <img src={props.icon} alt="" /> {props.label}: {props.hourValue}
      </li>
    );
  }

  return (
    <li className={styles.detail}>
      <img src={props.icon} alt="" /> {props.label}: {props.strValue}
    </li>
  );
}

export default DetailCard;
