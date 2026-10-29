import { mount, flushPromises } from "@vue/test-utils";
import { defineComponent, h, nextTick } from "vue";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import Chart from "./Chart.vue";
import LineChart from "./LineChart.vue";
import BarChart from "./BarChart.vue";
import QuadrantChart from "./QuadrantChart.vue";
import ConfigProvider from "./ConfigProvider.vue";
import { chartThemeVariables } from "./chart-canvas";
import type { ChartHandle } from "./chart-types";

/** 2D context double recording the calls (like the engine tests) */
const fakeContext = () => {
  const calls: { name: string; args: unknown[] }[] = [];
  const state: Record<string, unknown> = {};
  const ctx = new Proxy(state, {
    get(target, key: string) {
      if (key in target) return target[key];
      if (key === "measureText")
        return (text: string) => ({ width: text.length * 6 });
      if (key === "createLinearGradient") return () => ({ addColorStop() {} });
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

// a large offset: touches mapped without it would miss the points
const RECT = { left: 60, top: 80, width: 400, height: 300 };
let frames: (() => void)[] = [];
let calls: { name: string; args: unknown[] }[] = [];
const flushFrames = () => {
  while (frames.length) frames.shift()!();
};
const raf = globalThis.requestAnimationFrame;
const caf = globalThis.cancelAnimationFrame;
const previousUni = uni;
const windowResize = { on: vi.fn(), off: vi.fn() };

beforeEach(() => {
  frames = [];
  const fake = fakeContext();
  calls = fake.calls;
  vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockImplementation(
    (() => fake.ctx) as unknown as HTMLCanvasElement["getContext"],
  );
  vi.spyOn(
    HTMLCanvasElement.prototype,
    "getBoundingClientRect",
  ).mockReturnValue({
    ...RECT,
    x: RECT.left,
    y: RECT.top,
    right: RECT.left + RECT.width,
    bottom: RECT.top + RECT.height,
    toJSON: () => ({}),
  } as DOMRect);
  globalThis.requestAnimationFrame = (cb: FrameRequestCallback) =>
    frames.push(() => cb(0));
  globalThis.cancelAnimationFrame = () => {};
  windowResize.on = vi.fn();
  windowResize.off = vi.fn();
  vi.stubGlobal("uni", {
    ...previousUni,
    getWindowInfo: () => ({ pixelRatio: 2 }),
    onWindowResize: windowResize.on,
    offWindowResize: windowResize.off,
  });
});

afterEach(() => {
  vi.restoreAllMocks();
  globalThis.requestAnimationFrame = raf;
  globalThis.cancelAnimationFrame = caf;
  vi.stubGlobal("uni", previousUni);
});

const handleOf = (wrapper: { vm: unknown }) =>
  wrapper.vm as unknown as ChartHandle;

/** Dispatches a touch event; `points` are canvas pixels */
const touch = async (
  target: Element,
  type: "touchstart" | "touchmove" | "touchend" | "touchcancel",
  points: { x: number; y: number }[],
  h5 = true,
) => {
  const list = points.map((p, identifier) =>
    h5
      ? { clientX: p.x + RECT.left, clientY: p.y + RECT.top, identifier }
      : { x: p.x, y: p.y, identifier },
  );
  const event = new Event(type, { bubbles: true });
  Object.defineProperty(event, "touches", {
    value: type === "touchend" || type === "touchcancel" ? [] : list,
  });
  Object.defineProperty(event, "changedTouches", { value: list });
  target.dispatchEvent(event);
  await nextTick();
};

const series = [{ name: "Sales", data: [1, 5, 3, 7] }];

describe("uni charts (H5 canvas)", () => {
  it("mounts on the inner canvas with the device pixel ratio", async () => {
    const wrapper = mount(LineChart, {
      props: { series, height: 240, ariaLabel: "Sales" },
    });
    await flushPromises();
    const host = wrapper.find("uni-canvas");
    expect(host.attributes("type")).toBe("2d");
    expect(host.attributes("canvas-id")).toMatch(/^mn-chart-/);
    expect(host.attributes("id")).toBe(host.attributes("canvas-id"));
    expect(host.attributes("data-hidpi")).toBe("false");
    expect(host.attributes("aria-label")).toBe("Sales");
    expect(wrapper.attributes("style")).toContain("height: 240px");
    const instance = handleOf(wrapper).getInstance();
    expect(instance).not.toBeNull();
    expect(handleOf(wrapper).getRenderer()).toBe("canvas2d");
    flushFrames();
    const canvas = wrapper.find("canvas.uni-canvas-canvas")
      .element as HTMLCanvasElement;
    expect(canvas.width).toBe(800);
    expect(canvas.height).toBe(600);
    expect(calls.some((c) => c.name === "fillText")).toBe(true);
    expect(windowResize.on).toHaveBeenCalled();
    wrapper.unmount();
  });

  it("sends prop updates to the engine", async () => {
    const wrapper = mount(BarChart, { props: { series } });
    await flushPromises();
    const instance = handleOf(wrapper).getInstance()!;
    const setOptions = vi.spyOn(instance, "setOptions");
    await wrapper.setProps({
      series: [...series, { name: "Costs", data: [2, 2, 2, 2] }],
      stacked: true,
    });
    expect(setOptions).toHaveBeenCalledTimes(1);
    const options = setOptions.mock.calls[0][0];
    expect(options.series).toHaveLength(2);
    expect(options.series.map((s) => [s.type, s.stack])).toEqual([
      ["bar", "stack"],
      ["bar", "stack"],
    ]);
    // data arrays are passed as is (the engine caches them by reference)
    expect(options.series[0].data).toBe(series[0].data);
    expect(instance.getController().getScene()!.model.series.length).toBe(2);
    await wrapper.setProps({ xAxis: { title: "Month" } });
    expect(setOptions).toHaveBeenCalledTimes(2);
    expect(setOptions.mock.calls[1][0].xAxis).toEqual({ title: "Month" });
    wrapper.unmount();
  });

  it("emits pointClick for a tap on a point", async () => {
    const wrapper = mount(Chart, {
      props: { series: [{ type: "line", data: [1, 5, 3, 7] }] },
    });
    await flushPromises();
    const p = handleOf(wrapper).getInstance()!.toPixel(1, 5)!;
    const host = wrapper.find("uni-canvas").element;
    await touch(host, "touchstart", [p]);
    await touch(host, "touchend", [p]);
    const clicks = wrapper.emitted("pointClick")!;
    expect(clicks).toHaveLength(1);
    expect(
      (clicks[0][0] as { items: { index: number }[] }).items[0].index,
    ).toBe(1);
    expect(wrapper.emitted("hover")).toBeTruthy();
    wrapper.unmount();
  });

  it("follows the provider theme (dark mode)", async () => {
    const wrapper = mount(ConfigProvider, {
      props: { mode: "dark" },
      slots: { default: () => h(LineChart, { series }) },
    });
    await flushPromises();
    const chart = wrapper.findComponent(LineChart);
    const instance = handleOf(chart).getInstance()!;
    const dark = instance.getController().getScene()!.theme.background;
    const setTheme = vi.spyOn(instance, "setTheme");
    await wrapper.setProps({ mode: "light" });
    expect(setTheme).toHaveBeenCalledWith({
      variables: chartThemeVariables({ mode: "light" }),
    });
    const light = instance.getController().getScene()!.theme.background;
    expect(light).not.toEqual(dark);
    wrapper.unmount();
  });

  it("maps QuadrantChart taps to points and quadrants", async () => {
    const points = [
      { x: 2, y: 2, label: "A" },
      { x: 8, y: 8, label: "B" },
    ];
    const onPointClick = vi.fn();
    const wrapper = mount(QuadrantChart, {
      props: { points, reverseX: true, onPointClick },
      slots: { topRight: () => h("span", { class: "add" }, "+") },
    });
    await flushPromises();
    const instance = handleOf(wrapper).getInstance()!;
    const host = wrapper.find("uni-canvas").element;
    const a = instance.toPixel(2, 2)!;
    await touch(host, "touchstart", [a]);
    await touch(host, "touchend", [a]);
    expect(onPointClick).toHaveBeenCalledWith(points[0], 0);
    const empty = instance.toPixel(8, 2)!;
    await touch(host, "touchstart", [empty]);
    await touch(host, "touchend", [empty]);
    const [quadrant, at] = wrapper.emitted("quadrantClick")![0] as [
      string,
      { x: number; y: number },
    ];
    // reversed axis: high x is on the left
    expect(quadrant).toBe("bottomLeft");
    expect(at.x).toBeCloseTo(8, 5);
    // slot overlay placed over the top-right quadrant
    const overlay = wrapper.find(".mn-chart-quadrant-topRight");
    expect(overlay.exists()).toBe(true);
    expect(overlay.find(".add").exists()).toBe(true);
    expect(overlay.attributes("style")).toContain("pointer-events: none");
    expect(wrapper.find(".mn-chart-quadrant-topLeft").exists()).toBe(false);
    wrapper.unmount();
  });

  it("emits pointDrop after dragging a QuadrantChart point", async () => {
    const points = [{ x: 2, y: 2, label: "A" }];
    const onPointDrop = vi.fn();
    const wrapper = mount(QuadrantChart, { props: { points, onPointDrop } });
    await flushPromises();
    const host = wrapper.find("uni-canvas");
    // draggable charts keep the page still while a finger moves
    expect(host.attributes("data-disable-scroll")).toBe("true");
    const instance = handleOf(wrapper).getInstance()!;
    const from = instance.toPixel(2, 2)!;
    const to = instance.toPixel(8, 8)!;
    const mid = { x: (from.x + to.x) / 2, y: (from.y + to.y) / 2 };
    await touch(host.element, "touchstart", [from]);
    await touch(host.element, "touchmove", [mid]);
    expect(instance.getController().getScene()!.dragging).not.toBeNull();
    await touch(host.element, "touchmove", [to]);
    await touch(host.element, "touchend", [to]);
    expect(onPointDrop).toHaveBeenCalledTimes(1);
    const [point, index, target] = onPointDrop.mock.calls[0];
    expect(point).toEqual(points[0]);
    expect(index).toBe(0);
    expect(target.quadrant).toBe("topRight");
    expect(target.x).toBeCloseTo(8, 5);
    expect(target.y).toBeCloseTo(8, 5);
    wrapper.unmount();
  });

  it("cleans up on unmount", async () => {
    const wrapper = mount(LineChart, { props: { series } });
    await flushPromises();
    const handle = handleOf(wrapper);
    const instance = handle.getInstance()!;
    const destroy = vi.spyOn(instance, "destroy");
    const canvas = wrapper.find("canvas.uni-canvas-canvas").element;
    const remove = vi.spyOn(canvas, "removeEventListener");
    instance.setView({ x: [1, 2] });
    wrapper.unmount();
    expect(destroy).toHaveBeenCalledTimes(1);
    expect(windowResize.off).toHaveBeenCalledWith(
      windowResize.on.mock.calls[0][0],
    );
    expect(remove).toHaveBeenCalledWith("pointerdown", expect.any(Function));
    expect(handle.getInstance()).toBeNull();
    calls.length = 0;
    flushFrames();
    expect(calls).toHaveLength(0);
  });
});

describe("uni charts (mini-program canvas node)", () => {
  // Mini-program <canvas>: no inner HTMLCanvasElement, the node comes from
  // SelectorQuery.fields({ node: true, size: true })
  const NodeCanvas = defineComponent({
    inheritAttrs: false,
    setup(_, { attrs }) {
      return () => h("div", { ...attrs, "data-uni": "canvas" });
    },
  });

  it("creates the chart from the SelectorQuery node and forwards touches", async () => {
    const { ctx } = fakeContext();
    const nodeFrames: (() => void)[] = [];
    const node = {
      width: 0,
      height: 0,
      getContext: () => ctx,
      requestAnimationFrame: (cb: () => void) => nodeFrames.push(cb),
      cancelAnimationFrame: () => {},
    };
    const selectors: string[] = [];
    let attempts = 0;
    const query = {
      in: () => query,
      select: (selector: string) => {
        selectors.push(selector);
        return query;
      },
      fields: () => query,
      exec: (done: (result: unknown[]) => void) => {
        attempts += 1;
        // the node is missing on the first query (retried)
        done([
          attempts === 1
            ? null
            : { node, width: 320, height: 200, left: 0, top: 0 },
        ]);
      },
    };
    vi.stubGlobal("uni", {
      ...uni,
      createSelectorQuery: () => query,
    });
    const wrapper = mount(LineChart, {
      props: { series },
      global: { components: { UniCanvasHost: NodeCanvas } },
    });
    await flushPromises();
    await new Promise((resolve) => setTimeout(resolve, 80));
    const handle = handleOf(wrapper);
    expect(handle.getInstance()).not.toBeNull();
    const id = wrapper.find("[data-uni=canvas]").attributes("canvas-id");
    expect(selectors[0]).toBe(`#${id}`);
    while (nodeFrames.length) nodeFrames.shift()!();
    expect(node.width).toBe(640);
    expect(node.height).toBe(400);

    const p = handle.getInstance()!.toPixel(3, 7)!;
    const target = wrapper.find("[data-uni=canvas]").element;
    await touch(target, "touchstart", [p], false);
    await touch(target, "touchend", [p], false);
    const clicks = wrapper.emitted("pointClick")!;
    expect(clicks).toHaveLength(1);
    expect(
      (clicks[0][0] as { items: { index: number }[] }).items[0].index,
    ).toBe(3);
    wrapper.unmount();
    expect(handle.getInstance()).toBeNull();
    expect(windowResize.off).toHaveBeenCalled();
  });
});
