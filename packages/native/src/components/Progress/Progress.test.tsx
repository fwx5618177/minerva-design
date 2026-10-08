import { act, render, screen } from "@testing-library/react-native";
import { resolveTokens } from "@minerva/core";
import { describe, expect, it } from "vitest";
import { MinervaProvider } from "../../theme/MinervaProvider";
import { queryPart } from "../../../test/queries";
import { Progress } from "./Progress";

const light = resolveTokens({ design: { preset: "touch" } });

describe("Progress", () => {
  it("is a progressbar with its value, named by progress.label", async () => {
    await render(<Progress value={40} />);
    const bar = screen.getByRole("progressbar", { name: "Progress" });
    expect(bar).toHaveAccessibilityValue({ min: 0, max: 100, now: 40 });
    expect(bar.props.dataSet).toMatchObject({
      variant: "line",
      color: "primary",
      size: "medium",
    });
    expect(queryPart("indicator", "progress")).toHaveStyle({ width: "40%" });
  });

  it("clamps the value and formats the shown text", async () => {
    const { rerender } = await render(<Progress value={140} showValue />);
    expect(screen.getByRole("progressbar")).toHaveAccessibilityValue({
      now: 100,
    });
    expect(screen.getByText("100%")).toBeTruthy();
    await rerender(
      <Progress value={-5} showValue format={(v) => `${v} / 100`} />,
    );
    expect(screen.getByText("0 / 100")).toBeTruthy();
  });

  it("visible label names it; localized default name", async () => {
    const { rerender } = await render(<Progress value={10} label="Upload" />);
    expect(screen.getByRole("progressbar", { name: "Upload" })).toBeTruthy();
    expect(screen.getByText("Upload")).toBeTruthy();
    await rerender(
      <MinervaProvider locale={{ language: "zh" }}>
        <Progress value={10} />
      </MinervaProvider>,
    );
    expect(screen.getByRole("progressbar", { name: "进度" })).toBeTruthy();
  });

  it("circle variant shows the value in the ring", async () => {
    await render(
      <Progress variant="circle" value={75} showValue size="large" />,
    );
    expect(screen.getByRole("progressbar")).toHaveAccessibilityValue({
      now: 75,
    });
    expect(screen.getByText("75%")).toBeTruthy();
    // right half fully drawn (45 + 180), left half 25% of the turn (45 + 90)
    expect(queryPart("indicator", "progress")).toHaveStyle({
      transform: [{ rotate: "225deg" }],
      borderBottomColor: light.colors["primary-color"],
    });
  });

  it.each(["small", "medium", "large"] as const)(
    "renders the %s size",
    async (size) => {
      await render(<Progress size={size} value={50} />);
      expect(queryPart("track", "progress")).toHaveStyle({
        height: { small: 4, medium: 6, large: 10 }[size],
      });
    },
  );

  it("indeterminate: busy, no value, animates", async () => {
    await render(<Progress indeterminate />);
    const bar = screen.getByRole("progressbar");
    expect(bar).toBeBusy();
    expect(bar.props.accessibilityValue).toBeUndefined();
    await act(() => new Promise<void>((r) => setTimeout(r, 50)));
    expect(queryPart("indicator", "progress")).toBeTruthy();
  });

  it("token colors in dark mode", async () => {
    const dark = resolveTokens({ mode: "dark", design: { preset: "touch" } });
    await render(
      <MinervaProvider theme="dark">
        <Progress value={30} color="danger" />
      </MinervaProvider>,
    );
    expect(queryPart("indicator", "progress")).toHaveStyle({
      backgroundColor: dark.colors["danger-color"],
    });
    expect(queryPart("track", "progress")).toHaveStyle({
      backgroundColor: dark.colors["surface-muted-color"],
    });
  });
});
