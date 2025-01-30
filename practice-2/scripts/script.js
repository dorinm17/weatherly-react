import { getWeather, reverseGeocode } from "./fetch-data.js";
import { displayWeather } from "./display-weather.js";

document.querySelector("#copyYear").textContent = new Date().getFullYear();

// When the current session ends, reset the weather to the user's current location.
window.addEventListener("beforeunload", () => {
  sessionStorage.setItem("userInput", false);
});

// Before the user gets to search for a city, the app will display the weather for the user's current location.
if (
  sessionStorage.getItem("userInput") === null ||
  sessionStorage.getItem("userInput") === "false"
) {
  let city = "Bucharest"; // Backup location in case geolocation fails
  sessionStorage.setItem("currentCity", city);

  (async () => {
    try {
      if (navigator.geolocation) {
        // Wrap geolocation in a Promise to ensure we wait for it.
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        city = await reverseGeocode(latitude, longitude);
        sessionStorage.setItem("currentCity", city);
      } else console.log("Geolocation is not supported by this browser.");
      // Now that we have the actual current location, fetch the weather
      const weatherData = await getWeather(city);
      sessionStorage.setItem("currentWeather", JSON.stringify(weatherData));
      displayWeather(weatherData);
    } catch (error) {
      if (error instanceof GeolocationPositionError || error.code === 1) {
        console.error("User denied geolocation access.");
        return;
      }
      console.error("Error in initial weather process:", error);
    }
  })();
}

// When the user submits a city, fetch the weather for that city.
document.querySelector("form").addEventListener("submit", async (event) => {
  event.preventDefault();

  const city = document.querySelector("#city").value;
  sessionStorage.setItem("city", city);
  sessionStorage.setItem("userInput", true);
  document.querySelector("#city").value = "";

  const weatherData = await getWeather(city);
  sessionStorage.setItem("currentWeather", JSON.stringify(weatherData));
  displayWeather(weatherData);
});
