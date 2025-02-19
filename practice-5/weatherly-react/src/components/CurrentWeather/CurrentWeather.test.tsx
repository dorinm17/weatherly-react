import { render, screen } from "@testing-library/react";
import CurrentWeather from "./CurrentWeather";
import { WeatherContext } from "../../utils/types";
import {
  WeatherData,
  CurrentForecast,
  HourlyForecast,
  AirPollutionFailproof,
  FiveDayForecast,
} from "../../utils/types";
import {
  convertToLocalTime,
  convertAQI,
  checkIfZeroTemp,
} from "../../utils/helpers";

// Mock context data
const mockWeatherData: WeatherData = {
  currentWeather: {
    main: {
      humidity: 75,
      feels_like: 15,
    },
    sys: {
      sunrise: 1704115200,
      sunset: 1704158400,
    },
    wind: {
      speed: 10,
    },
    clouds: {
      all: 50,
    },
    timezone: 7200,
  } as unknown as CurrentForecast,
  hourlyForecast: {
    list: [
      {
        wind: {
          gust: 15,
        },
      },
    ],
  } as unknown as HourlyForecast,
  airPollution: {
    list: [
      {
        main: {
          aqi: 2,
        },
      },
    ],
  } as AirPollutionFailproof,
  dailyForecast: {} as unknown as FiveDayForecast,
};

describe("CurrentWeather Component", () => {
  test("renders weather details correctly", () => {
    render(
      <WeatherContext.Provider
        value={{
          weatherData: mockWeatherData,
          setWeatherData: jest.fn(),
          userInput: false,
          setUserInput: jest.fn(),
          currentCity: "",
          setCurrentCity: jest.fn(),
        }}
      >
        <CurrentWeather />
      </WeatherContext.Provider>
    );

    // Verify rendered details
    expect(screen.getByText("Humidity: 75%")).toBeInTheDocument();
    expect(
      screen.getByText(`Feels like: ${checkIfZeroTemp(15)}°C`)
    ).toBeInTheDocument();
    expect(
      screen.getByText(`Rise: ${convertToLocalTime(1704115200, 7200)}`)
    ).toBeInTheDocument();
    expect(screen.getByText("Wind: 10km/h")).toBeInTheDocument();
    expect(
      screen.getByText(`Air quality: ${convertAQI(2)}`)
    ).toBeInTheDocument();
    expect(
      screen.getByText(`Set: ${convertToLocalTime(1704158400, 7200)}`)
    ).toBeInTheDocument();
    expect(screen.getByText("Gusts: 15km/h")).toBeInTheDocument();
    expect(screen.getByText("Cloudiness: 50%")).toBeInTheDocument();
  });

  test("renders fallback for missing air pollution data", () => {
    const noAirPollutionData = {
      ...mockWeatherData,
      airPollution: "-" as AirPollutionFailproof,
    };
    render(
      <WeatherContext.Provider
        value={{
          weatherData: noAirPollutionData,
          setWeatherData: jest.fn(),
          userInput: false,
          setUserInput: jest.fn(),
          currentCity: "",
          setCurrentCity: jest.fn(),
        }}
      >
        <CurrentWeather />
      </WeatherContext.Provider>
    );

    expect(screen.getByText("Air quality: -")).toBeInTheDocument();
  });
});
