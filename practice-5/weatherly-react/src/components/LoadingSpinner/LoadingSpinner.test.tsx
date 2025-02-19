import { render, screen, act } from "@testing-library/react";
import LoadingSpinner from "./LoadingSpinner";

describe("LoadingSpinner Component", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test("renders the loading spinner initially", () => {
    render(<LoadingSpinner />);
    expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
    expect(
      screen.queryByText("Please reconnect to the Internet.")
    ).not.toBeInTheDocument();
  });

  test("displays the prompt to reconnect to the Internet after 5 seconds", () => {
    render(<LoadingSpinner />);

    act(() => {
      jest.advanceTimersByTime(5000);
    });

    expect(
      screen.getByText("Please reconnect to the Internet.")
    ).toBeInTheDocument();
  });
});
