import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Switch } from "./Switch";

describe("Switch (react-native-web)", () => {
  it("renders role=switch with aria-checked and the styling hooks", () => {
    render(<Switch label="Wi-Fi" size="large" />);
    const sw = screen.getByRole("switch", { name: "Wi-Fi" });
    expect(sw).toHaveAttribute("aria-checked", "false");
    expect(sw).toHaveAttribute("data-minerva", "switch");
    expect(sw).toHaveAttribute("data-size", "large");
  });

  it("clicks toggle it; loading blocks and is busy", () => {
    const onChange = vi.fn();
    const { rerender } = render(<Switch label="S" onChange={onChange} />);
    fireEvent.click(screen.getByRole("switch"));
    expect(onChange).toHaveBeenCalledWith(true);
    expect(screen.getByRole("switch")).toHaveAttribute("aria-checked", "true");
    rerender(<Switch label="S" loading onChange={onChange} />);
    expect(screen.getByRole("switch")).toHaveAttribute("aria-busy", "true");
    fireEvent.click(screen.getByRole("switch"));
    expect(onChange).toHaveBeenCalledTimes(1);
  });
});
