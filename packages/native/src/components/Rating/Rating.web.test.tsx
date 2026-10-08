import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Rating } from "./Rating";

describe("Rating (react-native-web)", () => {
  it("renders a slider with its value", () => {
    render(<Rating defaultValue={6} />);
    const slider = screen.getByRole("slider", { name: "Rating" });
    expect(slider).toHaveAttribute("aria-valuenow", "6");
    expect(slider).toHaveAttribute("aria-valuemax", "10");
    expect(slider).toHaveAttribute("aria-valuetext", "6 of 10");
    expect(slider).toHaveAttribute("data-minerva", "rating");
  });
});
