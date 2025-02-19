import { render, screen } from "@testing-library/react";
import RightNowForecastCard, {
  RightNowForecastCardProps,
} from "./RightNowForecastCard";

const mockProps: RightNowForecastCardProps = {
  city: "Test City",
  countryCode: "TC",
  temperature: 22,
  description: "Clear sky",
  precipitation: 20,
  maxTemp: 25,
  minTemp: 15,
  icon: "sun.svg",
};

describe("RightNowForecastCard Component", () => {
  test("renders forecast details correctly", () => {
    render(<RightNowForecastCard {...mockProps} />);

    // Verify rendered content
    const city: HTMLElement = screen.getByTestId("current-city");
    expect(city).toBeInTheDocument();
    expect(city).toHaveTextContent("Test City TC 22°C");
    expect(screen.getByText("Clear sky")).toBeInTheDocument();
    expect(screen.getByText("Precipitation: 20%")).toBeInTheDocument();
    expect(screen.getByText("H:25° L:15°")).toBeInTheDocument();
  });

  test("renders correct icon", () => {
    render(<RightNowForecastCard {...mockProps} />);
    expect(screen.getByTestId("icon")).toBeInTheDocument();
    const icon = screen.getByTestId("icon");
    expect(icon).toHaveAttribute("src", "sun.svg");
  });
});
