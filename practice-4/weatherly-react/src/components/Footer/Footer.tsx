import linkedin from "/src/assets/linkedin.svg";
import instagram from "/src/assets/instagram.svg";
import facebook from "/src/assets/facebook.svg";
import mail from "/src/assets/mail.svg";
import styles from "./Footer.module.css";

function Footer() {
  return (
    <footer className={styles.footer}>
      <p className={styles.copyright}>
        &copy; {new Date().getFullYear()} Weatherly, LLC. All rights reserved.
      </p>

      <ul className={styles.socialPlatforms}>
        <li>
          <a href="https://www.linkedin.com/in/dorin-manea/">
            <img src={linkedin} alt="LinkedIn" className={styles.social} />
          </a>
        </li>
        <li>
          <a href="https://www.instagram.com/dorinm17/">
            <img src={instagram} alt="Instagram" className={styles.social} />
          </a>
        </li>
        <li>
          <a href="https://www.facebook.com/dorinm17/">
            <img src={facebook} alt="Facebook" className={styles.social} />
          </a>
        </li>
        <li>
          <a href="mailto:dmanea@adobe.com">
            <img src={mail} alt="Mail" className={styles.social} />
          </a>
        </li>
      </ul>
    </footer>
  );
}

export default Footer;
