import { render, screen } from "@testing-library/react";
import HourlyForecastCard, {
  HourlyForecastCardProps,
} from "./HourlyForecastCard";

const mockProps: HourlyForecastCardProps = {
  time: "12:00",
  icon: "sun.svg",
  temperature: 20,
};

describe("HourlyForecastCard Component", () => {
  test("renders hourly forecast details correctly", () => {
    render(<HourlyForecastCard {...mockProps} />);

    // Verify rendered content
    expect(screen.getByText("12:00")).toBeInTheDocument();
    expect(screen.getByText("20°C")).toBeInTheDocument();
  });

  test("renders correct icon", () => {
    render(<HourlyForecastCard {...mockProps} />);
    expect(screen.getByTestId("icon")).toBeInTheDocument();
    const icon = screen.getByTestId("icon");
    expect(icon).toHaveAttribute("src", "sun.svg");
  });
});
