import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Slider } from "./Slider";

describe("Slider (react-native-web)", () => {
  it("renders a slider per thumb with its value", () => {
    render(<Slider accessibilityLabel="Price" range defaultValue={[20, 60]} />);
    const [start, end] = screen.getAllByRole("slider");
    expect(start).toHaveAttribute("aria-valuenow", "20");
    expect(start).toHaveAttribute("aria-valuemax", "60");
    expect(end).toHaveAttribute("aria-valuemin", "20");
    expect(end).toHaveAttribute("aria-valuetext", "60");
    expect(start).toHaveAttribute("data-minerva", "slider");
  });
});
