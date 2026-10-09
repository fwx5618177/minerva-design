import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { NumberInput } from "./NumberInput";

describe("NumberInput (react-native-web)", () => {
  it("renders a spinbutton with its range; buttons step", () => {
    const onChange = vi.fn();
    render(
      <NumberInput
        accessibilityLabel="Qty"
        showStepper
        defaultValue={1}
        min={0}
        max={2}
        onChange={onChange}
      />,
    );
    const field = screen.getByRole("spinbutton", { name: "Qty" });
    expect(field).toHaveAttribute("aria-valuemax", "2");
    expect(field).toHaveValue("1");
    fireEvent.click(screen.getByRole("button", { name: "Increase" }));
    expect(onChange).toHaveBeenCalledWith(2);
    expect(screen.getByRole("button", { name: "Increase" })).toHaveAttribute(
      "aria-disabled",
      "true",
    );
  });
});
