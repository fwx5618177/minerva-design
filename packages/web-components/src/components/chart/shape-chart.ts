import { property } from "lit/decorators.js";
import {
  createShapeChart,
  type FunnelChartOptions,
  type GaugeBand,
  type GaugeChartOptions,
  type PieChartOptions,
  type RadarChartOptions,
  type RadarIndicator,
  type RadarSeries,
  type ShapeChartCommonOptions,
  type ShapeChartInstance,
  type ShapeChartOptions,
  type ShapeDatum,
  type TreemapChartOptions,
  type TreemapNode,
} from "minerva-design/charts/core";
import { MinervaEngineElement } from "./engine-element";

/** Engine options shared by every shape chart (palette, legend, tooltip, format, hidden, animation...) */
export type ShapeChartBaseOptions = ShapeChartCommonOptions;

/**
 * Base of the shape chart elements (engine `createShapeChart`): forwards
 * the engine events as `minerva-*` events.
 *
 * @fires minerva-hover - The hovered (or keyboard-focused) mark changed; detail: { index, name, value, share }, `null` when nothing is hovered
 * @fires minerva-click - A mark was clicked, tapped or activated with Enter; detail: { index, name, value, share }
 * @fires minerva-toggle - A legend item was clicked (or `toggle()` called); detail: { index, hidden, hiddenIndexes }
 */
export abstract class MinervaShapeChartElement extends MinervaEngineElement<
  ShapeChartOptions,
  ShapeChartInstance
> {
  protected createEngine(
    container: HTMLElement,
    options: ShapeChartOptions,
  ): ShapeChartInstance {
    return createShapeChart(container, options);
  }

  protected override bindEngine(chart: ShapeChartInstance): Array<() => void> {
    return [
      chart.on("hover", (event) => this.emit("minerva-hover", event)),
      chart.on("click", (event) => this.emit("minerva-click", event)),
      chart.on("toggle", (event) => this.emit("minerva-toggle", event)),
    ];
  }

  /** Hides / shows a slice, stage, radar series or top-level treemap node by index */
  toggle(index: number): void {
    this.instance?.toggle(index);
  }
}

/**
 * Pie, donut, radar, gauge, funnel, treemap, sankey, sunburst... chart of
 * `minerva-design/charts/core`, chosen by the `type` of its engine options
 * (`ShapeChartOptions`), set as the `options` property; replace the object
 * to update the chart (it animates from the previous values).
 *
 * Published as the optional entry `minerva-design/web-components/chart`.
 *
 * @summary Any shape chart of the engine, configured by its options.
 * @tag minerva-shape-chart
 * @csspart root - The sized box of the chart
 * @csspart surface - The element the engine renders into
 */
export class MinervaShapeChart extends MinervaShapeChartElement {
  static override tagName = "minerva-shape-chart";

  /** Engine options (`ShapeChartOptions` of minerva-design/charts/core, `type` included); property only */
  @property({ attribute: false })
  options?: ShapeChartOptions;

  protected override get defaultHeight(): string | number {
    return this.options?.type === "gauge" ? 240 : 320;
  }

  protected engineOptions(): ShapeChartOptions | null {
    return this.options ?? null;
  }
}

/**
 * Pie chart of `minerva-design/charts/core` (the `<PieChart>` of React):
 * slices with gaps, outside labels with leader lines, legend toggles; a
 * donut with `inner-radius`, a Nightingale rose with `rose`.
 *
 * Published as the optional entry `minerva-design/web-components/chart`.
 *
 * @summary Pie chart (or donut, or rose) with labels and legend toggles.
 * @tag minerva-pie-chart
 * @csspart root - The sized box of the chart
 * @csspart surface - The element the engine renders into
 */
export class MinervaPieChart extends MinervaShapeChartElement {
  static override tagName = "minerva-pie-chart";

  /** Slices `{ name, value, color }`; property only */
  @property({ attribute: false })
  data?: readonly ShapeDatum[];

  /** Inner radius as a fraction of the outer radius: 0 = pie, 0.6 = donut */
  @property({ type: Number, attribute: "inner-radius" })
  innerRadius = 0;

  /** Nightingale rose: the radius (instead of the angle) shows the value */
  @property({ type: Boolean })
  rose = false;

  /** Slice labels: outside with leader lines, inside the slices, or none */
  @property()
  labels?: "outside" | "inside" | "none";

  /** Big text in the hole of a donut (e.g. the total) */
  @property({ attribute: "center-value" })
  centerValue?: string;

  /** Small text under `center-value` */
  @property({ attribute: "center-label" })
  centerLabel?: string;

  /** Other engine options (`PieChartOptions`: palette, legend, startAngle, labelContent, format...); property only */
  @property({ attribute: false })
  options?: Partial<Omit<PieChartOptions, "type">>;

  protected engineOptions(): ShapeChartOptions | null {
    const data = this.data ?? this.options?.data;
    if (!data) return null;
    return {
      ...this.options,
      type: "pie",
      data,
      innerRadius: this.innerRadius,
      rose: this.rose || this.options?.rose,
      labels: this.labels ?? this.options?.labels,
      centerValue: this.centerValue ?? this.options?.centerValue,
      centerLabel: this.centerLabel ?? this.options?.centerLabel,
    };
  }
}

/**
 * Donut chart of `minerva-design/charts/core` (the `<DonutChart>` of
 * React): a pie chart with a hole (`inner-radius` 0.62 by default) and
 * optional center texts.
 *
 * Published as the optional entry `minerva-design/web-components/chart`.
 *
 * @summary Donut chart with center texts and legend toggles.
 * @tag minerva-donut-chart
 * @csspart root - The sized box of the chart
 * @csspart surface - The element the engine renders into
 */
export class MinervaDonutChart extends MinervaPieChart {
  static override tagName = "minerva-donut-chart";

  /** Inner radius as a fraction of the outer radius */
  @property({ type: Number, attribute: "inner-radius" })
  override innerRadius = 0.62;
}

/**
 * Radar (spider) chart of `minerva-design/charts/core` comparing series
 * over several indicators (the `<RadarChart>` of React).
 *
 * Published as the optional entry `minerva-design/web-components/chart`.
 *
 * @summary Radar chart comparing series over several indicators.
 * @tag minerva-radar-chart
 * @csspart root - The sized box of the chart
 * @csspart surface - The element the engine renders into
 */
export class MinervaRadarChart extends MinervaShapeChartElement {
  static override tagName = "minerva-radar-chart";

  /** Axes `{ name, max }`, clockwise from 12 o'clock; property only */
  @property({ attribute: false })
  indicators?: readonly RadarIndicator[];

  /** Polygons `{ name, values }`: one value per indicator; property only */
  @property({ attribute: false })
  series?: readonly RadarSeries[];

  /** Grid shape */
  @property()
  shape: "polygon" | "circle" = "polygon";

  /** Number of grid rings */
  @property({ type: Number })
  levels = 4;

  /** Other engine options (`RadarChartOptions`: palette, legend, dots, format...); property only */
  @property({ attribute: false })
  options?: Partial<Omit<RadarChartOptions, "type">>;

  protected engineOptions(): ShapeChartOptions | null {
    const indicators = this.indicators ?? this.options?.indicators;
    const series = this.series ?? this.options?.series;
    if (!indicators || !series) return null;
    return {
      ...this.options,
      type: "radar",
      indicators,
      series,
      shape: this.shape,
      levels: this.levels,
    };
  }
}

/**
 * Gauge (speedometer) of `minerva-design/charts/core` showing one value on
 * an arc with colored bands (the `<GaugeChart>` of React).
 *
 * Published as the optional entry `minerva-design/web-components/chart`.
 *
 * @summary Gauge showing one value on an arc, with colored bands.
 * @tag minerva-gauge-chart
 * @csspart root - The sized box of the chart
 * @csspart surface - The element the engine renders into
 */
export class MinervaGaugeChart extends MinervaShapeChartElement {
  static override tagName = "minerva-gauge-chart";

  /** Value shown by the arc (clamped to min - max for the drawing) */
  @property({ type: Number })
  value = 0;

  /** Value at the start of the arc */
  @property({ type: Number })
  min = 0;

  /** Value at the end of the arc */
  @property({ type: Number })
  max = 100;

  /** Caption under the value */
  @property()
  label?: string;

  /** Draws a needle in addition to the value arc */
  @property({ type: Boolean })
  needle = false;

  /** Colored ranges `{ to, color, label }` of the track; property only */
  @property({ attribute: false })
  bands?: readonly GaugeBand[];

  /** Other engine options (`GaugeChartOptions`: sweep, thickness, color, ticks, format...); property only */
  @property({ attribute: false })
  options?: Partial<Omit<GaugeChartOptions, "type">>;

  protected override get defaultHeight(): string | number {
    return 240;
  }

  protected engineOptions(): ShapeChartOptions | null {
    return {
      ...this.options,
      type: "gauge",
      value: this.value,
      min: this.min,
      max: this.max,
      label: this.label ?? this.options?.label,
      needle: this.needle || this.options?.needle,
      bands: this.bands ?? this.options?.bands,
    };
  }
}

/**
 * Funnel chart of `minerva-design/charts/core`: the stages of a process
 * with conversion rates (the `<FunnelChart>` of React).
 *
 * Published as the optional entry `minerva-design/web-components/chart`.
 *
 * @summary Funnel of the stages of a process, with conversion rates.
 * @tag minerva-funnel-chart
 * @csspart root - The sized box of the chart
 * @csspart surface - The element the engine renders into
 */
export class MinervaFunnelChart extends MinervaShapeChartElement {
  static override tagName = "minerva-funnel-chart";

  /** Stages `{ name, value, color }`; property only */
  @property({ attribute: false })
  data?: readonly ShapeDatum[];

  /** Order of the stages (`none`: the data order) */
  @property()
  sort: "descending" | "ascending" | "none" = "none";

  /** Shape of the stages: trapezoids narrowing to the next stage, or centered bars */
  @property()
  shape: "trapezoid" | "bar" = "trapezoid";

  /** Hides the conversion rates from the previous stage */
  @property({ type: Boolean, attribute: "hide-conversion" })
  hideConversion = false;

  /** Other engine options (`FunnelChartOptions`: gap, palette, legend, format...); property only */
  @property({ attribute: false })
  options?: Partial<Omit<FunnelChartOptions, "type">>;

  protected engineOptions(): ShapeChartOptions | null {
    const data = this.data ?? this.options?.data;
    if (!data) return null;
    return {
      ...this.options,
      type: "funnel",
      data,
      sort: this.sort,
      shape: this.shape,
      conversion: this.hideConversion ? false : this.options?.conversion,
    };
  }
}

/**
 * Treemap of `minerva-design/charts/core`: nested rectangles of areas
 * proportional to the values (the `<TreemapChart>` of React).
 *
 * Published as the optional entry `minerva-design/web-components/chart`.
 *
 * @summary Treemap of nested rectangles sized by value.
 * @tag minerva-treemap-chart
 * @csspart root - The sized box of the chart
 * @csspart surface - The element the engine renders into
 */
export class MinervaTreemapChart extends MinervaShapeChartElement {
  static override tagName = "minerva-treemap-chart";

  /** Nodes `{ name, value, children }`: leaves carry a value, parents sum their children; property only */
  @property({ attribute: false })
  data?: readonly TreemapNode[];

  /** Gap between the cells, in pixels */
  @property({ type: Number })
  gap = 2;

  /** Hides the names of the parents above their children */
  @property({ type: Boolean, attribute: "hide-headers" })
  hideHeaders = false;

  /** Other engine options (`TreemapChartOptions`: palette, tooltip, format...); property only */
  @property({ attribute: false })
  options?: Partial<Omit<TreemapChartOptions, "type">>;

  protected engineOptions(): ShapeChartOptions | null {
    const data = this.data ?? this.options?.data;
    if (!data) return null;
    return {
      ...this.options,
      type: "treemap",
      data,
      gap: this.gap,
      headers: this.hideHeaders ? false : this.options?.headers,
    };
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "minerva-shape-chart": MinervaShapeChart;
    "minerva-pie-chart": MinervaPieChart;
    "minerva-donut-chart": MinervaDonutChart;
    "minerva-radar-chart": MinervaRadarChart;
    "minerva-gauge-chart": MinervaGaugeChart;
    "minerva-funnel-chart": MinervaFunnelChart;
    "minerva-treemap-chart": MinervaTreemapChart;
  }
}
