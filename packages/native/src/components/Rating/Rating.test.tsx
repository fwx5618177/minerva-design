import { fireEvent, render, screen } from "@testing-library/react-native";
import { describe, expect, it, vi } from "vitest";
import { resolveTokens } from "@minerva/core";
import { hostElements, queryPart } from "../../../test/queries";
import { MinervaProvider } from "../../theme/MinervaProvider";
import { Rating } from "./Rating";

const t = resolveTokens({ design: { preset: "touch" } });
const cell = 24 + t.space["1"];

const stars = () =>
  hostElements().filter(
    (n) =>
      n.props.dataSet?.part === "item" && n.props.dataSet?.minerva === "rating",
  );
const fills = () => stars().map((s) => s.props.dataSet.fill);
const pressStar = (index: number, locationX = cell * 0.75) =>
  fireEvent.press(stars()[index], { nativeEvent: { locationX } });

describe("Rating", () => {
  it("is an adjustable control with its label and value", async () => {
    await render(<Rating defaultValue={7} />);
    const rating = screen.getByRole("adjustable", { name: "Rating" });
    expect(rating).toHaveAccessibilityValue({
      min: 0,
      max: 10,
      now: 7,
      text: "7 of 10",
    });
    expect(fills()).toEqual(["full", "full", "full", "half", "empty"]);
  });

  it("pressing the right half of a star picks it whole", async () => {
    const onChange = vi.fn();
    await render(<Rating onChange={onChange} />);
    await pressStar(2);
    expect(onChange).toHaveBeenCalledWith(6);
    expect(fills()).toEqual(["full", "full", "full", "empty", "empty"]);
  });

  it("pressing the left half picks half a star (allowHalf)", async () => {
    const onChange = vi.fn();
    await render(<Rating onChange={onChange} />);
    await pressStar(3, 2);
    expect(onChange).toHaveBeenCalledWith(7);
    expect(fills()).toEqual(["full", "full", "full", "half", "empty"]);
  });

  it("without allowHalf a left-half press picks the whole star", async () => {
    const onChange = vi.fn();
    await render(<Rating allowHalf={false} max={5} onChange={onChange} />);
    await pressStar(3, 2);
    expect(onChange).toHaveBeenCalledWith(4);
  });

  it("clearable: picking the same score clears it", async () => {
    const onChange = vi.fn();
    await render(<Rating clearable defaultValue={4} onChange={onChange} />);
    await pressStar(1);
    expect(onChange).toHaveBeenCalledWith(0);
    expect(fills()).toEqual(["empty", "empty", "empty", "empty", "empty"]);
  });

  it("controlled: the prop decides", async () => {
    const onChange = vi.fn();
    await render(<Rating value={2} onChange={onChange} />);
    await pressStar(4);
    expect(onChange).toHaveBeenCalledWith(10);
    expect(fills()[4]).toBe("empty");
  });

  it("screen reader increment / decrement by half stars", async () => {
    const onChange = vi.fn();
    await render(<Rating defaultValue={4} onChange={onChange} />);
    const rating = screen.getByRole("adjustable");
    await fireEvent(rating, "accessibilityAction", {
      nativeEvent: { actionName: "increment" },
    });
    expect(onChange).toHaveBeenLastCalledWith(5);
    await fireEvent(rating, "accessibilityAction", {
      nativeEvent: { actionName: "decrement" },
    });
    await fireEvent(rating, "accessibilityAction", {
      nativeEvent: { actionName: "decrement" },
    });
    expect(onChange).toHaveBeenLastCalledWith(3);
  });

  it("read-only ignores presses and has no actions", async () => {
    const onChange = vi.fn();
    await render(<Rating readOnly defaultValue={6} onChange={onChange} />);
    expect(
      screen.getByRole("adjustable").props.accessibilityActions,
    ).toBeUndefined();
    await pressStar(4);
    expect(onChange).not.toHaveBeenCalled();
    expect(queryPart("root", "rating")!.props.dataSet.readonly).toBe("");
  });

  it("shows the value and the rating count", async () => {
    await render(<Rating defaultValue={8.5} showValue ratingCount={120} />);
    expect(screen.getByText("8.5 (120)")).toBeTruthy();
  });

  it("translated label and value text", async () => {
    await render(
      <MinervaProvider locale={{ language: "zh" }}>
        <Rating defaultValue={3} max={5} />
      </MinervaProvider>,
    );
    expect(
      screen.getByRole("adjustable", { name: "评分" }),
    ).toHaveAccessibilityValue({
      text: "3 / 5",
    });
  });

  it("star colors from the tokens (dark mode)", async () => {
    const dark = resolveTokens({ mode: "dark", design: { preset: "touch" } });
    await render(
      <MinervaProvider theme="dark">
        <Rating defaultValue={10} />
      </MinervaProvider>,
    );
    const glyphs = hostElements().filter(
      (n) => n.type === "Text" && n.props.children === "★",
    );
    expect(glyphs[1]).toHaveStyle({ color: dark.colors["warning-color"] });
    expect(glyphs[0]).toHaveStyle({ color: dark.colors["border-color"] });
  });

  it.each([
    ["small", 18],
    ["medium", 24],
    ["large", 32],
  ] as const)("size %s stars reach 44pt", async (size, star) => {
    await render(<Rating size={size} />);
    const first = stars()[0];
    expect(first).toHaveStyle({ height: star });
    expect(first.props.hitSlop.top * 2 + star).toBeGreaterThanOrEqual(44);
  });
});
