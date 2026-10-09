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
import { Card, type CardPadding, type CardVariant } from "./Card";

const light = resolveTokens({ mode: "light", design: { preset: "touch" } });
const dark = resolveTokens({ mode: "dark", design: { preset: "touch" } });

describe("Card", () => {
  it("renders cover, header, body and footer", async () => {
    await render(
      <Card
        title="Plan"
        description="Billed monthly"
        extra={<Text>Edit</Text>}
        cover={<Text>Cover</Text>}
        footer="Updated today"
      >
        Body text
      </Card>,
    );
    expect(screen.getByRole("header", { name: "Plan" })).toBeTruthy();
    for (const text of [
      "Billed monthly",
      "Edit",
      "Cover",
      "Body text",
      "Updated today",
    ])
      expect(screen.getByText(text)).toBeTruthy();
    expect(screen.queryByRole("button")).toBeNull();
    const root = queryPart("root", "card");
    expect(root?.props.dataSet).toMatchObject({
      variant: "default",
      padding: "medium",
    });
    expect(root).toHaveStyle({
      backgroundColor: light.colors["surface-color"],
      borderColor: light.colors["border-color"],
      borderRadius: light.radius.xl,
    });
  });

  it("interactive cards are buttons calling onPress", async () => {
    const onPress = vi.fn();
    const user = userEvent.setup();
    await render(
      <Card onPress={onPress} accessibilityLabel="Open plan" title="Plan" />,
    );
    await user.press(screen.getByRole("button", { name: "Open plan" }));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it("disabled interactive cards ignore presses", async () => {
    const onPress = vi.fn();
    await render(<Card interactive disabled onPress={onPress} title="Plan" />);
    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
    await fireEvent.press(button);
    expect(onPress).not.toHaveBeenCalled();
  });

  it.each<[CardVariant, string]>([
    ["elevated", "surface-elevated-color"],
    ["filled", "surface-muted-color"],
  ])("variant %s", async (variant, token) => {
    await render(
      <MinervaProvider theme="light">
        <Card variant={variant}>x</Card>
      </MinervaProvider>,
    );
    const root = queryPart("root", "card");
    expect(root).toHaveStyle({ backgroundColor: light.colors[token] });
    if (variant === "elevated")
      expect(root).toHaveStyle({ shadowOpacity: light.shadows.md.opacity });
  });

  it.each<CardVariant>(["ghost", "outline"])(
    "variant %s is transparent",
    async (variant) => {
      await render(<Card variant={variant}>x</Card>);
      expect(queryPart("root", "card")).toHaveStyle({
        backgroundColor: "transparent",
      });
    },
  );

  it.each<[CardPadding, number]>([
    ["none", 0],
    ["small", 12],
    ["large", 24],
  ])("padding %s", async (padding, px) => {
    await render(<Card padding={padding}>x</Card>);
    expect(queryPart("body", "card")).toHaveStyle({ paddingHorizontal: px });
  });

  it("follows dark mode", async () => {
    await render(
      <MinervaProvider theme="dark">
        <Card title="T" />
      </MinervaProvider>,
    );
    expect(queryPart("root", "card")).toHaveStyle({
      backgroundColor: dark.colors["surface-color"],
    });
    expect(screen.getByText("T")).toHaveStyle({
      color: dark.colors["text-color"],
    });
  });
});
