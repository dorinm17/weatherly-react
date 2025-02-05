// Since I'm not using a server, I can't store sensitive data like API keys in a .env file.
const OPENWEATHER_API_KEY: string = "c2b684a41108eb410abf5520de64edd6";
const GOOGLE_MAPS_API_KEY: string = "AIzaSyD4kq9y5crf0SYPJq-YxEhUtETDm5zfOBs";

enum sessionKeys {
  userInput = "userInput",
  currentCity = "currentCity",
  weatherData = "weatherData",
}

enum defaultCity {
  city = "Bucharest",
}

enum booleanStr {
  true = "true",
  false = "false",
}

interface CityCoordinates {
  name: string;
  lat: number;
  lon: number;
  local_names: Record<string, string>;
  // In the future, I want to implement a feature where the user gets suggestions in the search bar
  country: string;
  state?: string;
}

interface HourlyForecast {
  cod: string;
  message: number;
  cnt: number;
  city: Record<string, string | number | Record<string, number>>;
  list: {
    dt: number;
    main: Record<string, number>;
    weather: Record<string, string | number>[];
    clouds: Record<string, number>;
    wind: Record<string, number>;
    visibility: number;
    pop: number;
    rain: Record<string, number>;
    sys: Record<string, string>;
    dt_txt: string;
  }[];
}

interface DailyForecast {
  cod: string;
  message: number;
  cnt: number;
  city: Record<string, string | number | Record<string, number>>;
  list: {
    dt: number;
    sunrise: number;
    sunset: number;
    temp: Record<string, number>;
    feels_like: Record<string, number>;
    pressure: number;
    humidity: number;
    speed: number;
    deg: number;
    gust: number;
    weather: Record<string, string | number>[];
    clouds: number;
    pop: number;
    rain: number;
  }[];
}

type AQI = 1 | 2 | 3 | 4 | 5;
type AQIVerbose = "Good" | "Fair" | "Moderate" | "Poor" | "Very Poor";
type AirPollutionFailproof = AirPollution | "-";
interface AirPollution {
  coord: number[];
  list: {
    dt: number;
    main: {
      aqi: AQI;
    };
    components: Record<string, number>;
  }[];
}

interface CurrentWeather {
  coord: {
    lon: number;
    lat: number;
  };
  weather: Record<string, string | number>[];
  base: string;
  main: Record<string, number>;
  visibility: number;
  wind: Record<string, number>;
  rain: {
    "1h": number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: Record<string, string | number>;
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

interface WeatherData {
  hourlyForecast: HourlyForecast;
  dailyForecast: DailyForecast;
  airPollution: AirPollutionFailproof;
  currentWeather: CurrentWeather;
}

export {
  OPENWEATHER_API_KEY,
  GOOGLE_MAPS_API_KEY,
  WeatherData,
  HourlyForecast,
  DailyForecast,
  AirPollutionFailproof,
  CurrentWeather,
  CityCoordinates,
  AQI,
  AQIVerbose,
  sessionKeys,
  defaultCity,
  booleanStr,
};
