import { render, screen } from "@testing-library/react";
import DailyForecast from "./DailyForecast";
import { WeatherContext } from "../../utils/types";
import { WeatherData, FiveDayForecast } from "../../utils/types";
import {
  getWeekday,
  chooseImage,
  capitalize,
  checkIfZeroTemp,
} from "../../utils/helpers";

// Mock context data
const mockWeatherData: WeatherData = {
  dailyForecast: {
    list: [
      {
        dt: 1704115200,
        weather: [{ id: 800, description: "clear sky" }],
        temp: { max: 20.25, min: 9.8 },
      },
      {
        dt: 1704201600,
        weather: [{ id: 801, description: "few clouds" }],
        temp: { max: 17.5, min: 12 },
      },
    ],
  } as unknown as FiveDayForecast,
  hourlyForecast: {
    cod: "",
    message: "",
  },
  airPollution: {
    cod: "",
    message: "",
  },
  currentWeather: {
    cod: "",
    message: "",
  },
};

describe("DailyForecast Component", () => {
  test("renders forecast cards for each day", () => {
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
        <DailyForecast />
      </WeatherContext.Provider>
    );

    // Verify rendered forecast cards
    expect(screen.getByText("Today")).toBeInTheDocument();
    expect(screen.getByText(getWeekday(1704201600))).toBeInTheDocument();

    // Verify weather descriptions
    expect(screen.getByText(capitalize("clear sky"))).toBeInTheDocument();
    expect(screen.getByText(capitalize("few clouds"))).toBeInTheDocument();

    // Verify temperatures
    expect(screen.getByText(`${checkIfZeroTemp(20.25)}°`)).toBeInTheDocument();
    expect(
      screen.getByText(`${checkIfZeroTemp(9.8)}°`, { exact: false })
    ).toBeInTheDocument();
    expect(screen.getByText(`${checkIfZeroTemp(17.5)}°`)).toBeInTheDocument();
    expect(
      screen.getByText(`${checkIfZeroTemp(12)}°`, { exact: false })
    ).toBeInTheDocument();
    expect(screen.getAllByText("C")).toHaveLength(2);
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
        <DailyForecast />
      </WeatherContext.Provider>
    );
    expect(screen.getAllByTestId("card-icon")).toHaveLength(2);
    const icons = screen.getAllByTestId("card-icon");
    expect(icons).toHaveLength(2);
    expect(icons[0]).toHaveAttribute("src", chooseImage(800, true));
    expect(icons[1]).toHaveAttribute("src", chooseImage(801, true));
  });
});
