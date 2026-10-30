import {
  ChangeDetectionStrategy,
  Component,
  Directive,
  input,
  output,
} from "@angular/core";
import {
  createShapeChart,
  type ChartPadding,
  type GaugeBand,
  type RadarIndicator,
  type RadarSeries,
  type ShapeChartCommonOptions,
  type ShapeChartInstance,
  type ShapeChartOptions,
  type ShapeDatum,
  type ShapeHoverEvent,
  type ShapeLegendOptions,
  type ShapeToggleEvent,
  type ShapeTooltipOptions,
  type TreemapNode,
} from "minerva-design/charts/core";
import { CHART_SURFACE, MnChartEngine, optionalBoolean } from "./engine";

/**
 * Base of the shape chart components (engine `createShapeChart`): hover,
 * click and toggle outputs and the `toggle()` method.
 */
@Directive()
export abstract class MnShapeChartBase extends MnChartEngine<
  ShapeChartOptions,
  ShapeChartInstance
> {
  /** The hovered (or keyboard-focused) mark changed (`null`: none) */
  readonly hover = output<ShapeHoverEvent | null>();
  /** A mark (slice, stage, series, cell) was clicked, tapped or activated with Enter */
  readonly itemClick = output<ShapeHoverEvent>();
  /** An entry was hidden or shown (legend click or `toggle()`) */
  readonly visibilityChange = output<ShapeToggleEvent>();

  protected createEngine(
    container: HTMLElement,
    options: ShapeChartOptions,
  ): ShapeChartInstance {
    return createShapeChart(container, options);
  }

  protected override bindEngine(chart: ShapeChartInstance): Array<() => void> {
    return [
      chart.on("hover", (event) => this.hover.emit(event)),
      chart.on("click", (event) => this.itemClick.emit(event)),
      chart.on("toggle", (event) => this.visibilityChange.emit(event)),
    ];
  }

  /** Hides / shows a slice, stage, radar series or top-level treemap node by index */
  toggle(index: number): void {
    this.instance()?.toggle(index);
  }
}

/** Base of the named shape charts: the inputs shared by every type */
@Directive()
export abstract class MnShapeChartCommon extends MnShapeChartBase {
  /** Colors of the marks without `color` (defaults to the `--chart-series-1..8` CSS variables, then the theme colors) */
  readonly palette = input<readonly string[] | undefined>(undefined);
  /** Legend; clicking an item hides / shows its entry (shown by default for pie, donut, funnel and multi-series radar charts) */
  readonly legend = input<boolean | ShapeLegendOptions | undefined>(undefined);
  /** Tooltip; `false` disables it */
  readonly tooltip = input<boolean | ShapeTooltipOptions | undefined>(
    undefined,
  );
  /** Formats the values of the labels and the tooltip (default: compact numbers) */
  readonly format = input<((value: number) => string) | undefined>(undefined);
  /** Formats the shares (labels, conversion rates, tooltip); `share` is 0-1 */
  readonly percentFormat = input<((share: number) => string) | undefined>(
    undefined,
  );
  /** Hidden entries by index; makes the visibility controlled (store the `hiddenIndexes` of `visibilityChange` and pass them back) */
  readonly hidden = input<readonly number[] | undefined>(undefined);
  /** Entry and update animations (skipped when the user prefers reduced motion) */
  readonly animation = input<boolean | undefined, unknown>(undefined, {
    transform: optionalBoolean,
  });
  /** Space around the drawing, in pixels (default 8 on every side) */
  readonly padding = input<ChartPadding | undefined>(undefined);
  /** Accessible name of the chart (default: the chart type) */
  readonly ariaLabel = input<string | undefined>(undefined);
  /** BCP 47 locale of the texts and numbers the engine writes (tooltip rows, accessible names, compact numbers); the runtime's default locale by default */
  readonly locale = input<string | undefined>(undefined);
  /** Replaces built-in texts of the `locale` (tooltip rows, accessible names, "No data") */
  readonly texts = input<ShapeChartCommonOptions["texts"] | undefined>(
    undefined,
  );

  protected commonOptions(): ShapeChartCommonOptions {
    const hidden = this.hidden();
    return {
      palette: this.palette(),
      legend: this.legend(),
      tooltip: this.tooltip(),
      format: this.format(),
      percentFormat: this.percentFormat(),
      hidden: hidden ? [...hidden] : undefined,
      animation: this.animation(),
      padding: this.padding(),
      ariaLabel: this.ariaLabel(),
      locale: this.locale(),
      texts: this.texts(),
    };
  }
}

/**
 * Any shape chart of the engine (pie, donut, radar, gauge, funnel, treemap,
 * sankey, sunburst...), chosen by the `type` of its engine options
 * (`ShapeChartOptions` of `minerva-design/charts/core`)
 */
@Component({
  selector: "mn-shape-chart",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: CHART_SURFACE,
})
export class MnShapeChart extends MnShapeChartBase {
  /** Engine options, `type` included (replace the object to update the chart: it animates from the previous values) */
  readonly options = input.required<ShapeChartOptions>();

  protected override defaultHeight(): number {
    return this.options().type === "gauge" ? 240 : 320;
  }

  protected engineOptions(): ShapeChartOptions {
    return this.options();
  }
}

@Directive()
export abstract class MnPieBase extends MnShapeChartCommon {
  /** Slices: a name, a value (negative values count as 0) and an optional color */
  readonly data = input.required<readonly ShapeDatum[]>();
  /** Inner radius as a fraction of the outer radius: 0 = pie, 0.6 = donut */
  readonly innerRadius = input<number | undefined>(undefined);
  /** Angle of the first slice, degrees clockwise from 12 o'clock */
  readonly startAngle = input<number | undefined>(undefined);
  /** Gap between the slices, in pixels */
  readonly padAngle = input<number | undefined>(undefined);
  /** Corner radius of the slices, in pixels */
  readonly cornerRadius = input<number | undefined>(undefined);
  /** Nightingale rose: the radius (instead of the angle) shows the value */
  readonly rose = input<boolean | undefined, unknown>(undefined, {
    transform: optionalBoolean,
  });
  /** Slice labels: `outside` with leader lines, `inside` the slices, or none */
  readonly labels = input<"outside" | "inside" | "none" | undefined>(undefined);
  /** What a label shows: name, value, percent (default name and percent) */
  readonly labelContent = input<
    readonly ("name" | "value" | "percent")[] | undefined
  >(undefined);
  /** Big text in the hole of a donut (e.g. the total) */
  readonly centerValue = input<string | undefined>(undefined);
  /** Small text under `centerValue` */
  readonly centerLabel = input<string | undefined>(undefined);

  protected abstract defaultInnerRadius(): number;

  protected engineOptions(): ShapeChartOptions {
    return {
      ...this.commonOptions(),
      type: "pie",
      data: this.data(),
      innerRadius: this.innerRadius() ?? this.defaultInnerRadius(),
      startAngle: this.startAngle(),
      padAngle: this.padAngle(),
      cornerRadius: this.cornerRadius(),
      rose: this.rose(),
      labels: this.labels(),
      labelContent: this.labelContent(),
      centerValue: this.centerValue(),
      centerLabel: this.centerLabel(),
    };
  }
}

/**
 * Pie chart (or a donut with `innerRadius`, or a Nightingale rose with
 * `rose`): slices with gaps, outside labels with leader lines, legend toggles.
 */
@Component({
  selector: "mn-pie-chart",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: CHART_SURFACE,
})
export class MnPieChart extends MnPieBase {
  protected defaultInnerRadius(): number {
    return 0;
  }
}

/** Donut chart: a pie chart with a hole (`innerRadius` 0.62) and optional center texts */
@Component({
  selector: "mn-donut-chart",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: CHART_SURFACE,
})
export class MnDonutChart extends MnPieBase {
  protected defaultInnerRadius(): number {
    return 0.62;
  }
}

/** Radar (spider) chart comparing series over several indicators */
@Component({
  selector: "mn-radar-chart",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: CHART_SURFACE,
})
export class MnRadarChart extends MnShapeChartCommon {
  /** Axes of the chart `{ name, max }`, clockwise from 12 o'clock */
  readonly indicators = input.required<readonly RadarIndicator[]>();
  /** Polygons `{ name, values }`: one value per indicator */
  readonly series = input.required<readonly RadarSeries[]>();
  /** Grid shape */
  readonly shape = input<"polygon" | "circle" | undefined>(undefined);
  /** Number of grid rings (default 4) */
  readonly levels = input<number | undefined>(undefined);
  /** Dots on the vertices (default `true`) */
  readonly dots = input<boolean | undefined, unknown>(undefined, {
    transform: optionalBoolean,
  });

  protected engineOptions(): ShapeChartOptions {
    return {
      ...this.commonOptions(),
      type: "radar",
      indicators: this.indicators(),
      series: this.series(),
      shape: this.shape(),
      levels: this.levels(),
      dots: this.dots(),
    };
  }
}

/** Gauge (speedometer) showing one value on an arc, with colored bands (default height 240) */
@Component({
  selector: "mn-gauge-chart",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: CHART_SURFACE,
})
export class MnGaugeChart extends MnShapeChartCommon {
  /** Value shown by the arc (clamped to `min` - `max` for the drawing) */
  readonly value = input.required<number>();
  /** Value at the start of the arc (default 0) */
  readonly min = input<number | undefined>(undefined);
  /** Value at the end of the arc (default 100) */
  readonly max = input<number | undefined>(undefined);
  /** Caption under the value */
  readonly label = input<string | undefined>(undefined);
  /** Total angle of the arc, degrees (default 240) */
  readonly sweep = input<number | undefined>(undefined);
  /** Thickness of the arc as a fraction of the radius (default 0.16) */
  readonly thickness = input<number | undefined>(undefined);
  /** Colored ranges of the track; the value arc takes the color of its band */
  readonly bands = input<readonly GaugeBand[] | undefined>(undefined);
  /** Color of the value arc when there are no bands */
  readonly color = input<string | undefined>(undefined);
  /** Draws a needle in addition to the value arc */
  readonly needle = input<boolean | undefined, unknown>(undefined, {
    transform: optionalBoolean,
  });
  /** Tick labels at the ends and at the band bounds (default `true`) */
  readonly ticks = input<boolean | undefined, unknown>(undefined, {
    transform: optionalBoolean,
  });

  protected override defaultHeight(): number {
    return 240;
  }

  protected engineOptions(): ShapeChartOptions {
    return {
      ...this.commonOptions(),
      type: "gauge",
      value: this.value(),
      min: this.min(),
      max: this.max(),
      label: this.label(),
      sweep: this.sweep(),
      thickness: this.thickness(),
      bands: this.bands(),
      color: this.color(),
      needle: this.needle(),
      ticks: this.ticks(),
    };
  }
}

/** Funnel chart of the stages of a process, with conversion rates */
@Component({
  selector: "mn-funnel-chart",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: CHART_SURFACE,
})
export class MnFunnelChart extends MnShapeChartCommon {
  /** Stages: a name, a value and an optional color */
  readonly data = input.required<readonly ShapeDatum[]>();
  /** Order of the stages (default: the data order) */
  readonly sort = input<"descending" | "ascending" | "none" | undefined>(
    undefined,
  );
  /** Vertical gap between the stages, in pixels (default 4) */
  readonly gap = input<number | undefined>(undefined);
  /** Shows the conversion rate from the previous stage (default `true`) */
  readonly conversion = input<boolean | undefined, unknown>(undefined, {
    transform: optionalBoolean,
  });
  /** Shape of the stages: trapezoids narrowing to the next stage, or centered bars */
  readonly shape = input<"trapezoid" | "bar" | undefined>(undefined);

  protected engineOptions(): ShapeChartOptions {
    return {
      ...this.commonOptions(),
      type: "funnel",
      data: this.data(),
      sort: this.sort(),
      gap: this.gap(),
      conversion: this.conversion(),
      shape: this.shape(),
    };
  }
}

/** Treemap: nested rectangles of areas proportional to the values */
@Component({
  selector: "mn-treemap-chart",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: CHART_SURFACE,
})
export class MnTreemapChart extends MnShapeChartCommon {
  /** Nodes `{ name, value, children }`: leaves carry a value, parents sum their children */
  readonly data = input.required<readonly TreemapNode[]>();
  /** Gap between the cells, in pixels (default 2) */
  readonly gap = input<number | undefined>(undefined);
  /** Draws the names of the parents above their children (default `true`) */
  readonly headers = input<boolean | undefined, unknown>(undefined, {
    transform: optionalBoolean,
  });

  protected engineOptions(): ShapeChartOptions {
    return {
      ...this.commonOptions(),
      type: "treemap",
      data: this.data(),
      gap: this.gap(),
      headers: this.headers(),
    };
  }
}
