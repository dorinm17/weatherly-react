import Header from "./components/Header/Header";
import LoadingSpinner from "./components/LoadingSpinner/LoadingSpinner";
import Footer from "./components/Footer/Footer";
import DailyForecast from "./components/DailyForecast/DailyForecast";
import CurrentWeather from "./components/CurrentWeather/CurrentWeather";
import TodayForecast from "./components/TodayForecast/TodayForecast";
import { useEffect, useState } from "react";
import { WeatherContext, WeatherData } from "./utils/types";
import { defaultCity } from "./utils/const";
import { getWeather, reverseGeocode } from "./utils/fetch-data";

function App() {
  const [userInput, setUserInput] = useState<boolean>(false);
  const [currentCity, setCurrentCity] = useState<string>(defaultCity);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  // When the current session ends, reset the weather to the user's current location.
  useEffect(() => {
    const handleBeforeUnload = () => {
      setUserInput(false);
      setCurrentCity(defaultCity);
      setWeatherData(null);
      setLoading(true);
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  // Before the user gets to search for a city, the app will display the weather for the default city.
  useEffect(() => {
    let isMounted = true;
    const fetchAndUnmount = async (city: string) => {
      try {
        setLoading(true);
        const data = await getWeather(city);
        if (isMounted) setWeatherData(data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    if (!userInput) {
      (async () => {
        try {
          if (navigator.geolocation) {
            const position = await new Promise<GeolocationPosition>(
              (resolve, reject) =>
                navigator.geolocation.getCurrentPosition(resolve, reject)
            );
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            const city =
              (await reverseGeocode(latitude, longitude)) || currentCity;
            setCurrentCity(city);
            fetchAndUnmount(city);
          } else {
            fetchAndUnmount(currentCity);
          }
        } catch (error) {
          console.error("Error during geolocation:", error);
        }
      })();
    } else {
      fetchAndUnmount(currentCity);
    }

    return () => {
      isMounted = false;
    };
  }, [userInput, currentCity]);

  return (
    <WeatherContext.Provider
      value={{
        weatherData,
        setWeatherData,
        userInput,
        setUserInput,
        currentCity,
        setCurrentCity,
      }}
    >
      <Header />

      {loading && <LoadingSpinner />}
      {!loading && (
        <main>
          <DailyForecast />
          <TodayForecast />
          <CurrentWeather />
        </main>
      )}

      <Footer />
    </WeatherContext.Provider>
  );
}

export default App;
