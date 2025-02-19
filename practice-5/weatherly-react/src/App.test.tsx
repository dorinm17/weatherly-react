import { render, screen, act } from "@testing-library/react";
import App from "./App";
import { WeatherData } from "./utils/types";
import { getWeather, reverseGeocode } from "./utils/fetch-data";
import { defaultCity } from "./utils/const";

jest.mock("./utils/fetch-data", () => ({
  getWeather: jest.fn(),
  reverseGeocode: jest.fn(),
}));

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useEffect: jest.requireActual("react").useEffect,
  useState: jest.requireActual("react").useState,
  useMemo: jest.requireActual("react").useMemo,
}));

describe("App Component", () => {
  beforeEach(() => {
    (getWeather as jest.Mock).mockResolvedValue({
      currentWeather: { cod: 200 },
      dailyForecast: {},
      hourlyForecast: {},
      airPollution: {},
    } as WeatherData);

    (reverseGeocode as jest.Mock).mockResolvedValue("Mock City");

    const mockGeolocation = {
      getCurrentPosition: jest.fn().mockImplementation((success) =>
        success({
          coords: {
            latitude: 51.5074,
            longitude: -0.1278,
          },
        })
      ),
      clearWatch: jest.fn(),
      watchPosition: jest.fn(),
    };

    // Mock geolocation using Object.defineProperty
    Object.defineProperty(global.navigator, "geolocation", {
      value: mockGeolocation,
      writable: true,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders loading spinner initially", () => {
    render(<App />);
    expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
  });

  test("successfully geolocates the user", async () => {
    await act(async () => {
      render(<App />);
    });

    expect(getWeather).toHaveBeenCalledWith("Mock City");
    expect(screen.queryByTestId("loading-spinner")).not.toBeInTheDocument();
  });

  test("handles geolocation fetch error gracefully", async () => {
    (
      navigator.geolocation.getCurrentPosition as jest.Mock
    ).mockImplementationOnce((_, reject) => reject({ code: 2 }));

    await act(async () => {
      render(<App />);
    });

    expect(screen.queryByTestId("loading-spinner")).not.toBeInTheDocument();
  });

  test("handles denial of geolocation by user gracefully and fetches weather for default city", async () => {
    (
      navigator.geolocation.getCurrentPosition as jest.Mock
    ).mockImplementationOnce((_, reject) => reject({ code: 1 }));

    await act(async () => {
      render(<App />);
    });

    expect(getWeather).toHaveBeenCalledWith(defaultCity);
    expect(screen.queryByTestId("loading-spinner")).not.toBeInTheDocument();
  });

    test("matches snapshot", () => {
      const { asFragment } = render(<App />);
      expect(asFragment()).toMatchSnapshot();
    });
});
