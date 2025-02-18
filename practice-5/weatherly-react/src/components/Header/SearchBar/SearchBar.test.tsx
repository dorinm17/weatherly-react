import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SearchBar from "./SearchBar";
import { getWeather } from "../../../utils/fetch-data";
import { WeatherContext } from "../../../utils/types";

// Mocking the getWeather function
jest.mock("../../../utils/fetch-data", () => ({
  getWeather: jest.fn(),
}));

describe("SearchBar Component", () => {
  it("should render input field", () => {
    render(<SearchBar />);
    expect(
      screen.getByPlaceholderText("Search for your city")
    ).toBeInTheDocument();
  });

  it("should handle form submission and fetch weather data on valid city input", async () => {
    // Mocking context functions
    const mockSetUserInput = jest.fn();
    const mockSetCurrentCity = jest.fn();
    const mockSetWeatherData = jest.fn();

    // Complete mock for context
    const mockWeatherContext = {
      weatherData: null,
      userInput: false,
      currentCity: "",
      setUserInput: mockSetUserInput,
      setCurrentCity: mockSetCurrentCity,
      setWeatherData: mockSetWeatherData,
    };

    // Mocking the resolved value of getWeather
    (getWeather as jest.Mock).mockResolvedValue({
      currentWeather: { cod: 200 },
      dailyForecast: [],
      hourlyForecast: [],
      airPollution: "-",
    });

    render(
      <WeatherContext.Provider value={mockWeatherContext}>
        <SearchBar />
      </WeatherContext.Provider>
    );

    const city = "New York";

    // Simulate user input
    fireEvent.change(screen.getByPlaceholderText("Search for your city"), {
      target: { value: city },
    });

    // Simulate form submission
    fireEvent.submit(screen.getByRole("form"));

    // Wait for async behavior to complete
    await waitFor(() => {
      // Check if getWeather was called with the right argument
      expect(getWeather).toHaveBeenCalledWith(city);

      // Check if context setters were called
      expect(mockSetUserInput).toHaveBeenCalledWith(true);
      expect(mockSetCurrentCity).toHaveBeenCalledWith(city);
      expect(mockSetWeatherData).toHaveBeenCalled();
    });

    // Ensure input field is cleared after form submission
    expect(screen.getByPlaceholderText("Search for your city")).toHaveValue("");
  });

  it("should not call submit when city input is empty", async () => {
    const mockSetUserInput = jest.fn();
    const mockSetCurrentCity = jest.fn();
    const mockSetWeatherData = jest.fn();

    const mockWeatherContext = {
      weatherData: null,
      userInput: false,
      currentCity: "",
      setUserInput: mockSetUserInput,
      setCurrentCity: mockSetCurrentCity,
      setWeatherData: mockSetWeatherData,
    };

    render(
      <WeatherContext.Provider value={mockWeatherContext}>
        <SearchBar />
      </WeatherContext.Provider>
    );

    // Simulate submitting an empty input
    fireEvent.submit(screen.getByRole("form"));

    // Ensure context setters are not called
    expect(mockSetUserInput).not.toHaveBeenCalled();
    expect(mockSetCurrentCity).not.toHaveBeenCalled();
    expect(mockSetWeatherData).not.toHaveBeenCalled();
  });
});
