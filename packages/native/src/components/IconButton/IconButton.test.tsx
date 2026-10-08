import {
  fireEvent,
  render,
  screen,
  userEvent,
} from "@testing-library/react-native";
import { Text } from "react-native";
import { describe, expect, it, vi } from "vitest";
import { resolveTokens } from "@minerva/core";
import { MinervaProvider } from "../../theme/MinervaProvider";
import { IconButton, type IconButtonSize } from "./IconButton";

const light = resolveTokens({ mode: "light", design: { preset: "touch" } });
const dark = resolveTokens({ mode: "dark", design: { preset: "touch" } });

describe("IconButton", () => {
  it("is a button named by its label, calling onPress", async () => {
    const onPress = vi.fn();
    const user = userEvent.setup();
    await render(
      <IconButton label="Search" icon={<Text>S</Text>} onPress={onPress} />,
    );
    const button = screen.getByRole("button", { name: "Search" });
    expect(button.props.dataSet).toMatchObject({
      color: "neutral",
      variant: "ghost",
      size: "medium",
      shape: "circle",
    });
    expect(button).toHaveStyle({ width: 44, height: 44, borderRadius: 22 });
    expect(button).not.toBeSelected();
    await user.press(button);
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it("passes the foreground color to an icon function", async () => {
    const icon = vi.fn(() => <Text>i</Text>);
    await render(
      <MinervaProvider theme="light">
        <IconButton label="Add" variant="solid" color="primary" icon={icon} />
      </MinervaProvider>,
    );
    expect(icon).toHaveBeenCalledWith(light.colors["text-inverse-color"], 22);
    expect(screen.getByRole("button")).toHaveStyle({
      backgroundColor: light.colors["primary-color"],
    });
  });

  it.each<[IconButtonSize, number, number]>([
    ["xsmall", 28, 8],
    ["small", 36, 4],
    ["large", 52, 0],
  ])("size %s reaches 44pt with hitSlop", async (size, px, slop) => {
    await render(
      <IconButton label="X" size={size} shape="square" icon={<Text>x</Text>} />,
    );
    const button = screen.getByRole("button");
    expect(button).toHaveStyle({
      width: px,
      height: px,
      borderRadius: light.radius.md,
    });
    expect(button.props.hitSlop).toEqual(
      slop ? { top: slop, bottom: slop, left: slop, right: slop } : undefined,
    );
  });

  it("toggle: uncontrolled pressed state", async () => {
    const onPressedChange = vi.fn();
    await render(
      <IconButton
        label="Bold"
        defaultPressed={false}
        onPressedChange={onPressedChange}
      >
        <Text>B</Text>
      </IconButton>,
    );
    const button = screen.getByRole("button", { name: "Bold" });
    expect(button).not.toBeSelected();
    await fireEvent.press(button);
    expect(onPressedChange).toHaveBeenCalledWith(true);
    expect(button).toBeSelected();
    expect(button).toHaveStyle({
      backgroundColor: light.colors["surface-muted-color"],
    });
  });

  it("toggle: controlled", async () => {
    const onPressedChange = vi.fn();
    await render(
      <IconButton
        label="Bold"
        pressed
        onPressedChange={onPressedChange}
        icon={<Text>B</Text>}
      />,
    );
    await fireEvent.press(screen.getByRole("button"));
    expect(onPressedChange).toHaveBeenCalledWith(false);
    expect(screen.getByRole("button")).toBeSelected();
  });

  it("disabled / loading ignore presses", async () => {
    const onPress = vi.fn();
    const { rerender } = await render(
      <IconButton label="X" disabled onPress={onPress} icon={<Text>x</Text>} />,
    );
    await fireEvent.press(screen.getByRole("button"));
    expect(screen.getByRole("button")).toBeDisabled();
    await rerender(
      <IconButton label="X" loading onPress={onPress} icon={<Text>x</Text>} />,
    );
    expect(screen.getByRole("button")).toBeBusy();
    expect(screen.queryByText("x")).toBeNull();
    await fireEvent.press(screen.getByRole("button"));
    expect(onPress).not.toHaveBeenCalled();
  });

  it("outline variant in dark mode", async () => {
    await render(
      <MinervaProvider theme="dark">
        <IconButton
          label="X"
          variant="outline"
          color="danger"
          icon={<Text>x</Text>}
        />
      </MinervaProvider>,
    );
    expect(screen.getByRole("button")).toHaveStyle({
      borderColor: dark.colors["danger-color-border"],
      backgroundColor: "transparent",
    });
  });
});
