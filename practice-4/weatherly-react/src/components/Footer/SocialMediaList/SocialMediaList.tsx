import styles from "./SocialMediaList.module.css";
import { SocialMediaProps } from "../Footer";

type SocialMediaListProps = { socials: SocialMediaProps[] };

function SocialMediaList(props: SocialMediaListProps) {
  const socials = props.socials.map(
    (social: SocialMediaProps, index: number) => (
      <li key={index}>
        <a href={social.link}>
          <img src={social.icon} alt={social.alt} className={styles.social} />
        </a>
      </li>
    )
  );

  return <ul className={styles.socialPlatforms}>{socials}</ul>;
}

export default SocialMediaList;
