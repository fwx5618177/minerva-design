import { act, render, screen } from "@testing-library/react-native";
import { resolveTokens } from "@minerva/core";
import { Text } from "react-native";
import { describe, expect, it } from "vitest";
import { MinervaProvider } from "../../theme/MinervaProvider";
import { hostElements, queryPart } from "../../../test/queries";
import { Skeleton } from "./Skeleton";

const parts = (name: string) =>
  hostElements().filter((el) => el.props.dataSet?.part === name);

describe("Skeleton", () => {
  it("is a busy status region named by common.loading", async () => {
    await render(<Skeleton />);
    const region = screen.getByRole("status", { name: "Loading" });
    expect(region).toBeBusy();
    expect(region.props.dataSet).toMatchObject({
      variant: "text",
      animation: "pulse",
    });
    expect(parts("line")).toHaveLength(1);
  });

  it("renders the children once loaded", async () => {
    const { rerender } = await render(
      <Skeleton>
        <Text>Content</Text>
      </Skeleton>,
    );
    expect(screen.queryByText("Content")).toBeNull();
    await rerender(
      <Skeleton loading={false}>
        <Text>Content</Text>
      </Skeleton>,
    );
    expect(screen.getByText("Content")).toBeTruthy();
    expect(screen.queryByRole("status")).toBeNull();
  });

  it("lines, width, height, radius", async () => {
    await render(<Skeleton lines={3} height={20} borderRadius={2} />);
    const lines = parts("line");
    expect(lines).toHaveLength(3);
    expect(lines[0]).toHaveStyle({
      height: 20,
      borderRadius: 2,
      width: "100%",
    });
    expect(lines[2]).toHaveStyle({ width: "60%" });
  });

  it.each([
    "text",
    "circular",
    "rectangular",
    "rounded",
    "button",
    "image",
  ] as const)("renders the %s variant", async (variant) => {
    await render(<Skeleton variant={variant} size={48} />);
    expect(screen.getByRole("status").props.dataSet.variant).toBe(variant);
    if (variant === "circular")
      expect(parts("line")[0]).toHaveStyle({ width: 48, height: 48 });
  });

  it("avatar, title and paragraph composition", async () => {
    await render(
      <Skeleton avatar avatarShape="square" avatarSize={56} title paragraph />,
    );
    expect(queryPart("avatar", "skeleton")).toHaveStyle({
      width: 56,
      height: 56,
    });
    expect(queryPart("title", "skeleton")).toBeTruthy();
    expect(parts("line")).toHaveLength(4);
  });

  it("decorative: one hidden block", async () => {
    await render(<Skeleton decorative variant="circular" size={24} />);
    expect(screen.queryByRole("status")).toBeNull();
    expect(queryPart("block", "skeleton")).toHaveStyle({ width: 24 });
  });

  it("wave and static animations; localized; dark tokens", async () => {
    const dark = resolveTokens({ mode: "dark", design: { preset: "touch" } });
    await render(
      <MinervaProvider theme="dark" locale={{ language: "zh" }}>
        <Skeleton animation="wave" />
      </MinervaProvider>,
    );
    await act(() => new Promise<void>((r) => setTimeout(r, 30)));
    expect(screen.getByRole("status", { name: "加载中" })).toBeTruthy();
    expect(parts("line")[0]).toHaveStyle({
      backgroundColor: dark.colors["surface-muted-color"],
    });
  });

  it("no animation under reduced motion", async () => {
    await render(
      <MinervaProvider reducedMotion>
        <Skeleton animation="pulse" />
      </MinervaProvider>,
    );
    expect(screen.getByRole("status").props.dataSet.animation).toBe("none");
  });
});
