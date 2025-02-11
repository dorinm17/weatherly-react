// Since I'm not using a server, I can't store sensitive data like API keys in a .env file.
const OPENWEATHER_API_KEY: string = import.meta.env.OPENWEATHER_API_KEY;
const GOOGLE_MAPS_API_KEY: string = import.meta.env.GOOGLE_MAPS_API_KEY;

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

export {
  OPENWEATHER_API_KEY,
  GOOGLE_MAPS_API_KEY,
  sessionKeys,
  defaultCity,
  booleanStr,
};
