import {
  fireEvent,
  render,
  screen,
  userEvent,
} from "@testing-library/react-native";
import { describe, expect, it, vi } from "vitest";
import { Button } from "./Button";

describe("Button (react-native under vitest)", () => {
  it("renders with role=button and text", async () => {
    await render(<Button label="Save" />);
    const btn = screen.getByRole("button");
    expect(btn).toBeTruthy();
    expect(screen.getByText("Save (0)")).toBeTruthy();
    expect(btn).toHaveTextContent("Save (0)");
  });

  it("calls onPress via fireEvent.press and updates counter", async () => {
    const onPress = vi.fn();
    await render(<Button label="Save" onPress={onPress} />);
    await fireEvent.press(screen.getByRole("button"));
    expect(onPress).toHaveBeenCalledTimes(1);
    expect(screen.getByRole("button")).toHaveTextContent("Save (1)");
  });

  it("calls onPress via userEvent.press", async () => {
    const onPress = vi.fn();
    const user = userEvent.setup();
    await render(<Button label="Go" onPress={onPress} />);
    await user.press(screen.getByRole("button", { name: "Go (0)" }));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it("ignores presses when disabled", async () => {
    const onPress = vi.fn();
    const user = userEvent.setup();
    await render(<Button label="Nope" disabled onPress={onPress} />);
    const btn = screen.getByRole("button");
    expect(btn).toBeDisabled();
    await fireEvent.press(btn);
    await user.press(btn);
    expect(onPress).not.toHaveBeenCalled();
    expect(btn).toHaveTextContent("Nope (0)");
  });
});
