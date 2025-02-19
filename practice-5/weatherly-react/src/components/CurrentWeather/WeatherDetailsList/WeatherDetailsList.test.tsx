import { render, screen } from "@testing-library/react";
import WeatherDetailsList from "./WeatherDetailsList";
import { WeatherDetailProps } from "../CurrentWeather";

const mockDetails: WeatherDetailProps[] = [
  {
    icon: "humidity.svg",
    label: "Humidity",
    unitValue: 75,
    unit: "%",
  },
  {
    icon: "temperature.svg",
    label: "Feels like",
    unitValue: 15,
    unit: "°C",
  },
  {
    icon: "sunrise.svg",
    label: "Rise",
    hourValue: "06:00",
  },
  {
    icon: "air-quality.svg",
    label: "Air quality",
    strValue: "Good",
  },
];

describe("WeatherDetailsList Component", () => {
  test("renders all weather details", () => {
    render(<WeatherDetailsList details={mockDetails} />);

    // Verify all details are rendered
    expect(screen.getByText("Humidity: 75%")).toBeInTheDocument();
    expect(screen.getByText("Feels like: 15°C")).toBeInTheDocument();
    expect(screen.getByText("Rise: 06:00")).toBeInTheDocument();
    expect(screen.getByText("Air quality: Good")).toBeInTheDocument();
  });

  test("renders correct icons", () => {
    render(<WeatherDetailsList details={mockDetails} />);

    // Verify icons are rendered
    const icons = screen.getAllByTestId("detailIcon");
    expect(icons).toHaveLength(mockDetails.length);
    mockDetails.forEach((detail, index) => {
      expect(icons[index]).toHaveAttribute("src", detail.icon);
    });
  });
});
