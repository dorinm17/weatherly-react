import { render, screen } from "@testing-library/react";
import TodayForecast from "./TodayForecast";
import { AirPollutionFailproof, WeatherContext } from "../../utils/types";
import {
  WeatherData,
  FiveDayForecast,
  HourlyForecast,
  CurrentForecast,
} from "../../utils/types";
import {
  checkIfZeroTemp,
  capitalize,
  dayOrNight,
  chooseImage,
  convertToLocalTime,
} from "../../utils/helpers";

// Mock context data
const mockWeatherData: WeatherData = {
  dailyForecast: {
    list: [
      {
        dt: 1704115200,
        pop: 0.2,
        temp: { max: 20.25, min: 9.8 },
      },
    ],
  } as unknown as FiveDayForecast,
  hourlyForecast: {
    city: {
      name: "Test City",
      country: "TC",
      sunrise: 0,
      sunset: 0,
      timezone: 0,
    },
    list: [
      { dt: 1704115200, main: { temp: 20 }, weather: [{ id: 800 }] },
      { dt: 1704201600, main: { temp: 21.42 }, weather: [{ id: 801 }] },
    ],
  } as unknown as HourlyForecast,
  currentWeather: {
    main: { temp: 22 },
    weather: [{ description: "clear sky", id: 800 }],
  } as unknown as CurrentForecast,
  airPollution: {} as unknown as AirPollutionFailproof,
};

describe("TodayForecast Component", () => {
  test("renders forecast cards for today", () => {
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
        <TodayForecast />
      </WeatherContext.Provider>
    );

    // Verify rendered forecast cards
    const city: HTMLElement = screen.getByTestId("current-city");
    expect(city).toBeInTheDocument();
    expect(city).toHaveTextContent("Test City TC 22°C");
    expect(screen.getByText(capitalize("clear sky"))).toBeInTheDocument();
    expect(screen.getByText("Precipitation: 20%")).toBeInTheDocument();
    expect(
      screen.getByText(
        `H:${checkIfZeroTemp(20.25)}° L:${checkIfZeroTemp(9.8)}°`
      )
    ).toBeInTheDocument();

    // Verify hourly forecast
    const hourlyTimes = screen.getAllByText(/^\d{2}:\d{2}$/); // Use regex to match time format
    expect(hourlyTimes).toHaveLength(2);
    expect(hourlyTimes[0]).toHaveTextContent(convertToLocalTime(1704115200, 0));
    expect(hourlyTimes[1]).toHaveTextContent(convertToLocalTime(1704201600, 0));

    expect(screen.getByText(`${checkIfZeroTemp(20)}°C`)).toBeInTheDocument();
    expect(screen.getByText(`${checkIfZeroTemp(21.42)}°C`)).toBeInTheDocument();
  });

  test("renders correct icons", () => {
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
        <TodayForecast />
      </WeatherContext.Provider>
    );

    const icons = screen.getAllByTestId("icon");
    expect(icons).toHaveLength(3);
    const daytime = dayOrNight(0, 0);
    expect(icons[0]).toHaveAttribute("src", chooseImage(800, daytime));
    expect(icons[1]).toHaveAttribute("src", chooseImage(800, daytime));
    expect(icons[2]).toHaveAttribute("src", chooseImage(801, daytime));
  });
});
