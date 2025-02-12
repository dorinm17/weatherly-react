// Since I'm not using a server, I can't store sensitive data like API keys in a .env file.
const OPENWEATHER_API_KEY: string = import.meta.env.VITE_OPENWEATHER_API_KEY;
const GOOGLE_MAPS_API_KEY: string = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const defaultCity: string = "Bucharest";

export { OPENWEATHER_API_KEY, GOOGLE_MAPS_API_KEY, defaultCity };
