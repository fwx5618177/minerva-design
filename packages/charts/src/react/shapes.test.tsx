import { act, render } from "@testing-library/react";
import { createRef } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  BulletChart,
  CalendarHeatmap,
  ChordChart,
  DonutChart,
  FunnelChart,
  GaugeChart,
  PieChart,
  RadarChart,
  RadialBarChart,
  SankeyChart,
  SunburstChart,
  TreemapChart,
  type ShapeChartHandle,
} from "./shapes";

const flush = () =>
  act(
    () =>
      new Promise<void>((resolve) =>
        requestAnimationFrame(() => setTimeout(resolve, 0)),
      ),
  );

const pointer = (type: string, x: number, y: number) => {
  const event = new MouseEvent(type, { clientX: x, clientY: y, bubbles: true });
  Object.defineProperty(event, "pointerId", { value: 1 });
  Object.defineProperty(event, "pointerType", { value: "mouse" });
  return event;
};

const data = [
  { name: "A", value: 1 },
  { name: "B", value: 1 },
];

beforeEach(() => {
  vi.spyOn(HTMLElement.prototype, "clientWidth", "get").mockReturnValue(400);
  vi.spyOn(HTMLElement.prototype, "clientHeight", "get").mockReturnValue(300);
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe("shape chart components", () => {
  it("renders sized containers with accessible names", () => {
    const ref = createRef<ShapeChartHandle>();
    const { container, unmount } = render(
      <>
        <PieChart ref={ref} data={data} />
        <DonutChart data={data} height={200} width={300} />
        <RadarChart
          indicators={[{ name: "x" }, { name: "y" }, { name: "z" }]}
          series={[{ values: [1, 2, 3] }]}
        />
        <GaugeChart value={40} label="Load" />
        <FunnelChart data={data} ariaLabel="Sales funnel" />
        <TreemapChart data={data} />
      </>,
    );
    const roots = [...container.children] as HTMLElement[];
    expect(roots.map((r) => r.style.height)).toEqual([
      "320px",
      "200px",
      "320px",
      "240px",
      "320px",
      "320px",
    ]);
    expect(roots[1].style.width).toBe("300px");
    const labels = [...container.querySelectorAll(".minerva-chart-stage")].map(
      (s) => s.getAttribute("aria-label"),
    );
    expect(labels).toEqual([
      "Pie chart",
      "Donut chart",
      "Radar chart",
      "Gauge: Load",
      "Sales funnel",
      "Treemap",
    ]);
    expect(ref.current?.getInstance()).not.toBeNull();
    unmount();
    expect(container.querySelector(".minerva-chart")).toBeNull();
  });

  it("applies new props without remounting and skips equal ones", async () => {
    const { container, rerender } = render(
      <PieChart data={data} animation={false} />,
    );
    const root = container.querySelector(".minerva-chart");
    const ref = createRef<ShapeChartHandle>();
    rerender(<PieChart ref={ref} data={data} animation={false} />);
    const spy = vi.spyOn(ref.current!.getInstance()!, "setOptions");
    rerender(<PieChart ref={ref} data={data} animation={false} />);
    expect(spy).not.toHaveBeenCalled();
    rerender(
      <PieChart
        ref={ref}
        data={[...data, { name: "C", value: 2 }]}
        animation={false}
      />,
    );
    expect(spy).toHaveBeenCalledTimes(1);
    await flush();
    expect(container.querySelector(".minerva-chart")).toBe(root);
    expect(
      container.querySelectorAll(".minerva-chart-legend button"),
    ).toHaveLength(3);
  });

  it("forwards hover / click events and renders a React tooltip", async () => {
    const onHover = vi.fn();
    const onClick = vi.fn();
    const { container } = render(
      <PieChart
        data={data}
        labels="none"
        animation={false}
        onHover={onHover}
        onClick={onClick}
        renderTooltip={(e) => <strong className="tip">{e.name}!</strong>}
      />,
    );
    await flush();
    const stage = container.querySelector(".minerva-chart-stage")!;
    // the legend is a DOM row, the stage keeps the mocked 400 x 300 size
    act(() => {
      stage.dispatchEvent(pointer("pointermove", 280, 150));
    });
    expect(onHover).toHaveBeenLastCalledWith(
      expect.objectContaining({ name: "A", index: 0 }),
    );
    expect(container.querySelector(".tip")?.textContent).toBe("A!");
    act(() => {
      stage.dispatchEvent(pointer("pointerdown", 120, 150));
      stage.dispatchEvent(pointer("pointerup", 120, 150));
    });
    expect(onClick).toHaveBeenCalledWith(
      expect.objectContaining({ name: "B" }),
    );
    expect(container.querySelector(".tip")?.textContent).toBe("B!");
  });

  it("reports legend toggles and supports a controlled hidden list", async () => {
    const onToggle = vi.fn();
    const ref = createRef<ShapeChartHandle>();
    const { container, rerender } = render(
      <PieChart ref={ref} data={data} animation={false} onToggle={onToggle} />,
    );
    const buttons = () => [
      ...container.querySelectorAll<HTMLButtonElement>(
        ".minerva-chart-legend button",
      ),
    ];
    act(() => buttons()[0].click());
    expect(onToggle).toHaveBeenLastCalledWith({
      index: 0,
      hidden: true,
      hiddenIndexes: [0],
    });
    expect(ref.current?.getInstance()?.getHidden()).toEqual([0]);

    // controlled: the prop wins, clicks only report
    rerender(
      <PieChart
        ref={ref}
        data={data}
        animation={false}
        hidden={[1]}
        onToggle={onToggle}
      />,
    );
    expect(ref.current?.getInstance()?.getHidden()).toEqual([1]);
    act(() => buttons()[0].click());
    expect(onToggle).toHaveBeenLastCalledWith({
      index: 0,
      hidden: true,
      hiddenIndexes: [0, 1],
    });
    expect(ref.current?.getInstance()?.getHidden()).toEqual([1]);
    // an equal (new) array does not update the chart
    const spy = vi.spyOn(ref.current!.getInstance()!, "setOptions");
    rerender(
      <PieChart
        ref={ref}
        data={data}
        animation={false}
        hidden={[1]}
        onToggle={onToggle}
      />,
    );
    expect(spy).not.toHaveBeenCalled();
    await flush();
  });

  it("renders the flow, hierarchy, progress, calendar and KPI charts", () => {
    const { container } = render(
      <>
        <SankeyChart links={[{ source: "a", target: "b", value: 1 }]} />
        <SunburstChart data={data} />
        <RadialBarChart data={data} />
        <CalendarHeatmap
          range={2026}
          data={[{ date: "2026-02-03", value: 2 }]}
        />
        <BulletChart
          data={[
            { name: "a", value: 1, target: 2 },
            { name: "b", value: 3 },
          ]}
        />
      </>,
    );
    const roots = [...container.children] as HTMLElement[];
    expect(roots.map((r) => r.style.height)).toEqual([
      "360px",
      "360px",
      "300px",
      "170px",
      "144px",
    ]);
    const labels = [...container.querySelectorAll(".minerva-chart-stage")].map(
      (s) => s.getAttribute("aria-label"),
    );
    expect(labels).toEqual([
      "Sankey diagram",
      "Sunburst chart",
      "Radial bar chart",
      "Calendar heatmap",
      "Bullet chart",
    ]);
    // calendar levels in the legend
    expect(
      roots[3].querySelectorAll(".minerva-chart-legend button").length,
    ).toBe(4);
  });

  it("renders a chord diagram whose groups toggle from the legend", async () => {
    const onToggle = vi.fn();
    const onHover = vi.fn();
    const ref = createRef<ShapeChartHandle>();
    const { container, rerender } = render(
      <ChordChart
        ref={ref}
        groups={["A", "B"]}
        matrix={[
          [0, 3],
          [1, 0],
        ]}
        animation={false}
        onToggle={onToggle}
        onHover={onHover}
      />,
    );
    const root = container.firstElementChild as HTMLElement;
    expect(root.style.height).toBe("420px");
    const stage = container.querySelector<HTMLElement>(".minerva-chart-stage")!;
    expect(stage.getAttribute("aria-label")).toBe("Chord diagram");
    const buttons = container.querySelectorAll<HTMLButtonElement>(
      ".minerva-chart-legend button",
    );
    expect([...buttons].map((b) => b.textContent)).toEqual(["A", "B"]);
    await flush();
    // keyboard: the first group
    act(() => {
      stage.dispatchEvent(
        new KeyboardEvent("keydown", { key: "ArrowRight", bubbles: true }),
      );
    });
    expect(onHover).toHaveBeenLastCalledWith(
      expect.objectContaining({ name: "A", index: 0 }),
    );
    act(() => buttons[1].click());
    expect(onToggle).toHaveBeenLastCalledWith({
      index: 1,
      hidden: true,
      hiddenIndexes: [1],
    });
    await flush();
    const spy = vi.spyOn(ref.current!.getInstance()!, "setOptions");
    rerender(
      <ChordChart
        ref={ref}
        links={[{ source: "A", target: "B", value: 2 }]}
        directed
        animation={false}
      />,
    );
    expect(spy).toHaveBeenCalledWith(
      expect.objectContaining({ type: "chord", directed: true }),
    );
  });

  it("reports sunburst drill-downs, controlled or not", async () => {
    const tree = [
      {
        name: "A",
        children: [
          { name: "a1", value: 1 },
          { name: "a2", value: 2 },
        ],
      },
      { name: "B", value: 3 },
    ];
    const onDrill = vi.fn();
    const ref = createRef<ShapeChartHandle>();
    const { container, rerender } = render(
      <SunburstChart
        ref={ref}
        data={tree}
        animation={false}
        onDrill={onDrill}
      />,
    );
    await flush();
    const chart = ref.current!.getInstance()!;
    act(() => chart.drill(["A"]));
    expect(onDrill).toHaveBeenLastCalledWith({ path: ["A"] });
    expect(chart.getDrillPath()).toEqual(["A"]);
    await flush();
    // Backspace goes back up
    const stage = container.querySelector<HTMLElement>(".minerva-chart-stage")!;
    act(() => {
      stage.dispatchEvent(
        new KeyboardEvent("keydown", { key: "Backspace", bubbles: true }),
      );
    });
    expect(onDrill).toHaveBeenLastCalledWith({ path: [] });
    expect(chart.getDrillPath()).toEqual([]);

    // controlled
    rerender(
      <SunburstChart
        ref={ref}
        data={tree}
        animation={false}
        drillPath={["A"]}
        onDrill={onDrill}
      />,
    );
    expect(chart.getDrillPath()).toEqual(["A"]);
    await flush();
    // the center goes up, but the prop wins
    act(() => {
      stage.dispatchEvent(pointer("pointerdown", 200, 150));
      stage.dispatchEvent(pointer("pointerup", 200, 150));
    });
    expect(onDrill).toHaveBeenLastCalledWith({ path: [] });
    expect(chart.getDrillPath()).toEqual(["A"]);
  });

  it("follows the page language unless `locale` is set", async () => {
    const initial = document.documentElement.lang;
    try {
      document.documentElement.lang = "en";
      const { container } = render(
        <>
          <PieChart data={data} animation={false} />
          <GaugeChart value={40} label="CPU" locale="fr" />
          <BulletChart
            data={[{ name: "Revenue", value: 3, target: 4 }]}
            texts={{ bulletChart: "KPIs" }}
          />
        </>,
      );
      const names = () =>
        [...container.querySelectorAll(".minerva-chart-stage")].map((s) =>
          s.getAttribute("aria-label"),
        );
      expect(names()).toEqual(["Pie chart", "Jauge : CPU", "KPIs"]);
      await act(async () => {
        document.documentElement.lang = "zh-CN";
        await Promise.resolve();
      });
      expect(names()).toEqual(["饼图", "Jauge : CPU", "KPIs"]);
    } finally {
      document.documentElement.lang = initial;
    }
  });
});
