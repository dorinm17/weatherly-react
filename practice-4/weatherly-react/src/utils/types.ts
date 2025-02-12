import { createContext } from "react";

interface CityCoordinates {
  name: string;
  lat: number;
  lon: number;
  local_names: Record<string, string>;
  // In the future, I want to implement a feature where the user gets suggestions in the search bar
  country: string;
  state?: string;
}

type WeatherInfo = {
  dt: number;
  weather: Record<string, string | number>[];
  clouds: Record<string, number>;
  pop: number;
};

type CityInfo = Record<string, string | number | Record<string, number>>;

// Generic type for forecast lists
type ForecastList<T> = T & WeatherInfo;

// Generic forecast interface
interface Forecast<T> {
  cod: string;
  message: number;
  cnt: number;
  city: CityInfo;
  list: ForecastList<T>[];
}

interface HourlyData {
  main: Record<string, number>;
  wind: Record<string, number>;
  visibility: number;
  rain: Record<string, number>;
  sys: Record<string, string>;
  dt_txt: string;
}

interface DailyData {
  sunrise: number;
  sunset: number;
  temp: Record<string, number>;
  feels_like: Record<string, number>;
  pressure: number;
  humidity: number;
  speed: number;
  deg: number;
  gust: number;
  rain: number;
}

// Reusable interfaces
type HourlyForecast = Forecast<HourlyData>;
type FiveDayForecast = Forecast<DailyData>;

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

interface CurrentForecast {
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

type WeatherError = {
  cod: string | number;
  message: string;
};

interface WeatherData {
  hourlyForecast: HourlyForecast | WeatherError;
  dailyForecast: FiveDayForecast | WeatherError;
  airPollution: AirPollutionFailproof | WeatherError;
  currentWeather: CurrentForecast | WeatherError;
}

type Time = `${number}:${number}`;
type Image = `${string}.svg` | `${string}.png` | `${string}.jpg`;
type Weekday =
  | "Today"
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";

interface WeatherContextType {
  weatherData: WeatherData | null;
  setWeatherData: React.Dispatch<React.SetStateAction<WeatherData | null>>;
  userInput: boolean;
  setUserInput: React.Dispatch<React.SetStateAction<boolean>>;
  currentCity: string;
  setCurrentCity: React.Dispatch<React.SetStateAction<string>>;
}

export type {
  WeatherData,
  CityCoordinates,
  HourlyForecast,
  FiveDayForecast,
  AQI,
  AQIVerbose,
  AirPollutionFailproof,
  CurrentForecast,
  Time,
  Image,
  Weekday,
  WeatherContextType,
  WeatherError,
};

export const WeatherContext = createContext<WeatherContextType | null>(null);
