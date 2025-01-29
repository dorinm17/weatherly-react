// Since I'm not using a server, I can't store sensitive data like API keys in a .env file.
const OPENWEATHER_API_KEY = "c2b684a41108eb410abf5520de64edd6";
const GOOGLE_MAPS_API_KEY = "AIzaSyD4kq9y5crf0SYPJq-YxEhUtETDm5zfOBs";

class Location {
  constructor(city, countryCode) {
    this.city = city;
    this.countryCode = countryCode;
  }
}

// Use Google Maps Geocoding API to get the city name based on the user's coordinates, since OpenWeather is not highly precise.
const reverseGeocode = async (latitude, longitude) => {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_MAPS_API_KEY}`;

  const location = await fetch(url)
    .then((response) => response.json())
    .then((data) => {
      if (!data.results || data.results.length === 0)
        throw new Error("No results found for the given coordinates.");

      const addressComponents = data.results[0].address_components;
      const city = addressComponents.find((component) =>
        component.types.includes("locality")
      ).long_name;
      const countryCode = addressComponents.find((component) =>
        component.types.includes("country")
      ).short_name;

      return new Location(city, countryCode);
    })
    .catch((error) => {
      console.error("Error getting city name:", error);
      return JSON.parse(sessionStorage.getItem("currentLocation"));
    });

  return location;
};

// Use OpenWeatherMap API to retrieve the weather data for a given city and country code.
const getWeather = async (city, countryCode) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${countryCode}&appid=${OPENWEATHER_API_KEY}`;
  let response;

  try {
    response = await fetch(url);
    if (!response.ok) throw new Error("Error: Failed to fetch weather data.");
    return response.json();
  } catch (error) {
    console.error(error);
    return response.json();
  }
};

const displayWeather = (weather) => {
  document.querySelector("main").style.display = "grid";
};

// Before the user gets to search for a city, the app will display the weather for the user's current location.
if (
  sessionStorage.getItem("userInput") === null ||
  sessionStorage.getItem("userInput") === "false"
) {
  let location = new Location("Paris", "FR"); // Backup location in case geolocation fails
  sessionStorage.setItem("currentLocation", JSON.stringify(location));
  sessionStorage.setItem("userInput", false);

  (async () => {
    try {
      if (navigator.geolocation) {
        // Wrap geolocation in a Promise to ensure we wait for it
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        location = await reverseGeocode(latitude, longitude);
        sessionStorage.setItem("currentLocation", JSON.stringify(location));
      } else {
        console.log("Geolocation is not supported by this browser.");
      }

      // Now that we have the actual current location, fetch the weather
      let weather = await getWeather(location.city, location.countryCode);
      displayWeather(weather);
    } catch (error) {
      console.error("Error in initial weather process:", error);
    }
  })();
}
