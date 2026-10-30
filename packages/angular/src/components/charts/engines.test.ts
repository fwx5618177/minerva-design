// The extended chart components (cartesian / shape presets, trading, order
// book, 3D) with fake engines: option presets, the data streamed apart from
// the options (books, trades), outputs and instance methods.
import { Component, signal, viewChild } from "@angular/core";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, settle } from "../../testing";
import {
  MnBar3DChart,
  MnDepthChart,
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
