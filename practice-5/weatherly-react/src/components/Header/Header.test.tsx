// Header.test.tsx
import { render, screen } from "@testing-library/react";
import Header from "./Header";

jest.mock("./SearchBar/SearchBar", () => ({
  __esModule: true,
  default: () => <div data-testid="search-bar" />,
}));

jest.mock("../../assets/weather-transition.jpeg", () => ({
  default: "test-banner-path",
}));

describe("Header Component", () => {
  test("renders header with all elements", () => {
    render(<Header />);

    // Check main header structure
    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(screen.getByText("Weatherly")).toBeInTheDocument();
    expect(screen.getByText(/Don't be under the weather/)).toBeInTheDocument();

    // Verify banner image
    const banner = screen.getByTestId("banner-image");
    expect(banner).toHaveAttribute("src", "test-banner-path");

    // Check SearchBar presence
    expect(screen.getByTestId("search-bar")).toBeInTheDocument();
  });
});
