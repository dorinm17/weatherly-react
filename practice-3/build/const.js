"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WeatherData = exports.GOOGLE_MAPS_API_KEY = exports.OPENWEATHER_API_KEY = void 0;
// Since I'm not using a server, I can't store sensitive data like API keys in a .env file.
const OPENWEATHER_API_KEY = "c2b684a41108eb410abf5520de64edd6";
exports.OPENWEATHER_API_KEY = OPENWEATHER_API_KEY;
const GOOGLE_MAPS_API_KEY = "AIzaSyD4kq9y5crf0SYPJq-YxEhUtETDm5zfOBs";
exports.GOOGLE_MAPS_API_KEY = GOOGLE_MAPS_API_KEY;
class WeatherData {
    /**
     * @param {object} hourlyForecast
     * @param {object} dailyForecast
     * @param {object} airPollution
     * @param {object} currentWeather
     */
    constructor(hourlyForecast, dailyForecast, airPollution, currentWeather) {
        this.hourlyForecast = hourlyForecast;
        this.dailyForecast = dailyForecast;
        this.airPollution = airPollution;
        this.currentWeather = currentWeather;
    }
}
exports.WeatherData = WeatherData;
