import linkedin from "/src/assets/linkedin.svg";
import instagram from "/src/assets/instagram.svg";
import facebook from "/src/assets/facebook.svg";
import mail from "/src/assets/mail.svg";
import styles from "./Footer.module.css";
import SocialMediaCard from "./SocialMediaCard/SocialMediaCard";

type Image = `${string}.svg` | `${string}.png` | `${string}.jpg`;
enum SocialMediaLinks {
  linkedIn = "https://www.linkedin.com/in/dorin-manea/",
  instagram = "https://www.instagram.com/dorinm17/",
  facebook = "https://www.facebook.com/dorinm17/",
  mail = "mailto:dmanea@adobe.com",
}

function Footer() {
  return (
    <footer className={styles.footer}>
      <p className={styles.copyright}>
        &copy; {new Date().getFullYear()} Weatherly, LLC. All rights reserved.
      </p>

      <ul className={styles.socialPlatforms}>
        <SocialMediaCard
          icon={linkedin as Image}
          alt="LinkedIn"
          link={SocialMediaLinks.linkedIn}
        />
        <SocialMediaCard
          icon={instagram as Image}
          alt="Instagram"
          link={SocialMediaLinks.instagram}
        />
        <SocialMediaCard
          icon={facebook as Image}
          alt="Facebook"
          link={SocialMediaLinks.facebook}
        />
        <SocialMediaCard
          icon={mail as Image}
          alt="Mail"
          link={SocialMediaLinks.mail}
        />
      </ul>
    </footer>
  );
}

export default Footer;
