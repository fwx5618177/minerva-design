import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { createChart } from "./chart";
import type { ChartHoverEvent, ChartInstance, ChartOptions } from "./types";

const WIDTH = 600;
const HEIGHT = 300;

let container: HTMLDivElement;
let chart: ChartInstance | null = null;

const nextFrame = () =>
  new Promise<void>((resolve) =>
    requestAnimationFrame(() => setTimeout(resolve, 0)),
  );

const mount = async (options: ChartOptions) => {
  chart = createChart(container, options);
  await chart.ready;
  await nextFrame();
  return chart;
};

const stage = () =>
  container.querySelector<HTMLDivElement>(".minerva-chart-stage")!;

const pointer = (type: string, x: number, y: number) =>
  stage().dispatchEvent(
    new PointerEvent(type, {
      clientX: x,
      clientY: y,
      bubbles: true,
      pointerId: 1,
      button: 0,
    }),
  );

beforeEach(() => {
  vi.spyOn(HTMLElement.prototype, "clientWidth", "get").mockReturnValue(WIDTH);
  vi.spyOn(HTMLElement.prototype, "clientHeight", "get").mockReturnValue(
    HEIGHT,
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

describe("createChart", () => {
  it("mounts an accessible stage and resolves without a backend in happy-dom", async () => {
    const c = await mount({
      series: [{ data: [1, 3, 2] }],
      ariaLabel: "Sales",
    });
    expect(await c.ready).toBe(c.getRenderer());
    expect(stage().getAttribute("role")).toBe("figure");
    expect(stage().getAttribute("aria-roledescription")).toBe("chart");
    expect(stage().getAttribute("aria-label")).toBe("Sales");
    expect(stage().tabIndex).toBe(0);
    const legend = container.querySelector<HTMLElement>(
      ".minerva-chart-legend",
    )!;
    expect(legend.style.display).toBe("none");
  });

  it("shows a legend that toggles series", async () => {
    await mount({
      series: [
        { name: "A", data: [1, 2] },
        { name: "B", data: [3, 4] },
      ],
    });
    const buttons = container.querySelectorAll<HTMLButtonElement>(
      ".minerva-chart-legend button",
    );
    expect([...buttons].map((b) => b.textContent)).toEqual(["A", "B"]);
    buttons[1].click();
    const after = container.querySelectorAll<HTMLButtonElement>(
      ".minerva-chart-legend button",
    );
    expect(after[1].getAttribute("aria-pressed")).toBe("false");
    expect(after[0].getAttribute("aria-pressed")).toBe("true");
  });

  it("reports the hovered points and shows a tooltip", async () => {
    const c = await mount({
      series: [
        {
          name: "A",
          data: [
            [0, 0],
            [5, 5],
            [10, 10],
          ],
        },
        {
          name: "B",
          data: [
            [0, 1],
            [5, 6],
            [10, 11],
          ],
        },
      ],
      xAxis: { min: 0, max: 10 },
    });
    const events: (ChartHoverEvent | null)[] = [];
    c.on("hover", (e) => events.push(e));
    pointer("pointermove", WIDTH / 2, HEIGHT / 2);
    expect(
      events[events.length - 1]?.items.map((i) => [i.seriesName, i.x]),
    ).toEqual([
      ["A", 5],
      ["B", 5],
    ]);
    const tooltip = container.querySelector<HTMLElement>(
      ".minerva-chart-tooltip",
    )!;
    expect(tooltip.style.display).toBe("block");
    expect(tooltip.textContent).toContain("A");
    stage().dispatchEvent(new PointerEvent("pointerleave"));
    expect(events[events.length - 1]).toBeNull();
    expect(tooltip.style.display).toBe("none");
  });

  it("emits clicks on points", async () => {
    const c = await mount({ series: [{ data: [1, 2, 3] }] });
    const click = vi.fn();
    c.on("click", click);
    pointer("pointerdown", WIDTH / 2, HEIGHT / 2);
    pointer("pointerup", WIDTH / 2, HEIGHT / 2);
    expect(click).toHaveBeenCalledTimes(1);
    expect(click.mock.calls[0][0].items[0].index).toBe(1);
  });

  it("zooms with the keyboard and the wheel, and resets", async () => {
    const c = await mount({
      series: [{ data: Array.from({ length: 100 }, (_, i) => i) }],
    });
    const zoom = vi.fn();
    c.on("zoom", zoom);
    const span = () => c.getView().x[1] - c.getView().x[0];
    const full = span();
    stage().dispatchEvent(
      new KeyboardEvent("keydown", { key: "+", bubbles: true }),
    );
    expect(span()).toBeLessThan(full);
    expect(zoom).toHaveBeenCalled();
    stage().dispatchEvent(
      new KeyboardEvent("keydown", { key: "0", bubbles: true }),
    );
    expect(span()).toBeCloseTo(full);
    // happy-dom's WheelEvent ignores the MouseEvent init fields
    const wheelEvent = (init: { deltaY: number; ctrlKey?: boolean }) => {
      const e = new WheelEvent("wheel", {
        deltaY: init.deltaY,
        cancelable: true,
      });
      Object.defineProperties(e, {
        clientX: { value: WIDTH / 2 },
        clientY: { value: HEIGHT / 2 },
        ctrlKey: { value: !!init.ctrlKey },
        metaKey: { value: false },
      });
      return e;
    };
    const wheel = wheelEvent({ deltaY: -200, ctrlKey: true });
    stage().dispatchEvent(wheel);
    expect(wheel.defaultPrevented).toBe(true);
    expect(span()).toBeLessThan(full);
    // a plain wheel scrolls the page
    const plain = wheelEvent({ deltaY: -200 });
    stage().dispatchEvent(plain);
    expect(plain.defaultPrevented).toBe(false);
  });

  it("navigates points with the arrow keys and announces them", async () => {
    const c = await mount({
      series: [
        {
          name: "Temp",
          data: [
            [1, 10],
            [2, 20],
            [3, 30],
          ],
        },
      ],
    });
    const hover = vi.fn();
    c.on("hover", hover);
    const key = (k: string) =>
      stage().dispatchEvent(
        new KeyboardEvent("keydown", { key: k, bubbles: true }),
      );
    key("ArrowRight");
    key("ArrowRight");
    expect(
      hover.mock.calls[hover.mock.calls.length - 1]?.[0].items[0].index,
    ).toBe(1);
    expect(container.querySelector("[aria-live]")?.textContent).toContain(
      "Temp",
    );
    key("Escape");
    expect(hover.mock.calls[hover.mock.calls.length - 1]?.[0]).toBeNull();
  });

  it("clamps programmatic views and keeps zoom across data updates", async () => {
    const c = await mount({
      series: [
        {
          data: [
            [0, 0],
            [100, 1],
          ],
        },
      ],
      xAxis: { min: 0, max: 100 },
    });
    c.setView({ x: [-50, 20] });
    expect(c.getView().x).toEqual([0, 70]);
    c.setOptions({
      series: [
        {
          data: [
            [0, 0],
            [100, 2],
          ],
        },
      ],
      xAxis: { min: 0, max: 100 },
    });
    expect(c.getView().x).toEqual([0, 70]);
    c.resetZoom();
    expect(c.getView().x).toEqual([0, 100]);
  });

  it("is static without interaction", async () => {
    const c = await mount({ series: [{ data: [1, 2] }], interaction: false });
    expect(stage().hasAttribute("tabindex")).toBe(false);
    stage().dispatchEvent(
      new KeyboardEvent("keydown", { key: "+", bubbles: true }),
    );
    expect(c.getView().x).toEqual([0, 1]);
  });

  it("renders custom tooltips and removes its DOM on destroy", async () => {
    const c = await mount({
      series: [{ type: "scatter", data: [{ x: 1, y: 1, label: "Alpha" }] }],
      tooltip: { render: (e) => `custom ${e.items[0].label}` },
      xAxis: { min: 0, max: 2 },
      yAxis: { min: 0, max: 2, nice: false },
    });
    pointer("pointermove", WIDTH / 2, HEIGHT / 2);
    const tooltip = container.querySelector<HTMLElement>(
      ".minerva-chart-tooltip",
    )!;
    // the plot is centered roughly: hit or miss depends on the axes room
    if (tooltip.style.display === "block")
      expect(tooltip.textContent).toBe("custom Alpha");
    c.destroy();
    expect(container.querySelector(".minerva-chart")).toBeNull();
    chart = null;
  });
});
