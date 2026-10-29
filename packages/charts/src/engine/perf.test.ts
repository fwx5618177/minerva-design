// Performance guards: generous time budgets (far above local timings, so CI
// noise doesn't fail them) and rebuild counters that must stay at zero when
// nothing changed.

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const spies = vi.hoisted(() => ({ buildItems: 0, render: 0 }));

vi.mock("./items", async (importOriginal) => {
  const actual = await importOriginal<typeof import("./items")>();
  return {
    ...actual,
    buildItems: (...args: Parameters<typeof actual.buildItems>) => {
      spies.buildItems++;
      return actual.buildItems(...args);
    },
  };
});

// happy-dom has no GPU nor 2D context: a renderer double receives the items
vi.mock("./renderers/detect", () => ({
  createRenderer: async () => {
    const canvas = document.createElement("canvas");
    return {
      kind: "canvas2d",
      canvas,
      resize(width: number, height: number) {
        canvas.width = width;
        canvas.height = height;
      },
      render() {
        spies.render++;
      },
      destroy() {},
    };
  },
}));

import { createCanvasChart, type ChartCanvas } from "./canvas";
import { createChart } from "./chart";
import { buildItems } from "./items";
import { createScales } from "./layout";
import { buildModel } from "./model";
import { hitTest } from "./scene";
import { createTheme } from "./theme";
import type { ChartInstance, ChartOptions } from "./types";

/** Best of `runs` timings in ms (the minimum filters out GC pauses) */
const best = (fn: () => void, runs = 3) => {
  let min = Infinity;
  for (let i = 0; i < runs; i++) {
    const start = performance.now();
    fn();
    min = Math.min(min, performance.now() - start);
  }
  return min;
};

const nextFrame = () =>
  new Promise<void>((resolve) =>
    requestAnimationFrame(() => setTimeout(resolve, 0)),
  );

beforeEach(() => {
  spies.buildItems = 0;
  spies.render = 0;
});

describe("engine throughput", () => {
  it("builds a 1,000,000-point line model and its items", () => {
    const n = 1_000_000;
    const x = Float64Array.from({ length: n }, (_, i) => i);
    const y = Float64Array.from({ length: n }, (_, i) => Math.sin(i / 1000));
    const theme = createTheme();
    let points = 0;
    // ~15 ms locally
    const ms = best(() => {
      const model = buildModel(
        { series: [{ data: { x, y } }] },
        theme,
        new Set(),
        new Map(),
      );
      const items = buildItems(model, { x: n / 2, y: 0 }, 1);
      points = items[0].kind === "line" ? items[0].count : 0;
    });
    expect(points).toBe(n);
    expect(ms).toBeLessThan(200);
  });

  it("builds a 100,000-point scatter and hit tests it 1,000 times", () => {
    const n = 100_000;
    let seed = 1;
    const random = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
    const x = Float64Array.from({ length: n }, () => random() * 100);
    const y = Float64Array.from({ length: n }, () => random() * 100);
    const theme = createTheme();
    let hits = 0;
    // ~13 ms locally (spatial index included)
    const ms = best(() => {
      const model = buildModel(
        { series: [{ type: "scatter", data: { x, y } }] },
        theme,
        new Set(),
        new Map(),
      );
      buildItems(model, { x: 50, y: 50 }, 1);
      const scales = createScales(
        { x: 40, y: 10, width: 500, height: 300 },
        model.base,
        false,
        false,
      );
      hits = 0;
      for (let i = 0; i < 1000; i++) {
        // inside the data (the axes are padded around it)
        const px = scales.xToPx(5 + ((i * 37) % 90));
        const py = scales.yToPx(5 + ((i * 53) % 90));
        if (hitTest(model, scales, null, px, py)) hits++;
      }
    });
    expect(hits).toBeGreaterThan(900);
    expect(ms).toBeLessThan(200);
  });
});

describe("createChart rebuilds", () => {
  let container: HTMLDivElement;
  let chart: ChartInstance | null = null;
  const data = Array.from({ length: 4 }, (_, k) =>
    Float64Array.from({ length: 5000 }, (_, i) => Math.sin(i / 50 + k)),
  );
  const options = (): ChartOptions => ({
    series: data.map((d, k) => ({
      name: `S${k}`,
      data: d,
      color: k === 1 ? "var(--perf-color, #ff0000)" : undefined,
    })),
    xAxis: { title: "x" },
  });

  beforeEach(() => {
    vi.spyOn(HTMLElement.prototype, "clientWidth", "get").mockReturnValue(600);
    vi.spyOn(HTMLElement.prototype, "clientHeight", "get").mockReturnValue(300);
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    chart?.destroy();
    chart = null;
    container.remove();
    document.documentElement.style.removeProperty("--perf-color");
    vi.restoreAllMocks();
  });

  const mount = async () => {
    chart = createChart(container, options());
    await chart.ready;
    await nextFrame();
    expect(spies.buildItems).toBe(1);
    expect(spies.render).toBeGreaterThan(0);
    spies.buildItems = 0;
    return chart;
  };

  it("keeps the items and the legend through identical setOptions", async () => {
    const c = await mount();
    const legend = () => [
      ...container.querySelectorAll(".minerva-chart-legend button"),
    ];
    const buttons = legend();
    expect(buttons).toHaveLength(4);
    // ~0.05 ms per call locally
    const ms = best(() => {
      for (let i = 0; i < 200; i++) c.setOptions(options());
    });
    await nextFrame();
    expect(spies.buildItems).toBe(0);
    expect(legend()).toEqual(buttons);
    expect(legend().every((b, i) => b === buttons[i])).toBe(true);
    expect(ms).toBeLessThan(250);

    // a real change still rebuilds both
    const next = options();
    c.setOptions({
      ...next,
      series: next.series.map((s, i) =>
        i === 0 ? { ...s, name: "Renamed", lineWidth: 4 } : s,
      ),
    });
    await nextFrame();
    expect(spies.buildItems).toBe(1);
    expect(legend()[0].textContent).toBe("Renamed");
    expect(legend()[0]).not.toBe(buttons[0]);
  });

  it("re-resolves colors on theme changes and keeps the items otherwise", async () => {
    const c = await mount();
    c.refreshTheme();
    await nextFrame();
    expect(spies.buildItems).toBe(0);
    document.documentElement.style.setProperty("--perf-color", "#00ff00");
    c.refreshTheme();
    await nextFrame();
    expect(spies.buildItems).toBe(1);
    expect(
      container.querySelectorAll<HTMLElement>(
        ".minerva-chart-legend button span",
      )[1].style.background,
    ).toMatch(/0, 255, 0/);
  });

  it("reuses the tooltip content while the pointer stays on the same points", async () => {
    await mount();
    const stage = container.querySelector<HTMLElement>(".minerva-chart-stage")!;
    const tooltip = container.querySelector<HTMLElement>(
      ".minerva-chart-tooltip",
    )!;
    const move = (x: number, y: number) =>
      stage.dispatchEvent(
        new PointerEvent("pointermove", { clientX: x, clientY: y }),
      );
    move(300, 150);
    expect(tooltip.style.display).toBe("block");
    const header = tooltip.firstElementChild;
    const transform = tooltip.style.transform;
    // ~0.03 ms per move locally
    const ms = best(() => {
      for (let i = 0; i < 1000; i++) move(300, 150 + (i % 2));
    });
    expect(tooltip.firstElementChild).toBe(header);
    expect(tooltip.style.transform).not.toBe("");
    move(300, 120);
    expect(tooltip.firstElementChild).toBe(header);
    expect(tooltip.style.transform).not.toBe(transform);
    // another point: new content
    move(100, 150);
    expect(tooltip.firstElementChild).not.toBe(header);
    expect(ms).toBeLessThan(500);
  });
});

describe("createCanvasChart rebuilds", () => {
  const fakeCanvas = (): ChartCanvas => {
    const ctx = new Proxy(
      {},
      {
        get: (_target, key) =>
          key === "measureText"
            ? (text: string) => ({ width: text.length * 6 })
            : key === "createLinearGradient"
              ? () => ({ addColorStop() {} })
              : () => {},
        set: () => true,
      },
    );
    return {
      width: 0,
      height: 0,
      getContext: () => ctx,
      requestAnimationFrame: () => 0,
      cancelAnimationFrame: () => {},
    };
  };

  it("keeps the items through setOptions with the same data", () => {
    const data = Float64Array.from({ length: 10000 }, (_, i) => Math.sin(i));
    const bars = [1, 2, 3];
    const options = (color?: string): ChartOptions => ({
      series: [
        { name: "A", data, color },
        { name: "B", type: "bar", data: bars, stack: "s" },
      ],
    });
    const chart = createCanvasChart({
      canvas: fakeCanvas(),
      width: 400,
      height: 300,
      options: options(),
    });
    chart.render();
    expect(spies.buildItems).toBe(1);
    for (let i = 0; i < 50; i++) {
      chart.setOptions(options());
      chart.render();
    }
    expect(spies.buildItems).toBe(1);
    chart.setOptions(options("#00ff00"));
    chart.render();
    expect(spies.buildItems).toBe(2);
    chart.toggleSeries("1");
    chart.render();
    expect(spies.buildItems).toBe(3);
    chart.setTheme({ variables: { "--primary-color": "#123456" } });
    chart.render();
    expect(spies.buildItems).toBe(4);
    chart.destroy();
  });
});
