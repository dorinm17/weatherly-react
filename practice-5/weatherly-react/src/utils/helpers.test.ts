// helpers.test.ts
import {
  capitalize,
  dayOrNight,
  chooseImage,
  convertMpsToKmph,
  convertAQI,
  convertToLocalTime,
  checkIfZeroTemp,
  getWeekday,
} from "./helpers";
import { AQI } from "./types";

describe("Utility Functions", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe("capitalize", () => {
    test("capitalizes first letter of string", () => {
      expect(capitalize("hello")).toBe("Hello");
    });

    test("handles empty string", () => {
      expect(capitalize("")).toBe("");
    });

    test("leaves already capitalized strings unchanged", () => {
      expect(capitalize("World")).toBe("World");
    });
  });

  describe("dayOrNight", () => {
    test("returns true during daytime", () => {
      const sunrise = 1630000000;
      const sunset = 1630086400;
      jest.setSystemTime(new Date((sunrise + 1000) * 1000));
      expect(dayOrNight(sunrise, sunset)).toBe(true);
    });

    test("returns false during nighttime", () => {
      const sunrise = 1630000000;
      const sunset = 1630086400;
      jest.setSystemTime(new Date((sunset + 1000) * 1000));
      expect(dayOrNight(sunrise, sunset)).toBe(false);
    });

    test("throws error for negative timestamps", () => {
      expect(() => dayOrNight(-1000, 1000)).toThrow("non-negative number");
      expect(() => dayOrNight(1000, -1000)).toThrow("non-negative number");
    });
  });

  describe("chooseImage", () => {
    test.each([
      [200, true, "thunderstorm.svg"],
      [300, false, "rain.svg"],
      [600, true, "snow.svg"],
      [800, true, "sun.svg"],
      [800, false, "moon.svg"],
      [803, true, "clouds.svg"],
      [999, true, ".svg"], // Default case
    ])("code %i returns %s", (code, daytime, expected) => {
      expect(chooseImage(code, daytime)).toContain(expected);
    });

    test("throws error for negative weather code", () => {
      expect(() => chooseImage(-200, true)).toThrow("non-negative number");
    });
  });

  describe("convertMpsToKmph", () => {
    test("converts meters per second correctly", () => {
      expect(convertMpsToKmph(1)).toBe("4");
      expect(convertMpsToKmph(2.5)).toBe("9");
    });

    test("throws error for negative values", () => {
      expect(() => convertMpsToKmph(-5)).toThrow("non-negative number");
    });
  });

  describe("convertAQI", () => {
    test.each([
      [1, "Good"],
      [2, "Fair"],
      [3, "Moderate"],
      [4, "Poor"],
      [5, "Very Poor"],
    ])("AQI %i returns %s", (aqi, expected) => {
      expect(convertAQI(aqi as AQI)).toBe(expected);
    });
  });

  describe("convertToLocalTime", () => {
    test("converts timestamp correctly", () => {
      expect(convertToLocalTime(1704115200, 7200)).toBe("15:20");
    });

    test("throws error for negative timestamp", () => {
      expect(() => convertToLocalTime(-1000, 0)).toThrow("non-negative number");
    });
  });

  describe("checkIfZeroTemp", () => {
    test.each([
      [0, 0],
      [-0, 0],
      [3.2, 3],
      [-2.8, -3],
      [4.5, 5],
    ])("converts %p to %p", (input, expected) => {
      expect(checkIfZeroTemp(input)).toBe(expected);
    });
  });

  describe("getWeekday", () => {
    test.each([
      [1704067200, "Monday"], // Jan 1, 2024
      [1704153600, "Tuesday"], // Jan 2, 2024
      [1704240000, "Wednesday"], // Jan 3, 2024
    ])("returns correct weekday for %p", (timestamp, expected) => {
      expect(getWeekday(timestamp)).toBe(expected);
    });

    test("throws error for negative timestamp", () => {
      expect(() => getWeekday(-1000)).toThrow("non-negative number");
    });
  });
});
