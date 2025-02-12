import Header from "./components/Header/Header";
import LoadingSpinner from "./components/LoadingSpinner/LoadingSpinner";
import Footer from "./components/Footer/Footer";
import DailyForecast from "./components/DailyForecast/DailyForecast";
import CurrentWeather from "./components/CurrentWeather/CurrentWeather";
import TodayForecast from "./components/TodayForecast/TodayForecast";
import { useEffect, useState, useMemo } from "react";
import { WeatherContext, WeatherData, WeatherContextType } from "./utils/types";
import { defaultCity } from "./utils/const";
import { getWeather, reverseGeocode } from "./utils/fetch-data";

function App() {
  const [userInput, setUserInput] = useState<boolean>(false);
  const [currentCity, setCurrentCity] = useState<string>(defaultCity);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  // When the current session ends, reset the weather to the user's current location.
  useEffect(() => {
    const controller: AbortController = new AbortController();

    const handleBeforeUnload = () => {
      setUserInput(false);
      setCurrentCity(defaultCity);
      setWeatherData(null);
      setLoading(true);
    };

    window.addEventListener("beforeunload", handleBeforeUnload, {
      signal: controller.signal,
    });

    // Cleans up all event listeners associated with `controller.signal`
    return () => controller.abort();
  }, []);

  // Before the user gets to search for a city, the app will display the weather for the default city.
  useEffect(() => {
    let city: string = defaultCity;

    (async () => {
      try {
        if (navigator.geolocation) {
          // Wrap geolocation in a Promise to ensure we wait for it.
          const position: GeolocationPosition =
            await new Promise<GeolocationPosition>((resolve, reject) => {
              navigator.geolocation.getCurrentPosition(resolve, reject);
            });
          const latitude: number = position.coords.latitude;
          const longitude: number = position.coords.longitude;

          city = (await reverseGeocode(latitude, longitude)) ?? defaultCity;
          setCurrentCity(city);
        } else console.log("Geolocation is not supported by this browser.");
        // Now that we have the actual current location, fetch the weather
        const data: WeatherData = await getWeather(city);
        setWeatherData(data);
        setLoading(false);
      } catch (error) {
        if ((error as GeolocationPositionError).code === 1) {
          console.error("User denied geolocation access.");
          setLoading(false);
          return;
        }
        console.error("Error in initial weather process:", error);
      }
    })();
  }, []);

  // Memoize the context value to avoid unnecessary re-renders
  const contextValue = useMemo<WeatherContextType>(
    () => ({
      weatherData,
      setWeatherData,
      userInput,
      setUserInput,
      currentCity,
      setCurrentCity,
    }),
    [weatherData, userInput, currentCity]
  );

  return (
    <WeatherContext.Provider value={contextValue}>
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
