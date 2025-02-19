import { render, screen } from "@testing-library/react";
import SocialMediaList from "./SocialMediaList";
import { SocialMediaProps } from "../Footer";

const mockSocials: SocialMediaProps[] = [
  { icon: "linkedin.svg", alt: "LinkedIn", link: "https://linkedin.com" },
  { icon: "mail.svg", alt: "Email", link: "mailto:test@test.com" },
];

describe("SocialMediaList Component", () => {
  test("renders all social links with accessible attributes", () => {
    render(<SocialMediaList socials={mockSocials} />);

    // Verify list structure
    const list = screen.getByRole("list");
    expect(list).toBeInTheDocument();

    // Verify each social item
    mockSocials.forEach((social) => {
      const link = screen.getByRole("link", { name: social.alt });
      expect(link).toHaveAttribute("href", social.link);

      const image = screen.getByAltText(social.alt);
      expect(image).toHaveAttribute("src", social.icon);
    });
  });
});
