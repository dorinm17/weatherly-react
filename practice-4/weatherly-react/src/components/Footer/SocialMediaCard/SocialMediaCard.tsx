import styles from "./SocialMediaCard.module.css";

type Image = `${string}.svg` | `${string}.png` | `${string}.jpg`;
interface SocialMediaCardProps {
  icon: Image;
  alt: string;
  link: string;
}

function SocialMediaCard(props: SocialMediaCardProps) {
  return (
    <li>
      <a href={props.link}>
        <img src={props.icon} alt={props.alt} className={styles.social} />
      </a>
    </li>
  );
}

export default SocialMediaCard;
