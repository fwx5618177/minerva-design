import { property } from "lit/decorators.js";
import {
  heatmapChartOptions,
  quadrantChartOptions,
  quadrantOf,
  sparklineOptions,
  type ChartDragEvent,
  type ChartHoverEvent,
  type ChartOptions,
  type ChartPlotClickEvent,
  type ChartSeries,
  type HeatmapCell,
  type QuadrantAxisLabels,
  type QuadrantConfig,
  type QuadrantPoint,
  type QuadrantRegions,
} from "minerva-design/charts/core";
import { MinervaCartesianChartElement } from "./chart";
import { withSeriesType } from "./series";

/** Engine options other than the series (axes, legend, tooltip, annotations...) */
export type ChartBaseOptions = Partial<ChartOptions>;

/** Base of the elements drawing `series` with a default series type */
export abstract class SeriesChartElement extends MinervaCartesianChartElement {
  /** Data series (`ChartSeries[]`); each may set its own `type`. Replace the array (or a `data` array) to update the chart; property only */
  @property({ attribute: false })
  series?: readonly ChartSeries[];

  /** Other engine options (`ChartOptions` of minerva-design/charts/core: axes, legend, tooltip, annotations...); property only */
  @property({ attribute: false })
  options?: ChartBaseOptions;

  protected abstract typed(series: readonly ChartSeries[]): ChartSeries[];

  protected stackMode(): ChartOptions["stackMode"] {
    return this.options?.stackMode;
  }

  protected engineOptions(): ChartOptions | null {
    const series = this.series ?? this.options?.series;
    if (!series) return null;
    return {
      ...this.options,
      series: this.typed(series),
      stackMode: this.stackMode(),
    };
  }
}

/**
 * Line chart (or area chart with `area`) of `minerva-design/charts/core`,
 * handling millions of points on the GPU: the `<LineChart>` of React. The
 * series without a `type` are drawn as lines.
 *
 * Published as the optional entry `minerva-design/web-components/chart`.
 *
 * @summary GPU line chart: straight, smooth or stepped, stacked or 100%.
 * @tag minerva-line-chart
 * @csspart root - The sized box of the chart
 * @csspart surface - The element the engine renders into
 */
export class MinervaLineChart extends SeriesChartElement {
  static override tagName = "minerva-line-chart";

  /** Fills the area under the lines */
  @property({ type: Boolean })
  area = false;

  /** Shape of the lines: straight, smooth (monotone) or steps */
  @property()
  curve: "linear" | "smooth" | "step" = "linear";

  /** Stacks the series on top of each other */
  @property({ type: Boolean })
  stacked = false;

  /** Scales the stacks to 100% (implies `stacked`) */
  @property({ type: Boolean })
  percent = false;

  protected typed(series: readonly ChartSeries[]): ChartSeries[] {
    return withSeriesType(
      series,
      this.area ? "area" : "line",
      this.stacked || this.percent ? "stack" : undefined,
      this.curve,
    );
  }

  protected override stackMode(): ChartOptions["stackMode"] {
    return this.percent ? "percent" : super.stackMode();
  }
}

/**
 * Area chart of `minerva-design/charts/core`: smooth by default, stacked or
 * 100% stacked (the `<AreaChart>` of React). The series without a `type`
 * are drawn as areas.
 *
 * Published as the optional entry `minerva-design/web-components/chart`.
 *
 * @summary GPU area chart: smooth, stacked or 100% stacked.
 * @tag minerva-area-chart
 * @csspart root - The sized box of the chart
 * @csspart surface - The element the engine renders into
 */
export class MinervaAreaChart extends SeriesChartElement {
  static override tagName = "minerva-area-chart";

  /** Shape of the edges: straight, smooth (monotone) or steps */
  @property()
  curve: "linear" | "smooth" | "step" = "smooth";

  /** Stacks the areas on top of each other */
  @property({ type: Boolean })
  stacked = false;

  /** Scales the stacks to 100% (implies `stacked`) */
  @property({ type: Boolean })
  percent = false;

  protected typed(series: readonly ChartSeries[]): ChartSeries[] {
    return withSeriesType(
      series,
      "area",
      this.stacked || this.percent ? "stack" : undefined,
      this.curve,
    );
  }

  protected override stackMode(): ChartOptions["stackMode"] {
    return this.percent ? "percent" : super.stackMode();
  }
}

/**
 * Bar chart of `minerva-design/charts/core`: grouped side by side, stacked
 * or 100% stacked, with optional value labels (the `<BarChart>` of React).
 * The series without a `type` are drawn as bars (set `type: "line"` on a
 * series for an overlay).
 *
 * Published as the optional entry `minerva-design/web-components/chart`.
 *
 * @summary GPU bar chart: grouped, stacked or 100%, with value labels.
 * @tag minerva-bar-chart
 * @csspart root - The sized box of the chart
 * @csspart surface - The element the engine renders into
 */
export class MinervaBarChart extends SeriesChartElement {
  static override tagName = "minerva-bar-chart";

  /** Stacks the bars of every series (otherwise they are grouped side by side) */
  @property({ type: Boolean })
  stacked = false;

  /** Scales the stacks to 100% (implies `stacked`) */
  @property({ type: Boolean })
  percent = false;

  /** Writes the value above every bar */
  @property({ type: Boolean })
  labels = false;

  protected typed(series: readonly ChartSeries[]): ChartSeries[] {
    return withSeriesType(
      series,
      "bar",
      this.stacked || this.percent ? "stack" : undefined,
    ).map((s) =>
      this.labels && s.type === "bar"
        ? { ...s, showLabels: s.showLabels ?? true }
        : s,
    );
  }

  protected override stackMode(): ChartOptions["stackMode"] {
    return this.percent ? "percent" : super.stackMode();
  }
}

/**
 * Scatter chart of `minerva-design/charts/core`: zooms on both axes, hit
 * testing through a spatial index (the `<ScatterChart>` of React). The
 * series without a `type` are drawn as dots.
 *
 * Published as the optional entry `minerva-design/web-components/chart`.
 *
 * @summary GPU scatter chart zooming on both axes.
 * @tag minerva-scatter-chart
 * @csspart root - The sized box of the chart
 * @csspart surface - The element the engine renders into
 */
export class MinervaScatterChart extends SeriesChartElement {
  static override tagName = "minerva-scatter-chart";

  protected typed(series: readonly ChartSeries[]): ChartSeries[] {
    return withSeriesType(series, "scatter");
  }
}

/**
 * Candlestick (OHLC) chart of `minerva-design/charts/core` (the
 * `<CandlestickChart>` of React): data points carry `open`, `high`, `low`
 * and `y` (the close). The series without a `type` are drawn as candles
 * (e.g. add a moving average with `type: "line"`).
 *
 * Published as the optional entry `minerva-design/web-components/chart`.
 *
 * @summary GPU candlestick chart of rising and falling candles.
 * @tag minerva-candlestick-chart
 * @csspart root - The sized box of the chart
 * @csspart surface - The element the engine renders into
 */
export class MinervaCandlestickChart extends SeriesChartElement {
  static override tagName = "minerva-candlestick-chart";

  protected typed(series: readonly ChartSeries[]): ChartSeries[] {
    return withSeriesType(series, "candlestick");
  }
}

/**
 * Heatmap of `minerva-design/charts/core` (the `<HeatmapChart>` of React):
 * a grid of cells colored by value, categories (or numbers) on both axes.
 *
 * Published as the optional entry `minerva-design/web-components/chart`.
 *
 * @summary GPU heatmap: a grid of cells colored by value.
 * @tag minerva-heatmap-chart
 * @csspart root - The sized box of the chart
 * @csspart surface - The element the engine renders into
 */
export class MinervaHeatmapChart extends MinervaCartesianChartElement {
  static override tagName = "minerva-heatmap-chart";

  /** Cells `{ x, y, value }`; property only */
  @property({ attribute: false })
  data?: readonly HeatmapCell[];

  /** Column names in order (collected from the data when omitted); property only */
  @property({ attribute: false })
  xCategories?: readonly string[];

  /** Row names from bottom to top (collected from the data when omitted); property only */
  @property({ attribute: false })
  yCategories?: readonly string[];

  /** Colors from the lowest to the highest value (a ramp of the first palette color by default); property only */
  @property({ attribute: false })
  colorScale?: readonly string[];

  /** Values at the ends of the color scale (the data range by default); property only */
  @property({ attribute: false })
  valueRange?: readonly [number, number];

  /** Name of the value in the tooltip */
  @property({ attribute: "value-name" })
  valueName?: string;

  /** Corner radius of the cells, in pixels */
  @property({ type: Number })
  radius?: number;

  /** Formats the values in the tooltip; property only */
  @property({ attribute: false })
  format?: (value: number) => string;

  /** Other engine options (axes, legend, tooltip, padding...); property only */
  @property({ attribute: false })
  options?: ChartBaseOptions;

  protected engineOptions(): ChartOptions | null {
    if (!this.data) return null;
    return heatmapChartOptions(
      {
        data: this.data,
        xCategories: this.xCategories,
        yCategories: this.yCategories,
        colorScale: this.colorScale,
        valueRange: this.valueRange,
        name: this.valueName,
        radius: this.radius,
        format: this.format,
      },
      this.options,
    );
  }
}

/**
 * Word-sized chart without axes (a trend in a table cell, a KPI card...) of
 * `minerva-design/charts/core`: the `<Sparkline>` of React.
 *
 * Published as the optional entry `minerva-design/web-components/chart`.
 *
 * @summary Small line, area or bar trend without axes.
 * @tag minerva-sparkline
 * @csspart root - The sized box of the chart
 * @csspart surface - The element the engine renders into
 */
export class MinervaSparkline extends MinervaCartesianChartElement {
  static override tagName = "minerva-sparkline";

  /** Height of the sparkline: pixels or any CSS length */
  @property()
  override height?: string | number = 48;

  /** Values (or `[x, y]` pairs, typed arrays...); property only */
  @property({ attribute: false })
  data?: ChartSeries["data"];

  /** How the values are drawn */
  @property()
  type: "line" | "area" | "bar" = "line";

  /** Color (any CSS color); the first palette color by default */
  @property()
  color?: string;

  /** Shape of the line */
  @property()
  curve: "linear" | "smooth" | "step" = "smooth";

  /** Draws a dashed reference line at this value (a target, the average...) */
  @property({ type: Number })
  reference?: number;

  /** Name of the value in the tooltip */
  @property({ attribute: "value-name" })
  valueName?: string;

  /** Formats the value in the tooltip; property only */
  @property({ attribute: false })
  format?: (value: number) => string;

  /** Other engine options (tooltip, palette, renderer...); property only */
  @property({ attribute: false })
  options?: ChartBaseOptions;

  protected engineOptions(): ChartOptions | null {
    if (!this.data) return null;
    return sparklineOptions(
      {
        data: this.data,
        type: this.type,
        color: this.color,
        curve: this.curve,
        name: this.valueName,
        reference: this.reference,
        format: this.format,
      },
      this.options,
    );
  }
}

/**
 * Four-quadrant matrix (priority matrix, Eisenhower, BCG...) of
 * `minerva-design/charts/core` (the `<QuadrantChart>` of React): tinted
 * quadrants with titles, dividers and labelled dots placed without
 * overlapping labels. With `drag-points`, dots can be dragged to another
 * quadrant (`minerva-point-drop`; update `points` to move them).
 *
 * Published as the optional entry `minerva-design/web-components/chart`.
 *
 * @summary Four-quadrant matrix of labelled, draggable dots.
 * @tag minerva-quadrant-chart
 * @csspart root - The sized box of the chart
 * @csspart surface - The element the engine renders into
 * @fires minerva-point-click - A dot was clicked; detail: { point, index }
 * @fires minerva-quadrant-click - The empty area of a quadrant was clicked; detail: { quadrant, x, y }
 * @fires minerva-point-drop - A dragged dot was released; detail: { point, index, x, y, quadrant }
 */
export class MinervaQuadrantChart extends MinervaCartesianChartElement {
  static override tagName = "minerva-quadrant-chart";

  /** Points `{ x, y, label, color, size }` to place; property only */
  @property({ attribute: false })
  points?: readonly QuadrantPoint[];

  /** Titles and colors of the quadrants (`topLeft`, `topRight`, `bottomLeft`, `bottomRight`); property only */
  @property({ attribute: false })
  quadrants?: QuadrantRegions;

  /** Title of the horizontal axis */
  @property({ attribute: "x-label" })
  xLabel?: string;

  /** Title of the vertical axis */
  @property({ attribute: "y-label" })
  yLabel?: string;

  /** Texts at the ends of the dividers, drawn inside the plot; property only */
  @property({ attribute: false })
  axisLabels?: QuadrantAxisLabels;

  /** Range of the horizontal axis (default [0, 10]); property only */
  @property({ attribute: false })
  xDomain?: [number, number];

  /** Range of the vertical axis (default [0, 10]); property only */
  @property({ attribute: false })
  yDomain?: [number, number];

  /** X value of the vertical divider (the middle of the x domain by default) */
  @property({ type: Number, attribute: "x-split" })
  xSplit?: number;

  /** Y value of the horizontal divider (the middle of the y domain by default) */
  @property({ type: Number, attribute: "y-split" })
  ySplit?: number;

  /** Reverses the horizontal axis (e.g. "urgent" on the left) */
  @property({ type: Boolean, attribute: "reverse-x" })
  reverseX = false;

  /** Hides the numeric ticks of the axes (only the matrix remains) */
  @property({ type: Boolean, attribute: "hide-ticks" })
  hideTicks = false;

  /** Hides the labels next to the dots */
  @property({ type: Boolean, attribute: "hide-labels" })
  hideLabels = false;

  /** Dot diameter in pixels */
  @property({ type: Number, attribute: "point-size" })
  pointSize = 12;

  /** Lets the user drag the dots (`minerva-point-drop`) */
  @property({ type: Boolean, attribute: "drag-points" })
  dragPoints = false;

  /** Other engine options (legend, tooltip, padding, palette...); property only */
  @property({ attribute: false })
  options?: Omit<ChartOptions, "series">;

  private geometry(): Pick<
    QuadrantConfig,
    "xDomain" | "yDomain" | "xSplit" | "ySplit" | "reverseX"
  > {
    return {
      xDomain: this.xDomain,
      yDomain: this.yDomain,
      xSplit: this.xSplit,
      ySplit: this.ySplit,
      reverseX: this.reverseX,
    };
  }

  protected engineOptions(): ChartOptions | null {
    if (!this.points) return null;
    return quadrantChartOptions(
      {
        ...this.geometry(),
        points: this.points,
        quadrants: this.quadrants,
        xLabel: this.xLabel,
        yLabel: this.yLabel,
        axisLabels: this.axisLabels,
        showTicks: !this.hideTicks,
        showLabels: !this.hideLabels,
        pointSize: this.pointSize,
        draggable: this.dragPoints,
      },
      this.options,
    );
  }

  protected override pointClicked(event: ChartHoverEvent): void {
    const index = event.items[0]?.index;
    const point = index === undefined ? undefined : this.points?.[index];
    if (point) this.emit("minerva-point-click", { point, index });
  }

  protected override plotClicked(event: ChartPlotClickEvent): void {
    this.emit("minerva-quadrant-click", {
      quadrant: quadrantOf(this.geometry(), event.x, event.y),
      x: event.x,
      y: event.y,
    });
  }

  protected override pointDropped(event: ChartDragEvent): void {
    const index = event.item.index;
    const point = this.points?.[index];
    if (!point) return;
    this.emit("minerva-point-drop", {
      point,
      index,
      x: event.x,
      y: event.y,
      quadrant: quadrantOf(this.geometry(), event.x, event.y),
    });
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "minerva-line-chart": MinervaLineChart;
    "minerva-area-chart": MinervaAreaChart;
    "minerva-bar-chart": MinervaBarChart;
    "minerva-scatter-chart": MinervaScatterChart;
    "minerva-candlestick-chart": MinervaCandlestickChart;
    "minerva-heatmap-chart": MinervaHeatmapChart;
    "minerva-sparkline": MinervaSparkline;
    "minerva-quadrant-chart": MinervaQuadrantChart;
  }
}
