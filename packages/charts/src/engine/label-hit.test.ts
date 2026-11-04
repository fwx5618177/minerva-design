import { describe, expect, it, vi } from "vitest";
import { createChartController } from "./controller";
import { quadrantChartOptions, type QuadrantConfig } from "./presets";

const setup = (
  points: QuadrantConfig["points"] = [
    { x: 2, y: 8, label: "Fix the login outage" },
    { x: 8, y: 2, label: "Plan the next release" },
  ],
) => {
  const chart = createChartController({
    options: quadrantChartOptions({ points, draggable: true }),
    measureText: (text) => text.length * 6,
  });
  chart.setSize(600, 400);
  const target = (index: number) => {
    const point = points[index];
    const pixel = chart.toPixel(point.x, point.y)!;
    const placed = chart
      .getScene()!
      .pointLabels.find(
        ({ label }) =>
          Math.abs(label.x - pixel.x) < 0.5 &&
          Math.abs(label.y - pixel.y) < 0.5,
      )!;
    expect(placed).toBeTruthy();
    const { box } = placed;
    const at = { x: box.x + box.width * 0.8, y: box.y + box.height / 2 };
    expect(Math.hypot(at.x - pixel.x, at.y - pixel.y)).toBeGreaterThan(20);
    return { ...at, placed };
  };
  return { chart, target };
};

describe("rendered scatter label targets", () => {
  it("hovers the owning point from the visible text, beyond the dot hit radius", () => {
    const { chart, target } = setup();
    const hover = vi.fn();
    chart.on("hover", hover);
    const at = target(0);
    chart.pointerMove(at.x, at.y);
    expect(hover).toHaveBeenLastCalledWith(
      expect.objectContaining({
        items: [
          expect.objectContaining({ index: 0, label: "Fix the login outage" }),
        ],
      }),
    );
    chart.destroy();
  });
  it("clicks the same point from its text without starting a point drag", () => {
    const { chart, target } = setup();
    const click = vi.fn();
    const drag = vi.fn();
    chart.on("click", click);
    chart.on("dragStart", drag);
    const at = target(1);
    chart.pointerDown(at.x, at.y);
    chart.pointerUp(at.x, at.y);
    expect(click).toHaveBeenCalledExactlyOnceWith(
      expect.objectContaining({
        items: [expect.objectContaining({ index: 1 })],
      }),
    );
    expect(drag).not.toHaveBeenCalled();
    chart.destroy();
  });
  it("keeps duplicate and truncated label text associated with the correct point", () => {
    const name = "A very long duplicated task name that must be truncated";
    const { chart, target } = setup([
      { x: 2, y: 8, label: name },
      { x: 8, y: 2, label: name },
    ]);
    const at = target(1);
    expect(at.placed.label.text).not.toBe(name);
    const hover = vi.fn();
    chart.on("hover", hover);
    chart.pointerMove(at.x, at.y);
    expect(hover).toHaveBeenLastCalledWith(
      expect.objectContaining({
        items: [expect.objectContaining({ index: 1, label: name })],
      }),
    );
    chart.destroy();
  });
  it("does not make hidden text or blank quadrant space into a target", () => {
    const { chart, target } = setup();
    const at = target(0);
    at.placed.label.hidden = true;
    const hover = vi.fn();
    chart.on("hover", hover);
    chart.pointerMove(at.x, at.y);
    chart.pointerMove(300, 200);
    expect(hover).not.toHaveBeenCalled();
    chart.destroy();
  });
});
