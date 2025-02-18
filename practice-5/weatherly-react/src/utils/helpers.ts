import type { AQI, AQIVerbose, Time, Weekday, Image } from "./types";

// Decorator to check if the `number` type arguments for most of the methods are positive.
const isPositive = (paramIndexes?: number[]): MethodDecorator => {
  return function (
    _,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor
  ): void {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: number[]) {
      const indexesToCheck = paramIndexes ?? args.map((_, index) => index);

      indexesToCheck.forEach((index) => {
        if (typeof args[index] === "number" && args[index] < 0) {
          throw new Error(
            `Argument at index ${index} in ${String(
              propertyKey
            )} must be a non-negative number.`
          );
        }
      });

      return originalMethod.apply(this, args);
    };
  };
};

class Utils {
  static capitalize(s: string): string {
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  @isPositive()
  static dayOrNight(sunrise: number, sunset: number): boolean {
    const now: number = new Date().getTime() / 1000;
    return now >= sunrise && now < sunset;
  }

  // Display an accurate weather icon.
  @isPositive()
  static chooseImage(code: number, daytime: boolean): Image {
    let image: string = "";

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
    else if ([803, 804].includes(code)) image = "clouds";

    const imageTag: HTMLImageElement = document.createElement("img");
    const imageURL: Image = `/src/assets/${image}.svg`;
    try {
      imageTag.src = imageURL;
      imageTag.alt = "";
    } catch (error) {
      console.error("Error loading image:", error);
    }

    return imageURL;
  }

  @isPositive()
  static convertMpsToKmph(mps: number): string {
    return (mps * 3.6).toFixed(0);
  }

  // Convert the Air Quality Index to a more verbose description.
  static descArr: AQIVerbose[] = [
    "Good",
    "Fair",
    "Moderate",
    "Poor",
    "Very Poor",
  ];
  static convertAQI(aqi: AQI): AQIVerbose {
    return Utils.descArr[aqi - 1];
  }

  @isPositive([0])
  static convertToLocalTime(time: number, timezone: number): Time {
    return new Date((time + timezone) * 1000).toLocaleTimeString("en-US", {
      timeZone: "UTC",
      hour: "numeric",
      minute: "2-digit",
      hour12: false,
    }) as Time;
  }

  // Check if the temperature is zero and return 0 instead of -0. Return the rounded temperature in any case.
  static checkIfZeroTemp(temp: number): number {
    const roundedTemp: string = temp.toFixed(0);
    return parseFloat(roundedTemp === "-0" ? "0" : roundedTemp);
  }

  @isPositive()
  static getWeekday(timestamp: number): Weekday {
    return new Date(timestamp * 1000).toLocaleDateString("en-US", {
      weekday: "long",
    }) as Weekday;
  }
}

export const capitalize = Utils.capitalize;
export const dayOrNight = Utils.dayOrNight;
export const chooseImage = Utils.chooseImage;
export const convertMpsToKmph = Utils.convertMpsToKmph;
export const convertAQI = Utils.convertAQI;
export const convertToLocalTime = Utils.convertToLocalTime;
export const checkIfZeroTemp = Utils.checkIfZeroTemp;
export const getWeekday = Utils.getWeekday;
