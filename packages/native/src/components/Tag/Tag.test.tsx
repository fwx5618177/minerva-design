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
import { queryPart } from "../../../test/queries";
import { Tag, type TagShape, type TagSize, type TagVariant } from "./Tag";

const light = resolveTokens({ mode: "light", design: { preset: "touch" } });

describe("Tag", () => {
  it("renders a static label with the default look", async () => {
    await render(<Tag>Draft</Tag>);
    expect(screen.getByText("Draft")).toHaveStyle({
      color: light.colors["text-color"],
    });
    const root = queryPart("root", "tag");
    expect(root?.props.dataSet).toMatchObject({
      color: "neutral",
      variant: "subtle",
      size: "medium",
      shape: "rounded",
    });
    expect(root).toHaveStyle({
      backgroundColor: light.colors["surface-muted-color"],
    });
    expect(screen.queryByRole("button")).toBeNull();
  });

  it("closable: a labelled close button calls onClose", async () => {
    const onClose = vi.fn();
    const user = userEvent.setup();
    await render(
      <Tag closable onClose={onClose}>
        React
      </Tag>,
    );
    const close = screen.getByRole("button", { name: "Remove React" });
    expect(close.props.hitSlop).toBeTruthy();
    await user.press(close);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("localizes the close label (no text: generic label)", async () => {
    await render(
      <MinervaProvider locale={{ language: "fr" }}>
        <Tag closable icon={<Text>*</Text>}>
          <Text>custom</Text>
        </Tag>
        <Tag closable closeLabel={(l) => `x ${l}`}>
          Vue
        </Tag>
      </MinervaProvider>,
    );
    expect(screen.getByRole("button", { name: "Fermer" })).toBeTruthy();
    expect(screen.getByRole("button", { name: "x Vue" })).toBeTruthy();
  });

  it("clickable: a button calling onPress", async () => {
    const onPress = vi.fn();
    await render(<Tag onPress={onPress}>Filter</Tag>);
    await fireEvent.press(screen.getByRole("button", { name: "Filter" }));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it("toggle: uncontrolled pressed state is announced as selected", async () => {
    const onPressedChange = vi.fn();
    await render(
      <Tag
        defaultPressed={false}
        onPressedChange={onPressedChange}
        color="primary"
      >
        Open
      </Tag>,
    );
    const button = screen.getByRole("button", { name: "Open" });
    expect(button).not.toBeSelected();
    await fireEvent.press(button);
    expect(onPressedChange).toHaveBeenCalledWith(true);
    expect(button).toBeSelected();
    expect(button).toHaveStyle({
      backgroundColor: light.colors["primary-color"],
    });
  });

  it("toggle: controlled pressed only requests changes", async () => {
    const onPressedChange = vi.fn();
    await render(
      <Tag pressed onPressedChange={onPressedChange}>
        Open
      </Tag>,
    );
    const button = screen.getByRole("button");
    await fireEvent.press(button);
    expect(onPressedChange).toHaveBeenCalledWith(false);
    expect(button).toBeSelected();
  });

  it("disabled and loading block the action", async () => {
    const onPress = vi.fn();
    const onClose = vi.fn();
    const { rerender } = await render(
      <Tag disabled closable onPress={onPress} onClose={onClose}>
        A
      </Tag>,
    );
    await fireEvent.press(screen.getByRole("button", { name: "A" }));
    await fireEvent.press(screen.getByRole("button", { name: "Remove A" }));
    expect(onPress).not.toHaveBeenCalled();
    expect(onClose).not.toHaveBeenCalled();
    await rerender(
      <Tag loading closable onPress={onPress}>
        A
      </Tag>,
    );
    const button = screen.getByRole("button", { name: "A" });
    expect(button).toBeBusy();
    expect(screen.queryByRole("button", { name: "Remove A" })).toBeNull();
    await fireEvent.press(button);
    expect(onPress).not.toHaveBeenCalled();
  });

  it.each<[TagVariant, string]>([
    ["solid", "success-color"],
    ["subtle", "success-color-subtle"],
    ["outline", "success-color-subtle"],
  ])("variant %s uses the token colors", async (variant, token) => {
    await render(
      <MinervaProvider theme="light">
        <Tag color="success" variant={variant}>
          Ok
        </Tag>
      </MinervaProvider>,
    );
    const root = queryPart("root", "tag");
    expect(root).toHaveStyle({ backgroundColor: light.colors[token] });
    if (variant === "outline")
      expect(root).toHaveStyle({
        borderColor: light.colors["success-color-border"],
      });
  });

  it.each<[TagSize, TagShape, number, number]>([
    ["small", "rounded", 20, light.radius.sm],
    ["medium", "square", 24, 0],
    ["large", "circle", 28, 28],
  ])("size %s / shape %s", async (size, shape, minHeight, borderRadius) => {
    await render(
      <Tag size={size} shape={shape}>
        T
      </Tag>,
    );
    expect(queryPart("root", "tag")).toHaveStyle({ minHeight, borderRadius });
  });
});
