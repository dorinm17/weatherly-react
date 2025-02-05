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

export {
  OPENWEATHER_API_KEY,
  GOOGLE_MAPS_API_KEY,
  sessionKeys,
  defaultCity,
  booleanStr,
};
