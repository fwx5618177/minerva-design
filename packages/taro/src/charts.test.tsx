import { act, render, waitFor } from "@testing-library/react";
import Taro from "@tarojs/taro";
import { createRef } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import {
  BarChart,
  Chart,
  ConfigProvider,
  LineChart,
  QuadrantChart,
  ScatterChart,
  type ChartHandle,
} from "./index";

/** 2D context double recording the calls (mini-program canvases have the same API) */
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

/** Node of a mini-program `<canvas type="2d">` */
const fakeNode = () => {
  const { ctx, calls } = fakeContext();
  const frames: (() => void)[] = [];
  const node = {
    width: 300,
    height: 150,
    getContext: vi.fn(() => ctx),
    requestAnimationFrame: vi.fn((cb: () => void) => frames.push(cb)),
    cancelAnimationFrame: vi.fn(),
  };
  const flush = () => {
    while (frames.length) frames.shift()!();
  };
  return { node, calls, flush };
};

type Size = { width: number; height: number; left: number; top: number };

/** SelectorQuery double answering `fields({ node, size, rect })` */
const mockQuery = (
  node: unknown,
  size: Size = { width: 400, height: 300, left: 10, top: 20 },
) => {
  const selectors: string[] = [];
  const scopes: unknown[] = [];
  const query = {
    in: vi.fn((scope: unknown) => {
      scopes.push(scope);
      return query;
    }),
    select: vi.fn((selector: string) => {
      selectors.push(selector);
      return query;
    }),
    fields: vi.fn(() => query),
    exec: vi.fn((callback: (res: unknown[]) => void) =>
      callback([{ node, ...size }]),
    ),
  };
  vi.spyOn(Taro, "createSelectorQuery").mockImplementation(
    () => query as unknown as ReturnType<typeof Taro.createSelectorQuery>,
  );
  return { query, selectors, scopes, size };
};

const host = (container: HTMLElement) =>
  container.querySelector("taro-canvas-core") as HTMLElement;

const dispatch = (el: Element, type: string, init: object) =>
  act(() => {
    el.dispatchEvent(Object.assign(new Event(type, { bubbles: true }), init));
  });

const tap = (el: Element, x: number, y: number, identifier = 0) => {
  dispatch(el, "touchstart", {
    touches: [{ x, y, identifier }],
    changedTouches: [{ x, y, identifier }],
  });
  dispatch(el, "touchend", {
    touches: [],
    changedTouches: [{ x, y, identifier }],
  });
};

const ready = async (ref: { current: ChartHandle | null }) => {
  await waitFor(() => expect(ref.current?.getInstance()).toBeTruthy());
  return ref.current!.getInstance()!;
};

const texts = (calls: { name: string; args: unknown[] }[]) =>
  calls.filter((c) => c.name === "fillText").map((c) => c.args[0]);

afterEach(() => {
  vi.restoreAllMocks();
});

describe("charts", () => {
  it("draws on the canvas node found by the selector query", async () => {
    const { node, calls, flush } = fakeNode();
    const { selectors, query } = mockQuery(node);
    const ref = createRef<ChartHandle>();
    const { container } = render(
      <LineChart
        ref={ref}
        id="sales"
        height={240}
        ariaLabel="Sales"
        series={[{ name: "Sales", data: [1, 4, 2, 8] }]}
        xAxis={{ title: "Month" }}
      />,
    );
    const root = container.firstElementChild as HTMLElement;
    expect(root).toHaveAttribute("data-minerva", "chart");
    expect(root).toHaveAttribute("role", "img");
    expect(root).toHaveAttribute("aria-label", "Sales");
    expect(root).toHaveStyle({ height: "240px", width: "100%" });
    expect(host(container)).toHaveAttribute("id", "sales");

    await ready(ref);
    expect(selectors).toEqual(["#sales"]);
    expect(query.fields).toHaveBeenCalledWith({
      node: true,
      size: true,
      rect: true,
    });
    flush();
    // CSS size x pixel ratio (2 in the Taro mock)
    expect(node.width).toBe(800);
    expect(node.height).toBe(600);
    expect(node.requestAnimationFrame).toHaveBeenCalled();
    expect(calls.some((c) => c.name === "stroke")).toBe(true);
    expect(texts(calls)).toContain("Month");
  });

  it("generates a canvas id and scopes the query to custom components", async () => {
    const { node } = fakeNode();
    const { selectors, scopes } = mockQuery(node);
    const scope = { is: "custom-wrapper" };
    const ref = createRef<ChartHandle>();
    const { container } = render(
      <div ref={(el) => el && Object.assign(el, { ctx: scope })}>
        <BarChart ref={ref} series={[{ data: [3, 5] }]} />
      </div>,
    );
    await ready(ref);
    const id = host(container).getAttribute("id")!;
    expect(id).toMatch(/^mn-chart-[a-zA-Z0-9_-]+$/);
    expect(selectors).toEqual([`#${id}`]);
    expect(scopes).toEqual([scope]);
  });

  it("updates the options and the theme without recreating the chart", async () => {
    const { node, calls, flush } = fakeNode();
    mockQuery(node);
    const ref = createRef<ChartHandle>();
    const series = [{ name: "A", data: [1, 2] }];
    const view = (props: {
      title: string;
      dark?: boolean;
      stacked?: boolean;
    }) => (
      <ConfigProvider theme={props.dark ? "dark" : "light"}>
        <BarChart
          ref={ref}
          stacked={props.stacked}
          series={series}
          yAxis={{ title: props.title }}
        />
      </ConfigProvider>
    );
    const { rerender } = render(view({ title: "Before" }));
    const instance = await ready(ref);
    const setOptions = vi.spyOn(instance, "setOptions");
    const setTheme = vi.spyOn(instance, "setTheme");
    flush();
    expect(texts(calls)).toContain("Before");

    // same props (new inline axis object): nothing to do
    rerender(view({ title: "Before" }));
    expect(setOptions).not.toHaveBeenCalled();

    calls.length = 0;
    rerender(view({ title: "After", stacked: true }));
    expect(ref.current!.getInstance()).toBe(instance);
    expect(setOptions).toHaveBeenCalledTimes(1);
    expect(setOptions.mock.calls[0][0].series[0]).toMatchObject({
      type: "bar",
      stack: "stack",
    });
    flush();
    expect(texts(calls)).toContain("After");
    expect(texts(calls)).not.toContain("Before");

    expect(setTheme).not.toHaveBeenCalled();
    rerender(view({ title: "After", stacked: true, dark: true }));
    expect(setTheme).toHaveBeenCalledTimes(1);
    const variables = setTheme.mock.calls[0][0]!.variables!;
    expect(variables["--surface-color"]).toBeTruthy();
    expect(variables["--text-color"]).toBeTruthy();
    expect(ref.current!.getInstance()).toBe(instance);
  });

  it("reports taps on points and on the empty plot (mini-program touches)", async () => {
    const { node } = fakeNode();
    mockQuery(node);
    const ref = createRef<ChartHandle>();
    const onPointClick = vi.fn();
    const onPlotClick = vi.fn();
    const onHover = vi.fn();
    const { container } = render(
      <ScatterChart
        ref={ref}
        series={[{ name: "S", data: { x: [1, 5, 9], y: [1, 5, 9] } }]}
        xAxis={{ min: 0, max: 10 }}
        yAxis={{ min: 0, max: 10 }}
        onPointClick={onPointClick}
        onPlotClick={onPlotClick}
        onHover={onHover}
      />,
    );
    const instance = await ready(ref);
    const p = instance.toPixel(5, 5)!;
    tap(host(container), p.x, p.y);
    expect(onPointClick).toHaveBeenCalledTimes(1);
    expect(onPointClick.mock.calls[0][0].items[0]).toMatchObject({ index: 1 });
    expect(onHover).toHaveBeenCalled();

    const empty = instance.toPixel(3, 8)!;
    tap(host(container), empty.x, empty.y);
    expect(onPlotClick).toHaveBeenCalledTimes(1);
    expect(onPlotClick.mock.calls[0][0].x).toBeCloseTo(3, 5);
    expect(onPlotClick.mock.calls[0][0].y).toBeCloseTo(8, 5);
  });

  it("converts H5 client coordinates relative to the canvas", async () => {
    const { node } = fakeNode();
    mockQuery(node);
    const ref = createRef<ChartHandle>();
    const onPointClick = vi.fn();
    const { container } = render(
      <Chart
        ref={ref}
        series={[{ type: "scatter", data: { x: [2, 8], y: [2, 8] } }]}
        xAxis={{ min: 0, max: 10 }}
        yAxis={{ min: 0, max: 10 }}
        onPointClick={onPointClick}
      />,
    );
    const instance = await ready(ref);
    const el = host(container);
    vi.spyOn(el, "getBoundingClientRect").mockReturnValue({
      left: 30,
      top: 50,
      width: 400,
      height: 300,
    } as DOMRect);
    const p = instance.toPixel(8, 8)!;
    const touch = { clientX: p.x + 30, clientY: p.y + 50, identifier: 4 };
    dispatch(el, "touchstart", { touches: [touch], changedTouches: [touch] });
    dispatch(el, "touchend", { touches: [], changedTouches: [touch] });
    expect(onPointClick).toHaveBeenCalledTimes(1);
    expect(onPointClick.mock.calls[0][0].items[0]).toMatchObject({ index: 1 });

    // desktop mouse (H5): a click right after a touch is the emulated one
    dispatch(el, "mousedown", { clientX: p.x + 30, clientY: p.y + 50 });
    dispatch(el, "mouseup", { clientX: p.x + 30, clientY: p.y + 50 });
    expect(onPointClick).toHaveBeenCalledTimes(1);
  });

  it("maps QuadrantChart taps and drops to points and quadrants", async () => {
    const { node } = fakeNode();
    mockQuery(node);
    const ref = createRef<ChartHandle>();
    const points = [
      { x: 2, y: 8, label: "Write report" },
      { x: 7, y: 3, label: "Emails" },
    ];
    const onPointClick = vi.fn();
    const onQuadrantClick = vi.fn();
    const onPointDrop = vi.fn();
    const { container } = render(
      <QuadrantChart
        ref={ref}
        points={points}
        quadrants={{ topLeft: { label: "Do first" } }}
        onPointClick={onPointClick}
        onQuadrantClick={onQuadrantClick}
        onPointDrop={onPointDrop}
      />,
    );
    const instance = await ready(ref);
    const el = host(container);
    // draggable by default with onPointDrop: the page does not scroll
    expect(el).toHaveStyle({ touchAction: "none" });

    const first = instance.toPixel(2, 8)!;
    tap(el, first.x, first.y);
    expect(onPointClick).toHaveBeenCalledWith(points[0], 0);

    const empty = instance.toPixel(8, 8)!;
    tap(el, empty.x, empty.y, 1);
    expect(onQuadrantClick).toHaveBeenCalledTimes(1);
    expect(onQuadrantClick.mock.calls[0][0]).toBe("topRight");

    // drag "Emails" from the bottom right to the top left quadrant
    const from = instance.toPixel(7, 3)!;
    const to = instance.toPixel(2, 9)!;
    const at = (x: number, y: number) => [{ x, y, identifier: 2 }];
    dispatch(el, "touchstart", {
      touches: at(from.x, from.y),
      changedTouches: at(from.x, from.y),
    });
    dispatch(el, "touchmove", {
      touches: at((from.x + to.x) / 2, (from.y + to.y) / 2),
      changedTouches: at((from.x + to.x) / 2, (from.y + to.y) / 2),
    });
    dispatch(el, "touchmove", {
      touches: at(to.x, to.y),
      changedTouches: at(to.x, to.y),
    });
    dispatch(el, "touchend", { touches: [], changedTouches: at(to.x, to.y) });
    expect(onPointDrop).toHaveBeenCalledTimes(1);
    const [point, index, target] = onPointDrop.mock.calls[0];
    expect(point).toBe(points[1]);
    expect(index).toBe(1);
    expect(target.quadrant).toBe("topLeft");
    expect(target.x).toBeCloseTo(2, 5);
    expect(target.y).toBeCloseTo(9, 5);
  });

  it("re-measures on resize and cleans up on unmount", async () => {
    const { node } = fakeNode();
    const { size } = mockQuery(node);
    const ref = createRef<ChartHandle>();
    const onWindowResize = vi.spyOn(Taro, "onWindowResize");
    const offWindowResize = vi.spyOn(Taro, "offWindowResize");
    const { unmount } = render(
      <LineChart ref={ref} series={[{ data: [1, 2, 3] }]} />,
    );
    const instance = await ready(ref);
    const resize = vi.spyOn(instance, "resize");
    const destroy = vi.spyOn(instance, "destroy");

    size.width = 200;
    size.height = 100;
    act(() => (onWindowResize.mock.calls[0][0] as () => void)());
    expect(resize).toHaveBeenCalledWith(200, 100, 2);

    ref.current!.setView({ x: [0, 1] });
    expect(ref.current!.getView()!.x).toEqual([0, 1]);
    ref.current!.resetZoom();
    expect(ref.current!.getView()!.x).toEqual([0, 2]);

    unmount();
    expect(destroy).toHaveBeenCalledTimes(1);
    expect(offWindowResize).toHaveBeenCalledWith(
      onWindowResize.mock.calls[0][0],
    );
  });

  it("keeps retrying while the canvas has no size", async () => {
    vi.useFakeTimers({ toFake: ["setTimeout", "clearTimeout"] });
    try {
      const { node } = fakeNode();
      const { size, query } = mockQuery(node, {
        width: 0,
        height: 0,
        left: 0,
        top: 0,
      });
      const ref = createRef<ChartHandle>();
      const { unmount } = render(
        <LineChart ref={ref} series={[{ data: [1, 2] }]} />,
      );
      await act(async () => {
        await vi.advanceTimersByTimeAsync(250);
      });
      expect(query.exec.mock.calls.length).toBeGreaterThan(1);
      expect(ref.current!.getInstance()).toBeNull();
      size.width = 320;
      size.height = 200;
      await act(async () => {
        await vi.advanceTimersByTimeAsync(100);
      });
      expect(ref.current!.getInstance()).not.toBeNull();
      unmount();
      const calls = query.exec.mock.calls.length;
      await act(async () => {
        await vi.advanceTimersByTimeAsync(1000);
      });
      expect(query.exec.mock.calls.length).toBe(calls);
    } finally {
      vi.useRealTimers();
    }
  });
});
