import { render, screen } from "@testing-library/react";
import Footer from "./Footer";

describe("Footer Component", () => {
  test("renders copyright with current year", () => {
    render(<Footer />);
    expect(
      screen.getByText(new RegExp(`${new Date().getFullYear()}`))
    ).toBeInTheDocument();

    // Check copyright text
    expect(
      screen.getByText(/Weatherly, LLC. All rights reserved./)
    ).toBeInTheDocument();

    // Check SocialMediaList presence
    expect(screen.getByTestId("links-list")).toBeInTheDocument();
  });
});
