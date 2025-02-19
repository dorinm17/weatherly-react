import { render, screen } from "@testing-library/react";
import ForecastCard from "./ForecastCard";
import { Weekday, Image } from "../../../utils/types";

const mockProps = {
  weekday: "Today" as Weekday,
  icon: "sun.svg" as Image,
  description: "Clear sky",
  maxTemp: 20,
  minTemp: 10,
};

describe("ForecastCard Component", () => {
  test("renders forecast details correctly", () => {
    render(<ForecastCard {...mockProps} />);

    // Verify rendered content
    expect(screen.getByText("Today")).toBeInTheDocument();
    expect(screen.getByText("Clear sky")).toBeInTheDocument();
    expect(screen.getByText("20°")).toBeInTheDocument();
    expect(screen.getByText("10°", { exact: false })).toBeInTheDocument();
    expect(screen.getByText("C")).toBeInTheDocument();
  });

  test("renders correct icon", () => {
    render(<ForecastCard {...mockProps} />);

    const icon = screen.getByTestId("card-icon");
    expect(icon).toHaveAttribute("src", "sun.svg");
  });
});
