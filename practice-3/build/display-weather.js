import { capitalize, dayOrNight, chooseImage, convertMpsToKmph, convertAQI, convertToLocalTime, checkIfZeroTemp, } from "./utils.js";
const todayForecast = async (dailyForecast, hourlyForecast, currentWeather) => {
    const rightNowDiv = document.querySelector("#right-now");
    if (!rightNowDiv) {
        console.error("right-now element not found in the DOM");
        return;
    }
    rightNowDiv.innerHTML = `
      <div>
          <h3>${hourlyForecast.city.name}<span id="country-code"> ${hourlyForecast.city.country}</span> ${checkIfZeroTemp(currentWeather.main.temp)}&deg;C</h3>
          <p>${capitalize(currentWeather.weather[0].description)}</p>
          <p>Precipitation: ${dailyForecast.list[0].pop * 100}%</p>
          <p>H:${checkIfZeroTemp(dailyForecast.list[0].temp.max)}&deg; L:${checkIfZeroTemp(dailyForecast.list[0].temp.min)}&deg;</p>
      </div>
      `;
    const daytime = dayOrNight(hourlyForecast.city.sunrise, hourlyForecast.city.sunset);
    let imageTag = chooseImage(currentWeather.weather[0].id, daytime);
    rightNowDiv.append(imageTag);
    document.querySelectorAll("#hourly-forecast div").forEach((div, index) => {
        const hour = hourlyForecast.list[index];
        const time = convertToLocalTime(hour.dt, hourlyForecast.city.timezone);
        div.innerHTML = `<p>${time}</p>`;
        imageTag = chooseImage(Number(hour.weather[0].id), daytime);
        const pTemp = document.createElement("p");
        pTemp.innerHTML = `${checkIfZeroTemp(hour.main.temp)}&deg; C`;
        div.append(imageTag, pTemp);
    });
};
const fiveDayForecast = async (dailyForecast) => {
    document.querySelectorAll(".weather-for-the-day").forEach((day, index) => {
        const weather = dailyForecast.list[index];
        const weekday = index == 0
            ? "Today"
            : new Date(weather.dt * 1000).toLocaleDateString("en-US", {
                weekday: "long",
            });
        day.innerHTML = `<p>${weekday}</p>`;
        const imageTag = chooseImage(weather.weather[0].id, true);
        day.append(imageTag);
    });
    document.querySelectorAll(".weather-condition").forEach((day, index) => {
        const weather = dailyForecast.list[index];
        day.innerHTML = `
      <p>${capitalize(weather.weather[0].description)}</p>
       <p><span class="temperature">${checkIfZeroTemp(weather.temp.max)}&deg;</span> / ${checkIfZeroTemp(weather.temp.min)}&deg; <span class="temperature">C</span</p>
      `;
    });
};
const todayDetails = async (hourlyForecast, currentWeather, airPollution) => {
    const todayDetailsElement = document.querySelector("#today-details ul");
    if (!todayDetailsElement) {
        console.error("today-details element not found in the DOM.");
        return;
    }
    todayDetailsElement.innerHTML = `
      <li><img src="images/humidity.svg" alt=""> Humidity: ${currentWeather.main.humidity}%</li>
      <li><img src="images/temperature.svg" alt=""> Feels like: ${checkIfZeroTemp(currentWeather.main.feels_like)}&deg;C</li>
      <li><img src="images/sunrise.svg" alt=""> Rise: ${convertToLocalTime(currentWeather.sys.sunrise, currentWeather.timezone)}</li>
      <li><img src="images/wind.svg" alt=""> Wind: ${convertMpsToKmph(currentWeather.wind.speed)} km/h</li>
      <li><img src="images/air-quality.svg" alt=""> Air quality: ${airPollution === "-" ? "-" : convertAQI(airPollution.list[0].main.aqi)}</li>
      <li><img src="images/sunset.svg" alt=""> Set: ${convertToLocalTime(currentWeather.sys.sunset, currentWeather.timezone)}</li>
      <li><img src="images/gusts.svg" alt=""> Gusts: ${convertMpsToKmph(hourlyForecast.list[0].wind.gust)} km/h</li>
      <li><img src="images/uv-index.svg" alt=""> Cloudiness: ${currentWeather.clouds.all}%</li>
    `;
};
// Display the current weather data on the page for all sections.
const displayWeather = async (weatherData) => {
    try {
        const mainElement = document.querySelector("main");
        const loadingSpinner = document.querySelector("#loading-spinner");
        if (mainElement && loadingSpinner) {
            mainElement.style.display = "none";
            loadingSpinner.style.display = "block";
        }
        else {
            console.error("main element or loading spinner not found in the DOM.");
            return;
        }
        const { dailyForecast, hourlyForecast, airPollution, currentWeather } = weatherData;
        await todayForecast(dailyForecast, hourlyForecast, currentWeather);
        await fiveDayForecast(dailyForecast);
        await todayDetails(hourlyForecast, currentWeather, airPollution);
    }
    catch (error) {
        console.error("Error displaying complete weather info:", error);
    }
    finally {
        const mainElement = document.querySelector("main");
        const loadingSpinner = document.querySelector("#loading-spinner");
        if (mainElement && loadingSpinner) {
            loadingSpinner.style.display = "none";
            mainElement.style.display = "grid";
        }
    }
};
export { displayWeather };
