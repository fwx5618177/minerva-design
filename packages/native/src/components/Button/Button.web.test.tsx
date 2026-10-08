import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Button } from "./Button";

describe("Button (react-native-web)", () => {
  it("renders a DOM button with the styling hooks", () => {
    render(<Button color="success">Save</Button>);
    const button = screen.getByRole("button", { name: "Save" });
    expect(button).toHaveAttribute("data-minerva", "button");
    expect(button).toHaveAttribute("data-part", "root");
    expect(button).toHaveAttribute("data-color", "success");
  });

  it("clicks call onPress, not while disabled", () => {
    const onPress = vi.fn();
    const { rerender } = render(<Button onPress={onPress}>Save</Button>);
    fireEvent.click(screen.getByRole("button"));
    expect(onPress).toHaveBeenCalledTimes(1);
    rerender(
      <Button disabled onPress={onPress}>
        Save
      </Button>,
    );
    expect(screen.getByRole("button")).toHaveAttribute("aria-disabled", "true");
    fireEvent.click(screen.getByRole("button"));
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});
