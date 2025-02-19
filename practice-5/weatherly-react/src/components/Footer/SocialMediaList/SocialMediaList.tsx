import styles from "./SocialMediaList.module.css";
import { SocialMediaProps } from "../Footer";

type SocialMediaListProps = { socials: SocialMediaProps[] };

function SocialMediaList(props: SocialMediaListProps) {
  const socials = props.socials.map((social: SocialMediaProps) => (
    <li key={social.alt}>
      <a href={social.link} target="_blank" rel="noopener noreferrer">
        <img src={social.icon} alt={social.alt} className={styles.social} />
      </a>
    </li>
  ));

  return (
    <ul
      aria-label="Social Media Links"
      data-testid="links-list"
      className={styles.socialPlatforms}
    >
      {socials}
    </ul>
  );
}

export default SocialMediaList;
