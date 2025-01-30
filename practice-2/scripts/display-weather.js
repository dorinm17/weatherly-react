import {
  capitalize,
  dayOrNight,
  chooseImage,
  convertMpsToKmph,
  convertAQI,
} from "./utils.js";

const todayForecast = async (dailyForecast, hourlyForecast) => {
  const rightNowDiv = document.querySelector("#right-now");
  rightNowDiv.innerHTML = `
      <div>
          <h3>${hourlyForecast.city.name}<span id="country-code"> ${
    hourlyForecast.city.country
  }</span> ${hourlyForecast.list[1].main.temp.toFixed(0)}&deg;C</h3>
          <p>${capitalize(hourlyForecast.list[1].weather[0].description)}</p>
          <p>Precipitation: ${dailyForecast.list[0].pop * 100}%</p>
          <p>H:${dailyForecast.list[0].temp.max.toFixed(
            0
          )}&deg; L:${dailyForecast.list[0].temp.min.toFixed(0)}&deg;</p>
      </div>
      `;
  let daytime = dayOrNight(
    hourlyForecast.city.sunrise,
    hourlyForecast.city.sunset
  );
  let imageTag = chooseImage(hourlyForecast.list[1].weather[0].id, daytime);
  rightNowDiv.append(imageTag);

  document.querySelectorAll("#hourly-forecast div").forEach((div, index) => {
    const hour = hourlyForecast.list[index + 1];
    const time = hour.dt_txt.split(" ")[1].split(":")[0];
    div.innerHTML = `<p>${time}:00</p>`;

    imageTag = chooseImage(hour.weather[0].id, daytime);
    const pTemp = document.createElement("p");
    pTemp.innerHTML = `${hour.main.temp.toFixed(0)}&deg; C`;
    div.append(imageTag, pTemp);
  });
};

const fiveDayForecast = async (dailyForecast) => {
  const weatherForTheDay = document.querySelectorAll(".weather-for-the-day");
  weatherForTheDay.forEach((day, index) => {
    const weather = dailyForecast.list[index];
    const weekday =
      index == 0
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
       <p><span class="temperature">${weather.temp.max.toFixed(
         0
       )}&deg;</span> / ${weather.temp.min.toFixed(
      0
    )}&deg; <span class="temperature">C</span</p>
      `;
  });
};

const todayDetails = async (hourlyForecast, airPollution) => {
  document.querySelector("#today-details ul").innerHTML = `
      <li><img src="images/humidity.svg" alt=""> Humidity:  ${
        hourlyForecast.list[0].main.humidity
      }%</li>
      <li><img src="images/temperature.svg" alt="">Feels like:  ${hourlyForecast.list[0].main.feels_like.toFixed(
        0
      )}&deg;C</li>
      <li><img src="images/sunrise.svg" alt="">Rise:  ${new Date(
        hourlyForecast.city.sunrise * 1000
      ).toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: false,
      })}</li>
      <li><img src="images/wind.svg" alt="">Wind:  ${convertMpsToKmph(
        hourlyForecast.list[0].wind.speed
      )}km/h</li>
      <li><img src="images/air-quality.svg" alt="">Air quality:  ${convertAQI(
        airPollution.list[0].main.aqi
      )}</li>
      <li><img src="images/sunset.svg" alt="">Set:  ${new Date(
        hourlyForecast.city.sunset * 1000
      ).toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: false,
      })}</li>
      <li><img src="images/gusts.svg" alt="">Gusts:  ${convertMpsToKmph(
        hourlyForecast.list[0].wind.gust
      )}km/h </li>
      <li><img src="images/uv-index.svg" alt="">Cloudiness:  ${
        hourlyForecast.list[0].clouds.all
      }%</li>
      `;
};

// Display the current weather data on the page for all sections.
const displayWeather = async (weatherData) => {
  try {
    document.querySelector("main").style.display = "none";
    document.querySelector("#loading-spinner").style.display = "block";
    const dailyForecast = weatherData.dailyForecast;
    const hourlyForecast = weatherData.hourlyForecast;
    const airPollution = weatherData.airPollution;

    await todayForecast(dailyForecast, hourlyForecast);
    await fiveDayForecast(dailyForecast);
    await todayDetails(hourlyForecast, airPollution);
  } catch (error) {
    console.error("Error displaying complete weather info:", error);
  } finally {
    document.querySelector("#loading-spinner").style.display = "none";
    document.querySelector("main").style.display = "grid";
  }
};

export { displayWeather };
