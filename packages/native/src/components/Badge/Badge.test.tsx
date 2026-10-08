import { render, screen } from "@testing-library/react-native";
import { Text } from "react-native";
import { describe, expect, it } from "vitest";
import { resolveTokens } from "@minerva/core";
import { MinervaProvider } from "../../theme/MinervaProvider";
import { queryPart } from "../../../test/queries";
import { Badge, type BadgeSize, type BadgeVariant } from "./Badge";

const light = resolveTokens({ mode: "light", design: { preset: "touch" } });
const dark = resolveTokens({ mode: "dark", design: { preset: "touch" } });

describe("Badge", () => {
  it("attaches a count to its children, announced as a status", async () => {
    await render(
      <Badge content={5}>
        <Text>Inbox</Text>
      </Badge>,
    );
    expect(screen.getByText("Inbox")).toBeTruthy();
    const status = screen.getByRole("status", { name: "5" });
    expect(status.props.dataSet).toMatchObject({ position: "top-right" });
    expect(status).toHaveStyle({ position: "absolute", top: -10, right: -10 });
  });

  it("caps counts at max", async () => {
    await render(<Badge content={120} />);
    expect(screen.getByText("99+")).toBeTruthy();
    await render(<Badge content={12} max={9} />);
    expect(screen.getByText("9+")).toBeTruthy();
  });

  it("hides 0 unless showZero", async () => {
    const { rerender } = await render(
      <Badge content={0}>
        <Text>Cart</Text>
      </Badge>,
    );
    expect(screen.queryByRole("status")).toBeNull();
    await rerender(
      <Badge content={0} showZero>
        <Text>Cart</Text>
      </Badge>,
    );
    expect(screen.getByRole("status", { name: "0" })).toBeTruthy();
  });

  it("renders a dot labelled with the localized default", async () => {
    await render(
      <MinervaProvider locale={{ language: "zh" }}>
        <Badge dot position="bottom-left">
          <Text>Bell</Text>
        </Badge>
      </MinervaProvider>,
    );
    const dot = screen.getByRole("status", { name: "徽标" });
    expect(dot).toHaveStyle({ width: 8, height: 8, bottom: -4, left: -4 });
  });

  it("standalone: text children are the content", async () => {
    await render(
      <Badge color="success" aria-label="New feature">
        New
      </Badge>,
    );
    expect(screen.getByRole("status", { name: "New feature" })).toHaveStyle({
      backgroundColor: light.colors["success-color"],
    });
    expect(screen.getByText("New")).toHaveStyle({
      color: light.colors["text-inverse-color"],
    });
  });

  it.each<[BadgeVariant, string]>([
    ["solid", "danger-color"],
    ["subtle", "danger-color-subtle"],
    ["outline", "surface-color"],
  ])("variant %s uses the token colors", async (variant, token) => {
    await render(
      <MinervaProvider theme="light">
        <Badge content="3" color="danger" variant={variant} />
      </MinervaProvider>,
    );
    expect(screen.getByRole("status")).toHaveStyle({
      backgroundColor: light.colors[token],
    });
  });

  it.each<[BadgeSize, number]>([
    ["small", 16],
    ["medium", 20],
    ["large", 24],
  ])("size %s", async (size, height) => {
    await render(<Badge content={1} size={size} />);
    expect(screen.getByRole("status")).toHaveStyle({
      height,
      minWidth: height,
    });
  });

  it("follows dark mode", async () => {
    await render(
      <MinervaProvider theme="dark">
        <Badge content={1} variant="subtle" />
      </MinervaProvider>,
    );
    expect(screen.getByRole("status")).toHaveStyle({
      backgroundColor: dark.colors["primary-color-subtle"],
    });
    expect(queryPart("content", "badge")).toHaveStyle({
      color: dark.colors["primary-color-text"],
    });
  });
});
