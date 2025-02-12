import styles from "./SearchBar.module.css";
import searchIcon from "/src/assets/search.svg";
import { useContext, useState } from "react";
import { WeatherContext, WeatherContextType } from "../../../utils/types";
import { getWeather } from "../../../utils/fetch-data";

// URL Parameters
function SearchBar() {
  const wc: WeatherContextType = useContext(
    WeatherContext
  ) as WeatherContextType;
  const [city, setCity] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!city) return;

    try {
      wc.setUserInput(true);
      wc.setCurrentCity(city);
      const weatherData = await getWeather(city);
      wc.setWeatherData(weatherData);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  return (
    <nav>
      <form
        action=""
        method="get"
        autoComplete="off"
        className={styles.searchForm}
        onSubmit={handleSubmit}
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
          name="city"
          placeholder="Search for your city"
          aria-label="Search for your city"
          className={styles.searchInput}
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
      </form>
    </nav>
  );
}

export default SearchBar;
