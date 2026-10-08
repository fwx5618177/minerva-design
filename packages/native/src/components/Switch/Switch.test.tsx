import {
  act,
  fireEvent,
  render,
  screen,
  userEvent,
} from "@testing-library/react-native";
import { useState } from "react";
import { StyleSheet } from "react-native";
import { describe, expect, it, vi } from "vitest";
import { resolveTokens } from "@minerva/core";
import { queryPart } from "../../../test/queries";
import { MinervaProvider } from "../../theme/MinervaProvider";
import { Switch } from "./Switch";

const t = resolveTokens({ design: { preset: "touch" } });
const wait = (ms: number) =>
  act(() => new Promise<void>((r) => setTimeout(r, ms)));

const translateX = () => {
  const style = StyleSheet.flatten(queryPart("thumb", "switch")!.props.style);
  const transform = style.transform as { translateX?: number }[];
  return transform.find((x) => "translateX" in x)?.translateX;
};

describe("Switch", () => {
  it("renders an off switch named by its label", async () => {
    await render(<Switch label="Wi-Fi" />);
    const sw = screen.getByRole("switch", { name: "Wi-Fi" });
    expect(sw).not.toBeChecked();
    expect(sw).toBeEnabled();
    expect(queryPart("root", "switch")!.props.dataSet).toMatchObject({
      size: "medium",
      color: "primary",
      shape: "round",
    });
  });

  it("uncontrolled toggle with onChange(checked) and an animated thumb", async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    await render(<Switch label="Wi-Fi" onChange={onChange} />);
    const sw = screen.getByRole("switch");
    expect(translateX()).toBe(0);
    await user.press(sw);
    expect(sw).toBeChecked();
    expect(onChange).toHaveBeenLastCalledWith(true);
    await wait(250);
    const height = Math.round(t.sizes["control-height-md"] * 0.64);
    const travel = Math.round(height * 1.75) - (height - 4) - 4;
    expect(translateX()).toBeCloseTo(travel);
    await user.press(sw);
    expect(onChange).toHaveBeenLastCalledWith(false);
    expect(sw).not.toBeChecked();
  });

  it("reduced motion moves the thumb at once", async () => {
    await render(
      <MinervaProvider reducedMotion>
        <Switch accessibilityLabel="s" />
      </MinervaProvider>,
    );
    await fireEvent.press(screen.getByRole("switch"));
    expect(translateX()).toBeGreaterThan(0);
  });

  it("controlled: the prop decides", async () => {
    const onChange = vi.fn();
    await render(<Switch accessibilityLabel="s" checked onChange={onChange} />);
    await fireEvent.press(screen.getByRole("switch"));
    expect(onChange).toHaveBeenCalledWith(false);
    expect(screen.getByRole("switch")).toBeChecked();
  });

  it("controlled with state", async () => {
    function Demo() {
      const [on, setOn] = useState(false);
      return <Switch accessibilityLabel="s" checked={on} onChange={setOn} />;
    }
    await render(<Demo />);
    await fireEvent.press(screen.getByRole("switch"));
    expect(screen.getByRole("switch")).toBeChecked();
  });

  it.each(["disabled", "loading"] as const)(
    "%s ignores presses",
    async (prop) => {
      const onChange = vi.fn();
      await render(
        <Switch
          accessibilityLabel="s"
          {...{ [prop]: true }}
          onChange={onChange}
        />,
      );
      const sw = screen.getByRole("switch");
      expect(sw).toBeDisabled();
      await fireEvent.press(sw);
      expect(onChange).not.toHaveBeenCalled();
      if (prop === "loading") {
        expect(sw).toBeBusy();
        expect(queryPart("spinner", "switch")).toBeTruthy();
      }
    },
  );

  it("on track uses the color token, off track the neutral one", async () => {
    await render(
      <MinervaProvider theme="light">
        <Switch accessibilityLabel="s" color="success" defaultChecked />
      </MinervaProvider>,
    );
    expect(queryPart("fill", "switch")).toHaveStyle({
      backgroundColor: t.colors["success-color"],
    });
    expect(queryPart("track", "switch")).toHaveStyle({
      backgroundColor: t.colors["border-strong-color"],
    });
  });

  it("dark mode thumb", async () => {
    const dark = resolveTokens({ mode: "dark", design: { preset: "touch" } });
    await render(
      <MinervaProvider theme="dark">
        <Switch accessibilityLabel="s" />
      </MinervaProvider>,
    );
    expect(queryPart("thumb", "switch")).toHaveStyle({
      backgroundColor: dark.colors["surface-elevated-color"],
    });
  });

  it("on / off texts inside the track (hidden from accessibility)", async () => {
    await render(<Switch accessibilityLabel="s" onLabel="ON" offLabel="OFF" />);
    expect(
      screen.getByText("OFF", { includeHiddenElements: true }),
    ).toBeTruthy();
    expect(
      screen.queryByText("ON", { includeHiddenElements: true }),
    ).toBeNull();
    await fireEvent.press(screen.getByRole("switch"));
    expect(
      screen.getByText("ON", { includeHiddenElements: true }),
    ).toBeTruthy();
    await fireEvent(queryPart("track", "switch")!, "layout", {
      nativeEvent: { layout: { width: 80, height: 28 } },
    });
    expect(queryPart("track", "switch")).toHaveStyle({
      minWidth: expect.any(Number),
    });
  });

  it.each(["small", "medium", "large"] as const)(
    "size %s: track height from the control height, 44pt hit area",
    async (size) => {
      await render(<Switch accessibilityLabel="s" size={size} />);
      const step = { small: "sm", medium: "md", large: "lg" } as const;
      const height = Math.round(t.sizes[`control-height-${step[size]}`] * 0.64);
      expect(queryPart("track", "switch")).toHaveStyle({ height });
      const slop = screen.getByRole("switch").props.hitSlop;
      expect(height + slop.top + slop.bottom).toBeGreaterThanOrEqual(44);
    },
  );

  it("square shape", async () => {
    await render(<Switch accessibilityLabel="s" shape="square" />);
    expect(queryPart("track", "switch")).toHaveStyle({
      borderRadius: t.radius.sm,
    });
  });

  it("label placement start", async () => {
    await render(<Switch label="A" labelPlacement="start" />);
    expect(screen.getByRole("switch")).toHaveStyle({
      flexDirection: "row-reverse",
    });
  });
});
