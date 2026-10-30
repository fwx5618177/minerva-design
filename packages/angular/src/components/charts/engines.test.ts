// The extended chart components (cartesian / shape presets, trading, order
// book, 3D) with fake engines: option presets, the data streamed apart from
// the options (books, trades), outputs and instance methods.
import { Component, signal, viewChild } from "@angular/core";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, settle } from "../../testing";
import {
  MnBar3DChart,
  MnBoxPlotChart,
  MnHeatmapChart,
  MnChordChart,
  MnDependencyGraph,
  MnDepthChart,
  MnGraphChart,
  MnTreeChart,
  MnGanttChart,
  MnHistogramChart,
  MnHorizontalBarChart,
  MnSunburstChart,
  MnTimeAndSales,
  MnTradingChart,
  MnWaterfallChart,
  type ChartTrades,
} from ".";

type Listener = (event: unknown) => void;
interface FakeEngine {
  kind: string;
  options: Record<string, unknown>;
  calls: Array<[string, unknown[]]>;
  fire(type: string, event: unknown): void;
}
const engines: FakeEngine[] = [];
const last = () => engines[engines.length - 1];
const byKind = (kind: string) => engines.find((e) => e.kind === kind)!;
const called = (engine: FakeEngine, method: string) =>
  engine.calls.filter(([name]) => name === method).map(([, args]) => args);

vi.mock("minerva-design/charts/core", async (importOriginal) => {
  const actual =
    await importOriginal<typeof import("minerva-design/charts/core")>();
  const create =
    (kind: string) =>
    (_container: HTMLElement, options: Record<string, unknown>) => {
      const listeners = new Map<string, Set<Listener>>();
      const engine: FakeEngine = {
        kind,
        options,
        calls: [],
        fire: (type, event) =>
          listeners.get(type)?.forEach((listener) => listener(event)),
      };
      engines.push(engine);
      const methods: Record<string, unknown> = {
        on: (type: string, listener: Listener) => {
          if (!listeners.has(type)) listeners.set(type, new Set());
          listeners.get(type)!.add(listener);
          return () => listeners.get(type)!.delete(listener);
        },
        setOptions: (next: Record<string, unknown>) => {
          engine.options = next;
          engine.calls.push(["setOptions", [next]]);
        },
        getBarCount: () => 42,
        getCamera: () => ({ azimuth: 30 }),
        getSelection: () => ["a"],
        getPositions: () => ({ a: { x: 1, y: 2 } }),
        getUndoState: () => ({ canUndo: true, canRedo: false }),
      };
      return new Proxy(methods, {
        get: (target, key: string) =>
          target[key] ??
          ((...args: unknown[]) => {
            engine.calls.push([key, args]);
          }),
      });
    };
  return {
    ...actual,
    createChart: create("chart"),
    createShapeChart: create("shape"),
    createTradingChart: create("trading"),
    createDepthChart: create("depth"),
    createOrderBook: create("ladder"),
    createOrderBookHeatmap: create("heatmap"),
    createTimeAndSales: create("tape"),
    createChart3D: create("3d"),
    createGraphChart: create("graph"),
  };
});

beforeEach(() => {
  engines.length = 0;
});

describe("extended cartesian and shape charts", () => {
  it("build the options of their preset", async () => {
    @Component({
      imports: [
        MnHorizontalBarChart,
        MnHistogramChart,
        MnWaterfallChart,
        MnGanttChart,
      ],
      template: `<mn-horizontal-bar-chart [series]="series" />
        <mn-histogram-chart [values]="values" name="Hits" />
        <mn-waterfall-chart [steps]="steps" />
        <mn-gantt-chart [tasks]="tasks" [today]="4" />`,
    })
    class Host {
      series = [{ name: "Votes", data: [3, 1] }];
      values = [1, 2, 2, 3];
      steps = [{ label: "Start", value: 5 }];
      tasks = [{ name: "Design", start: 0, end: 10 }];
    }
    const fixture = await render(Host);
    await settle(fixture);
    expect(engines.map((e) => e.options)).toMatchObject([
      { orientation: "horizontal", series: [{ type: "bar" }] },
      { series: [{ name: "Hits" }] },
      { series: [{ showLabels: true, data: [{ y0: 0, y: 5 }] }] },
      { xAxis: { categories: ["Design"] }, annotations: [{ value: 4 }] },
    ]);
  });

  it("pass the outlier, color midpoint, connector and dependency options", async () => {
    @Component({
      imports: [MnBoxPlotChart, MnHeatmapChart, MnWaterfallChart, MnGanttChart],
      template: `<mn-box-plot-chart
          [groups]="groups"
          outlierShape="filled"
          [outlierSize]="9"
        />
        <mn-heatmap-chart
          [data]="cells"
          colorScale="diverging"
          [colorMidpoint]="0"
        />
        <mn-waterfall-chart [steps]="steps" [connector]="false" />
        <mn-gantt-chart [tasks]="tasks" dependenciesName="After" />`,
    })
    class Host {
      groups = [{ x: "A", values: [1, 2, 3, 4, 50] }];
      cells = [{ x: "a", y: "b", value: -1 }];
      steps = [{ label: "Start", value: 5 }];
      tasks = [{ name: "Design", start: 0, end: 10 }];
    }
    const fixture = await render(Host);
    await settle(fixture);
    expect(engines.map((e) => e.options)).toMatchObject([
      { series: [{ type: "boxplot", outlierShape: "filled", outlierSize: 9 }] },
      { series: [{ colorScale: "diverging", colorMidpoint: 0 }] },
      { series: [{ connector: false }] },
      { xAxis: { categories: ["Design"] } },
    ]);
  });

  it("MnSunburstChart drills and reports drills", async () => {
    @Component({
      imports: [MnSunburstChart],
      template: `<mn-sunburst-chart
        [data]="data"
        (drillChange)="path = $event.path"
      />`,
    })
    class Host {
      data = [{ name: "A", children: [{ name: "B", value: 1 }] }];
      path: string[] = [];
      chart = viewChild.required(MnSunburstChart);
    }
    const fixture = await render(Host);
    await settle(fixture);
    expect(last().options).toMatchObject({ type: "sunburst" });
    last().fire("drill", { path: ["A"] });
    expect(fixture.componentInstance.path).toEqual(["A"]);
    fixture.componentInstance.chart().drill([]);
    expect(called(last(), "drill")).toEqual([[[]]]);
  });
});

describe("MnTradingChart", () => {
  it("passes its inputs as options, streams bars and forwards outputs", async () => {
    @Component({
      imports: [MnTradingChart],
      template: `<mn-trading-chart
        [bars]="bars"
        symbol="BTC"
        [chartStyle]="style()"
        (crosshairMove)="moved = $event"
      />`,
    })
    class Host {
      bars = [{ time: 0, open: 1, high: 2, low: 0.5, close: 1.5 }];
      style = signal<"candles" | "line">("candles");
      moved: unknown = undefined;
      chart = viewChild.required(MnTradingChart);
    }
    const fixture = await render(Host);
    await settle(fixture);
    const engine = byKind("trading");
    expect(engine.options).toMatchObject({
      symbol: "BTC",
      chartStyle: "candles",
    });
    const host = fixture.nativeElement.querySelector(
      "mn-trading-chart",
    ) as HTMLElement;
    expect(host.style.height).toBe("480px");
    const chart = fixture.componentInstance.chart();
    chart.update({ time: 0, open: 1, high: 3, low: 0.5, close: 2 });
    expect(called(engine, "update")).toHaveLength(1);
    expect(chart.getBarCount()).toBe(42);
    engine.fire("crosshairMove", { index: 3 });
    expect(fixture.componentInstance.moved).toEqual({ index: 3 });
    fixture.componentInstance.style.set("line");
    await settle(fixture);
    expect(engine.options).toMatchObject({ chartStyle: "line" });
  });

  it("forwards the order, undo, replay and full screen events and methods", async () => {
    @Component({
      imports: [MnTradingChart],
      template: `<mn-trading-chart
        [bars]="bars"
        [options]="{ orderEntry: true, timeZone: 'UTC' }"
        (orderCreate)="log.push(['orderCreate', $event])"
        (orderCancel)="log.push(['orderCancel', $event])"
        (undoChange)="log.push(['undoChange', $event])"
        (replayChange)="log.push(['replayChange', $event])"
        (fullscreenChange)="log.push(['fullscreenChange', $event])"
      />`,
    })
    class Host {
      bars = [{ time: 0, open: 1, high: 2, low: 0.5, close: 1.5 }];
      log: unknown[] = [];
      chart = viewChild.required(MnTradingChart);
    }
    const fixture = await render(Host);
    await settle(fixture);
    const engine = byKind("trading");
    expect(engine.options).toMatchObject({ orderEntry: true, timeZone: "UTC" });
    const events = [
      ["orderCreate", { price: 10, side: "buy" }],
      ["orderCancel", { id: "o1" }],
      ["undoChange", { canUndo: true, canRedo: false }],
      ["replayChange", { active: true }],
      ["fullscreenChange", true],
    ] as const;
    for (const [type, payload] of events) engine.fire(type, payload);
    expect(fixture.componentInstance.log).toEqual(events.map((e) => [...e]));
    const chart = fixture.componentInstance.chart();
    chart.setVisibleTimeRange({ from: 1, to: 2 });
    chart.setCrosshair(5, 1.2);
    chart.setScaleMode("log");
    chart.updateDrawing("d1", { color: "red" });
    chart.undo();
    chart.redo();
    chart.startReplay(3);
    chart.replayStep(2);
    chart.replayPlay(4);
    chart.replayPause();
    chart.stopReplay();
    expect(chart.getUndoState()).toEqual({ canUndo: true, canRedo: false });
    expect(called(engine, "setCrosshair")).toEqual([[5, 1.2]]);
    expect(called(engine, "updateDrawing")).toEqual([["d1", { color: "red" }]]);
    expect(called(engine, "replayPlay")).toEqual([[4]]);
    expect(engine.calls.map(([name]) => name)).toEqual(
      expect.arrayContaining([
        "setVisibleTimeRange",
        "setScaleMode",
        "undo",
        "redo",
        "startReplay",
        "replayStep",
        "replayPause",
        "stopReplay",
      ]),
    );
  });
});

describe("graph components", () => {
  const nodes = [{ id: "a" }, { id: "b" }];
  const edges = [{ source: "a", target: "b" }];

  it("MnGraphChart builds its options, keeps the layout for equal data and forwards outputs and methods", async () => {
    @Component({
      imports: [MnGraphChart],
      template: `<mn-graph-chart
        [nodes]="nodes()"
        [edges]="edges"
        [force]="{ charge: -120 }"
        [height]="height()"
        edgeColor="source"
        (itemClick)="log.push(['itemClick', $event])"
        (selectionChange)="log.push(['selectionChange', $event])"
        (nodeToggle)="log.push(['nodeToggle', $event])"
        (groupToggle)="log.push(['groupToggle', $event])"
        (layoutEnd)="log.push(['layoutEnd', $event])"
        (rendererChange)="log.push(['rendererChange', $event])"
        (hover)="log.push(['hover', $event])"
      />`,
    })
    class Host {
      nodes = signal<readonly { id: string }[]>(nodes);
      edges = edges;
      height = signal(480);
      log: unknown[] = [];
      chart = viewChild.required(MnGraphChart);
    }
    const fixture = await render(Host);
    await settle(fixture);
    const engine = byKind("graph");
    expect(engine.options).toMatchObject({
      nodes,
      edges,
      layout: "force",
      force: { charge: -120 },
      edgeColor: "source",
    });
    // the same node objects in a new array: no new options
    fixture.componentInstance.nodes.set([...nodes]);
    fixture.componentInstance.height.set(300);
    await settle(fixture);
    expect(called(engine, "setOptions")).toEqual([]);
    const more = [...nodes, { id: "c" }];
    fixture.componentInstance.nodes.set(more);
    await settle(fixture);
    expect(called(engine, "setOptions")).toHaveLength(1);
    expect(engine.options.nodes).toBe(more);

    engine.fire("click", { id: "a" });
    engine.fire("select", { ids: ["a"] });
    engine.fire("toggle", { id: "a", collapsed: true });
    engine.fire("groupToggle", { group: "g", hidden: true });
    engine.fire("layoutEnd", { layout: "force" });
    engine.fire("renderer", "webgl2");
    engine.fire("hover", null);
    expect(fixture.componentInstance.log).toEqual([
      ["itemClick", { id: "a" }],
      ["selectionChange", ["a"]],
      ["nodeToggle", { id: "a", collapsed: true }],
      ["groupToggle", { group: "g", hidden: true }],
      ["layoutEnd", { layout: "force" }],
      ["rendererChange", "webgl2"],
      ["hover", null],
    ]);

    const chart = fixture.componentInstance.chart();
    chart.fit(false);
    chart.focusNode("a", { zoom: 2 });
    chart.setData({ nodes, edges });
    chart.select(["b"]);
    chart.expand("a");
    chart.collapse();
    chart.toggle("a");
    chart.relayout();
    chart.getRenderer();
    expect(chart.getSelection()).toEqual(["a"]);
    expect(chart.getPositions()).toEqual({ a: { x: 1, y: 2 } });
    expect(called(engine, "focusNode")).toEqual([["a", { zoom: 2 }]]);
    expect(called(engine, "select")).toEqual([[["b"]]]);
    expect(engine.calls.map(([name]) => name)).toEqual(
      expect.arrayContaining([
        "fit",
        "setData",
        "expand",
        "collapse",
        "toggle",
        "relayout",
        "getRenderer",
      ]),
    );
  });

  it("MnDependencyGraph and MnTreeChart set their layouts", async () => {
    @Component({
      imports: [MnDependencyGraph, MnTreeChart],
      template: `<mn-dependency-graph
          [nodes]="nodes"
          [edges]="edges"
          [dag]="{ layerGap: 70 }"
          [criticalPath]="true"
        />
        <mn-tree-chart [nodes]="nodes" [edges]="edges" layout="radial" />
        <mn-dependency-graph [nodes]="nodes" [edges]="edges" direction="LR" />`,
    })
    class Host {
      nodes = nodes;
      edges = edges;
    }
    const fixture = await render(Host);
    await settle(fixture);
    expect(engines.map((e) => e.options)).toMatchObject([
      {
        layout: "dag",
        direction: "TB",
        dag: { layerGap: 70, criticalPath: true },
      },
      { layout: "radial" },
      { layout: "dag", direction: "LR", dag: undefined },
    ]);
  });
});

describe("MnChordChart", () => {
  it("builds the chord options and forwards toggle", async () => {
    @Component({
      imports: [MnChordChart],
      template: `<mn-chord-chart
        [groups]="['A', 'B']"
        [matrix]="matrix"
        directed
        [ticks]="5"
        labels="radial"
        (itemClick)="clicked = $event"
      />`,
    })
    class Host {
      matrix = [
        [0, 2],
        [3, 0],
      ];
      clicked: unknown = undefined;
      chart = viewChild.required(MnChordChart);
    }
    const fixture = await render(Host);
    await settle(fixture);
    const engine = byKind("shape");
    expect(engine.options).toMatchObject({
      type: "chord",
      groups: ["A", "B"],
      matrix: [
        [0, 2],
        [3, 0],
      ],
      directed: true,
      ticks: 5,
      labels: "radial",
    });
    const host = fixture.nativeElement.querySelector(
      "mn-chord-chart",
    ) as HTMLElement;
    expect(host.style.height).toBe("420px");
    engine.fire("click", { name: "A", source: "A", target: "B" });
    expect(fixture.componentInstance.clicked).toEqual({
      name: "A",
      source: "A",
      target: "B",
    });
    fixture.componentInstance.chart().toggle(1);
    expect(called(engine, "toggle")).toEqual([[1]]);
  });
});

describe("order book components", () => {
  it("MnDepthChart passes the book apart from the options", async () => {
    @Component({
      imports: [MnDepthChart],
      template: `<mn-depth-chart
        [book]="book()"
        [options]="options"
        (rangeChange)="range = $event"
      />`,
    })
    class Host {
      book = signal({ bids: [[99, 1]] as [number, number][], asks: [] });
      options = { curve: "linear" as const };
      range = 0;
    }
    const fixture = await render(Host);
    await settle(fixture);
    const engine = byKind("depth");
    expect(engine.options).toEqual({ curve: "linear" });
    expect(called(engine, "setBook")).toHaveLength(1);
    fixture.componentInstance.book.set({ bids: [[98, 1]], asks: [] });
    await settle(fixture);
    expect(called(engine, "setBook")).toHaveLength(2);
    expect(called(engine, "setOptions")).toEqual([]);
    engine.fire("range", 0.02);
    expect(fixture.componentInstance.range).toBe(0.02);
  });

  it("MnTimeAndSales appends the grown trades", async () => {
    const a = { time: 1, price: 100, size: 1, side: "buy" as const };
    const b = { time: 2, price: 101, size: 2, side: "sell" as const };
    @Component({
      imports: [MnTimeAndSales],
      template: `<mn-time-and-sales [trades]="trades()" />`,
    })
    class Host {
      trades = signal<ChartTrades>([a]);
    }
    const fixture = await render(Host);
    await settle(fixture);
    const engine = byKind("tape");
    expect(called(engine, "setTrades")).toEqual([[[a]]]);
    fixture.componentInstance.trades.set([a, b]);
    await settle(fixture);
    expect(called(engine, "addTrades")).toEqual([[[b]]]);
  });
});

describe("3D components", () => {
  it("type their series and expose the camera", async () => {
    @Component({
      imports: [MnBar3DChart],
      template: `<mn-bar-3d-chart
        [series]="series"
        (pointClick)="clicked = $event"
      />`,
    })
    class Host {
      series = [{ name: "Sales", data: [] }];
      clicked: unknown = undefined;
      chart = viewChild.required(MnBar3DChart);
    }
    const fixture = await render(Host);
    await settle(fixture);
    expect(byKind("3d").options.series).toMatchObject([
      { type: "bar", barWidth: 0.7 },
    ]);
    expect(fixture.componentInstance.chart().getCamera()).toEqual({
      azimuth: 30,
    });
    byKind("3d").fire("click", { index: 1 });
    expect(fixture.componentInstance.clicked).toEqual({ index: 1 });
  });
});
