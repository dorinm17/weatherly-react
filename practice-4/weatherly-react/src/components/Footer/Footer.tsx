import linkedin from "/src/assets/linkedin.svg";
import instagram from "/src/assets/instagram.svg";
import facebook from "/src/assets/facebook.svg";
import mail from "/src/assets/mail.svg";
import styles from "./Footer.module.css";
import SocialMediaList from "./SocialMediaList/SocialMediaList";

type Image = `${string}.svg` | `${string}.png` | `${string}.jpg`;
enum SocialMediaLinks {
  linkedIn = "https://www.linkedin.com/in/dorin-manea/",
  instagram = "https://www.instagram.com/dorinm17/",
  facebook = "https://www.facebook.com/dorinm17/",
  mail = "mailto:dmanea@adobe.com",
}
export interface SocialMediaProps {
  icon: Image;
  alt: string;
  link: string;
}

function Footer() {
  const socials: SocialMediaProps[] = [
    {
      icon: linkedin as Image,
      alt: "LinkedIn",
      link: SocialMediaLinks.linkedIn,
    },
    {
      icon: instagram as Image,
      alt: "Instagram",
      link: SocialMediaLinks.instagram,
    },
    {
      icon: facebook as Image,
      alt: "Facebook",
      link: SocialMediaLinks.facebook,
    },
    { icon: mail as Image, alt: "Mail", link: SocialMediaLinks.mail },
  ];

  return (
    <footer className={styles.footer}>
      <p className={styles.copyright}>
        &copy; {new Date().getFullYear()} Weatherly, LLC. All rights reserved.
      </p>

      <SocialMediaList socials={socials} />
    </footer>
  );
}

export default Footer;
