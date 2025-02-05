// Since I'm not using a server, I can't store sensitive data like API keys in a .env file.
const OPENWEATHER_API_KEY = "c2b684a41108eb410abf5520de64edd6";
const GOOGLE_MAPS_API_KEY = "AIzaSyD4kq9y5crf0SYPJq-YxEhUtETDm5zfOBs";
var sessionKeys;
(function (sessionKeys) {
    sessionKeys["userInput"] = "userInput";
    sessionKeys["currentCity"] = "currentCity";
    sessionKeys["weatherData"] = "weatherData";
})(sessionKeys || (sessionKeys = {}));
var defaultCity;
(function (defaultCity) {
    defaultCity["city"] = "Bucharest";
})(defaultCity || (defaultCity = {}));
var booleanStr;
(function (booleanStr) {
    booleanStr["true"] = "true";
    booleanStr["false"] = "false";
})(booleanStr || (booleanStr = {}));
export { OPENWEATHER_API_KEY, GOOGLE_MAPS_API_KEY, sessionKeys, defaultCity, booleanStr, };
