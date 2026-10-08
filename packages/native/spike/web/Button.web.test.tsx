import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Button } from "../Button";

describe("Button (react-native-web + happy-dom)", () => {
  it("renders role=button with text", () => {
    render(<Button label="Save" />);
    expect(screen.getByRole("button")).toHaveTextContent("Save (0)");
  });

  it("calls onPress on click", () => {
    const onPress = vi.fn();
    render(<Button label="Save" onPress={onPress} />);
    fireEvent.click(screen.getByRole("button"));
    expect(onPress).toHaveBeenCalledTimes(1);
    expect(screen.getByRole("button")).toHaveTextContent("Save (1)");
  });

  it("ignores clicks when disabled", () => {
    const onPress = vi.fn();
    render(<Button label="Nope" disabled onPress={onPress} />);
    const btn = screen.getByRole("button");
    expect(btn).toHaveAttribute("aria-disabled", "true");
    fireEvent.click(btn);
    expect(onPress).not.toHaveBeenCalled();
  });
});
