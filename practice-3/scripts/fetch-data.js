import {
  GOOGLE_MAPS_API_KEY,
  OPENWEATHER_API_KEY,
  WeatherData,
} from "./const.js";

// Use Google Maps Geocoding API to get the city name based on the user's coordinates, since OpenWeather is not highly precise.
const reverseGeocode = async (latitude, longitude) => {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_MAPS_API_KEY}`;

  const city = await fetch(url)
    .then((response) => response.json())
    .then((data) => {
      if (!data.results || data.results.length === 0)
        throw new Error("No results found for the given coordinates.");

      const addressComponents = data.results[0].address_components;
      const city = addressComponents.find((component) =>
        component.types.includes("locality")
      ).long_name;

      return city;
    })
    .catch((error) => {
      console.error("Error getting city name:", error);
      return sessionStorage.getItem("city");
    });

  return city;
};

const getCityCoordinates = async (city) => {
  const url = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${OPENWEATHER_API_KEY}`;
  const response = await fetch(url)
    .then((response) => response.json())
    .catch((error) => {
      console.error("Error fetching city coordinates:", error);
    });

  return response[0];
};

// Use OpenWeatherMap API to retrieve the weather data for a given city and country code.
const getWeather = async (city) => {
  const coords = await getCityCoordinates(city);

  const urls = [
    `https://pro.openweathermap.org/data/2.5/forecast/hourly?q=${city}&cnt=11&&appid=${OPENWEATHER_API_KEY}&units=metric`,
    `https://api.openweathermap.org/data/2.5/forecast/daily?q=${city}&cnt=5&appid=${OPENWEATHER_API_KEY}&units=metric`,
    `https://api.openweathermap.org/data/2.5/air_pollution?lat=${coords.lat}&lon=${coords.lon}&appid=${OPENWEATHER_API_KEY}`,
  ];

  const weatherData = Promise.all(
    urls.map((url) => fetch(url).then((response) => response.json()))
  )
    .then((data) => {
      return new WeatherData(data[0], data[1], data[2]);
    })
    .catch((error) => {
      console.error("Error fetching weather data:", error);
    });

  return weatherData;
};

export { getWeather, reverseGeocode };
