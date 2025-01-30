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

class Coordinates {
  constructor(latitude, longitude) {
    this.latitude = latitude;
    this.longitude = longitude;
  }
}

document.querySelector("#copyYear").textContent = new Date().getFullYear();

// Use Google Maps Geocoding API to get the city name based on the user's coordinates, since OpenWeather is not highly precise.
const reverseGeocode = async (latitude, longitude) => {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_MAPS_API_KEY}`;

  const city = await fetch(url)
    .then((response) => response.json())
    .then((data) => {
      if (!data.results || data.results.length === 0)
        throw new Error("No results found for the given coordinates.");

      const addressComponents = data.results[0].address_components;
      const city = addressComponents.find((component) =>
        component.types.includes("locality")
      ).long_name;

      return city;
    })
    .catch((error) => {
      console.error("Error getting city name:", error);
      return sessionStorage.getItem("city");
    });

  return city;
};

// Use OpenWeatherMap API to retrieve the weather data for a given city and country code.
const getWeather = async (city) => {
  const hourlyUrl = `https://pro.openweathermap.org/data/2.5/forecast/hourly?q=${city}&cnt=11&&appid=${OPENWEATHER_API_KEY}&units=metric`;
  let hourlyForecast = await fetch(hourlyUrl)
    .then((response) => response.json())
    .catch((error) => {
      console.error("Error fetching hourly forecast:", error);
    });

  const dailyUrl = `https://api.openweathermap.org/data/2.5/forecast/daily?q=${city}&cnt=5&appid=${OPENWEATHER_API_KEY}&units=metric`;
  let dailyForecast = await fetch(dailyUrl)
    .then((response) => response.json())
    .catch((error) => {
      console.error("Error fetching daily forecast:", error);
    });

  const coords = await getCityCoordinates(city);
  const airPollutionUrl = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${coords.lat}&lon=${coords.lon}&appid=${OPENWEATHER_API_KEY}`;
  let airPollution = await fetch(airPollutionUrl)
    .then((response) => response.json())
    .catch((error) => {
      console.error("Error fetching air pollution data:", error);
    });

  const weatherData = new WeatherData(
    hourlyForecast,
    dailyForecast,
    airPollution
  );
  sessionStorage.setItem("currentWeather", JSON.stringify(weatherData));
};

const capitalize = (s) => {
  return s.charAt(0).toUpperCase() + s.slice(1);
};

const dayOrNight = (sunrise, sunset) => {
  const now = new Date().getTime() / 1000;
  return now >= sunrise && now < sunset;
};

// Display an accurate weather icon.
const chooseImage = (code, daytime) => {
  let image;

  if (code >= 200 && code < 300) image = "thunderstorm";
  else if (code >= 300 && code < 600) image = "rain";
  else if (code >= 600 && code <= 613) image = "snow";
  else if (code >= 615 && code < 700) image = "rain-and-snow";
  else if ([701, 721, 741, 771].includes(code)) image = "mist";
  else if (code === 781) image = "tornado";
  else if (code >= 700 && code < 800) image = "smoke";
  else if (code === 800) image = daytime ? "sun" : "moon";
  else if ([801, 802].includes(code))
    image = daytime ? "sun-and-clouds" : "moon-and-clouds";
  else if (code >= 803) image = "clouds";

  const imageTag = document.createElement("img");
  imageTag.src = `images/${image}.svg`;
  imageTag.alt = "";
  return imageTag;
};

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

const convertMpsToKmph = (mps) => {
  return (mps * 3.6).toFixed(0);
};

// Convert the Air Quality Index to a more verbose description.
const convertAQI = (aqi) => {
  switch (aqi) {
    case 1:
      return "Good";
    case 2:
      return "Fair";
    case 3:
      return "Moderate";
    case 4:
      return "Poor";
    case 5:
      return "Very Poor";
  }
};

const getCityCoordinates = async (city) => {
  const url = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${OPENWEATHER_API_KEY}`;
  const response = await fetch(url)
    .then((response) => response.json())
    .catch((error) => {
      console.error("Error fetching city coordinates:", error);
    });

  return response[0];
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
const displayWeather = async () => {
  try {
    document.querySelector("main").style.display = "none";
    document.querySelector("#loading-spinner").style.display = "block";
    const weatherData = JSON.parse(sessionStorage.getItem("currentWeather"));
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

// When the current session ends, reset the weather to the user's current location.
window.addEventListener("beforeunload", () => {
  sessionStorage.setItem("userInput", false);
});

// Before the user gets to search for a city, the app will display the weather for the user's current location.
if (
  sessionStorage.getItem("userInput") === null ||
  sessionStorage.getItem("userInput") === "false"
) {
  let city = "Bucharest"; // Backup location in case geolocation fails
  sessionStorage.setItem("currentCity",  city);

  (async () => {
    try {
      if (navigator.geolocation) {
        // Wrap geolocation in a Promise to ensure we wait for it.
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        city = await reverseGeocode(latitude, longitude);
        sessionStorage.setItem("currentCity", city);
      } else {
        console.log("Geolocation is not supported by this browser.");
      }
      // Now that we have the actual current location, fetch the weather
      await getWeather(city);
      displayWeather();
    } catch (error) {
      if (error instanceof GeolocationPositionError || error.code === 1) {
        console.error("User denied geolocation access.");
        return;
      }
      console.error("Error in initial weather process:", error);
    }
  })();
}

// When the user submits a city, fetch the weather for that city.
document.querySelector("form").addEventListener("submit", async (event) => {
  event.preventDefault();
  const city = document.querySelector("#city").value;

  sessionStorage.setItem("city", city);
  sessionStorage.setItem("userInput", true);

  await getWeather(city);
  displayWeather();
});
