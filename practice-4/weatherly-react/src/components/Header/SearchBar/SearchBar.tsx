import styles from "./SearchBar.module.css";
import searchIcon from "/src/assets/search.svg";

function SearchBar() {
  return (
    <nav>
      <form
        action=""
        method="get"
        autoComplete="off"
        className={styles.searchForm}
      >
        <button
          type="submit"
          aria-label="Submit your search"
          className={styles.searchButton}
        >
          <img src={searchIcon} alt="search" className={styles.searchIcon} />
        </button>
        <input
          type="text"
          id="city"
          name="city"
          placeholder="Search for your city"
          aria-label="Search for your city"
          className={styles.searchInput}
        />
      </form>
    </nav>
  );
}

export default SearchBar;
