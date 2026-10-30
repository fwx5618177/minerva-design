// Native WeChat shape chart components (pie-chart, donut-chart, radar-chart,
// gauge-chart, funnel-chart, treemap-chart, sankey-chart, sunburst-chart,
// radial-bar-chart, calendar-heatmap, bullet-chart, chord-chart and the generic
// shape-chart): the
// DOM-free `createCanvasShapeChart` of minerva-design/charts drawn on a
// `<canvas type="2d">`, legend, tooltip and animations included.
import {
  calendarStrips,
  createCanvasShapeChart,
  type CanvasShapeChartInstance,
  type ChartCanvas,
  type ChartThemeInput,
  type ChartTouch,
  type ChordChartOptions,
  type ShapeChartCommonOptions,
  type ShapeChartOptions,
  type ShapeHoverEvent,
} from "@minerva/charts/canvas";
import { chartTheme } from "./charts";
import { describeShapeChart } from "./chart-a11y";
import type { NativeConfiguration } from "./configuration";
import type {
  NativeShapeChartConfig,
  NativeShapeHoverEvent,
} from "./public-types";
import { windowInfo } from "./system-info";

export type { NativeShapeChartConfig } from "./public-types";

type Instance = WechatMiniprogram.Component.TrivialInstance;
type Control = { template: string; definition: WechatMiniprogram.IAnyObject };
type ShapeKind =
  | "pie"
  | "donut"
  | "radar"
  | "gauge"
  | "funnel"
  | "treemap"
  | "sankey"
  | "sunburst"
  | "radialBar"
  | "calendarHeatmap"
  | "bullet"
  | "chord"
  | "shape";
interface NativeTouch {
  x?: number;
  y?: number;
  identifier?: number;
}
interface NativeTouchEvent {
  touches?: ArrayLike<NativeTouch>;
  changedTouches?: ArrayLike<NativeTouch>;
}
interface ShapeState {
  kind: ShapeKind;
  chart: CanvasShapeChartInstance | null;
  config: NativeShapeChartConfig;
  theme: ChartThemeInput | undefined;
  ready: boolean;
}

const states = new WeakMap<object, ShapeState>();
const optional = () => ({ type: null, value: null });
const flag = (value = false) => ({ type: Boolean, value });
const text = (value = "") => ({ type: String, value });
const list = () => ({ type: Array, value: [] });

/** `null` / `""` properties mean "not set" (engine default) */
const unset = <T>(value: T | null | undefined | ""): T | undefined =>
  value === null || value === "" ? undefined : (value as T | undefined);
const nonEmpty = <T>(value: readonly T[] | null | undefined) =>
  value && value.length ? value : undefined;

/** Default height of a chart (like the web components): by type, or from the data */
const defaultHeight = (options: ShapeChartOptions): string => {
  switch (options.type) {
    case "gauge":
      return "240px";
    case "radialBar":
      return "300px";
    case "sankey":
    case "sunburst":
      return "360px";
    case "chord":
      return "420px";
    case "calendarHeatmap":
      // one strip of weeks per year when the range spans more than 53 weeks
      return options.layout === "months"
        ? "560px"
        : `${calendarStrips(options) * 120 + (options.legend === false ? 0 : 34) + 16}px`;
    case "bullet":
      return options.orientation === "vertical"
        ? "320px"
        : `${
            Math.max(96, (options.data?.length ?? 0) * 64 + 16) +
            (options.legend ? 34 : 0)
          }px`;
    default:
      return "320px";
  }
};

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

const stateOf = (self: Instance, kind: ShapeKind) => {
  let state = states.get(self);
  if (!state) {
    state = { kind, chart: null, config: {}, theme: undefined, ready: false };
    states.set(self, state);
  }
  return state;
};

const configOf = (self: Instance): NativeConfiguration | undefined =>
  typeof self.getConfig === "function" ? self.getConfig() : undefined;

/** Function options of `configure()` merged into the engine options */
const withConfig = <T extends ShapeChartCommonOptions>(
  options: T,
  config: NativeShapeChartConfig,
): T => {
  const { format, percentFormat, renderTooltip, tickFormat } = config;
  const out: T = { ...options };
  if (format) out.format = format;
  if (percentFormat) out.percentFormat = percentFormat;
  if (tickFormat && (out as { type?: string }).type === "chord")
    (out as unknown as ChordChartOptions).tickFormat = tickFormat;
  if (renderTooltip && out.tooltip !== false)
    out.tooltip = {
      ...(typeof out.tooltip === "object" ? out.tooltip : {}),
      render: (event: ShapeHoverEvent) =>
        renderTooltip(event as NativeShapeHoverEvent),
    };
  return out;
};

/** Options shared by every shape type */
const commonOptions = (self: Instance): ShapeChartCommonOptions => {
  const d = self.data;
  return {
    palette: nonEmpty(d.palette as string[]),
    legend: unset(d.legend),
    tooltip: unset(d.tooltip),
    hidden: unset(d.hidden as number[] | null),
    animation: unset(d.animation),
    padding: unset(d.padding),
    ariaLabel: d.ariaLabel || undefined,
    locale: (d.locale as string) || undefined,
    texts: unset(d.texts as ShapeChartCommonOptions["texts"] | null),
  };
};

/** Engine options of the current properties */
const shapeOptions = (self: Instance, state: ShapeState): ShapeChartOptions => {
  const d = self.data;
  if (state.kind === "shape") {
    const options = (d.options ?? {}) as ShapeChartOptions;
    return withConfig({ ...options }, state.config);
  }
  const common = commonOptions(self);
  let options: ShapeChartOptions;
  switch (state.kind) {
    case "pie":
    case "donut":
      options = {
        ...common,
        type: "pie",
        data: (d.data as []) ?? [],
        innerRadius:
          unset(d.innerRadius as number | null) ??
          (state.kind === "donut" ? 0.62 : 0),
        startAngle: unset(d.startAngle),
        padAngle: unset(d.padAngle),
        cornerRadius: unset(d.cornerRadius),
        rose: unset(d.rose),
        labels: unset(d.labels),
        labelContent: unset(d.labelContent),
        centerValue: d.centerValue || undefined,
        centerLabel: d.centerLabel || undefined,
      };
      break;
    case "radar":
      options = {
        ...common,
        type: "radar",
        indicators: (d.indicators as []) ?? [],
        series: (d.series as []) ?? [],
        shape: unset(d.shape),
        levels: unset(d.levels),
        dots: unset(d.dots),
      };
      break;
    case "gauge":
      options = {
        ...common,
        type: "gauge",
        value: Number(d.value) || 0,
        min: unset(d.min),
        max: unset(d.max),
        label: d.label || undefined,
        sweep: unset(d.sweep),
        thickness: unset(d.thickness),
        bands: nonEmpty(d.bands as []),
        color: d.color || undefined,
        needle: unset(d.needle),
        ticks: unset(d.ticks),
      };
      break;
    case "funnel":
      options = {
        ...common,
        type: "funnel",
        data: (d.data as []) ?? [],
        sort: unset(d.sort),
        gap: unset(d.gap),
        conversion: unset(d.conversion),
        shape: unset(d.shape),
      };
      break;
    case "sankey":
      options = {
        ...common,
        type: "sankey",
        nodes: nonEmpty(d.nodes as []),
        links: (d.links as []) ?? [],
        nodeWidth: unset(d.nodeWidth),
        nodePadding: unset(d.nodePadding),
        align: unset(d.align),
        iterations: unset(d.iterations),
        linkColor: unset(d.linkColor),
        linkOpacity: unset(d.linkOpacity),
        labels: unset(d.labels),
        labelValues: unset(d.labelValues),
      };
      break;
    case "sunburst":
      options = {
        ...common,
        type: "sunburst",
        data: (d.data as []) ?? [],
        innerRadius: unset(d.innerRadius),
        levels: unset(d.levels),
        startAngle: unset(d.startAngle),
        padAngle: unset(d.padAngle),
        cornerRadius: unset(d.cornerRadius),
        labels: unset(d.labels),
        drill: unset(d.drill),
        drillPath: unset(d.drillPath as string[] | null),
      };
      break;
    case "radialBar":
      options = {
        ...common,
        type: "radialBar",
        data: (d.data as []) ?? [],
        max: unset(d.max),
        innerRadius: unset(d.innerRadius),
        startAngle: unset(d.startAngle),
        sweep: unset(d.sweep),
        gap: unset(d.gap),
        track: unset(d.track),
        rounded: unset(d.rounded),
        labels: unset(d.labels),
        labelContent: unset(d.labelContent),
        centerValue: d.centerValue || undefined,
        centerLabel: d.centerLabel || undefined,
      };
      break;
    case "calendarHeatmap":
      options = {
        ...common,
        type: "calendarHeatmap",
        data: (d.data as []) ?? [],
        range: unset(d.range),
        layout: unset(d.layout),
        weekStart: unset(d.weekStart),
        locale: d.locale || undefined,
        color: d.color || undefined,
        colors: nonEmpty(d.colors as string[]),
        levels: unset(d.levels),
        thresholds: nonEmpty(d.thresholds as number[]),
        gap: unset(d.gap),
        radius: unset(d.radius),
        maxCellSize: unset(d.maxCellSize),
        monthLabels: unset(d.monthLabels),
        weekdayLabels: unset(d.weekdayLabels),
      };
      break;
    case "bullet":
      options = {
        ...common,
        type: "bullet",
        data: (d.data as []) ?? [],
        orientation: unset(d.orientation),
        ranges: nonEmpty(d.ranges as number[]),
        rangeLabels: nonEmpty(d.rangeLabels as string[]),
        rangeColors: nonEmpty(d.rangeColors as string[]),
        barSize: unset(d.barSize),
        targetColor: d.targetColor || undefined,
        ticks: unset(d.ticks),
      };
      break;
    case "chord":
      options = {
        ...common,
        type: "chord",
        groups: nonEmpty(d.groups as string[]),
        matrix: nonEmpty(d.matrix as number[][]),
        links: nonEmpty(d.links as []),
        directed: unset(d.directed as boolean | null),
        arrows: unset(d.arrows as boolean | null),
        padAngle: unset(d.padAngle as number | null),
        startAngle: unset(d.startAngle as number | null),
        sortGroups: unset(d.sortGroups as ChordChartOptions["sortGroups"]),
        sortSubgroups: unset(
          d.sortSubgroups as ChordChartOptions["sortSubgroups"],
        ),
        ribbonColor: unset(d.ribbonColor as ChordChartOptions["ribbonColor"]),
        ribbonOpacity: unset(d.ribbonOpacity as number | null),
        arcWidth: unset(d.arcWidth as number | null),
        ticks: unset(d.ticks as boolean | number | null),
        labels: unset(d.labels as ChordChartOptions["labels"]),
      };
      break;
    default:
      options = {
        ...common,
        type: "treemap",
        data: (d.data as []) ?? [],
        gap: unset(d.gap),
        headers: unset(d.headers),
      };
  }
  const config = withConfig(options, state.config);
  // mini-programs have no `<html lang>`: the ConfigProvider's language
  const language = self.data.localeLanguage as string | undefined;
  return config.locale || !language ? config : { ...config, locale: language };
};

const applyOptions = (self: Instance) => {
  const state = states.get(self);
  if (!state) return;
  const options = shapeOptions(self, state);
  state.chart?.setOptions(options);
  const label = describeShapeChart(options);
  if (label !== self.data.chartLabel) self.setData({ chartLabel: label });
};

const applyTheme = (self: Instance) => {
  const state = states.get(self);
  if (!state) return;
  const theme = chartTheme(configOf(self));
  if (theme === state.theme) return;
  state.theme = theme;
  state.chart?.setTheme(theme);
};

/** Detail of `hover` when the highlight is cleared */
const CLEARED: NativeShapeHoverEvent = {
  index: -1,
  name: "",
  value: 0,
  percent: 0,
  color: "",
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
      const chart = createCanvasShapeChart({
        canvas: hit.node,
        width,
        height,
        pixelRatio: ratio,
        options: shapeOptions(self, state),
        theme: state.theme,
      });
      state.chart = chart;
      chart.on("hover", (event) =>
        self.triggerEvent("hover", event ?? CLEARED),
      );
      chart.on("click", (event) => self.triggerEvent("click", event));
      chart.on("toggle", (event) => self.triggerEvent("toggle", event));
      chart.on("drill", (event) => self.triggerEvent("drill", event));
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
  "palette",
  "legend",
  "tooltip",
  "hidden",
  "animation",
  "padding",
  "ariaLabel",
  "locale",
  "texts",
];

/** Properties of the shape types added after the first six */
const SHAPE_PROPERTIES: Partial<
  Record<ShapeKind, WechatMiniprogram.IAnyObject>
> = {
  sankey: {
    nodes: list(),
    links: list(),
    nodeWidth: optional(),
    nodePadding: optional(),
    align: text(),
    iterations: optional(),
    linkColor: text(),
    linkOpacity: optional(),
    labels: optional(),
    labelValues: optional(),
  },
  sunburst: {
    data: list(),
    innerRadius: optional(),
    levels: optional(),
    startAngle: optional(),
    padAngle: optional(),
    cornerRadius: optional(),
    labels: text(),
    drill: optional(),
    drillPath: optional(),
  },
  radialBar: {
    data: list(),
    max: optional(),
    innerRadius: optional(),
    startAngle: optional(),
    sweep: optional(),
    gap: optional(),
    track: optional(),
    rounded: optional(),
    labels: optional(),
    labelContent: optional(),
    centerValue: text(),
    centerLabel: text(),
  },
  calendarHeatmap: {
    data: list(),
    range: optional(),
    layout: text(),
    weekStart: optional(),
    locale: text(),
    color: text(),
    colors: list(),
    levels: optional(),
    thresholds: list(),
    gap: optional(),
    radius: optional(),
    maxCellSize: optional(),
    monthLabels: optional(),
    weekdayLabels: optional(),
  },
  bullet: {
    data: list(),
    orientation: text(),
    ranges: list(),
    rangeLabels: list(),
    rangeColors: list(),
    barSize: optional(),
    targetColor: text(),
    ticks: optional(),
  },
  chord: {
    groups: list(),
    matrix: list(),
    links: list(),
    directed: optional(),
    arrows: optional(),
    padAngle: optional(),
    startAngle: optional(),
    sortGroups: text(),
    sortSubgroups: text(),
    ribbonColor: text(),
    ribbonOpacity: optional(),
    arcWidth: optional(),
    ticks: optional(),
    labels: text(),
  },
};

function defineShapeChart(kind: ShapeKind): Control {
  const kindProperties: WechatMiniprogram.IAnyObject =
    kind === "pie" || kind === "donut"
      ? {
          data: list(),
          innerRadius: optional(),
          startAngle: optional(),
          padAngle: optional(),
          cornerRadius: optional(),
          rose: optional(),
          labels: text(),
          labelContent: optional(),
          centerValue: text(),
          centerLabel: text(),
        }
      : kind === "radar"
        ? {
            indicators: list(),
            series: list(),
            shape: text(),
            levels: optional(),
            dots: optional(),
          }
        : kind === "gauge"
          ? {
              value: { type: Number, value: 0 },
              min: optional(),
              max: optional(),
              label: text(),
              sweep: optional(),
              thickness: optional(),
              bands: list(),
              color: text(),
              needle: optional(),
              ticks: optional(),
            }
          : kind === "funnel"
            ? {
                data: list(),
                sort: text(),
                gap: optional(),
                conversion: optional(),
                shape: text(),
              }
            : kind === "treemap"
              ? { data: list(), gap: optional(), headers: optional() }
              : (SHAPE_PROPERTIES[kind] ?? { options: optional() });
  const optionNames = [
    ...new Set([
      ...(kind === "shape" ? [] : COMMON_OPTIONS),
      ...Object.keys(kindProperties),
    ]),
  ];
  /** CSS height of the chart: the property, else the default of the type / data */
  const chartHeight = (self: Instance) =>
    cssSize(
      self.data.height,
      defaultHeight(shapeOptions(self, stateOf(self, kind))),
    );
  const fallback = kind === "gauge" ? "240px" : "320px";
  return {
    template: `<view class="mn-chart mn-shape-chart" style="display:block;position:relative;width:{{chartWidth}};height:{{chartHeight}}"><canvas type="2d" class="mn-chart-canvas" style="display:block;width:100%;height:100%" disable-scroll="{{disableScroll}}" aria-role="img" aria-label="{{chartLabel}}" bindtouchstart="onTouchStart" bindtouchmove="onTouchMove" bindtouchend="onTouchEnd" bindtouchcancel="onTouchCancel"></canvas></view>`,
    definition: {
      properties: {
        width: { type: null, value: "100%" },
        height: { type: null, value: null },
        disableScroll: flag(),
        ...(kind === "shape"
          ? {}
          : {
              palette: list(),
              legend: optional(),
              tooltip: optional(),
              hidden: optional(),
              animation: optional(),
              padding: optional(),
              ariaLabel: text(),
              locale: text(),
              texts: optional(),
            }),
        ...kindProperties,
      },
      data: { chartWidth: "100%", chartHeight: fallback, chartLabel: "" },
      observers: {
        [[...optionNames, "localeLanguage"].join(",")]: function (
          this: Instance,
        ) {
          applyOptions(this);
        },
        [["width", "height", ...optionNames].join(",")]: function (
          this: Instance,
        ) {
          const width = cssSize(this.data.width, "100%"),
            height = chartHeight(this);
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
          const state = stateOf(this, kind);
          const options = shapeOptions(this, state);
          this.setData({
            chartWidth: cssSize(this.data.width, "100%"),
            chartHeight: chartHeight(this),
            chartLabel: describeShapeChart(options),
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
        configure(this: Instance, config: NativeShapeChartConfig) {
          stateOf(this, kind).config = { ...config };
          applyOptions(this);
        },
        resize(this: Instance) {
          measure(this);
        },
        toggle(this: Instance, index: number) {
          states.get(this)?.chart?.toggle(index);
        },
        getHidden(this: Instance) {
          return states.get(this)?.chart?.getHidden() ?? [];
        },
        clearHover(this: Instance) {
          states.get(this)?.chart?.clearHover();
        },
        drill(this: Instance, path: readonly string[]) {
          states.get(this)?.chart?.drill(path);
        },
        getDrillPath(this: Instance) {
          return states.get(this)?.chart?.getDrillPath() ?? [];
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

/** Pie chart (`innerRadius` makes a donut, `rose` a Nightingale rose) */
export const pieChart = defineShapeChart("pie");
/** Donut chart: a pie chart with a hole (innerRadius 0.62) and center texts */
export const donutChart = defineShapeChart("donut");
/** Radar (spider) chart comparing series over indicators */
export const radarChart = defineShapeChart("radar");
/** Gauge showing one value on an arc, with colored bands */
export const gaugeChart = defineShapeChart("gauge");
/** Funnel chart of the stages of a process, with conversion rates */
export const funnelChart = defineShapeChart("funnel");
/** Treemap: nested rectangles of areas proportional to the values */
export const treemapChart = defineShapeChart("treemap");
/** Sankey diagram: flows between nodes in columns */
export const sankeyChart = defineShapeChart("sankey");
/** Sunburst chart: a hierarchy as rings; tapping a parent drills into it (`drill` event) */
export const sunburstChart = defineShapeChart("sunburst");
/** Radial bar chart: concentric progress rings */
export const radialBarChart = defineShapeChart("radialBar");
/** Calendar heatmap: daily values on a calendar */
export const calendarHeatmap = defineShapeChart("calendarHeatmap");
/** Bullet chart: KPI bars against qualitative ranges and a target */
export const bulletChart = defineShapeChart("bullet");
/** Chord diagram: flows between groups around a circle */
export const chordChart = defineShapeChart("chord");
/** Any shape type of the engine from its `options` */
export const shapeChart = defineShapeChart("shape");
