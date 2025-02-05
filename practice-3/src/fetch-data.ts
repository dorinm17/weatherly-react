import {
  GOOGLE_MAPS_API_KEY,
  OPENWEATHER_API_KEY,
  sessionKeys,
} from "./const.js";
import {
  AirPollutionFailproof,
  CityCoordinates,
  CurrentWeather,
  DailyForecast,
  HourlyForecast,
  WeatherData,
} from "./types.js";

// Use Google Maps Geocoding API to get the city name based on the user's coordinates, since OpenWeather is not highly precise.
const reverseGeocode = async (
  latitude: number,
  longitude: number
): Promise<string | null> => {
  const url: string = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_MAPS_API_KEY}`;

  const city: string | null = await fetch(url)
    .then((response) => response.json())
    .then((data) => {
      if (!data.results || data.results.length === 0) {
        throw new Error("No results found for the given coordinates.");
      }

      const addressComponents = data.results[0].address_components;
      const localityComponent = addressComponents.find(
        (component: { types: string[]; long_name: string }) =>
          component.types.includes("locality")
      );

      return localityComponent ? localityComponent.long_name : null;
    })
    .catch((error) => {
      console.error("Error getting city name:", error);
      return sessionStorage.getItem(sessionKeys.currentCity);
    });

  return city;
};

const getCityCoordinates = async <CityCoordinates>(
  city: string
): Promise<CityCoordinates | null> => {
  const url: string = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${OPENWEATHER_API_KEY}`;

  const response: CityCoordinates[] = await fetch(url)
    .then((res) => res.json())
    .catch((error) => {
      console.error("Error fetching city coordinates:", error);
      return [];
    });

  // Return the first city coordinate if it exists, otherwise null
  return response.length > 0 ? response[0] : null;
};

// Use OpenWeatherMap API to retrieve the weather data for a given city and country code.
const getWeather = async (city: string): Promise<WeatherData> => {
  const coords: CityCoordinates | null = await getCityCoordinates(city);

  if (!coords) {
    throw new Error(`Coordinates not found for city: ${city}`);
  }

  const urls: string[] = [
    `https://pro.openweathermap.org/data/2.5/forecast/hourly?q=${city}&cnt=10&appid=${OPENWEATHER_API_KEY}&units=metric`,
    `https://api.openweathermap.org/data/2.5/forecast/daily?q=${city}&cnt=5&appid=${OPENWEATHER_API_KEY}&units=metric`,
    `https://api.openweathermap.org/data/2.5/air_pollution?lat=${coords.lat}&lon=${coords.lon}&appid=${OPENWEATHER_API_KEY}`,
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${OPENWEATHER_API_KEY}&units=metric`,
  ];

  try {
    const responses = await Promise.all(
      urls.map((url, index) =>
        fetch(url)
          .then((response) => response.json())
          .catch((error) => {
            if (index === 2) {
              // Air Pollution request
              console.warn("Air pollution data not available. Setting as '-'.");
              return "-"; // Return placeholder value for airPollution
            }
            throw error; // Propagate other errors
          })
      )
    );

    // Ensure each response is properly typed as per the WeatherData interface
    const weatherData: WeatherData = {
      hourlyForecast: responses[0] as HourlyForecast,
      dailyForecast: responses[1] as DailyForecast,
      airPollution: responses[2] as AirPollutionFailproof,
      currentWeather: responses[3] as CurrentWeather,
    };

    return weatherData;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw new Error("Failed to fetch weather data.");
  }
};

export { getWeather, reverseGeocode };
