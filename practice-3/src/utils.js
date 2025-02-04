/**
 * @param {string} s
 */
const capitalize = (s) => {
  return s.charAt(0).toUpperCase() + s.slice(1);
};

/**
 * 
 * @param {number} sunrise 
 * @param {number} sunset 
 * @returns 
 */
const dayOrNight = (sunrise, sunset) => {
  const now = new Date().getTime() / 1000;
  return now >= sunrise && now < sunset;
};

// Display an accurate weather icon.
/**
 * 
 * @param {number} code 
 * @param {boolean} daytime 
 * @returns 
 */
const chooseImage = (code, daytime) => {
  let image;

  if (code >= 200 && code < 300) image = "thunderstorm";
  else if (code >= 300 && code < 600) image = "rain";
  else if (code >= 600 && code <= 613) image = "snow";
  else if (code >= 615 && code < 700) image = "rain-and-snow";
  else if ([701, 721, 741, 771].includes(code)) image = "wind";
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

/**
 * 
 * @param {number} mps 
 * @returns 
 */
const convertMpsToKmph = (mps) => {
  return (mps * 3.6).toFixed(0);
};

// Convert the Air Quality Index to a more verbose description.
/**
 * 
 * @param {number} aqi 
 * @returns 
 */
const convertAQI = (aqi) => {
  const descArr = ["Good", "Fair", "Moderate", "Poor", "Very Poor"];
  return descArr[aqi - 1];
};

/**
 * 
 * @param {number} time 
 * @param {number} timezone 
 * @returns 
 */
const convertToLocalTime = (time, timezone) => {
  return new Date((time + timezone) * 1000).toLocaleTimeString("en-US", {
    timeZone: "UTC",
    hour: "numeric",
    minute: "2-digit",
    hour12: false,
  });
};

// Check if the temperature is zero and return 0 instead of -0.
/**
 * @param {number} temp
 */
const checkIfZeroTemp = (temp) => {
  const roundedTemp = temp.toFixed(0);
  return roundedTemp === "-0" ? 0 : roundedTemp;
}

export { capitalize, dayOrNight, chooseImage, convertMpsToKmph, convertAQI, convertToLocalTime, checkIfZeroTemp };
