import { getWeather, reverseGeocode } from "./fetch-data.js";
import { displayWeather } from "./display-weather.js";
import { sessionKeys, defaultCity, booleanStr, WeatherData } from "./const.js";

const copyYearElement: HTMLSpanElement | null =
  document.querySelector("#copyYear");

if (copyYearElement)
  copyYearElement.textContent = new Date().getFullYear().toString();

// When the current session ends, reset the weather to the user's current location.
window.addEventListener("beforeunload", () => {
  sessionStorage.setItem(sessionKeys.userInput, booleanStr.false);
});

// Before the user gets to search for a city, the app will display the weather for the user's current location.
if (
  sessionStorage.getItem(sessionKeys.userInput) === null ||
  sessionStorage.getItem(sessionKeys.userInput) === booleanStr.false
) {
  let city: string = defaultCity.city; // Backup location in case geolocation fails
  sessionStorage.setItem(sessionKeys.currentCity, city);

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

        city = (await reverseGeocode(latitude, longitude)) ?? defaultCity.city;
        sessionStorage.setItem(sessionKeys.currentCity, city);
      } else console.log("Geolocation is not supported by this browser.");
      // Now that we have the actual current location, fetch the weather
      const weatherData: WeatherData = await getWeather(city);
      sessionStorage.setItem(
        sessionKeys.weatherData,
        JSON.stringify(weatherData)
      );
      displayWeather(weatherData);
    } catch (error) {
      if ((error as GeolocationPositionError).code === 1) {
        console.error("User denied geolocation access.");
        return;
      }
      console.error("Error in initial weather process:", error);
    }
  })();
}

// When the user submits a city, fetch the weather for that city.
const formElement: HTMLFormElement | null = document.querySelector("form");

if (formElement) {
  formElement.addEventListener("submit", async (event: SubmitEvent) => {
    event.preventDefault();

    const cityInput: HTMLInputElement | null = document.querySelector("#city");

    if (cityInput) {
      const city: string = cityInput.value;
      cityInput.value = "";

      try {
        const weatherData: WeatherData = await getWeather(city);
        sessionStorage.setItem(sessionKeys.currentCity, city);
        sessionStorage.setItem(sessionKeys.userInput, booleanStr.true);
        sessionStorage.setItem(
          sessionKeys.weatherData,
          JSON.stringify(weatherData)
        );
        displayWeather(weatherData);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    }
  });
}
