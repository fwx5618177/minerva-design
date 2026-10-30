// The chart elements with a fake engine (the real one needs a GPU / canvas
// browser; it is exercised on the docs site): lifecycle (created once
// rendered and connected, options replaced on property changes, destroyed
// on disconnect, recreated on reconnect), option presets of the named
// elements and engine events forwarded as minerva-* events.
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

type Listener = (event: unknown) => void;
interface FakeEngine {
  kind: "chart" | "shape";
  container: HTMLElement;
  options: Record<string, unknown>;
  setOptions: ReturnType<typeof vi.fn>;
  destroy: ReturnType<typeof vi.fn>;
  resetZoom: ReturnType<typeof vi.fn>;
  toggle: ReturnType<typeof vi.fn>;
  listeners: Map<string, Set<Listener>>;
  fire(type: string, event: unknown): void;
}

const engines: FakeEngine[] = [];

vi.mock("minerva-design/charts/core", async (importOriginal) => {
  const actual =
    await importOriginal<typeof import("minerva-design/charts/core")>();
  const create =
    (kind: FakeEngine["kind"]) =>
    (container: HTMLElement, options: Record<string, unknown>) => {
      const listeners = new Map<string, Set<Listener>>();
      const engine: FakeEngine = {
        kind,
        container,
        options,
        setOptions: vi.fn((next) => {
          engine.options = next;
        }),
        destroy: vi.fn(),
        resetZoom: vi.fn(),
        toggle: vi.fn(),
        listeners,
        fire: (type, event) =>
          listeners.get(type)?.forEach((listener) => listener(event)),
      };
      engines.push(engine);
      return {
        ...engine,
        getView: () => ({ x: [0, 1], y: [0, 1] }),
        getRenderer: () => "canvas2d",
        on: (type: string, listener: Listener) => {
          if (!listeners.has(type)) listeners.set(type, new Set());
          listeners.get(type)!.add(listener);
          return () => listeners.get(type)!.delete(listener);
        },
      };
    };
  return {
    ...actual,
    createChart: create("chart"),
    createShapeChart: create("shape"),
  };
});

const { MinervaChart, MinervaLineChart, MinervaPieChart } =
  await import("../../elements/chart");
const { mount, settle } = await import("../../../tests/utils");

const series = [{ name: "Visits", data: [1, 3, 2] }];

beforeEach(() => {
  engines.length = 0;
});
afterEach(() => {
  document.body.innerHTML = "";
});

describe("<minerva-chart>", () => {
  it("registers every chart element", () => {
    expect(customElements.get("minerva-chart")).toBe(MinervaChart);
    expect(customElements.get("minerva-line-chart")).toBe(MinervaLineChart);
    expect(customElements.get("minerva-pie-chart")).toBe(MinervaPieChart);
    for (const tag of [
      "minerva-area-chart",
      "minerva-bar-chart",
      "minerva-scatter-chart",
      "minerva-candlestick-chart",
      "minerva-heatmap-chart",
      "minerva-sparkline",
      "minerva-quadrant-chart",
      "minerva-shape-chart",
      "minerva-donut-chart",
      "minerva-radar-chart",
      "minerva-gauge-chart",
      "minerva-funnel-chart",
      "minerva-treemap-chart",
    ]) {
      expect(customElements.get(tag), tag).toBeDefined();
    }
  });

  it("waits for its options, then mounts the engine into the sized surface", async () => {
    const el = await mount<InstanceType<typeof MinervaChart>>(
      `<minerva-chart height="200"></minerva-chart>`,
    );
    expect(engines).toHaveLength(0);
    expect(el.instance).toBeNull();
    const root = el.shadowRoot!.querySelector<HTMLElement>("[part=root]")!;
    expect(root.style.height).toBe("200px");

    el.options = { series };
    await settle();
    expect(engines).toHaveLength(1);
    expect(engines[0].container).toBe(
      el.shadowRoot!.querySelector("[part=surface]"),
    );
    expect(engines[0].options).toEqual({ series });
    expect(el.instance).not.toBeNull();
  });

  it("replaces the options on change, ignores height-only changes, destroys on disconnect and recreates on reconnect", async () => {
    const el = await mount<InstanceType<typeof MinervaChart>>(
      `<minerva-chart></minerva-chart>`,
    );
    el.options = { series };
    await settle();
    const [engine] = engines;
    const next = { series, legend: false };
    el.options = next;
    await settle();
    expect(engine.setOptions).toHaveBeenCalledWith(next);

    el.height = "50vh";
    await settle();
    expect(engine.setOptions).toHaveBeenCalledTimes(1);

    el.remove();
    expect(engine.destroy).toHaveBeenCalledTimes(1);
    expect(el.instance).toBeNull();

    document.body.append(el);
    await settle();
    expect(engines).toHaveLength(2);
    expect(engines[1].options).toBe(next);
  });

  it("forwards the engine events as minerva-* events and exposes the zoom methods", async () => {
    const el = await mount<InstanceType<typeof MinervaChart>>(
      `<minerva-chart></minerva-chart>`,
    );
    el.options = { series };
    await settle();
    const seen: Array<[string, unknown]> = [];
    for (const type of [
      "minerva-hover",
      "minerva-point-click",
      "minerva-plot-click",
      "minerva-zoom",
      "minerva-renderer-change",
    ]) {
      document.body.addEventListener(type, (event) =>
        seen.push([type, (event as CustomEvent).detail]),
      );
    }
    const hover = { x: 1, xLabel: "1", items: [] };
    engines[0].fire("hover", hover);
    engines[0].fire("click", hover);
    engines[0].fire("plotClick", { x: 2, y: 3 });
    engines[0].fire("zoom", { x: [0, 1], y: [0, 2] });
    engines[0].fire("renderer", "webgl2");
    expect(seen).toEqual([
      ["minerva-hover", hover],
      ["minerva-point-click", hover],
      ["minerva-plot-click", { x: 2, y: 3 }],
      ["minerva-zoom", { x: [0, 1], y: [0, 2] }],
      ["minerva-renderer-change", { renderer: "webgl2" }],
    ]);
    el.resetZoom();
    expect(engines[0].resetZoom).toHaveBeenCalled();
    expect(el.getRenderer()).toBe("canvas2d");

    el.remove();
    seen.length = 0;
    engines[0].fire("hover", hover);
    expect(seen).toEqual([]);
  });
});

describe("named chart elements", () => {
  it("<minerva-line-chart> types, stacks and curves its series", async () => {
    document.body.innerHTML = `<minerva-line-chart area percent curve="step"></minerva-line-chart>`;
    const el = document.querySelector("minerva-line-chart")!;
    el.series = [...series, { name: "Bars", type: "bar", data: [1, 1, 1] }];
    el.options = { legend: false };
    await settle();
    expect(engines[0].options).toEqual({
      legend: false,
      stackMode: "percent",
      series: [
        { ...series[0], type: "area", stack: "stack", curve: "step" },
        { name: "Bars", type: "bar", data: [1, 1, 1] },
      ],
    });
  });

  it("<minerva-bar-chart labels> shows the values of its bars", async () => {
    document.body.innerHTML = `<minerva-bar-chart labels stacked></minerva-bar-chart>`;
    document.querySelector("minerva-bar-chart")!.series = series;
    await settle();
    expect(engines[0].options.series).toEqual([
      { ...series[0], type: "bar", stack: "stack", showLabels: true },
    ]);
  });

  it("<minerva-sparkline> is 48px high and draws without axes", async () => {
    document.body.innerHTML = `<minerva-sparkline type="area" reference="2"></minerva-sparkline>`;
    const el = document.querySelector("minerva-sparkline")!;
    el.data = [1, 2, 3];
    await settle();
    expect(
      el.shadowRoot!.querySelector<HTMLElement>("[part=root]")!.style.height,
    ).toBe("48px");
    const options = engines[0].options as {
      series: Array<{ type: string }>;
      xAxis: { visible: boolean };
      annotations: unknown[];
    };
    expect(options.series[0].type).toBe("area");
    expect(options.xAxis.visible).toBe(false);
    expect(options.annotations).toHaveLength(1);
  });

  it("<minerva-quadrant-chart> reports clicked points and quadrants", async () => {
    document.body.innerHTML = `<minerva-quadrant-chart x-label="Effort"></minerva-quadrant-chart>`;
    const el = document.querySelector("minerva-quadrant-chart")!;
    const points = [{ x: 8, y: 9, label: "A" }];
    el.points = points;
    await settle();
    const clicks: unknown[] = [];
    el.addEventListener("minerva-point-click", (e) =>
      clicks.push((e as CustomEvent).detail),
    );
    el.addEventListener("minerva-quadrant-click", (e) =>
      clicks.push((e as CustomEvent).detail),
    );
    engines[0].fire("click", { items: [{ index: 0 }] });
    engines[0].fire("plotClick", { x: 1, y: 9 });
    expect(clicks).toEqual([
      { point: points[0], index: 0 },
      { quadrant: "topLeft", x: 1, y: 9 },
    ]);
  });

  it("shape elements build the options of their type", async () => {
    document.body.innerHTML = `
      <minerva-donut-chart center-value="42"></minerva-donut-chart>
      <minerva-gauge-chart value="72" label="CPU"></minerva-gauge-chart>
      <minerva-funnel-chart hide-conversion></minerva-funnel-chart>`;
    const data = [{ name: "A", value: 1 }];
    document.querySelector("minerva-donut-chart")!.data = data;
    document.querySelector("minerva-funnel-chart")!.data = data;
    await settle();
    const [funnel, gauge, donut] = [...engines].sort((a, b) =>
      String(a.options.type).localeCompare(String(b.options.type)),
    );
    expect(engines.every((e) => e.kind === "shape")).toBe(true);
    expect(donut.options).toMatchObject({
      type: "pie",
      data,
      innerRadius: 0.62,
      centerValue: "42",
    });
    expect(gauge.options).toMatchObject({
      type: "gauge",
      value: 72,
      label: "CPU",
    });
    expect(funnel.options).toMatchObject({ type: "funnel", conversion: false });
    const gaugeEl = document.querySelector("minerva-gauge-chart")!;
    expect(
      gaugeEl.shadowRoot!.querySelector<HTMLElement>("[part=root]")!.style
        .height,
    ).toBe("240px");
  });

  it("<minerva-shape-chart> forwards hover, click and toggle", async () => {
    document.body.innerHTML = `<minerva-shape-chart></minerva-shape-chart>`;
    const el = document.querySelector("minerva-shape-chart")!;
    el.options = { type: "pie", data: [{ name: "A", value: 1 }] };
    await settle();
    const seen: string[] = [];
    for (const type of ["minerva-hover", "minerva-click", "minerva-toggle"])
      el.addEventListener(type, () => seen.push(type));
    engines[0].fire("hover", null);
    engines[0].fire("click", { index: 0 });
    engines[0].fire("toggle", { index: 0, hidden: true, hiddenIndexes: [0] });
    expect(seen).toEqual(["minerva-hover", "minerva-click", "minerva-toggle"]);
    el.toggle(0);
    expect(engines[0].toggle).toHaveBeenCalledWith(0);
  });
});
