import {
  fireEvent,
  render,
  screen,
  userEvent,
} from "@testing-library/react-native";
import { Text } from "react-native";
import { describe, expect, it, vi } from "vitest";
import { MinervaProvider } from "../../theme/MinervaProvider";
import { Button } from "./Button";

describe("Button", () => {
  it("renders an accessible button with its label", async () => {
    await render(<Button>Save</Button>);
    const button = screen.getByRole("button", { name: "Save" });
    expect(button).toBeEnabled();
  });

  it("calls onPress", async () => {
    const onPress = vi.fn();
    const user = userEvent.setup();
    await render(<Button onPress={onPress}>Save</Button>);
    await user.press(screen.getByRole("button", { name: "Save" }));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it.each(["disabled", "loading"] as const)(
    "ignores presses when %s",
    async (state) => {
      const onPress = vi.fn();
      await render(
        <Button {...{ [state]: true }} onPress={onPress}>
          Save
        </Button>,
      );
      const button = screen.getByRole("button");
      expect(button).toBeDisabled();
      await fireEvent.press(button);
      expect(onPress).not.toHaveBeenCalled();
      if (state === "loading") expect(button).toBeBusy();
    },
  );

  it("uses the token colors of its color and variant", async () => {
    await render(
      <MinervaProvider theme="light">
        <Button color="danger">Delete</Button>
      </MinervaProvider>,
    );
    expect(screen.getByRole("button")).toHaveStyle({
      backgroundColor: "#dc2626",
    });
  });

  it("reaches the 44pt touch target with the touch preset", async () => {
    await render(<Button size="small">Small</Button>);
    const button = screen.getByRole("button");
    const height = 36;
    expect(button).toHaveStyle({ minHeight: height });
    expect(button.props.hitSlop).toEqual({
      top: 4,
      bottom: 4,
      left: 0,
      right: 0,
    });
  });

  it("renders element children and icons", async () => {
    await render(
      <Button startIcon={<Text>+</Text>} accessibilityLabel="Add">
        <Text>Add item</Text>
      </Button>,
    );
    expect(screen.getByRole("button", { name: "Add" })).toBeTruthy();
    expect(screen.getByText("Add item")).toBeTruthy();
  });
});
