import SearchBar from "./SearchBar/SearchBar";
import banner from "/src/assets/weather-transition.jpeg";
import styles from "./Header.module.css";

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.titleDiv}>
        <h1 className={styles.title}>Weatherly</h1>

        <h2 className={styles.motto}>
          Don't be under the weather
          <span className={styles.exclamationMark}>!</span>
        </h2>
      </div>

      <img className={styles.banner} src={banner} alt="" />

      <SearchBar />
    </header>
  );
}

export default Header;
