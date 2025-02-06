function Footer() {
  return (
    <footer>
      <p>
        &copy; {new Date().getFullYear()} Weatherly, LLC. All rights reserved.
      </p>
      <ul>
        <li>
          <a href="https://www.linkedin.com/in/dorin-manea/">
            <img src="src/assets/linkedin.svg" alt="LinkedIn" />
          </a>
        </li>
        <li>
          <a href="https://www.instagram.com/dorinm17/">
            <img src="src/assets/instagram.svg" alt="Instagram" />
          </a>
        </li>
        <li>
          <a href="https://www.facebook.com/dorinm17/">
            <img src="src/assets/facebook.svg" alt="Facebook" />
          </a>
        </li>
        <li>
          <a href="mailto:dmanea@adobe.com">
            <img src="src/assets/mail.svg" alt="Mail" />
          </a>
        </li>
      </ul>
    </footer>
  );
}

export default Footer;
