import { act, createRef, type ReactElement } from "react";
import { fireEvent, render, screen } from "@testing-library/react-native";
import { Pressable, Text } from "react-native";
import { describe, expect, it, vi } from "vitest";
import { MinervaProvider } from "../../theme/MinervaProvider";
import { hostElements, queryPart, type Host } from "../../../test/queries";
import {
  BarChart,
  Chart,
  LineChart,
  QuadrantChart,
  ScatterChart,
  type ChartHandle,
} from "./index";
import { SHAPE_BUDGET, dashRuns } from "./scene";
import { measureChartText } from "./measure";

const W = 360;
const H = 240;
/** Page position of the chart (touches carry page coordinates) */
const PAGE = { x: 12, y: 30 };

async function mount(ui: ReactElement, theme: "light" | "dark" = "light") {
  const result = await render(
    <MinervaProvider theme={theme}>{ui}</MinervaProvider>,
  );
  await layout();
  return result;
}

/** Sizes the chart (no layout pass in the test renderer) */
async function layout(width = W, height = H) {
  await fireEvent(queryPart("root", "chart")!, "layout", {
    nativeEvent: { layout: { x: 0, y: 0, width, height } },
  });
}

/** Lets the scheduled frames run */
const flush = () =>
  act(() => new Promise<void>((resolve) => setTimeout(resolve, 40)));

const part = (name: string) => queryPart(name, "chart");
const viewsIn = (host: Host | null) =>
  host ? hostElements(host).length - 1 : 0;

interface P {
  id: number;
  x: number;
  y: number;
}

const touchOf = (p: P) => ({
  identifier: p.id,
  pageX: p.x + PAGE.x,
  pageY: p.y + PAGE.y,
  locationX: p.x,
  locationY: p.y,
});

/** A responder event: `active` fingers down, `changed` the finger of the event */
const touchEvent = (active: P[], changed: P) => ({
  nativeEvent: {
    ...touchOf(changed),
    touches: active.map(touchOf),
    changedTouches: [touchOf(changed)],
  },
  touchHistory: { numberActiveTouches: active.length },
});

const surface = () => part("surface")!.props;

async function down(p: P, others: P[] = []) {
  await act(async () => {
    const e = touchEvent([...others, p], p);
    if (others.length) surface().onResponderStart(e);
    else surface().onResponderGrant(e);
  });
}
async function move(active: P[]) {
  await act(async () =>
    surface().onResponderMove(touchEvent(active, active[0])),
  );
}
async function up(p: P, remaining: P[] = []) {
  await act(async () => {
    const e = touchEvent(remaining, p);
    surface().onResponderEnd(e);
    if (!remaining.length) surface().onResponderRelease(e);
  });
}
async function tap(x: number, y: number) {
  await down({ id: 1, x, y });
  await up({ id: 1, x, y });
}

const pixel = (ref: { current: ChartHandle | null }, x: number, y: number) => {
  const p = ref.current!.getController()!.toPixel(x, y)!;
  return { x: p.x, y: p.y };
};

const big = (n: number, f: (i: number) => number) =>
  Float64Array.from({ length: n }, (_, i) => f(i));

describe("charts: rendering", () => {
  it("draws axes, ticks, titles and the data once sized", async () => {
    await mount(
      <LineChart
        testID="chart"
        ariaLabel="Revenue"
        xAxis={{ title: "Month" }}
        yAxis={{ title: "Revenue" }}
        series={[{ name: "2025", data: [3, 5, 2, 8, 6] }]}
      />,
    );
    expect(screen.getByTestId("chart")).toBeTruthy();
    expect(part("surface")!.props.accessibilityRole).toBe("image");
    expect(part("surface")!.props.accessibilityLabel).toBe("Revenue");
    expect(screen.getByText("Month")).toBeTruthy();
    expect(screen.getAllByText("Revenue").length).toBeGreaterThan(0);
    expect(viewsIn(part("data"))).toBeGreaterThan(3);
    // the drawing never takes the touches
    const drawing = hostElements(part("surface")!).find(
      (el) => el.props.pointerEvents === "none",
    );
    expect(drawing).toBeTruthy();
  });

  it("renders nothing but the frame before the size is known", async () => {
    await render(
      <MinervaProvider theme="light">
        <LineChart series={[{ data: [1, 2, 3] }]} />
      </MinervaProvider>,
    );
    expect(part("data")).toBeNull();
    expect(part("root")!.props.style).toEqual(
      expect.arrayContaining([{ width: "100%", height: 320 }]),
    );
  });

  it("draws immediately with numeric width and height", async () => {
    await render(
      <MinervaProvider theme="light">
        <BarChart width={300} height={200} series={[{ data: [1, 2, 3] }]} />
      </MinervaProvider>,
    );
    expect(viewsIn(part("data"))).toBe(3);
  });

  it("keeps the number of views bounded with 50k-point lines", async () => {
    const n = 50_000;
    await mount(
      <LineChart
        series={[
          {
            data: {
              x: big(n, (i) => i),
              y: big(n, (i) => Math.sin(i / 300) * 100 + (i % 7)),
            },
          },
        ]}
      />,
    );
    const views = viewsIn(part("data"));
    expect(views).toBeGreaterThan(50);
    expect(views).toBeLessThanOrEqual(SHAPE_BUDGET.linePoints);
  });

  it("bounds areas, bars and scatter points", async () => {
    const n = 50_000;
    const y = big(n, (i) => Math.abs(Math.sin(i / 500)) * 50 + (i % 13));
    const { rerender } = await mount(
      <LineChart area series={[{ data: { x: big(n, (i) => i), y } }]} />,
    );
    expect(viewsIn(part("data"))).toBeLessThanOrEqual(
      SHAPE_BUDGET.areaColumns + SHAPE_BUDGET.linePoints,
    );

    await rerender(
      <MinervaProvider theme="light">
        <BarChart series={[{ data: { x: big(n, (i) => i), y } }]} />
      </MinervaProvider>,
    );
    await layout();
    const bars = viewsIn(part("data"));
    expect(bars).toBeGreaterThan(50);
    expect(bars).toBeLessThanOrEqual(SHAPE_BUDGET.bars);

    let seed = 7;
    const random = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
    await rerender(
      <MinervaProvider theme="light">
        <ScatterChart
          series={[
            {
              data: {
                x: big(n, () => random() * 100),
                y: big(n, () => random() * 100),
              },
            },
          ]}
        />
      </MinervaProvider>,
    );
    await layout();
    const dots = viewsIn(part("data"));
    expect(dots).toBeGreaterThan(50);
    expect(dots).toBeLessThanOrEqual(SHAPE_BUDGET.dotsPerSeries);
  });

  it("draws annotations: areas, dashed reference lines and texts", async () => {
    await mount(
      <Chart
        series={[{ type: "line", data: [1, 4, 2, 6] }]}
        annotations={[
          { type: "rect", y0: 4, y1: 6, label: "Target zone" },
          { type: "line", axis: "y", value: 3, dash: [4, 4], label: "Average" },
          { type: "text", x: 1, y: 2, text: "Dip" },
        ]}
      />,
    );
    expect(screen.getByText("Target zone")).toBeTruthy();
    expect(screen.getByText("Average")).toBeTruthy();
    expect(screen.getByText("Dip")).toBeTruthy();
    // one view per dash, within the dash budget
    const labels = viewsIn(part("labels"));
    expect(labels).toBeGreaterThan(10);
    expect(labels).toBeLessThan(SHAPE_BUDGET.dashes + 10);
  });

  it("re-renders on prop updates", async () => {
    const { rerender } = await mount(
      <BarChart series={[{ data: [1, 2, 3] }]} xAxis={{ title: "Before" }} />,
    );
    expect(viewsIn(part("data"))).toBe(3);
    await rerender(
      <MinervaProvider theme="light">
        <BarChart
          series={[{ data: [1, 2, 3, 4, 5] }]}
          xAxis={{ title: "After" }}
        />
      </MinervaProvider>,
    );
    expect(viewsIn(part("data"))).toBe(5);
    expect(screen.getByText("After")).toBeTruthy();
    expect(screen.queryByText("Before")).toBeNull();
  });

  it("follows the theme of the provider (light / dark)", async () => {
    const color = async (theme: "light" | "dark") => {
      const { unmount } = await mount(
        <LineChart series={[{ data: [1, 2] }]} xAxis={{ title: "Axis" }} />,
        theme,
      );
      const style = [screen.getByText("Axis").props.style].flat(3);
      const value = style.find((s) => s && "color" in s)?.color as string;
      await unmount();
      return value;
    };
    const light = await color("light");
    const dark = await color("dark");
    expect(light).not.toBe(dark);
    // dark mode text token (#f1f5f9)
    expect(dark).toMatch(/241, 245, 249/);
  });
});

describe("charts: gestures", () => {
  it("tap on a point: tooltip and onPointClick", async () => {
    const ref = createRef<ChartHandle>();
    const onPointClick = vi.fn();
    const onHover = vi.fn();
    await mount(
      <LineChart
        ref={ref}
        onPointClick={onPointClick}
        onHover={onHover}
        series={[{ name: "Sales", data: [3, 5, 2, 8] }]}
      />,
    );
    const p = pixel(ref, 2, 2);
    await tap(p.x, p.y);
    expect(onPointClick).toHaveBeenCalledTimes(1);
    expect(onPointClick.mock.calls[0][0].items[0]).toMatchObject({
      index: 2,
      y: 2,
    });
    expect(onHover).toHaveBeenCalled();
    expect(part("tooltip")).not.toBeNull();
    expect(screen.getByText("Sales")).toBeTruthy();
    // the touched point is highlighted
    expect(part("crosshair")).not.toBeNull();
  });

  it("uses page coordinates relative to the surface", async () => {
    const ref = createRef<ChartHandle>();
    const onPointClick = vi.fn();
    await mount(
      <ScatterChart
        ref={ref}
        onPointClick={onPointClick}
        series={[{ data: [[5, 5]] }]}
      />,
    );
    const p = pixel(ref, 5, 5);
    // locationX relative to a child must not matter: only page - origin
    await act(async () => {
      surface().onResponderGrant(
        touchEvent([{ id: 1, x: p.x, y: p.y }], { id: 1, x: p.x, y: p.y }),
      );
    });
    const lift = touchEvent([], { id: 1, x: p.x, y: p.y });
    lift.nativeEvent.locationX = 3;
    lift.nativeEvent.locationY = 4;
    await act(async () => surface().onResponderRelease(lift));
    expect(onPointClick).toHaveBeenCalledTimes(1);
  });

  it("pinch zooms (onZoom), the chart keeps the gesture, double tap resets", async () => {
    const ref = createRef<ChartHandle>();
    const onZoom = vi.fn();
    await mount(
      <LineChart
        ref={ref}
        onZoom={onZoom}
        series={[{ data: big(200, (i) => i % 17) }]}
      />,
    );
    const a = { id: 1, x: 150, y: 120 };
    const b = { id: 2, x: 190, y: 120 };
    await down(a);
    await down(b, [a]);
    await move([
      { ...a, x: 100 },
      { ...b, x: 240 },
    ]);
    expect(onZoom).toHaveBeenCalled();
    const [x0, x1] = onZoom.mock.calls.at(-1)![0].x;
    expect(x1 - x0).toBeLessThan(199);
    expect(surface().onResponderTerminationRequest()).toBe(false);
    await up({ ...b, x: 240 }, [{ ...a, x: 100 }]);
    await up({ ...a, x: 100 });
    // zoomed: still holds the touches (pan)
    expect(surface().onResponderTerminationRequest()).toBe(false);
    onZoom.mockClear();
    await tap(150, 120);
    await tap(150, 120);
    expect(onZoom).toHaveBeenCalled();
    const view = ref.current!.getView()!;
    expect(view.x[1] - view.x[0]).toBeCloseTo(199, 0);
    expect(surface().onResponderTerminationRequest()).toBe(true);
  });

  it("tapping a legend entry toggles its series", async () => {
    await mount(
      <Chart
        series={[
          { name: "A", type: "bar", data: [1, 2, 3] },
          { name: "B", type: "bar", data: [3, 2, 1] },
        ]}
      />,
    );
    expect(viewsIn(part("data"))).toBe(6);
    await tap(10, 10);
    await flush();
    expect(viewsIn(part("data"))).toBe(3);
    const items = hostElements().filter(
      (el) => el.props.dataSet?.part === "legend-item",
    );
    expect(items).toHaveLength(2);
    expect(items[0].props.dataSet.hidden).toBe("");
  });

  it("onPlotClick on the empty plot area", async () => {
    const onPlotClick = vi.fn();
    await mount(
      <ScatterChart
        onPlotClick={onPlotClick}
        series={[
          {
            data: [
              [1, 1],
              [9, 9],
            ],
          },
        ]}
      />,
    );
    await tap(W / 2, H / 2);
    expect(onPlotClick).toHaveBeenCalledTimes(1);
    expect(onPlotClick.mock.calls[0][0]).toEqual({
      x: expect.any(Number),
      y: expect.any(Number),
    });
  });

  it("cancels the gesture when the responder is taken", async () => {
    const onPointClick = vi.fn();
    const ref = createRef<ChartHandle>();
    await mount(
      <ScatterChart
        ref={ref}
        onPointClick={onPointClick}
        series={[{ data: [[5, 5]] }]}
      />,
    );
    const p = pixel(ref, 5, 5);
    await down({ id: 1, ...p });
    await act(async () => surface().onResponderTerminate());
    await act(async () =>
      surface().onResponderRelease(touchEvent([], { id: 1, ...p })),
    );
    expect(onPointClick).not.toHaveBeenCalled();
  });
});

describe("QuadrantChart", () => {
  const points = [
    { x: 2, y: 8, label: "Fix login" },
    { x: 8, y: 7, label: "Roadmap" },
  ];

  it("draws the quadrants, the labels and the axis texts", async () => {
    await mount(
      <QuadrantChart
        points={points}
        quadrants={{
          topLeft: { label: "Do first" },
          bottomRight: { label: "Drop" },
        }}
        axisLabels={{ top: "Important" }}
        showTicks={false}
      />,
    );
    expect(screen.getByText("Do first")).toBeTruthy();
    expect(screen.getByText("Drop")).toBeTruthy();
    expect(screen.getByText("Important")).toBeTruthy();
    expect(screen.getByText("Fix login")).toBeTruthy();
    expect(viewsIn(part("data"))).toBe(2);
  });

  it("tap: onPointClick with the point; empty area: onQuadrantClick", async () => {
    const ref = createRef<ChartHandle>();
    const onPointClick = vi.fn();
    const onQuadrantClick = vi.fn();
    await mount(
      <QuadrantChart
        ref={ref}
        points={points}
        onPointClick={onPointClick}
        onQuadrantClick={onQuadrantClick}
      />,
    );
    const p = pixel(ref, 8, 7);
    let claimed: unknown;
    await act(async () => {
      const start = { id: 1, ...p };
      claimed = surface().onResponderGrant(touchEvent([start], start));
    });
    // not draggable, not zoomed: scroll views may take the touch
    expect(claimed).toBe(false);
    await up({ id: 1, ...p });
    expect(onPointClick).toHaveBeenCalledWith(points[1], 1);
    await flush();
    const empty = pixel(ref, 2, 2);
    await tap(empty.x, empty.y);
    expect(onQuadrantClick).toHaveBeenCalledWith("bottomLeft", {
      x: expect.closeTo(2, 0),
      y: expect.closeTo(2, 0),
    });
  });

  it("drag and drop: onPointDrop with the target quadrant", async () => {
    const ref = createRef<ChartHandle>();
    const onPointDrop = vi.fn();
    await mount(
      <QuadrantChart ref={ref} points={points} onPointDrop={onPointDrop} />,
    );
    const from = pixel(ref, 2, 8);
    const to = pixel(ref, 8, 2);
    let claimed: unknown;
    await act(async () => {
      const start = { id: 1, ...from };
      claimed = surface().onResponderGrant(touchEvent([start], start));
    });
    // a draggable chart keeps the touches from the start (scroll views)
    expect(claimed).toBe(true);
    expect(surface().onResponderTerminationRequest()).toBe(false);
    await move([{ id: 1, x: from.x + 20, y: from.y + 20 }]);
    await flush();
    // the dragged point follows the finger
    expect(part("drag")).not.toBeNull();
    expect(surface().onResponderTerminationRequest()).toBe(false);
    await move([{ id: 1, ...to }]);
    await up({ id: 1, ...to });
    expect(onPointDrop).toHaveBeenCalledTimes(1);
    const [point, index, target] = onPointDrop.mock.calls[0];
    expect(point).toBe(points[0]);
    expect(index).toBe(0);
    expect(target.quadrant).toBe("bottomRight");
    expect(target.x).toBeCloseTo(8, 0);
    expect(target.y).toBeCloseTo(2, 0);
    expect(part("drag")).toBeNull();
  });

  it("reversed x axis: quadrants as seen on screen", async () => {
    const ref = createRef<ChartHandle>();
    const onQuadrantClick = vi.fn();
    await mount(
      <QuadrantChart
        ref={ref}
        reverseX
        points={[]}
        onQuadrantClick={onQuadrantClick}
      />,
    );
    const p = pixel(ref, 2, 8); // low x is on the right
    await tap(p.x, p.y);
    expect(onQuadrantClick).toHaveBeenCalledWith("topRight", expect.anything());
  });

  it("renderTooltip and quadrantContent render React content", async () => {
    const ref = createRef<ChartHandle>();
    const add = vi.fn();
    await mount(
      <QuadrantChart
        ref={ref}
        points={points}
        renderTooltip={(point, i) => <Text>{`#${i} ${point.label}`}</Text>}
        quadrantContent={{
          topRight: (
            <Pressable accessibilityRole="button" onPress={add}>
              <Text>Add</Text>
            </Pressable>
          ),
        }}
      />,
    );
    const corner = hostElements().find(
      (el) => el.props.dataSet?.corner === "topRight",
    );
    expect(corner?.props.pointerEvents).toBe("box-none");
    await fireEvent.press(screen.getByText("Add"));
    expect(add).toHaveBeenCalled();

    const p = pixel(ref, 8, 7);
    await tap(p.x, p.y);
    expect(screen.getByText("#1 Roadmap")).toBeTruthy();
    const tooltip = hostElements().find(
      (el) =>
        el.props.dataSet?.part === "tooltip" && el.props.dataSet?.custom === "",
    );
    expect(tooltip?.props.pointerEvents).toBe("none");
  });
});

describe("helpers", () => {
  it("estimates text widths (CJK wider, bold wider)", () => {
    const latin = measureChartText("Revenue", "400 12px system-ui");
    expect(latin).toBeGreaterThan(30);
    expect(latin).toBeLessThan(60);
    expect(measureChartText("收入", "400 12px system-ui")).toBe(24);
    expect(measureChartText("Revenue", "600 12px system-ui")).toBeGreaterThan(
      latin,
    );
  });

  it("splits dashed lines into a bounded number of runs", () => {
    expect(dashRuns(20, [])).toEqual([[0, 20]]);
    expect(dashRuns(20, [4, 4])).toEqual([
      [0, 4],
      [8, 4],
      [16, 4],
    ]);
    expect(dashRuns(100_000, [1, 1]).length).toBeLessThanOrEqual(
      SHAPE_BUDGET.dashes + 1,
    );
  });
});
