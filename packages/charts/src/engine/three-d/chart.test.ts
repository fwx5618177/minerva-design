import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { createChart3D, stageLayout } from "./chart";
import type {
  Chart3DCameraState,
  Chart3DHoverEvent,
  Chart3DInstance,
  Chart3DOptions,
} from "./types";

const WIDTH = 600;
const HEIGHT = 400;

let container: HTMLDivElement;
let chart: Chart3DInstance | null = null;

const nextFrame = () =>
  new Promise<void>((resolve) =>
    requestAnimationFrame(() => setTimeout(resolve, 0)),
  );

/** A 2D context accepting every call (happy-dom has no canvas) */
const fakeContext = () => {
  const state: Record<string | symbol, unknown> = {};
  return new Proxy(state, {
    get(target, prop) {
      if (prop in target) return target[prop];
      if (prop === "measureText")
        return (text: string) => ({ width: text.length * 6 });
      if (prop === "createLinearGradient") return () => ({ addColorStop() {} });
      return () => {};
    },
    set(target, prop, value) {
      target[prop] = value;
      return true;
    },
  });
};

const stage = () =>
  container.querySelector<HTMLDivElement>(".minerva-chart-stage")!;

const pointer = (type: string, x: number, y: number, extra = {}) =>
  stage().dispatchEvent(
    new PointerEvent(type, {
      clientX: x,
      clientY: y,
      bubbles: true,
      pointerId: 1,
      button: 0,
      pointerType: "mouse",
      ...extra,
    }),
  );

const mount = async (options: Chart3DOptions) => {
  chart = createChart3D(container, options);
  await chart.ready;
  await nextFrame();
  await nextFrame();
  return chart;
};

// built-in texts follow <html lang>: the tests expect English by default
beforeEach(() => {
  document.documentElement.lang = "en";
});
afterEach(() => {
  document.documentElement.removeAttribute("lang");
});

const summaryText = () =>
  document.getElementById(stage().getAttribute("aria-describedby")!)!
    .textContent;

const POINTS: Chart3DOptions = {
  series: [
    {
      name: "Cloud",
      data: [
        [-1, -1, -1],
        [0, 0, 0],
        [1, 1, 1],
      ],
      pointSize: 12,
    },
  ],
  ariaLabel: "Cloud chart",
};

describe("createChart3D without canvas support", () => {
  beforeEach(() => {
    vi.spyOn(HTMLElement.prototype, "clientWidth", "get").mockReturnValue(
      WIDTH,
    );
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

  it("mounts an accessible figure and resolves without a backend", async () => {
    const c = await mount(POINTS);
    expect(await c.ready).toBeNull();
    expect(c.getRenderer()).toBeNull();
    expect(stage().getAttribute("role")).toBe("figure");
    expect(stage().getAttribute("aria-roledescription")).toBe("3D chart");
    expect(stage().getAttribute("aria-label")).toBe("Cloud chart");
    expect(stage().tabIndex).toBe(0);
    const summary = document.getElementById(
      stage().getAttribute("aria-describedby")!,
    )!;
    expect(summary.textContent).toContain("Cloud (scatter): 3 points");
    expect(summary.textContent).toContain("X axis");
    c.destroy();
    expect(container.querySelector(".minerva-chart-3d")).toBeNull();
  });
});

describe("createChart3D with the Canvas2D backend", () => {
  beforeEach(() => {
    vi.spyOn(HTMLElement.prototype, "clientWidth", "get").mockReturnValue(
      WIDTH,
    );
    vi.spyOn(HTMLElement.prototype, "clientHeight", "get").mockReturnValue(
      HEIGHT,
    );
    vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockImplementation(
      function (this: HTMLCanvasElement, kind: string) {
        return kind === "2d" ? (fakeContext() as never) : null;
      } as never,
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

  it("falls back to Canvas2D and reports it", async () => {
    const renderers: string[] = [];
    chart = createChart3D(container, POINTS);
    chart.on("renderer", (kind) => renderers.push(kind));
    expect(await chart.ready).toBe("canvas2d");
    expect(renderers).toEqual(["canvas2d"]);
    expect(
      container.querySelector<HTMLElement>(".minerva-chart-3d")!.dataset
        .renderer,
    ).toBe("canvas2d");
    expect(container.querySelector("canvas.minerva-chart-data")).not.toBeNull();
  });

  it("hovers and clicks the point under the pointer", async () => {
    const c = await mount(POINTS);
    const hovers: (Chart3DHoverEvent | null)[] = [];
    const clicks: Chart3DHoverEvent[] = [];
    c.on("hover", (e) => hovers.push(e));
    c.on("click", (e) => clicks.push(e));
    // the middle point is the box center, drawn at the center of the fit area
    const { fit } = stageLayout(WIDTH, HEIGHT, false);
    const x = fit.x + fit.width / 2;
    const y = fit.y + fit.height / 2;
    pointer("pointermove", x + 2, y + 1);
    await nextFrame();
    expect(hovers[hovers.length - 1]).toMatchObject({
      seriesName: "Cloud",
      index: 1,
      x: 0,
      y: 0,
      z: 0,
    });
    const tooltip = container.querySelector<HTMLElement>(
      ".minerva-chart-tooltip",
    )!;
    expect(tooltip.style.display).toBe("block");
    expect(tooltip.textContent).toContain("Cloud");
    pointer("pointerdown", x, y);
    pointer("pointerup", x, y);
    expect(clicks).toHaveLength(1);
    pointer("pointermove", 3, 3);
    await nextFrame();
    expect(hovers[hovers.length - 1]).toBeNull();
    expect(tooltip.style.display).toBe("none");
  });

  it("rotates, zooms and resets the camera", async () => {
    const c = await mount(POINTS);
    const cameras: Chart3DCameraState[] = [];
    c.on("camera", (camera) => cameras.push(camera));
    const start = c.getCamera();
    expect(start).toMatchObject({ azimuth: 35, elevation: 24, zoom: 1 });

    stage().dispatchEvent(
      new KeyboardEvent("keydown", { key: "ArrowLeft", bubbles: true }),
    );
    expect(c.getCamera().azimuth).toBe(40);

    pointer("pointerdown", 100, 100);
    pointer("pointermove", 140, 120);
    pointer("pointerup", 140, 120);
    expect(c.getCamera().azimuth).toBeCloseTo(40 - 40 * 0.45);
    expect(c.getCamera().elevation).toBeCloseTo(24 + 20 * 0.45);

    // the wheel needs Ctrl / ⌘ by default: the page keeps scrolling
    const plain = new WheelEvent("wheel", { deltaY: -100, cancelable: true });
    stage().dispatchEvent(plain);
    expect(plain.defaultPrevented).toBe(false);
    expect(c.getCamera().zoom).toBe(1);
    const zoom = new WheelEvent("wheel", { deltaY: -100, cancelable: true });
    // happy-dom ignores the modifier keys of WheelEventInit
    Object.defineProperty(zoom, "ctrlKey", { value: true });
    stage().dispatchEvent(zoom);
    expect(zoom.defaultPrevented).toBe(true);
    expect(c.getCamera().zoom).toBeGreaterThan(1);

    c.resetCamera();
    expect(c.getCamera()).toMatchObject({
      azimuth: 35,
      elevation: 24,
      zoom: 1,
    });
    expect(cameras.length).toBeGreaterThanOrEqual(4);

    c.setCamera({ projection: "orthographic", elevation: 120 });
    expect(c.getCamera()).toMatchObject({
      projection: "orthographic",
      elevation: 89,
    });
  });

  it("ignores the pointer and the keyboard when static", async () => {
    const c = await mount({ ...POINTS, interaction: false });
    expect(stage().hasAttribute("tabindex")).toBe(false);
    stage().dispatchEvent(
      new KeyboardEvent("keydown", { key: "ArrowLeft", bubbles: true }),
    );
    pointer("pointerdown", 100, 100);
    pointer("pointermove", 200, 100);
    pointer("pointerup", 200, 100);
    expect(c.getCamera().azimuth).toBe(35);
  });

  it("shows a legend that toggles the series", async () => {
    const c = await mount({
      series: [
        { name: "A", data: [[0, 0, 0]] },
        {
          name: "B",
          type: "surface",
          data: { rows: 2, cols: 2, z: [0, 1, 2, 3] },
        },
      ],
    });
    const buttons = container.querySelectorAll<HTMLButtonElement>(
      ".minerva-chart-legend button",
    );
    expect([...buttons].map((b) => b.textContent)).toEqual(["A", "B"]);
    buttons[0]!.click();
    const after = container.querySelectorAll<HTMLButtonElement>(
      ".minerva-chart-legend button",
    );
    expect(after[0]!.getAttribute("aria-pressed")).toBe("false");
    const summary = document.getElementById(
      stage().getAttribute("aria-describedby")!,
    )!;
    expect(summary.textContent).toContain("A (scatter): 1 points, hidden");
    expect(summary.textContent).toContain("B (surface): 2 × 2 grid");
    c.setOptions({ series: [{ data: [[1, 2, 3]] }] });
    expect(
      container.querySelector<HTMLElement>(".minerva-chart-legend")!.style
        .display,
    ).toBe("none");
  });

  it("localizes the built-in texts and the numbers", async () => {
    const options: Chart3DOptions = {
      series: [
        {
          data: {
            x: [0, 2_000_000],
            y: [0, 1],
            z: [0, 1],
          },
        },
      ],
      locale: "zh-CN",
    };
    const c = await mount(options);
    expect(stage().getAttribute("aria-roledescription")).toBe("3D 图表");
    expect(stage().getAttribute("aria-label")).toBe("3D 图表");
    expect(summaryText()).toContain("共 1 个系列。");
    expect(summaryText()).toContain("系列 1（散点）：2 个点。");
    expect(summaryText()).toContain("X 轴：0 至 200万。");
    // labels override the built-in texts
    c.setOptions({ ...options, labels: { points: "{count} 颗星" } });
    expect(summaryText()).toContain("系列 1（散点）：2 颗星。");
    // without `locale` the texts follow the page language
    c.setOptions({ ...options, locale: undefined });
    expect(summaryText()).toContain("Series 1 (scatter): 2 points.");
    expect(summaryText()).toContain("X axis: 0 to 2M.");
    document.documentElement.lang = "fr";
    await new Promise((resolve) => setTimeout(resolve, 0));
    expect(stage().getAttribute("aria-roledescription")).toBe("Graphique 3D");
    expect(summaryText()).toContain("Série 1 (nuage de points) : 2 points.");
  });

  it("moves the camera when the camera option changes", async () => {
    const c = await mount(POINTS);
    c.setOptions({ ...POINTS, camera: { azimuth: 10, zoom: 2 } });
    expect(c.getCamera()).toMatchObject({ azimuth: 10, zoom: 2 });
    // the same camera again keeps the user's changes
    c.setCamera({ azimuth: 50 });
    c.setOptions({ ...POINTS, camera: { azimuth: 10, zoom: 2 } });
    expect(c.getCamera().azimuth).toBe(50);
  });
});
