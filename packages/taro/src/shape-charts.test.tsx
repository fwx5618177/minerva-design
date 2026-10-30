import { act, render, waitFor } from "@testing-library/react";
import Taro from "@tarojs/taro";
import { cloneElement, createRef } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
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
  ShapeChart,
  SunburstChart,
  TreemapChart,
  type ShapeChartHandle,
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

/** SelectorQuery double answering `fields({ node, size, rect })` */
const mockQuery = (node: unknown) => {
  const selectors: string[] = [];
  const query = {
    in: vi.fn(() => query),
    select: vi.fn((selector: string) => {
      selectors.push(selector);
      return query;
    }),
    fields: vi.fn(() => query),
    exec: vi.fn((callback: (res: unknown[]) => void) =>
      callback([{ node, width: 400, height: 300, left: 10, top: 20 }]),
    ),
  };
  vi.spyOn(Taro, "createSelectorQuery").mockImplementation(
    () => query as unknown as ReturnType<typeof Taro.createSelectorQuery>,
  );
  return { selectors };
};

const host = (container: HTMLElement) =>
  container.querySelector("taro-canvas-core") as HTMLElement;

const dispatch = (el: Element, type: string, init: object) =>
  act(() => {
    el.dispatchEvent(Object.assign(new Event(type, { bubbles: true }), init));
  });

const tap = (el: Element, x: number, y: number) => {
  dispatch(el, "touchstart", {
    touches: [{ x, y, identifier: 0 }],
    changedTouches: [{ x, y, identifier: 0 }],
  });
  dispatch(el, "touchend", {
    touches: [],
    changedTouches: [{ x, y, identifier: 0 }],
  });
};

const ready = async (ref: { current: ShapeChartHandle | null }) => {
  await waitFor(() => expect(ref.current?.getInstance()).toBeTruthy());
  return ref.current!.getInstance()!;
};

const texts = (calls: { name: string; args: unknown[] }[]) =>
  calls.filter((c) => c.name === "fillText").map((c) => c.args[0]);

const DATA = [
  { name: "Alpha", value: 3 },
  { name: "Beta", value: 1 },
];

afterEach(() => {
  vi.restoreAllMocks();
});

describe("shape charts", () => {
  it("draws a pie on the canvas node found by the selector query", async () => {
    const { node, calls, flush } = fakeNode();
    const { selectors } = mockQuery(node);
    const ref = createRef<ShapeChartHandle>();
    const { container } = render(
      <PieChart ref={ref} id="traffic" data={DATA} animation={false} />,
    );
    const root = container.firstElementChild as HTMLElement;
    expect(root).toHaveAttribute("data-minerva", "chart");
    expect(root).toHaveAttribute("role", "img");
    expect(root).toHaveAttribute("aria-label", "Pie chart");
    expect(root).toHaveStyle({ height: "320px", width: "100%" });
    await ready(ref);
    flush();
    expect(selectors).toEqual(["#traffic"]);
    // CSS size x pixel ratio (2 in the Taro mock)
    expect(node.width).toBe(800);
    expect(calls.some((c) => c.name === "arc")).toBe(true);
    expect(texts(calls)).toContain("Alpha");
  });

  it("defaults the donut hole and the gauge height", async () => {
    const { node, calls } = fakeNode();
    mockQuery(node);
    const donut = createRef<ShapeChartHandle>();
    const { container, unmount } = render(
      <DonutChart
        ref={donut}
        data={DATA}
        centerValue="4"
        centerLabel="Total"
        animation={false}
      />,
    );
    expect(container.firstElementChild).toHaveAttribute(
      "aria-label",
      "Donut chart",
    );
    await ready(donut);
    expect(texts(calls)).toContain("Total");
    unmount();
    const gauge = render(<GaugeChart value={42} label="CPU" />);
    const root = gauge.container.firstElementChild as HTMLElement;
    expect(root).toHaveStyle({ height: "240px" });
    expect(root).toHaveAttribute("aria-label", "Gauge: CPU");
  });

  it("taps: a slice calls onClick, a legend item toggles", async () => {
    const { node, calls, flush } = fakeNode();
    mockQuery(node);
    const ref = createRef<ShapeChartHandle>();
    const onClick = vi.fn();
    const onToggle = vi.fn();
    const { container } = render(
      <PieChart
        ref={ref}
        data={DATA}
        labels="none"
        animation={false}
        onClick={onClick}
        onToggle={onToggle}
      />,
    );
    await ready(ref);
    flush();
    // legend at the bottom: the first item is drawn at the x of "Alpha"
    const alpha = calls.filter(
      (c) => c.name === "fillText" && c.args[0] === "Alpha",
    );
    const [lx, ly] = alpha[alpha.length - 1]!.args.slice(1) as number[];
    tap(host(container), lx! + 4, ly!);
    expect(onToggle).toHaveBeenCalledWith({
      index: 0,
      hidden: true,
      hiddenIndexes: [0],
    });
    expect(ref.current!.getInstance()!.getHidden()).toEqual([0]);
    ref.current!.getInstance()!.toggle(0);
    flush();
    // the first slice covers 12 to 9 o'clock: the right of the center
    tap(host(container), 230, 130);
    expect(onClick).toHaveBeenCalledWith(
      expect.objectContaining({ index: 0, name: "Alpha" }),
    );
  });

  it("updates the options without recreating the chart", async () => {
    const { node, calls, flush } = fakeNode();
    mockQuery(node);
    const ref = createRef<ShapeChartHandle>();
    const { rerender } = render(
      <FunnelChart ref={ref} data={DATA} animation={false} />,
    );
    const chart = await ready(ref);
    rerender(
      <FunnelChart
        ref={ref}
        data={[...DATA, { name: "Gamma", value: 0.5 }]}
        animation={false}
      />,
    );
    flush();
    expect(ref.current!.getInstance()).toBe(chart);
    expect(texts(calls)).toContain("Gamma");
  });

  it("draws radar and treemap charts, and any type with ShapeChart", async () => {
    for (const ui of [
      <RadarChart
        key="radar"
        indicators={[{ name: "Speed" }, { name: "Power" }, { name: "Range" }]}
        series={[{ name: "A", values: [3, 4, 2] }]}
        animation={false}
      />,
      <TreemapChart
        key="treemap"
        data={[
          { name: "Docs", value: 4 },
          { name: "Blog", value: 2 },
        ]}
        animation={false}
      />,
      <ShapeChart
        key="generic"
        options={{ type: "gauge", value: 64, label: "Load", animation: false }}
      />,
    ]) {
      const { node, calls } = fakeNode();
      mockQuery(node);
      const ref = createRef<ShapeChartHandle>();
      const { unmount, container } = render(
        <div>{cloneElement(ui, { ref } as object)}</div>,
      );
      await ready(ref);
      expect(
        calls.filter((c) => c.name === "fill" || c.name === "stroke").length,
        String(ui.key),
      ).toBeGreaterThan(1);
      if (ui.key === "generic")
        expect(container.querySelector("[data-minerva]")).toHaveStyle({
          height: "240px",
        });
      unmount();
      vi.restoreAllMocks();
    }
  });

  it("draws sankey, sunburst, radial bar, calendar heatmap and bullet charts", async () => {
    for (const [ui, label, height] of [
      [
        <SankeyChart
          key="sankey"
          links={[
            { source: "Ads", target: "Site", value: 6 },
            { source: "Site", target: "Signup", value: 3 },
          ]}
          animation={false}
        />,
        "Sankey diagram",
        "360px",
      ],
      [
        <SunburstChart
          key="sunburst"
          data={[
            { name: "Web", children: [{ name: "Docs", value: 4 }] },
            { name: "Mobile", value: 2 },
          ]}
          animation={false}
        />,
        "Sunburst chart",
        "360px",
      ],
      [
        <RadialBarChart
          key="radial"
          data={[{ name: "Move", value: 420, max: 500 }]}
          animation={false}
        />,
        "Radial bar chart",
        "300px",
      ],
      [
        <CalendarHeatmap
          key="calendar"
          data={[{ date: "2026-03-02", value: 3 }]}
          range={2026}
          animation={false}
        />,
        "Calendar heatmap",
        "170px",
      ],
      [
        <CalendarHeatmap
          key="calendar-years"
          data={[{ date: "2025-03-02", value: 3 }]}
          range={["2025-01-01", "2026-12-31"]}
          animation={false}
        />,
        "Calendar heatmap",
        "290px",
      ],
      [
        // across new year but within 53 weeks: one strip
        <CalendarHeatmap
          key="calendar-winter"
          data={[{ date: "2025-12-02", value: 3 }]}
          range={["2025-11-01", "2026-02-28"]}
          animation={false}
        />,
        "Calendar heatmap",
        "170px",
      ],
      [
        <BulletChart
          key="bullet"
          data={[{ name: "Revenue", value: 270, target: 250 }]}
          ranges={[150, 225, 300]}
          animation={false}
        />,
        "Bullet chart",
        "96px",
      ],
    ] as const) {
      const { node, calls } = fakeNode();
      mockQuery(node);
      const ref = createRef<ShapeChartHandle>();
      const { unmount, container } = render(
        <div>{cloneElement(ui, { ref } as object)}</div>,
      );
      const root = container.querySelector("[data-minerva]");
      expect(root, label).toHaveAttribute("aria-label", label);
      expect(root, label).toHaveStyle({ height });
      await ready(ref);
      expect(
        calls.filter((c) => c.name === "fill" || c.name === "stroke").length,
        label,
      ).toBeGreaterThan(0);
      unmount();
      vi.restoreAllMocks();
    }
  });

  it("forwards the sunburst drill events (SunburstChart and ShapeChart)", async () => {
    const data = [
      {
        name: "Web",
        children: [
          { name: "Docs", value: 4 },
          { name: "Blog", value: 2 },
        ],
      },
      { name: "Mobile", value: 6 },
    ];
    for (const kind of ["named", "generic"]) {
      const { node } = fakeNode();
      mockQuery(node);
      const ref = createRef<ShapeChartHandle>();
      const onDrill = vi.fn();
      const { unmount } = render(
        kind === "named" ? (
          <SunburstChart
            ref={ref}
            data={data}
            animation={false}
            onDrill={onDrill}
          />
        ) : (
          <ShapeChart
            ref={ref}
            options={{ type: "sunburst", data, animation: false }}
            onDrill={onDrill}
          />
        ),
      );
      const chart = await ready(ref);
      act(() => chart.drill(["Web"]));
      expect(onDrill, kind).toHaveBeenCalledWith({ path: ["Web"] });
      expect(chart.getDrillPath()).toEqual(["Web"]);
      unmount();
      vi.restoreAllMocks();
    }
  });

  it("draws a chord diagram with ChordChart and ShapeChart", async () => {
    for (const kind of ["named", "generic"]) {
      const { node, calls, flush } = fakeNode();
      mockQuery(node);
      const ref = createRef<ShapeChartHandle>();
      const onToggle = vi.fn();
      const matrix = [
        [0, 5, 2],
        [3, 0, 4],
        [1, 2, 0],
      ];
      const groups = ["Apps", "Web", "Store"];
      const { container, unmount } = render(
        kind === "named" ? (
          <ChordChart
            ref={ref}
            groups={groups}
            matrix={matrix}
            animation={false}
            onToggle={onToggle}
          />
        ) : (
          <ShapeChart
            ref={ref}
            options={{ type: "chord", groups, matrix, animation: false }}
            onToggle={onToggle}
          />
        ),
      );
      const root = container.firstElementChild as HTMLElement;
      expect(root, kind).toHaveAttribute("aria-label", "Chord diagram");
      expect(root, kind).toHaveStyle({ height: "420px" });
      const chart = await ready(ref);
      flush();
      expect(
        calls.some((c) => c.name === "quadraticCurveTo"),
        kind,
      ).toBe(true);
      expect(texts(calls), kind).toContain("Apps");
      act(() => chart.toggle(1));
      expect(onToggle, kind).toHaveBeenCalledWith(
        expect.objectContaining({ index: 1, hiddenIndexes: [1] }),
      );
      unmount();
      vi.restoreAllMocks();
    }
  });

  it("forwards locale and texts to the engine", async () => {
    for (const [extra, expected] of [
      [{ locale: "zh-CN" }, "暂无数据"],
      [{ locale: "fr", texts: { noData: "Vide" } }, "Vide"],
    ] as const) {
      const { node, calls, flush } = fakeNode();
      mockQuery(node);
      const ref = createRef<ShapeChartHandle>();
      const { unmount } = render(
        <PieChart ref={ref} data={[]} animation={false} {...extra} />,
      );
      await ready(ref);
      flush();
      expect(texts(calls)).toContain(expected);
      unmount();
      vi.restoreAllMocks();
    }
  });
});
