// Native WeChat chart components: the DOM-free canvas engine of
// minerva-design/charts drawn on a `<canvas type="2d">`. Only the canvas entry
// is imported so the WebGPU / WebGL2 / DOM code never reaches the bundle.
import {
  barSeries,
  createCanvasChart,
  lineSeries,
  quadrantChartOptions,
  quadrantOf,
  scatterSeries,
  type CanvasChartInstance,
  type ChartCanvas,
  type ChartOptions,
  type ChartThemeInput,
  type ChartTouch,
  type QuadrantConfig,
} from "@minerva/charts/canvas";
import { githubDark, resolveTokens } from "@minerva/core";
import type { NativeConfiguration } from "./configuration";
import type {
  NativeChartAnnotation,
  NativeChartAxisOptions,
  NativeChartConfig,
  NativeChartHoverEvent,
  NativeChartSeries,
  NativeChartTooltipOptions,
  NativeQuadrantChartConfig,
  NativeQuadrantPoint,
} from "./public-types";
import { windowInfo } from "./system-info";

export type {
  NativeChartConfig,
  NativeQuadrantChartConfig,
} from "./public-types";

type Instance = WechatMiniprogram.Component.TrivialInstance;
type Control = { template: string; definition: WechatMiniprogram.IAnyObject };
type ChartKind = "chart" | "line" | "bar" | "scatter" | "quadrant";
type ChartConfig = NativeChartConfig | NativeQuadrantChartConfig;
interface NativeTouch {
  x?: number;
  y?: number;
  identifier?: number;
}
interface NativeTouchEvent {
  touches?: ArrayLike<NativeTouch>;
  changedTouches?: ArrayLike<NativeTouch>;
}
interface ChartState {
  kind: ChartKind;
  chart: CanvasChartInstance | null;
  config: ChartConfig;
  theme: ChartThemeInput | undefined;
  themeKey: string;
  ready: boolean;
}

const states = new WeakMap<object, ChartState>();
const optional = () => ({ type: null, value: null });
const flag = (value = false) => ({ type: Boolean, value });
const text = (value = "") => ({ type: String, value });
const list = () => ({ type: Array, value: [] });

/** `null` / `""` properties mean "not set" (engine default) */
const unset = <T>(value: T | null | undefined | ""): T | undefined =>
  value === null || value === "" ? undefined : (value as T | undefined);
const nonEmpty = <T>(value: readonly T[] | null | undefined) =>
  value && value.length ? value : undefined;

/** Numbers and digit strings are px, other strings are CSS lengths */
const cssSize = (value: unknown, fallback: string) =>
  typeof value === "number" && Number.isFinite(value)
    ? `${value}px`
    : typeof value === "string" && value.trim()
      ? /^\d+(\.\d+)?$/.test(value.trim())
        ? `${value.trim()}px`
        : value.trim()
      : fallback;

const pixelRatio = () => {
  try {
    const ratio = Number(windowInfo().pixelRatio);
    return ratio > 0 ? ratio : 1;
  } catch {
    return 1;
  }
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

const themeCache = new Map<string, ChartThemeInput>();
/**
 * Chart theme of a configuration: the resolved Minerva token values of its
 * mode, palette, design and custom theme as `--name` variables (the engine
 * resolves `var(--name, fallback)` colors of the options against them).
 */
export function chartTheme(
  config?: Pick<
    NativeConfiguration,
    "theme" | "resolvedMode" | "palette" | "design"
  >,
): ChartThemeInput {
  const mode = config?.resolvedMode === "dark" ? "dark" : "light";
  const theme = config?.theme;
  const custom =
    theme === "github-dark"
      ? githubDark
      : isRecord(theme)
        ? "light" in theme && "dark" in theme
          ? theme[mode]
          : theme
        : undefined;
  const options = {
    mode,
    palette: config?.palette ?? null,
    design: config?.design ?? {},
    ...(isRecord(custom)
      ? { overrides: custom as Readonly<Record<string, string>> }
      : {}),
  } as const;
  const key = JSON.stringify(options);
  const cached = themeCache.get(key);
  if (cached) return cached;
  const css = resolveTokens(options).css;
  const variables: Record<string, string> = {};
  for (const [name, value] of Object.entries(css))
    variables[`--${name}`] = String(value);
  const result: ChartThemeInput = {
    variables,
    ...(css["font-family-sans"]
      ? { fontFamily: String(css["font-family-sans"]) }
      : {}),
  };
  if (themeCache.size > 32) themeCache.clear();
  themeCache.set(key, result);
  return result;
}

const stateOf = (self: Instance, kind: ChartKind) => {
  let state = states.get(self);
  if (!state) {
    state = {
      kind,
      chart: null,
      config: {},
      theme: undefined,
      themeKey: "",
      ready: false,
    };
    states.set(self, state);
  }
  return state;
};

const configOf = (self: Instance): NativeConfiguration | undefined =>
  typeof self.getConfig === "function" ? self.getConfig() : undefined;

const tooltipOption = (
  value: boolean | NativeChartTooltipOptions | undefined,
  render: ((event: NativeChartHoverEvent) => string | null) | undefined,
): ChartOptions["tooltip"] =>
  !render || value === false
    ? value
    : { ...(isRecord(value) ? value : {}), render };

const axisOption = (
  value: NativeChartAxisOptions | undefined,
  format: ((value: number) => string) | undefined,
) => (format ? { ...value, format } : value);

/** Options shared by every chart (everything but the series and axes) */
const baseOptions = (
  self: Instance,
  render: ((event: NativeChartHoverEvent) => string | null) | undefined,
): Omit<ChartOptions, "series"> => {
  const d = self.data;
  return {
    legend: unset(d.legend),
    tooltip: tooltipOption(unset(d.tooltip), render),
    crosshair: unset(d.crosshair),
    annotations: nonEmpty(d.annotations as NativeChartAnnotation[]),
    interaction: unset(d.interaction),
    padding: unset(d.padding),
    palette: nonEmpty(d.palette as string[]),
    ariaLabel: d.ariaLabel || undefined,
  };
};

const quadrantConfig = (self: Instance): QuadrantConfig => {
  const d = self.data;
  return {
    points: (d.points as NativeQuadrantPoint[] | null) ?? [],
    xDomain: unset(d.xDomain),
    yDomain: unset(d.yDomain),
    xSplit: unset(d.xSplit),
    ySplit: unset(d.ySplit),
    quadrants: unset(d.quadrants),
    xLabel: d.xLabel || undefined,
    yLabel: d.yLabel || undefined,
    axisLabels: unset(d.axisLabels),
    showTicks: d.showTicks,
    reverseX: d.reverseX,
    showLabels: d.showLabels,
    pointSize: d.pointSize,
    name: d.name || undefined,
    draggable: d.draggable,
  };
};

/** Engine options of the current properties, like the web components */
const chartOptions = (self: Instance, state: ChartState): ChartOptions => {
  const d = self.data;
  const { config } = state;
  if (state.kind === "quadrant") {
    const points = (d.points as NativeQuadrantPoint[] | null) ?? [];
    const render = (config as NativeQuadrantChartConfig).renderTooltip;
    return quadrantChartOptions(
      quadrantConfig(self),
      baseOptions(
        self,
        render
          ? (event) => {
              const index = event.items[0]?.index;
              return index !== undefined && points[index]
                ? render(points[index], index)
                : null;
            }
          : undefined,
      ),
    );
  }
  const { renderTooltip, xAxis, yAxis } = config as NativeChartConfig;
  const input = (d.series as NativeChartSeries[] | null) ?? [];
  const series =
    state.kind === "line"
      ? lineSeries(input, !!d.area)
      : state.kind === "bar"
        ? barSeries(input, !!d.stacked)
        : state.kind === "scatter"
          ? scatterSeries(input)
          : input;
  return {
    ...baseOptions(self, renderTooltip),
    series,
    xAxis: axisOption(unset(d.xAxis), xAxis?.format),
    yAxis: axisOption(unset(d.yAxis), yAxis?.format),
  };
};

const applyOptions = (self: Instance) => {
  const state = states.get(self);
  state?.chart?.setOptions(chartOptions(self, state));
};

const applyTheme = (self: Instance) => {
  const state = states.get(self);
  if (!state) return;
  const theme = chartTheme(configOf(self));
  if (theme === state.theme) return;
  state.theme = theme;
  state.chart?.setTheme(theme);
};

const emptyHover = { items: [], x: null, xLabel: "" };

const bindEvents = (
  self: Instance,
  state: ChartState,
  chart: CanvasChartInstance,
) => {
  chart.on("hover", (event) => self.triggerEvent("hover", event ?? emptyHover));
  chart.on("zoom", (view) => self.triggerEvent("zoom", view));
  chart.on("layout", (rect) => self.triggerEvent("layout", rect));
  if (state.kind !== "quadrant") {
    chart.on("click", (event) => self.triggerEvent("pointclick", event));
    chart.on("plotClick", (at) => self.triggerEvent("plotclick", at));
    chart.on("drag", (event) => self.triggerEvent("pointdrag", event));
    chart.on("drop", (event) => self.triggerEvent("pointdrop", event));
    return;
  }
  const point = (index: number) =>
    ((self.data.points as NativeQuadrantPoint[] | null) ?? [])[index];
  const target = (x: number, y: number) => ({
    x,
    y,
    quadrant: quadrantOf(quadrantConfig(self), x, y),
  });
  chart.on("click", (event) => {
    const index = event.items[0]?.index;
    if (index !== undefined && point(index))
      self.triggerEvent("pointclick", { point: point(index), index });
  });
  chart.on("plotClick", (at) =>
    self.triggerEvent("quadrantclick", {
      quadrant: quadrantOf(quadrantConfig(self), at.x, at.y),
      x: at.x,
      y: at.y,
    }),
  );
  for (const [source, name] of [
    ["drag", "pointdrag"],
    ["drop", "pointdrop"],
  ] as const)
    chart.on(source, (event) => {
      const index = event.item.index;
      if (point(index))
        self.triggerEvent(name, {
          point: point(index),
          index,
          target: target(event.x, event.y),
        });
    });
};

/** Measures the canvas node, then creates (or resizes) the chart */
const measure = (self: Instance) => {
  const state = states.get(self);
  if (!state) return;
  self
    .createSelectorQuery()
    .select(".mn-chart-canvas")
    .fields({ node: true, size: true })
    .exec((result: unknown[] | null) => {
      if (states.get(self) !== state) return; // detached meanwhile
      const hit = result?.[0] as {
        node?: ChartCanvas;
        width?: number;
        height?: number;
      } | null;
      const width = Number(hit?.width),
        height = Number(hit?.height);
      // A hidden chart (closed tab, display:none) measures 0: call resize() later
      if (!hit?.node || !(width > 0) || !(height > 0)) return;
      const ratio = pixelRatio();
      if (state.chart) {
        state.chart.resize(width, height, ratio);
        return;
      }
      if (!state.theme) state.theme = chartTheme(configOf(self));
      const chart = createCanvasChart({
        canvas: hit.node,
        width,
        height,
        pixelRatio: ratio,
        options: chartOptions(self, state),
        theme: state.theme,
      });
      state.chart = chart;
      bindEvents(self, state, chart);
    });
};

const touches = (input: ArrayLike<NativeTouch> | undefined): ChartTouch[] =>
  Array.from(input ?? [])
    .filter(
      (t) => t && Number.isFinite(Number(t.x)) && Number.isFinite(Number(t.y)),
    )
    .map((t, i) => ({
      x: Number(t.x),
      y: Number(t.y),
      identifier: t.identifier ?? i,
    }));

const COMMON_OPTIONS = [
  "legend",
  "tooltip",
  "crosshair",
  "annotations",
  "interaction",
  "padding",
  "palette",
  "ariaLabel",
];
const SERIES_OPTIONS = ["series", "xAxis", "yAxis"];
const QUADRANT_OPTIONS = [
  "points",
  "xDomain",
  "yDomain",
  "xSplit",
  "ySplit",
  "quadrants",
  "xLabel",
  "yLabel",
  "axisLabels",
  "showTicks",
  "reverseX",
  "showLabels",
  "pointSize",
  "name",
  "draggable",
];

function defineChart(kind: ChartKind): Control {
  const kindProperties: WechatMiniprogram.IAnyObject =
    kind === "quadrant"
      ? {
          points: list(),
          xDomain: optional(),
          yDomain: optional(),
          xSplit: optional(),
          ySplit: optional(),
          quadrants: optional(),
          xLabel: text(),
          yLabel: text(),
          axisLabels: optional(),
          showTicks: flag(true),
          reverseX: flag(),
          showLabels: flag(true),
          pointSize: { type: Number, value: 12 },
          name: text(),
          draggable: flag(),
        }
      : {
          series: list(),
          xAxis: optional(),
          yAxis: optional(),
          ...(kind === "line" ? { area: flag() } : {}),
          ...(kind === "bar" ? { stacked: flag() } : {}),
        };
  const optionNames = [
    ...COMMON_OPTIONS,
    ...(kind === "quadrant" ? QUADRANT_OPTIONS : SERIES_OPTIONS),
    ...(kind === "line" ? ["area"] : kind === "bar" ? ["stacked"] : []),
  ];
  return {
    template: `<view class="mn-chart" style="display:block;position:relative;width:{{chartWidth}};height:{{chartHeight}}"><canvas type="2d" class="mn-chart-canvas" style="display:block;width:100%;height:100%" disable-scroll="{{disableScroll}}" aria-role="img" aria-label="{{ariaLabel}}" bindtouchstart="onTouchStart" bindtouchmove="onTouchMove" bindtouchend="onTouchEnd" bindtouchcancel="onTouchCancel"></canvas></view>`,
    definition: {
      properties: {
        width: { type: null, value: "100%" },
        height: { type: null, value: 320 },
        legend: optional(),
        tooltip: optional(),
        crosshair: optional(),
        annotations: list(),
        interaction: optional(),
        padding: optional(),
        palette: list(),
        ariaLabel: text(),
        disableScroll: flag(),
        ...kindProperties,
      },
      data: { chartWidth: "100%", chartHeight: "320px" },
      observers: {
        [optionNames.join(",")]: function (this: Instance) {
          applyOptions(this);
        },
        "width,height": function (this: Instance) {
          const width = cssSize(this.data.width, "100%"),
            height = cssSize(this.data.height, "320px");
          if (
            width === this.data.chartWidth &&
            height === this.data.chartHeight
          )
            return;
          this.setData({ chartWidth: width, chartHeight: height }, () => {
            if (states.get(this)?.ready) measure(this);
          });
        },
        "inheritedTheme,inheritedMode,inheritedPalette": function (
          this: Instance,
        ) {
          applyTheme(this);
        },
      },
      lifetimes: {
        attached(this: Instance) {
          stateOf(this, kind);
          this.setData({
            chartWidth: cssSize(this.data.width, "100%"),
            chartHeight: cssSize(this.data.height, "320px"),
          });
        },
        ready(this: Instance) {
          stateOf(this, kind).ready = true;
          measure(this);
        },
        detached(this: Instance) {
          states.get(this)?.chart?.destroy();
          states.delete(this);
        },
      },
      methods: {
        configure(this: Instance, config: ChartConfig) {
          stateOf(this, kind).config = { ...config };
          applyOptions(this);
        },
        resize(this: Instance) {
          measure(this);
        },
        resetZoom(this: Instance) {
          states.get(this)?.chart?.resetZoom();
        },
        getView(this: Instance) {
          return states.get(this)?.chart?.getView() ?? null;
        },
        setView(
          this: Instance,
          view: Parameters<CanvasChartInstance["setView"]>[0],
        ) {
          states.get(this)?.chart?.setView(view);
        },
        getPlotRect(this: Instance) {
          return states.get(this)?.chart?.getPlotRect() ?? null;
        },
        toPixel(this: Instance, x: number, y: number) {
          return states.get(this)?.chart?.toPixel(x, y) ?? null;
        },
        fromPixel(this: Instance, x: number, y: number) {
          return states.get(this)?.chart?.fromPixel(x, y) ?? null;
        },
        onTouchStart(this: Instance, event: NativeTouchEvent) {
          const changed = touches(event.changedTouches);
          states
            .get(this)
            ?.chart?.touchStart(
              changed.length ? changed : touches(event.touches),
            );
        },
        onTouchMove(this: Instance, event: NativeTouchEvent) {
          const current = touches(event.touches);
          states
            .get(this)
            ?.chart?.touchMove(
              current.length ? current : touches(event.changedTouches),
            );
        },
        onTouchEnd(this: Instance, event: NativeTouchEvent) {
          states.get(this)?.chart?.touchEnd(touches(event.changedTouches));
        },
        onTouchCancel(this: Instance, event: NativeTouchEvent) {
          const changed = touches(event.changedTouches);
          states
            .get(this)
            ?.chart?.touchCancel(changed.length ? changed : undefined);
        },
      },
    },
  };
}

/** Any mix of line, area, bar and scatter series (each sets its `type`) */
export const chart = defineChart("chart");
/** Line chart (`area` fills the lines) */
export const lineChart = defineChart("line");
/** Bar chart, grouped or `stacked` */
export const barChart = defineChart("bar");
/** Scatter chart, zooming on both axes */
export const scatterChart = defineChart("scatter");
/** Four-quadrant matrix with labelled, optionally draggable dots */
export const quadrantChart = defineChart("quadrant");
