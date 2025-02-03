// Since I'm not using a server, I can't store sensitive data like API keys in a .env file.
const OPENWEATHER_API_KEY = "c2b684a41108eb410abf5520de64edd6";
const GOOGLE_MAPS_API_KEY = "AIzaSyD4kq9y5crf0SYPJq-YxEhUtETDm5zfOBs";

class WeatherData {
  constructor(hourlyForecast, dailyForecast, airPollution) {
    this.hourlyForecast = hourlyForecast;
    this.dailyForecast = dailyForecast;
    this.airPollution = airPollution;
  }
}

export { OPENWEATHER_API_KEY, GOOGLE_MAPS_API_KEY, WeatherData };
