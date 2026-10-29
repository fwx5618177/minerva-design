import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { ChartCanvas } from "../canvas";
import { createTheme } from "../theme";
import { createCanvasShapeChart } from "./canvas";
import { createShapeChart } from "./chart";
import { layoutShapeLegend, shapeLegend } from "./layout";
import type {
  PieChartOptions,
  ShapeChartInstance,
  ShapeHoverEvent,
} from "./types";

const WIDTH = 400;
const HEIGHT = 300;

/** 2D context double recording the calls */
const fakeContext = () => {
  const calls: { name: string; args: unknown[] }[] = [];
  const state: Record<string, unknown> = {};
  const ctx = new Proxy(state, {
    get(target, key: string) {
      if (key in target) return target[key];
      if (key === "measureText")
        return (text: string) => ({ width: text.length * 6 });
      return (...args: unknown[]) => {
        calls.push({ name: key, args });
      };
    },
    set(target, key: string, value) {
      target[key] = value;
      return true;
    },
  });
  return { ctx, calls };
};

const filled = (calls: { name: string; args: unknown[] }[]) =>
  calls.filter((c) => c.name === "fillText").map((c) => c.args[0]);

// two equal slices: A on the right half, B on the left half
const options: PieChartOptions = {
  type: "pie",
  data: [
    { name: "A", value: 1 },
    { name: "B", value: 1 },
  ],
  labels: "none",
  animation: false,
};

const pointer = (
  type: string,
  x: number,
  y: number,
  pointerType = "mouse",
): Event => {
  const event = new MouseEvent(type, {
    clientX: x,
    clientY: y,
    bubbles: true,
  });
  Object.defineProperty(event, "pointerId", { value: 1 });
  Object.defineProperty(event, "pointerType", { value: pointerType });
  return event;
};

describe("createShapeChart", () => {
  let container: HTMLElement;
  let chart: ShapeChartInstance | null = null;
  let calls: { name: string; args: unknown[] }[];

  beforeEach(() => {
    vi.spyOn(HTMLElement.prototype, "clientWidth", "get").mockReturnValue(
      WIDTH,
    );
    vi.spyOn(HTMLElement.prototype, "clientHeight", "get").mockReturnValue(
      HEIGHT,
    );
    const fake = fakeContext();
    calls = fake.calls;
    vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockReturnValue(
      fake.ctx as unknown as CanvasRenderingContext2D,
    );
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    chart?.destroy();
    chart = null;
    container.remove();
    vi.restoreAllMocks();
  });

  const stage = () =>
    container.querySelector<HTMLElement>(".minerva-chart-stage")!;
  const tooltip = () =>
    container.querySelector<HTMLElement>(".minerva-chart-tooltip")!;
  const legendButtons = () => [
    ...container.querySelectorAll<HTMLButtonElement>(
      ".minerva-chart-legend button",
    ),
  ];

  it("mounts an accessible figure with a legend and draws the slices", () => {
    chart = createShapeChart(container, { ...options, innerRadius: 0.6 });
    expect(stage().getAttribute("role")).toBe("figure");
    expect(stage().getAttribute("aria-label")).toBe("Donut chart");
    expect(stage().tabIndex).toBe(0);
    const described = stage().getAttribute("aria-describedby")!;
    expect(container.querySelector(`#${described}`)?.textContent).toBe(
      "A: 1 (50.0%); B: 1 (50.0%)",
    );
    expect(legendButtons().map((b) => b.textContent)).toEqual(["A", "B"]);
    expect(calls.filter((c) => c.name === "arc").length).toBeGreaterThan(0);
    expect(calls.filter((c) => c.name === "fill").length).toBe(2);
  });

  it("hovers, shows the tooltip and clicks slices", () => {
    chart = createShapeChart(container, options);
    const hovers: (ShapeHoverEvent | null)[] = [];
    const clicks: ShapeHoverEvent[] = [];
    chart.on("hover", (e) => hovers.push(e));
    chart.on("click", (e) => clicks.push(e));

    stage().dispatchEvent(pointer("pointermove", 280, 150));
    expect(hovers[0]).toMatchObject({ index: 0, name: "A", percent: 0.5 });
    expect(tooltip().style.display).toBe("block");
    expect(tooltip().textContent).toContain("A");
    expect(tooltip().textContent).toContain("50.0%");
    expect(stage().style.cursor).toBe("pointer");

    stage().dispatchEvent(pointer("pointermove", 282, 150));
    expect(hovers).toHaveLength(1);

    stage().dispatchEvent(pointer("pointermove", 120, 150));
    expect(hovers[1]).toMatchObject({ index: 1, name: "B" });

    stage().dispatchEvent(pointer("pointerdown", 120, 150));
    stage().dispatchEvent(pointer("pointerup", 121, 150));
    expect(clicks).toHaveLength(1);
    expect(clicks[0].name).toBe("B");

    stage().dispatchEvent(pointer("pointerleave", 0, 0));
    expect(hovers[hovers.length - 1]).toBeNull();
    expect(tooltip().style.display).toBe("none");
  });

  it("taps show the tooltip on touch screens", () => {
    chart = createShapeChart(container, options);
    const clicks: ShapeHoverEvent[] = [];
    chart.on("click", (e) => clicks.push(e));
    stage().dispatchEvent(pointer("pointerdown", 280, 150, "touch"));
    stage().dispatchEvent(pointer("pointerup", 280, 150, "touch"));
    expect(clicks[0]?.name).toBe("A");
    expect(tooltip().style.display).toBe("block");
    // a drag is not a tap
    stage().dispatchEvent(pointer("pointerdown", 120, 150, "touch"));
    stage().dispatchEvent(pointer("pointermove", 120, 190, "touch"));
    stage().dispatchEvent(pointer("pointerup", 120, 190, "touch"));
    expect(clicks).toHaveLength(1);
  });

  it("renders a custom tooltip", () => {
    chart = createShapeChart(container, {
      ...options,
      tooltip: { render: (e) => `${e.name} = ${e.value}` },
    });
    stage().dispatchEvent(pointer("pointermove", 280, 150));
    expect(tooltip().textContent).toBe("A = 1");
    chart.setOptions({ ...options, tooltip: false });
    stage().dispatchEvent(pointer("pointermove", 120, 150));
    expect(tooltip().style.display).toBe("none");
  });

  it("toggles slices from the legend", async () => {
    chart = createShapeChart(container, options);
    const [a] = legendButtons();
    expect(a.getAttribute("aria-pressed")).toBe("true");
    a.click();
    const [a2] = legendButtons();
    expect(a2.getAttribute("aria-pressed")).toBe("false");
    expect(a2.style.textDecoration).toBe("line-through");
    chart.resize();
    // B now fills the whole pie
    const hovers: (ShapeHoverEvent | null)[] = [];
    chart.on("hover", (e) => hovers.push(e));
    stage().dispatchEvent(pointer("pointermove", 280, 150));
    expect(hovers[0]).toMatchObject({ name: "B", percent: 1 });
    chart.toggle(0);
    expect(legendButtons()[0].getAttribute("aria-pressed")).toBe("true");
  });

  it("emits toggle events and reports the hidden entries", () => {
    chart = createShapeChart(container, options);
    const toggles: unknown[] = [];
    chart.on("toggle", (e) => toggles.push(e));
    legendButtons()[1].click();
    expect(toggles).toEqual([{ index: 1, hidden: true, hiddenIndexes: [1] }]);
    expect(chart.getHidden()).toEqual([1]);
    chart.toggle(0);
    expect(toggles[1]).toEqual({
      index: 0,
      hidden: true,
      hiddenIndexes: [0, 1],
    });
    chart.toggle(1);
    expect(chart.getHidden()).toEqual([0]);
    chart.toggle(5);
    expect(toggles).toHaveLength(3);
  });

  it("lets the hidden option control the visibility", () => {
    chart = createShapeChart(container, { ...options, hidden: [1] });
    const toggles: { hiddenIndexes: number[] }[] = [];
    chart.on("toggle", (e) => toggles.push(e));
    expect(chart.getHidden()).toEqual([1]);
    expect(legendButtons()[1].getAttribute("aria-pressed")).toBe("false");
    // a legend click only proposes the change
    legendButtons()[0].click();
    expect(toggles[0]).toEqual({
      index: 0,
      hidden: true,
      hiddenIndexes: [0, 1],
    });
    expect(chart.getHidden()).toEqual([1]);
    expect(legendButtons()[0].getAttribute("aria-pressed")).toBe("true");
    chart.setOptions({ ...options, hidden: toggles[0].hiddenIndexes });
    expect(chart.getHidden()).toEqual([0, 1]);
    expect(legendButtons()[0].getAttribute("aria-pressed")).toBe("false");
  });

  it("draws the focus ring inside the stage", () => {
    chart = createShapeChart(container, options);
    stage().focus();
    stage().dispatchEvent(new FocusEvent("focus"));
    expect(stage().style.boxShadow).toContain("inset");
    stage().dispatchEvent(new FocusEvent("blur"));
    expect(stage().style.boxShadow).toBe("");
  });

  it("moves the highlight with the keyboard", () => {
    chart = createShapeChart(container, options);
    const hovers: (ShapeHoverEvent | null)[] = [];
    const clicks: ShapeHoverEvent[] = [];
    chart.on("hover", (e) => hovers.push(e));
    chart.on("click", (e) => clicks.push(e));
    const key = (k: string) =>
      stage().dispatchEvent(new KeyboardEvent("keydown", { key: k }));
    key("ArrowRight");
    expect(hovers[0]?.name).toBe("A");
    expect(container.querySelector("[aria-live]")?.textContent).toBe(
      "A: 1 (50.0%)",
    );
    key("ArrowRight");
    expect(hovers[1]?.name).toBe("B");
    key("ArrowRight");
    expect(hovers[2]?.name).toBe("A");
    key("Enter");
    expect(clicks[0]?.name).toBe("A");
    key("Escape");
    expect(hovers[3]).toBeNull();
  });

  it("updates the options and removes its DOM on destroy", () => {
    chart = createShapeChart(container, options);
    chart.setOptions({
      type: "gauge",
      value: 30,
      label: "Load",
      animation: false,
    });
    expect(stage().getAttribute("aria-label")).toBe("Gauge: Load");
    expect(
      container.querySelector<HTMLElement>(".minerva-chart-legend")!.style
        .display,
    ).toBe("none");
    chart.resize();
    expect(filled(calls)).toContain("Load");
    chart.destroy();
    chart = null;
    expect(container.children).toHaveLength(0);
  });

  it("draws nothing without a 2D context", () => {
    vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockReturnValue(null);
    chart = createShapeChart(container, { ...options, animation: true });
    expect(stage().getAttribute("aria-label")).toBe("Pie chart");
  });
});

describe("createCanvasShapeChart", () => {
  const fakeCanvas = () => {
    const { ctx, calls } = fakeContext();
    const frames: (() => void)[] = [];
    const canvas: ChartCanvas = {
      width: 0,
      height: 0,
      getContext: () => ctx,
      requestAnimationFrame: (cb) => frames.push(cb),
      cancelAnimationFrame: () => {},
    };
    const flush = () => {
      for (let i = 0; i < 100 && frames.length; i++) frames.shift()!();
    };
    return { canvas, calls, flush, frames };
  };

  it("draws the chart, the legend and a tooltip on tap", () => {
    const { canvas, calls, flush } = fakeCanvas();
    const chart = createCanvasShapeChart({
      canvas,
      width: WIDTH,
      height: HEIGHT,
      pixelRatio: 2,
      options,
    });
    expect(canvas.width).toBe(WIDTH * 2);
    expect(canvas.height).toBe(HEIGHT * 2);
    expect(filled(calls)).toEqual(expect.arrayContaining(["A", "B"]));

    const clicks: ShapeHoverEvent[] = [];
    chart.on("click", (e) => clicks.push(e));
    // chart area excludes the legend (bottom); A is the right half
    chart.touchStart([{ x: 260, y: 130 }]);
    chart.touchEnd([{ x: 260, y: 130 }]);
    expect(clicks[0]?.name).toBe("A");
    calls.length = 0;
    flush();
    // tooltip rows
    expect(filled(calls)).toEqual(expect.arrayContaining(["Value", "Share"]));
    chart.destroy();
  });

  it("toggles slices when the legend is tapped", () => {
    const { canvas, flush } = fakeCanvas();
    const chart = createCanvasShapeChart({
      canvas,
      width: WIDTH,
      height: HEIGHT,
      options,
    });
    const theme = createTheme();
    const { boxes } = layoutShapeLegend(
      shapeLegend(options, theme)!,
      WIDTH,
      "bottom",
      HEIGHT,
      theme,
      (t) => t.length * 6,
    );
    const a = boxes[0];
    const toggles: unknown[] = [];
    chart.on("toggle", (e) => toggles.push(e));
    chart.pointerDown(a.x + 4, a.y + 10);
    chart.pointerUp(a.x + 4, a.y + 10);
    expect(toggles).toEqual([{ index: 0, hidden: true, hiddenIndexes: [0] }]);
    expect(chart.getHidden()).toEqual([0]);
    flush();
    const hovers: (ShapeHoverEvent | null)[] = [];
    chart.on("hover", (e) => hovers.push(e));
    chart.pointerMove(260, 130);
    expect(hovers[0]).toMatchObject({ name: "B", percent: 1 });
    chart.pointerLeave();
    expect(hovers[1]).toBeNull();
    chart.destroy();
  });

  it("animates with the canvas frames and falls back without a context", () => {
    const { canvas, frames, flush } = fakeCanvas();
    const chart = createCanvasShapeChart({
      canvas,
      width: WIDTH,
      height: HEIGHT,
      options: {
        type: "radar",
        indicators: [{ name: "a" }, { name: "b" }, { name: "c" }],
        series: [{ values: [1, 2, 3] }],
      },
    });
    expect(frames.length).toBe(1);
    flush();
    chart.destroy();
    const blind = createCanvasShapeChart({
      canvas: { width: 0, height: 0, getContext: () => null },
      width: WIDTH,
      height: HEIGHT,
      options,
    });
    blind.render();
    blind.destroy();
  });
});
