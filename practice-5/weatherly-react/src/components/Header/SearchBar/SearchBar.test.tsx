import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SearchBar from "./SearchBar";
import { WeatherContext } from "../../../utils/types";
import { getWeather } from "../../../utils/fetch-data";

jest.mock("../../../utils/fetch-data", () => ({
  getWeather: jest.fn(),
}));

const mockContextValue = {
  weatherData: null,
  setWeatherData: jest.fn(),
  userInput: false,
  setUserInput: jest.fn(),
  currentCity: "",
  setCurrentCity: jest.fn(),
};

describe("SearchBar", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders search input and button", () => {
    render(
      <WeatherContext.Provider value={mockContextValue}>
        <SearchBar />
      </WeatherContext.Provider>
    );
    expect(
      screen.getByPlaceholderText("Search for your city")
    ).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  test("submits form with valid city", async () => {
    (getWeather as jest.Mock).mockResolvedValue({
      currentWeather: { cod: 200 },
    });

    render(
      <WeatherContext.Provider value={mockContextValue}>
        <SearchBar />
      </WeatherContext.Provider>
    );

    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "London" },
    });
    fireEvent.submit(screen.getByRole("form", { name: "City search form" }));

    await waitFor(() => {
      expect(getWeather).toHaveBeenCalledWith("London");
      expect(mockContextValue.setUserInput).toHaveBeenCalledWith(true);
      expect(mockContextValue.setCurrentCity).toHaveBeenCalledWith("London");
    });
  });

  test("does not submit empty form", async () => {
    render(
      <WeatherContext.Provider value={mockContextValue}>
        <SearchBar />
      </WeatherContext.Provider>
    );

    fireEvent.submit(screen.getByRole("form", { name: "City search form" }));

    await waitFor(() => {
      expect(getWeather).not.toHaveBeenCalled();
    });
  });

  test("handles API error gracefully", async () => {
    (getWeather as jest.Mock).mockRejectedValue(new Error("API Error"));

    render(
      <WeatherContext.Provider value={mockContextValue}>
        <SearchBar />
      </WeatherContext.Provider>
    );

    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "InvalidCity" },
    });
    fireEvent.submit(screen.getByRole("form", { name: "City search form" }));

    await waitFor(() => {
      expect(mockContextValue.setWeatherData).not.toHaveBeenCalled();
      expect(screen.getByRole("textbox")).toHaveValue("");
    });
  });
});
