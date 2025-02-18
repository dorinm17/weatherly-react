import styles from "./SearchBar.module.css";
import searchIcon from "../../../assets/search.svg";
import { useContext, useState } from "react";
import {
  WeatherContext,
  WeatherContextType,
  WeatherData,
} from "../../../utils/types";
import { getWeather } from "../../../utils/fetch-data";

function SearchBar() {
  const wc: WeatherContextType = useContext(
    WeatherContext
  ) as WeatherContextType;
  const [city, setCity] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!city) return;

    try {
      const weatherData: WeatherData = await getWeather(city);
  
      if (weatherData.currentWeather.cod == 200) {
        wc.setUserInput(true);
        wc.setCurrentCity(city);
        wc.setWeatherData(weatherData);
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
    } finally {
      setCity("");
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
