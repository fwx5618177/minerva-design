import { property } from "lit/decorators.js";
import type {
  BulletChartOptions,
  BulletDatum,
  CalendarDate,
  CalendarDatum,
  CalendarHeatmapOptions,
  ChordChartOptions,
  ChordGroup,
  ChordLink,
  RadialBarChartOptions,
  RadialBarDatum,
  SankeyChartOptions,
  SankeyLink,
  SankeyNode,
  ShapeChartInstance,
  ShapeChartOptions,
  SunburstChartOptions,
  TreemapNode,
} from "minerva-design/charts/core";
import { MinervaShapeChartElement } from "./shape-chart";

/**
 * Sankey diagram of `minerva-design/charts/core` (the `<SankeyChart>` of
 * React): flows between nodes in columns, link thickness proportional to
 * the flow; hovering a node or a link highlights its flows.
 *
 * Published as the optional entry `minerva-design/web-components/chart`.
 *
 * @summary Sankey diagram of flows between nodes.
 * @tag minerva-sankey-chart
 * @csspart root - The sized box of the chart
 * @csspart surface - The element the engine renders into
 */
export class MinervaSankeyChart extends MinervaShapeChartElement {
  static override tagName = "minerva-sankey-chart";

  /** Nodes `{ name, color, column }` in their initial order (nodes only named by a link are appended); property only */
  @property({ attribute: false })
  nodes?: readonly SankeyNode[];

  /** Flows `{ source, target, value }` between the nodes (by name or index); property only */
  @property({ attribute: false })
  links?: readonly SankeyLink[];

  /** Column of the nodes without a `column` */
  @property()
  align: "justify" | "left" | "right" | "center" = "justify";

  /** Color of the links without `color` */
  @property({ attribute: "link-color" })
  linkColor: "gradient" | "source" | "target" | "neutral" = "gradient";

  /** Hides the node labels */
  @property({ type: Boolean, attribute: "hide-labels" })
  hideLabels = false;

  /** Other engine options (`SankeyChartOptions`: nodeWidth, nodePadding, iterations, palette, format...); property only */
  @property({ attribute: false })
  options?: Partial<Omit<SankeyChartOptions, "type">>;

  protected override get defaultHeight(): string | number {
    return 360;
  }

  protected engineOptions(): ShapeChartOptions | null {
    const links = this.links ?? this.options?.links;
    if (!links) return null;
    return {
      ...this.options,
      type: "sankey",
      nodes: this.nodes ?? this.options?.nodes,
      links,
      align: this.align,
      linkColor: this.linkColor,
      labels: this.hideLabels ? false : this.options?.labels,
    };
  }
}

/**
 * Sunburst chart of `minerva-design/charts/core` (the `<SunburstChart>` of
 * React): a hierarchy as concentric rings; clicking a parent zooms into
 * it, clicking the center goes back up.
 *
 * Published as the optional entry `minerva-design/web-components/chart`.
 *
 * @summary Sunburst of a hierarchy, with drill-down.
 * @tag minerva-sunburst-chart
 * @csspart root - The sized box of the chart
 * @csspart surface - The element the engine renders into
 * @fires minerva-drill - A parent or the center was clicked (or `drill()` called); detail: { path }
 */
export class MinervaSunburstChart extends MinervaShapeChartElement {
  static override tagName = "minerva-sunburst-chart";

  /** Nodes `{ name, value, children }`: leaves carry a value, parents sum their children; property only */
  @property({ attribute: false })
  data?: readonly TreemapNode[];

  /** Radius of the center circle as a fraction of the outer radius */
  @property({ type: Number, attribute: "inner-radius" })
  innerRadius = 0.26;

  /** Sector labels along the arc or the radius, whichever fits best (`auto`), or none */
  @property()
  labels: "auto" | "tangential" | "radial" | "none" = "auto";

  /** Disables the drill-down (clicking a parent zooms into it by default) */
  @property({ type: Boolean, attribute: "no-drill" })
  noDrill = false;

  /** Names from the root to the focused node (`[]`: the root); makes the drill-down controlled; property only */
  @property({ attribute: false })
  drillPath?: readonly string[];

  /** Other engine options (`SunburstChartOptions`: levels, startAngle, padAngle, palette, format...); property only */
  @property({ attribute: false })
  options?: Partial<Omit<SunburstChartOptions, "type">>;

  protected override get defaultHeight(): string | number {
    return 360;
  }

  protected override bindEngine(chart: ShapeChartInstance): Array<() => void> {
    return [
      ...super.bindEngine(chart),
      chart.on("drill", (event) => this.emit("minerva-drill", event)),
    ];
  }

  /** Zooms into the node at `path` (names from the root, `[]`: the root) */
  drill(path: readonly string[]): void {
    this.instance?.drill(path);
  }

  protected engineOptions(): ShapeChartOptions | null {
    const data = this.data ?? this.options?.data;
    if (!data) return null;
    return {
      ...this.options,
      type: "sunburst",
      data,
      innerRadius: this.innerRadius,
      labels: this.labels,
      drill: this.noDrill ? false : this.options?.drill,
      drillPath: this.drillPath ?? this.options?.drillPath,
    };
  }
}

/**
 * Radial bar chart of `minerva-design/charts/core` (the `<RadialBarChart>`
 * of React): concentric progress rings (activity rings, KPI completion).
 *
 * Published as the optional entry `minerva-design/web-components/chart`.
 *
 * @summary Concentric progress rings with center texts.
 * @tag minerva-radial-bar-chart
 * @csspart root - The sized box of the chart
 * @csspart surface - The element the engine renders into
 */
export class MinervaRadialBarChart extends MinervaShapeChartElement {
  static override tagName = "minerva-radial-bar-chart";

  /** Bars `{ name, value, max, color }`, from the outermost ring inward; property only */
  @property({ attribute: false })
  data?: readonly RadialBarDatum[];

  /** Value of a full bar for the data without `max` (the largest value by default) */
  @property({ type: Number })
  max?: number;

  /** Radius of the innermost ring's inner edge, as a fraction of the outer radius */
  @property({ type: Number, attribute: "inner-radius" })
  innerRadius = 0.3;

  /** Angle of a full bar, degrees (360: full rings) */
  @property({ type: Number })
  sweep = 270;

  /** Big text in the center (e.g. the overall completion) */
  @property({ attribute: "center-value" })
  centerValue?: string;

  /** Small text under `center-value` */
  @property({ attribute: "center-label" })
  centerLabel?: string;

  /** Other engine options (`RadialBarChartOptions`: startAngle, gap, track, rounded, labels, palette...); property only */
  @property({ attribute: false })
  options?: Partial<Omit<RadialBarChartOptions, "type">>;

  protected override get defaultHeight(): string | number {
    return 300;
  }

  protected engineOptions(): ShapeChartOptions | null {
    const data = this.data ?? this.options?.data;
    if (!data) return null;
    return {
      ...this.options,
      type: "radialBar",
      data,
      max: this.max ?? this.options?.max,
      innerRadius: this.innerRadius,
      sweep: this.sweep,
      centerValue: this.centerValue ?? this.options?.centerValue,
      centerLabel: this.centerLabel ?? this.options?.centerLabel,
    };
  }
}

const yearOf = (date: CalendarDate) =>
  (date instanceof Date ? date : new Date(date)).getFullYear();
const timeOf = (date: CalendarDate) =>
  (date instanceof Date ? date : new Date(date)).getTime();

/** Strips of a calendar heatmap: one per year when the range spans several years */
const calendarStrips = (range: CalendarHeatmapOptions["range"]) => {
  if (!Array.isArray(range)) return 1;
  const [start, end] = range as readonly [CalendarDate, CalendarDate];
  const y0 = yearOf(start);
  const y1 = yearOf(end);
  const days = (timeOf(end) - timeOf(start)) / 86_400_000 + 1;
  return y1 > y0 && days > 371 ? y1 - y0 + 1 : 1;
};

/**
 * Calendar heatmap of `minerva-design/charts/core` (the `<CalendarHeatmap>`
 * of React): daily values on a calendar, contributions-style, as weeks or
 * as small monthly calendars.
 *
 * Published as the optional entry `minerva-design/web-components/chart`.
 *
 * @summary Daily values on a calendar, contributions-style.
 * @tag minerva-calendar-heatmap
 * @csspart root - The sized box of the chart
 * @csspart surface - The element the engine renders into
 */
export class MinervaCalendarHeatmap extends MinervaShapeChartElement {
  static override tagName = "minerva-calendar-heatmap";

  /** Daily values `{ date, value }` (several entries of the same day add up); property only */
  @property({ attribute: false })
  data?: readonly CalendarDatum[];

  /** Days shown: a year (`2026`) or an inclusive `[start, end]` range; the 53 weeks ending on the last day of the data by default; property only */
  @property({ attribute: false })
  range?: number | readonly [CalendarDate, CalendarDate];

  /** `weeks`: a column per week and a row per weekday; `months`: a small calendar per month */
  @property()
  layout: "weeks" | "months" = "weeks";

  /** BCP 47 locale of the month and weekday names, of the tooltip dates and of the first day of the week */
  @property()
  locale?: string;

  /** Color of the highest level (lower levels are lighter); the first palette color by default */
  @property()
  color?: string;

  /** Number of color levels above the empty days */
  @property({ type: Number })
  levels = 4;

  /** Other engine options (`CalendarHeatmapOptions`: weekStart, colors, thresholds, gap, radius...); property only */
  @property({ attribute: false })
  options?: Partial<Omit<CalendarHeatmapOptions, "type">>;

  protected override get defaultHeight(): string | number {
    if (this.layout === "months") return 560;
    const legend = this.options?.legend === false ? 0 : 34;
    return (
      calendarStrips(this.range ?? this.options?.range) * 120 + legend + 16
    );
  }

  protected engineOptions(): ShapeChartOptions | null {
    const data = this.data ?? this.options?.data;
    if (!data) return null;
    return {
      ...this.options,
      type: "calendarHeatmap",
      data,
      range: this.range ?? this.options?.range,
      layout: this.layout,
      locale: this.locale ?? this.options?.locale,
      color: this.color ?? this.options?.color,
      levels: this.levels,
    };
  }
}

/**
 * Bullet chart of `minerva-design/charts/core` (the `<BulletChart>` of
 * React): KPI bars against qualitative ranges and a target marker.
 *
 * Published as the optional entry `minerva-design/web-components/chart`.
 *
 * @summary KPI bars against qualitative ranges and a target.
 * @tag minerva-bullet-chart
 * @csspart root - The sized box of the chart
 * @csspart surface - The element the engine renders into
 */
export class MinervaBulletChart extends MinervaShapeChartElement {
  static override tagName = "minerva-bullet-chart";

  /** Rows `{ name, value, target, ranges, max }` (columns when vertical); property only */
  @property({ attribute: false })
  data?: readonly BulletDatum[];

  /** Horizontal rows or vertical columns */
  @property()
  orientation: "horizontal" | "vertical" = "horizontal";

  /** Qualitative ranges of the rows without `ranges`: upper bounds, ascending; property only */
  @property({ attribute: false })
  ranges?: readonly number[];

  /** Names of the qualitative ranges, lowest first (tooltip); property only */
  @property({ attribute: false })
  rangeLabels?: readonly string[];

  /** Color of the target markers (the text color by default) */
  @property({ attribute: "target-color" })
  targetColor?: string;

  /** Other engine options (`BulletChartOptions`: rangeColors, barSize, ticks, palette, format...); property only */
  @property({ attribute: false })
  options?: Partial<Omit<BulletChartOptions, "type">>;

  protected override get defaultHeight(): string | number {
    if (this.orientation === "vertical") return 320;
    const rows = (this.data ?? this.options?.data ?? []).length;
    return Math.max(96, rows * 64 + 16) + (this.options?.legend ? 34 : 0);
  }

  protected engineOptions(): ShapeChartOptions | null {
    const data = this.data ?? this.options?.data;
    if (!data) return null;
    return {
      ...this.options,
      type: "bullet",
      data,
      orientation: this.orientation,
      ranges: this.ranges ?? this.options?.ranges,
      rangeLabels: this.rangeLabels ?? this.options?.rangeLabels,
      targetColor: this.targetColor ?? this.options?.targetColor,
    };
  }
}

/**
 * Chord diagram of `minerva-design/charts/core` (the `<ChordChart>` of
 * React): flows between groups around a circle, as ribbons whose ends are
 * proportional to the flow in each direction; hovering a group highlights
 * its ribbons, hovering a ribbon shows both directions (the `minerva-hover`
 * detail of a ribbon also has `source`, `target` and `reverseValue`).
 *
 * Published as the optional entry `minerva-design/web-components/chart`.
 *
 * @summary Chord diagram of the flows between groups.
 * @tag minerva-chord-chart
 * @csspart root - The sized box of the chart
 * @csspart surface - The element the engine renders into
 */
export class MinervaChordChart extends MinervaShapeChartElement {
  static override tagName = "minerva-chord-chart";

  /** Groups (names or `{ name, color }`), in their order around the circle; property only */
  @property({ attribute: false })
  groups?: readonly (string | ChordGroup)[];

  /** Square flow matrix: `matrix[i][j]` flows from group `i` to group `j` (used without `links`); property only */
  @property({ attribute: false })
  matrix?: readonly (readonly number[])[];

  /** Flows `{ source, target, value }` by group name or index; take precedence over `matrix`; property only */
  @property({ attribute: false })
  links?: readonly ChordLink[];

  /** One ribbon per direction, arcs sized by the outgoing plus the incoming flows */
  @property({ type: Boolean })
  directed = false;

  /** Color of the ribbons without `color` */
  @property({ attribute: "ribbon-color" })
  ribbonColor: "gradient" | "source" | "target" | "neutral" = "gradient";

  /** Group labels along the arc (`tangential`), the radius (`radial`), whichever fits (`auto`), or none */
  @property()
  labels: "auto" | "tangential" | "radial" | "none" = "auto";

  /** Formats the tick labels (compact numbers of the locale by default); property only */
  @property({ attribute: false })
  tickFormat?: (value: number) => string;

  /** Other engine options (`ChordChartOptions`: padAngle, startAngle, sortGroups, sortSubgroups, ribbonOpacity, arcWidth, ticks, arrows, palette, format, percentFormat...); property only */
  @property({ attribute: false })
  options?: Partial<Omit<ChordChartOptions, "type">>;

  protected override get defaultHeight(): string | number {
    return 420;
  }

  protected engineOptions(): ShapeChartOptions | null {
    const links = this.links ?? this.options?.links;
    const matrix = this.matrix ?? this.options?.matrix;
    if (!links && !matrix) return null;
    return {
      ...this.options,
      type: "chord",
      groups: this.groups ?? this.options?.groups,
      matrix,
      links,
      directed: this.directed || this.options?.directed,
      ribbonColor: this.ribbonColor,
      labels: this.labels,
      tickFormat: this.tickFormat ?? this.options?.tickFormat,
    };
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "minerva-sankey-chart": MinervaSankeyChart;
    "minerva-sunburst-chart": MinervaSunburstChart;
    "minerva-radial-bar-chart": MinervaRadialBarChart;
    "minerva-calendar-heatmap": MinervaCalendarHeatmap;
    "minerva-bullet-chart": MinervaBulletChart;
    "minerva-chord-chart": MinervaChordChart;
  }
}
