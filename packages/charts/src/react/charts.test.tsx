import { act, render } from "@testing-library/react";
import { createRef, type ReactElement, type Ref } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  BarChart,
  BoxPlotChart,
  BubbleChart,
  Chart,
  GanttChart,
  HeatmapChart,
  HistogramChart,
  HorizontalBarChart,
  LineChart,
  MixedChart,
  QuadrantChart,
  RangeAreaChart,
  ScatterChart,
  WaterfallChart,
} from "../index";
import type { ChartHandle } from "./types";

const flush = () =>
  act(
    () =>
      new Promise<void>((resolve) =>
        requestAnimationFrame(() => setTimeout(resolve, 0)),
      ),
  );

beforeEach(() => {
  vi.spyOn(HTMLElement.prototype, "clientWidth", "get").mockReturnValue(500);
  vi.spyOn(HTMLElement.prototype, "clientHeight", "get").mockReturnValue(300);
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe("chart components", () => {
  it("renders a sized container and exposes a handle", async () => {
    const ref = createRef<ChartHandle>();
    const { container, unmount } = render(
      <Chart
        ref={ref}
        height={240}
        series={[{ data: [1, 2, 3] }]}
        ariaLabel="Demo"
      />,
    );
    const root = container.firstElementChild as HTMLElement;
    expect(root.style.height).toBe("240px");
    expect(root.style.width).toBe("100%");
    expect(container.querySelector('[aria-label="Demo"]')).not.toBeNull();
    await flush();
    expect(ref.current?.getView()?.x).toEqual([0, 2]);
    expect(ref.current?.getInstance()).not.toBeNull();
    unmount();
    expect(container.querySelector(".minerva-chart")).toBeNull();
  });

  it("applies new props without remounting", async () => {
    const { container, rerender } = render(
      <LineChart series={[{ name: "A", data: [1, 2] }]} />,
    );
    const root = container.querySelector(".minerva-chart");
    rerender(
      <LineChart
        area
        series={[
          { name: "A", data: [1, 2] },
          { name: "B", data: [2, 1] },
        ]}
      />,
    );
    await flush();
    expect(container.querySelector(".minerva-chart")).toBe(root);
    expect(
      container.querySelectorAll(".minerva-chart-legend button"),
    ).toHaveLength(2);
  });

  it("forwards hover events", async () => {
    const onHover = vi.fn();
    const { container } = render(
      <BarChart
        stacked
        onHover={onHover}
        series={[
          {
            data: [
              ["a", 1],
              ["b", 2],
            ],
          },
        ]}
      />,
    );
    await flush();
    const stage = container.querySelector(".minerva-chart-stage")!;
    stage.dispatchEvent(
      new PointerEvent("pointermove", { clientX: 400, clientY: 150 }),
    );
    expect(onHover).toHaveBeenCalled();
    expect(onHover.mock.calls[0][0].xLabel).toBe("b");
  });

  it("maps quadrant clicks to the points", async () => {
    const onPointClick = vi.fn();
    const points = [
      { x: 2, y: 8, label: "Write report" },
      { x: 8, y: 2, label: "Inbox" },
    ];
    const { container } = render(
      <QuadrantChart
        points={points}
        onPointClick={onPointClick}
        quadrants={{ topLeft: { label: "Do first" } }}
      />,
    );
    await flush();
    const handle = container.querySelector(".minerva-chart-stage")!;
    // probe the plot to find the first point
    let hit = false;
    for (let x = 0; x < 500 && !hit; x += 2) {
      for (let y = 0; y < 300 && !hit; y += 2) {
        handle.dispatchEvent(
          new PointerEvent("pointerdown", {
            clientX: x,
            clientY: y,
            button: 0,
            pointerId: 1,
          }),
        );
        handle.dispatchEvent(
          new PointerEvent("pointerup", {
            clientX: x,
            clientY: y,
            button: 0,
            pointerId: 1,
          }),
        );
        hit = onPointClick.mock.calls.length > 0;
      }
    }
    expect(hit).toBe(true);
    expect(points).toContain(onPointClick.mock.calls[0][0]);
  });

  it("drags quadrant points, reports quadrant clicks and renders overlays", async () => {
    const onPointDrop = vi.fn();
    const onQuadrantClick = vi.fn();
    const ref = createRef<ChartHandle>();
    const points = [{ x: 2, y: 8, label: "Write report" }];
    const { container, getByText } = render(
      <QuadrantChart
        ref={ref}
        points={points}
        reverseX
        showTicks={false}
        onPointDrop={onPointDrop}
        onQuadrantClick={onQuadrantClick}
        quadrantContent={{ topLeft: <button type="button">add</button> }}
        renderTooltip={(point) => <strong>{point.label}</strong>}
      />,
    );
    await flush();
    expect(getByText("add")).toBeTruthy();
    const chart = ref.current!.getInstance()!;
    const stage = container.querySelector(".minerva-chart-stage")!;
    const fire = (type: string, at: { x: number; y: number }) =>
      stage.dispatchEvent(
        new PointerEvent(type, {
          clientX: at.x,
          clientY: at.y,
          button: 0,
          pointerId: 1,
        }),
      );
    const from = chart.toPixel(2, 8)!;
    const to = chart.toPixel(8, 2)!;
    fire("pointermove", from);
    expect(
      container.querySelector(".minerva-chart-tooltip strong")?.textContent,
    ).toBe("Write report");
    fire("pointerdown", from);
    fire("pointermove", { x: from.x + 20, y: from.y + 20 });
    fire("pointermove", to);
    fire("pointerup", to);
    expect(onPointDrop).toHaveBeenCalledTimes(1);
    expect(onPointDrop.mock.calls[0][2].quadrant).toBe("bottomLeft");
    fire("pointerdown", to);
    fire("pointerup", to);
    expect(onQuadrantClick.mock.calls[0][0]).toBe("bottomLeft");
  });

  it("renders scatter charts", () => {
    const { container } = render(
      <ScatterChart series={[{ data: [[1, 2]] }]} />,
    );
    expect(container.querySelector(".minerva-chart-stage")).not.toBeNull();
  });

  it("skips the engine update when a re-render passes equal options", async () => {
    const ref = createRef<ChartHandle>();
    const data = [1, 3, 2];
    const view = (props: { name: string; tooltip?: boolean }) => (
      <LineChart
        ref={ref}
        // inline objects, as users write them
        series={[{ name: props.name, data }]}
        xAxis={{ title: "Day" }}
        palette={["#ff0000"]}
        renderTooltip={
          props.tooltip ? (e) => <em>{e.items[0].y}</em> : undefined
        }
      />
    );
    const { container, rerender } = render(view({ name: "A" }));
    await flush();
    const chart = ref.current!.getInstance()!;
    const setOptions = vi.spyOn(chart, "setOptions");
    rerender(view({ name: "A" }));
    rerender(view({ name: "A" }));
    await flush();
    expect(setOptions).not.toHaveBeenCalled();

    rerender(view({ name: "B" }));
    await flush();
    expect(setOptions).toHaveBeenCalledTimes(1);
    expect(setOptions.mock.calls[0][0].series[0].name).toBe("B");

    // a React tooltip installs a render callback once, not on every render
    rerender(view({ name: "B", tooltip: true }));
    rerender(view({ name: "B", tooltip: true }));
    await flush();
    expect(setOptions).toHaveBeenCalledTimes(2);
    const tooltip = setOptions.mock.calls[1][0].tooltip;
    expect(typeof tooltip === "object" && tooltip.render).toBeTypeOf(
      "function",
    );
    const stage = container.querySelector(".minerva-chart-stage")!;
    stage.dispatchEvent(
      new PointerEvent("pointermove", { clientX: 250, clientY: 150 }),
    );
    expect(container.querySelector(".minerva-chart-tooltip em")).not.toBeNull();
  });
});

describe("cartesian chart components", () => {
  const optionsOf = async (ui: (ref: Ref<ChartHandle>) => ReactElement) => {
    const ref = createRef<ChartHandle>();
    const { unmount, container } = render(ui(ref));
    await flush();
    const instance = ref.current!.getInstance()!;
    const setOptions = vi.spyOn(instance, "setOptions");
    return { ref, instance, setOptions, unmount, container };
  };

  it("HorizontalBarChart: horizontal orientation, value labels", async () => {
    const { ref, container } = await optionsOf((r) => (
      <HorizontalBarChart
        ref={r}
        labels
        series={[
          {
            data: [
              ["a", 3],
              ["b", 5],
            ],
          },
        ]}
      />
    ));
    // categories on the x axis: the plot is taller than its share of rows
    expect(ref.current!.getView()?.x).toEqual([-0.5, 1.5]);
    const stage = container.querySelector(".minerva-chart-stage")!;
    expect(stage).not.toBeNull();
  });

  it("RangeAreaChart, MixedChart, BubbleChart mount with their options", async () => {
    const range = await optionsOf((r) => (
      <RangeAreaChart
        ref={r}
        series={[
          {
            data: [
              { x: 0, y0: 1, y: 3 },
              { x: 1, y0: 2, y: 5 },
            ],
          },
        ]}
      />
    ));
    expect(range.ref.current!.getView()?.y[0]).toBeLessThanOrEqual(1);
    range.unmount();

    const mixed = await optionsOf((r) => (
      <MixedChart
        ref={r}
        yAxis2={{ title: "Rate" }}
        series={[
          {
            type: "bar",
            data: [
              ["a", 100],
              ["b", 200],
            ],
          },
          {
            type: "line",
            yAxis: "right",
            data: [
              ["a", 0.1],
              ["b", 0.3],
            ],
          },
        ]}
      />
    ));
    // the left axis keeps the bars' range, the line is mapped onto it
    expect(mixed.ref.current!.getView()?.y).toEqual([0, 200]);
    mixed.unmount();

    const bubbles = await optionsOf((r) => (
      <BubbleChart
        ref={r}
        maxSize={40}
        series={[
          {
            data: [
              { x: 1, y: 1, value: 4 },
              { x: 2, y: 2, value: 1 },
            ],
          },
        ]}
      />
    ));
    expect(bubbles.ref.current!.getInstance()).not.toBeNull();
    bubbles.unmount();
  });

  it("HistogramChart bins raw values", async () => {
    const values = Float64Array.from({ length: 1000 }, (_, i) => i % 50);
    const { ref } = await optionsOf((r) => (
      <HistogramChart ref={r} values={values} bins={5} domain={[0, 50]} />
    ));
    expect(ref.current!.getView()?.x).toEqual([0, 50]);
    expect(ref.current!.getView()?.y[1]).toBeGreaterThanOrEqual(200);
  });

  it("BoxPlotChart computes boxes from raw groups", async () => {
    const { ref } = await optionsOf((r) => (
      <BoxPlotChart
        ref={r}
        groups={[
          { x: "a", values: [1, 2, 3, 4, 100] },
          { x: "b", values: [2, 3, 4] },
        ]}
      />
    ));
    // the outlier is in the range
    expect(ref.current!.getView()?.y[1]).toBeGreaterThanOrEqual(100);
  });

  it("BoxPlotChart outlier style, HeatmapChart color legend", async () => {
    const box = await optionsOf((r) => (
      <BoxPlotChart
        ref={r}
        locale="en"
        outlierShape="filled"
        outlierSize={10}
        groups={[{ x: "a", values: [1, 2, 3, 4, 100] }]}
        series={[{ type: "line", name: "Target", data: [["a", 3]] }]}
      />
    ));
    // hovering the outlier shows its value
    const p = box.instance.toPixel(0, 100)!;
    box.container.querySelector(".minerva-chart-stage")!.dispatchEvent(
      new PointerEvent("pointermove", {
        clientX: p.x,
        clientY: p.y,
        bubbles: true,
        pointerId: 1,
      }),
    );
    expect(
      box.container.querySelector(".minerva-chart-tooltip")?.textContent,
    ).toContain("Outlier");
    box.unmount();

    const heat = await optionsOf((r) => (
      <HeatmapChart
        ref={r}
        colorScale="diverging"
        colorMidpoint={0}
        data={[
          { x: "a", y: "r", value: -1 },
          { x: "b", y: "r", value: 1 },
        ]}
      />
    ));
    const legend = heat.container.querySelector(".minerva-chart-legend");
    expect(legend?.innerHTML).toContain("linear-gradient");
    expect(legend?.textContent).toContain("-1");
    heat.unmount();
  });

  it("WaterfallChart and GanttChart", async () => {
    const waterfall = await optionsOf((r) => (
      <WaterfallChart
        ref={r}
        connector={{ dash: [2, 2] }}
        steps={[
          { label: "Start", value: 100 },
          { label: "Costs", value: -30 },
          { label: "End", kind: "total" },
        ]}
      />
    ));
    // room above the highest bar for its label
    expect(waterfall.ref.current!.getView()?.y).toEqual([0, 120]);
    waterfall.unmount();

    const gantt = await optionsOf((r) => (
      <GanttChart
        ref={r}
        today={50}
        dependenciesName="After"
        tasks={[
          { name: "Design", start: 0, end: 40, progress: 0.5 },
          { name: "Build", start: 40, end: 100, dependencies: ["Design"] },
        ]}
      />
    ));
    const view = gantt.ref.current!.getView()!;
    // a small margin around the tasks on the time axis
    expect(view.y[0]).toBeLessThan(0);
    expect(view.y[1]).toBeGreaterThan(100);
    expect(view.x).toEqual([-0.5, 1.5]);
  });

  it("writes the texts of the locale and follows the page language", async () => {
    const lang = document.documentElement.lang;
    document.documentElement.lang = "fr";
    const { container, unmount } = render(
      <Chart series={[{ data: [1, 2, 3] }]} />,
    );
    await flush();
    const stage = () =>
      container
        .querySelector(".minerva-chart-stage")
        ?.getAttribute("aria-label");
    expect(stage()).toBe("Graphique : Série 1");
    document.documentElement.lang = "ja";
    await flush();
    expect(stage()).toBe("グラフ：系列 1");
    unmount();
    const zh = render(
      <HistogramChart values={[1, 2, 2, 3]} locale="zh-CN" bins={2} />,
    );
    await flush();
    expect(
      zh.container
        .querySelector(".minerva-chart-stage")
        ?.getAttribute("aria-label"),
    ).toBe("图表：数量");
    zh.unmount();
    document.documentElement.lang = lang;
  });
});
