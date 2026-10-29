// Option presets of the chart components, shared by every platform (React,
// mini-programs, React Native): they turn component props into engine
// options.

import type {
  ChartAnnotation,
  ChartInteractionOptions,
  ChartOptions,
  ChartSeries,
  ChartSeriesType,
} from "./types";

/** Gives the series without a `type` the type of the component */
export const withSeriesType = (
  series: readonly ChartSeries[],
  type: ChartSeriesType,
  stack?: string,
): ChartSeries[] =>
  series.map((s) => ({
    ...s,
    type: s.type ?? type,
    ...(stack !== undefined && (s.type ?? type) === "bar"
      ? { stack: s.stack ?? stack }
      : {}),
  }));

/** Series of a LineChart (`area` fills them) */
export const lineSeries = (series: readonly ChartSeries[], area = false) =>
  withSeriesType(series, area ? "area" : "line");

/** Series of a BarChart (`stacked` stacks them) */
export const barSeries = (series: readonly ChartSeries[], stacked = false) =>
  withSeriesType(series, "bar", stacked ? "stack" : undefined);

/** Series of a ScatterChart */
export const scatterSeries = (series: readonly ChartSeries[]) =>
  withSeriesType(series, "scatter");

/** A point of a QuadrantChart */
export interface QuadrantPoint {
  /** Position on the horizontal axis */
  x: number;
  /** Position on the vertical axis */
  y: number;
  /** Text drawn next to the dot and shown in the tooltip */
  label?: string;
  /** Dot color (any CSS color); the color of its quadrant by default */
  color?: string;
  /** Dot diameter in pixels */
  size?: number;
}

/** Title and color of a quadrant */
export interface QuadrantRegion {
  /** Title drawn in the outer corner of the quadrant */
  label?: string;
  /** Background tint and default dot color (any CSS color) */
  color?: string;
}

/** The four quadrants of a QuadrantChart */
export interface QuadrantRegions {
  topLeft?: QuadrantRegion;
  topRight?: QuadrantRegion;
  bottomLeft?: QuadrantRegion;
  bottomRight?: QuadrantRegion;
}

/** A quadrant, as seen on screen */
export type QuadrantCorner = keyof QuadrantRegions;

/** Texts at the four ends of the dividers, inside the plot */
export interface QuadrantAxisLabels {
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
}

/** Settings of a quadrant matrix (the props of QuadrantChart) */
export interface QuadrantConfig {
  /** Points to place */
  points: readonly QuadrantPoint[];
  /**
   * Range of the horizontal axis
   * @default [0, 10]
   */
  xDomain?: [number, number];
  /**
   * Range of the vertical axis
   * @default [0, 10]
   */
  yDomain?: [number, number];
  /** X value of the vertical divider (the middle of `xDomain` by default) */
  xSplit?: number;
  /** Y value of the horizontal divider (the middle of `yDomain` by default) */
  ySplit?: number;
  /** Titles and colors of the quadrants */
  quadrants?: QuadrantRegions;
  /** Title of the horizontal axis */
  xLabel?: string;
  /** Title of the vertical axis */
  yLabel?: string;
  /** Texts at the ends of the dividers, drawn inside the plot (e.g. "Important" at the top) */
  axisLabels?: QuadrantAxisLabels;
  /**
   * Shows the numeric ticks of the axes; `false` keeps only the matrix
   * @default true
   */
  showTicks?: boolean;
  /** Reverses the horizontal axis (e.g. "urgent" on the left) */
  reverseX?: boolean;
  /**
   * Draws the labels next to the dots (overlapping labels are skipped)
   * @default true
   */
  showLabels?: boolean;
  /**
   * Dot diameter in pixels
   * @default 12
   */
  pointSize?: number;
  /** Name of the points in the tooltip */
  name?: string;
  /** Lets the user drag the dots (`drag` / `drop` events) */
  draggable?: boolean;
}

export const DEFAULT_QUADRANT_COLORS: Required<Record<QuadrantCorner, string>> =
  {
    topLeft: "var(--danger-color, #ef4444)",
    topRight: "var(--primary-color, #4f46e5)",
    bottomLeft: "var(--warning-color, #f59e0b)",
    bottomRight: "var(--text-secondary-color, #64748b)",
  };

const DIVIDER = "var(--border-strong-color, var(--border-color, #cbd5e1))";

const splits = (config: QuadrantConfig) => {
  const [x0, x1] = config.xDomain ?? [0, 10];
  const [y0, y1] = config.yDomain ?? [0, 10];
  return {
    x0,
    x1,
    y0,
    y1,
    xs: config.xSplit ?? (x0 + x1) / 2,
    ys: config.ySplit ?? (y0 + y1) / 2,
  };
};

/** Quadrant of a data position, as seen on screen */
export const quadrantOf = (
  config: Pick<
    QuadrantConfig,
    "xDomain" | "yDomain" | "xSplit" | "ySplit" | "reverseX"
  >,
  x: number,
  y: number,
): QuadrantCorner => {
  const { xs, ys } = splits(config as QuadrantConfig);
  const right = config.reverseX ? x < xs : x >= xs;
  const top = y >= ys;
  return top
    ? right
      ? "topRight"
      : "topLeft"
    : right
      ? "bottomRight"
      : "bottomLeft";
};

/** Center of a quadrant in data coordinates */
export const quadrantCenter = (
  config: Pick<
    QuadrantConfig,
    "xDomain" | "yDomain" | "xSplit" | "ySplit" | "reverseX"
  >,
  corner: QuadrantCorner,
): { x: number; y: number } => {
  const { x0, x1, y0, y1, xs, ys } = splits(config as QuadrantConfig);
  const visualRight = corner.endsWith("Right");
  const dataHigh = config.reverseX ? !visualRight : visualRight;
  return {
    x: dataHigh ? (xs + x1) / 2 : (x0 + xs) / 2,
    y: corner.startsWith("top") ? (ys + y1) / 2 : (y0 + ys) / 2,
  };
};

/** Engine options of a quadrant matrix */
export const quadrantChartOptions = (
  config: QuadrantConfig,
  base: Omit<ChartOptions, "series"> = {},
): ChartOptions => {
  const { x0, x1, y0, y1, xs, ys } = splits(config);
  const reverseX = !!config.reverseX;
  const color = (corner: QuadrantCorner) =>
    config.quadrants?.[corner]?.color ?? DEFAULT_QUADRANT_COLORS[corner];

  const series: ChartSeries[] = [
    {
      type: "scatter",
      name: config.name ?? "",
      pointSize: config.pointSize ?? 12,
      showLabels: config.showLabels ?? true,
      opacity: 0.9,
      data: config.points.map((p) => ({
        x: p.x,
        y: p.y,
        label: p.label,
        size: p.size,
        color: p.color ?? color(quadrantOf(config, p.x, p.y)),
      })),
    },
  ];

  // visual left / right -> data ranges
  const left: [number, number] = reverseX ? [xs, x1] : [x0, xs];
  const right: [number, number] = reverseX ? [x0, xs] : [xs, x1];
  const rect = (
    corner: QuadrantCorner,
    [xa, xb]: [number, number],
    [ya, yb]: [number, number],
    position: "top-left" | "top-right" | "bottom-left" | "bottom-right",
  ): ChartAnnotation => ({
    type: "rect",
    x0: xa,
    x1: xb,
    y0: ya,
    y1: yb,
    color: color(corner),
    opacity: 0.07,
    label: config.quadrants?.[corner]?.label,
    labelPosition: position,
  });
  const ends = config.axisLabels ?? {};
  const visualLeft = reverseX ? x1 : x0;
  const visualRight = reverseX ? x0 : x1;
  const texts: ChartAnnotation[] = [
    ...(ends.top
      ? [{ type: "text", x: xs, y: y1, text: ends.top, anchor: "top" } as const]
      : []),
    ...(ends.bottom
      ? [
          {
            type: "text",
            x: xs,
            y: y0,
            text: ends.bottom,
            anchor: "bottom",
          } as const,
        ]
      : []),
    ...(ends.left
      ? [
          {
            type: "text",
            x: visualLeft,
            y: ys,
            text: ends.left,
            anchor: "left",
          } as const,
        ]
      : []),
    ...(ends.right
      ? [
          {
            type: "text",
            x: visualRight,
            y: ys,
            text: ends.right,
            anchor: "right",
          } as const,
        ]
      : []),
  ];

  const annotations: ChartAnnotation[] = [
    rect("topLeft", left, [ys, y1], "top-left"),
    rect("topRight", right, [ys, y1], "top-right"),
    rect("bottomLeft", left, [y0, ys], "bottom-left"),
    rect("bottomRight", right, [y0, ys], "bottom-right"),
    { type: "line", axis: "x", value: xs, dash: [], color: DIVIDER },
    { type: "line", axis: "y", value: ys, dash: [], color: DIVIDER },
    ...texts,
    ...(base.annotations ?? []),
  ];

  const showTicks = config.showTicks ?? true;
  const interaction: boolean | ChartInteractionOptions =
    base.interaction === false
      ? false
      : {
          zoom: false,
          ...(typeof base.interaction === "object" ? base.interaction : {}),
          ...(config.draggable ? { dragPoints: true } : {}),
        };

  return {
    ...base,
    series,
    annotations,
    tooltip:
      base.tooltip ??
      (showTicks
        ? undefined
        : {
            render: (event) => {
              const item = event.items[0];
              if (!item) return null;
              const region =
                config.quadrants?.[quadrantOf(config, item.x, item.y)]?.label;
              return [item.label ?? config.name ?? "", region ?? ""]
                .filter(Boolean)
                .join("\n");
            },
          }),
    xAxis: {
      min: x0,
      max: x1,
      title: config.xLabel,
      reverse: reverseX,
      nice: false,
      grid: false,
      tickCount: 4,
      visible: showTicks || !!config.xLabel,
      ...(showTicks ? {} : { format: () => "" }),
    },
    yAxis: {
      min: y0,
      max: y1,
      title: config.yLabel,
      nice: false,
      grid: false,
      tickCount: 4,
      visible: showTicks || !!config.yLabel,
      ...(showTicks ? {} : { format: () => "" }),
    },
    legend: base.legend ?? false,
    padding:
      base.padding ??
      (showTicks ? undefined : { top: 4, right: 4, bottom: 4, left: 4 }),
    interaction,
  };
};
