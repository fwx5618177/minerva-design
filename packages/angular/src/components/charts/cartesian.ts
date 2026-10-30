import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  Directive,
  input,
  output,
} from "@angular/core";
import {
  createChart,
  heatmapChartOptions,
  quadrantChartOptions,
  quadrantOf,
  sparklineOptions,
  type ChartAnnotation,
  type ChartAxisOptions,
  type ChartColorScheme,
  type ChartCurve,
  type ChartDragEvent,
  type ChartHoverEvent,
  type ChartInstance,
  type ChartInteractionOptions,
  type ChartLegendOptions,
  type ChartOrientation,
  type ChartOptions,
  type ChartPadding,
  type ChartPlotClickEvent,
  type ChartRendererKind,
  type ChartRendererPreference,
  type ChartSeries,
  type ChartSeriesType,
  type ChartTooltipOptions,
  type ChartView,
  type HeatmapCell,
  type QuadrantAxisLabels,
  type QuadrantCorner,
  type QuadrantPoint,
  type QuadrantRegions,
} from "minerva-design/charts/core";
import { CHART_SURFACE, MnChartEngine, optionalBoolean } from "./engine";

/**
 * Gives the series without a `type` the type of the component: `stack` /
 * `curve` apply to the series of that type that do not set their own.
 */
export const withSeriesType = (
  series: readonly ChartSeries[],
  type: ChartSeriesType,
  stack?: string,
  curve?: ChartCurve,
): ChartSeries[] =>
  series.map((s) => {
    const t = s.type ?? type;
    return {
      ...s,
      type: t,
      ...(stack !== undefined && t === type ? { stack: s.stack ?? stack } : {}),
      ...(curve !== undefined && (t === "line" || t === "area")
        ? { curve: s.curve ?? curve }
        : {}),
    };
  });

/** Where a dragged MnQuadrantChart point was dropped */
export interface QuadrantPointDrop {
  /** The dragged point and its index */
  point: QuadrantPoint;
  index: number;
  /** Data coordinates of the drop */
  x: number;
  y: number;
  /** Quadrant of the drop, as seen on screen */
  quadrant: QuadrantCorner;
}

/**
 * Base of the cartesian chart components (engine `createChart`): common
 * inputs, hover / zoom / renderer outputs and the zoom methods.
 */
@Directive()
export abstract class MnCartesianChartBase extends MnChartEngine<
  ChartOptions,
  ChartInstance
> {
  /** Backend of the data layer: `auto` tries WebGPU, then WebGL2, then WebGL, then Canvas2D */
  readonly renderer = input<ChartRendererPreference | undefined>(undefined);
  /** Legend; shown by default when several series have a name */
  readonly legend = input<boolean | ChartLegendOptions | undefined>(undefined);
  /** Tooltip; `false` disables it */
  readonly tooltip = input<boolean | ChartTooltipOptions | undefined>(
    undefined,
  );
  /** Vertical guide line following the pointer */
  readonly crosshair = input<boolean | undefined, unknown>(undefined, {
    transform: optionalBoolean,
  });
  /** Background areas and reference lines */
  readonly annotations = input<readonly ChartAnnotation[] | undefined>(
    undefined,
  );
  /** Zoom (Ctrl / ⌘ + wheel, pinch), pan, double-click reset and keyboard navigation; `false` makes the chart static */
  readonly interaction = input<boolean | ChartInteractionOptions | undefined>(
    undefined,
  );
  /** Space around the plot area, in pixels */
  readonly padding = input<ChartPadding | undefined>(undefined);
  /** Series colors (defaults to the `--chart-series-1..8` CSS variables, then the theme colors) */
  readonly palette = input<readonly string[] | undefined>(undefined);
  /** Accessible name of the chart */
  readonly ariaLabel = input<string | undefined>(undefined);
  /** BCP 47 locale of the texts and numbers the engine writes (tooltip, axes, accessible names); the runtime's default locale by default */
  readonly locale = input<string | undefined>(undefined);

  /** The hovered (or keyboard-focused) points changed (`null`: none) */
  readonly hover = output<ChartHoverEvent | null>();
  /** The user zoomed or panned */
  readonly zoom = output<ChartView>();
  /** The backend is ready (or fell back after a GPU loss) */
  readonly rendererChange = output<ChartRendererKind>();

  protected createEngine(
    container: HTMLElement,
    options: ChartOptions,
  ): ChartInstance {
    return createChart(container, options);
  }

  protected override bindEngine(chart: ChartInstance): Array<() => void> {
    return [
      chart.on("hover", (event) => this.hover.emit(event)),
      chart.on("click", (event) => this.clicked?.(event)),
      chart.on("plotClick", (event) => this.plotClicked?.(event)),
      chart.on("zoom", (view) => this.zoom.emit(view)),
      chart.on("renderer", (renderer) => this.rendererChange.emit(renderer)),
      chart.on("drop", (event) => this.dropped?.(event)),
    ];
  }

  protected clicked?(event: ChartHoverEvent): void;
  protected plotClicked?(event: ChartPlotClickEvent): void;
  protected dropped?(event: ChartDragEvent): void;

  /** Engine options of the common inputs */
  protected commonOptions(): Omit<ChartOptions, "series"> {
    return {
      renderer: this.renderer(),
      legend: this.legend(),
      tooltip: this.tooltip(),
      crosshair: this.crosshair(),
      annotations: this.annotations(),
      interaction: this.interaction(),
      padding: this.padding(),
      palette: this.palette(),
      ariaLabel: this.ariaLabel(),
      locale: this.locale(),
    };
  }

  /** Shows the whole data range */
  resetZoom(): void {
    this.instance()?.resetZoom();
  }

  /** Visible range, `null` before the first render */
  getView(): ChartView | null {
    return this.instance()?.getView() ?? null;
  }

  /** Sets the visible range */
  setView(view: Partial<ChartView>): void {
    this.instance()?.setView(view);
  }

  /** Backend in use, `null` until ready */
  getRenderer(): ChartRendererKind | null {
    return this.instance()?.getRenderer() ?? null;
  }
}

/** Base of the components drawing series on X / Y axes */
@Directive()
export abstract class MnSeriesChartBase extends MnCartesianChartBase {
  /** X axis */
  readonly xAxis = input<ChartAxisOptions | undefined>(undefined);
  /** Y axis */
  readonly yAxis = input<ChartAxisOptions | undefined>(undefined);

  /** A point (or a bar) was clicked */
  readonly pointClick = output<ChartHoverEvent>();
  /** The plot area was clicked where there is no point */
  readonly plotClick = output<ChartPlotClickEvent>();

  protected override clicked(event: ChartHoverEvent): void {
    this.pointClick.emit(event);
  }

  protected override plotClicked(event: ChartPlotClickEvent): void {
    this.plotClick.emit(event);
  }

  protected axesOptions(): Omit<ChartOptions, "series"> {
    return {
      ...this.commonOptions(),
      xAxis: this.xAxis(),
      yAxis: this.yAxis(),
    };
  }
}

/**
 * GPU chart (WebGPU, then WebGL2, WebGL, Canvas2D) mixing line, area, bar,
 * scatter, candlestick and heatmap series; zoomable, keyboard accessible
 * and themed by the Minerva CSS variables (engine of
 * `minerva-design/charts/core`).
 */
@Component({
  selector: "mn-chart",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: CHART_SURFACE,
})
export class MnChart extends MnSeriesChartBase {
  /** Data series; each sets its own `type` (line by default) */
  readonly series = input.required<readonly ChartSeries[]>();
  /** `percent` scales every stack to 100% at each x */
  readonly stackMode = input<"normal" | "percent" | undefined>(undefined);
  /** Right value axis of the series with `yAxis: "right"`; its range is aligned on the left ticks (vertical charts) */
  readonly yAxis2 = input<ChartAxisOptions | undefined>(undefined);
  /** `horizontal` puts the x axis (categories) down the left side and the values along the bottom */
  readonly orientation = input<ChartOrientation | undefined>(undefined);

  protected engineOptions(): ChartOptions {
    return {
      ...this.axesOptions(),
      series: this.series(),
      stackMode: this.stackMode(),
      yAxis2: this.yAxis2(),
      orientation: this.orientation(),
    };
  }
}

/** Line (or area) chart; handles millions of points on the GPU */
@Component({
  selector: "mn-line-chart",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: CHART_SURFACE,
})
export class MnLineChart extends MnSeriesChartBase {
  /** Series drawn as lines (or areas with `area`) unless they set a `type` */
  readonly series = input.required<readonly ChartSeries[]>();
  /** Fills the area under the lines */
  readonly area = input(false, { transform: booleanAttribute });
  /** Shape of the lines: straight, smooth (monotone) or steps */
  readonly curve = input<ChartCurve | undefined>(undefined);
  /** Stacks the series on top of each other */
  readonly stacked = input(false, { transform: booleanAttribute });
  /** Scales the stacks to 100% (implies `stacked`) */
  readonly percent = input(false, { transform: booleanAttribute });

  protected engineOptions(): ChartOptions {
    return {
      ...this.axesOptions(),
      series: withSeriesType(
        this.series(),
        this.area() ? "area" : "line",
        this.stacked() || this.percent() ? "stack" : undefined,
        this.curve(),
      ),
      stackMode: this.percent() ? "percent" : undefined,
    };
  }
}

/** Area chart: smooth by default, stacked or 100% stacked */
@Component({
  selector: "mn-area-chart",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: CHART_SURFACE,
})
export class MnAreaChart extends MnSeriesChartBase {
  /** Series drawn as areas unless they set a `type` */
  readonly series = input.required<readonly ChartSeries[]>();
  /** Shape of the edges: straight, smooth (monotone) or steps */
  readonly curve = input<ChartCurve>("smooth");
  /** Stacks the areas on top of each other */
  readonly stacked = input(false, { transform: booleanAttribute });
  /** Scales the stacks to 100% (implies `stacked`) */
  readonly percent = input(false, { transform: booleanAttribute });

  protected engineOptions(): ChartOptions {
    return {
      ...this.axesOptions(),
      series: withSeriesType(
        this.series(),
        "area",
        this.stacked() || this.percent() ? "stack" : undefined,
        this.curve(),
      ),
      stackMode: this.percent() ? "percent" : undefined,
    };
  }
}

/** Bar chart: grouped side by side, stacked or 100% stacked, with optional value labels */
@Component({
  selector: "mn-bar-chart",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: CHART_SURFACE,
})
export class MnBarChart extends MnSeriesChartBase {
  /** Series drawn as bars unless they set a `type` (e.g. a `line` overlay) */
  readonly series = input.required<readonly ChartSeries[]>();
  /** Stacks the bars of every series (otherwise they are grouped side by side) */
  readonly stacked = input(false, { transform: booleanAttribute });
  /** Scales the stacks to 100% (implies `stacked`) */
  readonly percent = input(false, { transform: booleanAttribute });
  /** Writes the value above every bar */
  readonly labels = input(false, { transform: booleanAttribute });
  /** `horizontal` draws the bars from the left, the categories down the left side */
  readonly orientation = input<ChartOrientation | undefined>(undefined);

  protected engineOptions(): ChartOptions {
    const labels = this.labels();
    return {
      ...this.axesOptions(),
      orientation: this.orientation(),
      series: withSeriesType(
        this.series(),
        "bar",
        this.stacked() || this.percent() ? "stack" : undefined,
      ).map((s) =>
        labels && s.type === "bar"
          ? { ...s, showLabels: s.showLabels ?? true }
          : s,
      ),
      stackMode: this.percent() ? "percent" : undefined,
    };
  }
}

/** Scatter chart: zooms on both axes, hit testing through a spatial index */
@Component({
  selector: "mn-scatter-chart",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: CHART_SURFACE,
})
export class MnScatterChart extends MnSeriesChartBase {
  /** Series drawn as dots unless they set a `type` */
  readonly series = input.required<readonly ChartSeries[]>();

  protected engineOptions(): ChartOptions {
    return {
      ...this.axesOptions(),
      series: withSeriesType(this.series(), "scatter"),
    };
  }
}

/**
 * Candlestick (OHLC) chart: rising and falling candles, zoomable on the
 * GPU; data points carry `open`, `high`, `low` and `y` (the close)
 */
@Component({
  selector: "mn-candlestick-chart",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: CHART_SURFACE,
})
export class MnCandlestickChart extends MnSeriesChartBase {
  /** Series drawn as candles unless they set a `type` (e.g. a moving average `line`) */
  readonly series = input.required<readonly ChartSeries[]>();

  protected engineOptions(): ChartOptions {
    return {
      ...this.axesOptions(),
      series: withSeriesType(this.series(), "candlestick"),
    };
  }
}

/** Heatmap: a grid of cells colored by value (categories or numbers on both axes) */
@Component({
  selector: "mn-heatmap-chart",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: CHART_SURFACE,
})
export class MnHeatmapChart extends MnSeriesChartBase {
  /** Cells `{ x, y, value }` */
  readonly data = input.required<readonly HeatmapCell[]>();
  /** Column names in order (collected from the data when omitted) */
  readonly xCategories = input<readonly string[] | undefined>(undefined);
  /** Row names from bottom to top (collected from the data when omitted) */
  readonly yCategories = input<readonly string[] | undefined>(undefined);
  /** Colors from the lowest to the highest value (interpolated in OKLab), or a built-in theme-aware ramp of the first palette color (default `sequential`) */
  readonly colorScale = input<readonly string[] | ChartColorScheme | undefined>(
    undefined,
  );
  /** Values at the ends of the color scale; the data range by default */
  readonly valueRange = input<readonly [number, number] | undefined>(undefined);
  /** Value at the middle of the color scale (diverging data; default 0 for `diverging` ramps spanning it, else the middle of the range) */
  readonly colorMidpoint = input<number | undefined>(undefined);
  /** Name of the value in the tooltip */
  readonly name = input<string | undefined>(undefined);
  /** Corner radius of the cells, in pixels */
  readonly radius = input<number | undefined>(undefined);
  /** Formats the values in the tooltip */
  readonly format = input<((value: number) => string) | undefined>(undefined);

  protected engineOptions(): ChartOptions {
    return heatmapChartOptions(
      {
        data: this.data(),
        xCategories: this.xCategories(),
        yCategories: this.yCategories(),
        colorScale: this.colorScale(),
        valueRange: this.valueRange(),
        colorMidpoint: this.colorMidpoint(),
        name: this.name(),
        radius: this.radius(),
        format: this.format(),
      },
      this.axesOptions(),
    );
  }
}

/** Word-sized chart without axes: a trend in a table cell, a KPI card, ... (default height 48) */
@Component({
  selector: "mn-sparkline",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: CHART_SURFACE,
})
export class MnSparkline extends MnCartesianChartBase {
  /** Values (or `[x, y]` pairs, typed arrays, ...) */
  readonly data = input.required<ChartSeries["data"]>();
  /** How the values are drawn */
  readonly type = input<"line" | "area" | "bar">("line");
  /** Color (any CSS color); the first palette color by default */
  readonly color = input<string | undefined>(undefined);
  /** Shape of the line (default `smooth`) */
  readonly curve = input<ChartCurve | undefined>(undefined);
  /** Name shown in the tooltip */
  readonly name = input<string | undefined>(undefined);
  /** Draws a reference line at this value (e.g. a target or the average) */
  readonly reference = input<number | undefined>(undefined);
  /** Formats the value in the tooltip */
  readonly format = input<((value: number) => string) | undefined>(undefined);

  protected override defaultHeight(): number {
    return 48;
  }

  protected engineOptions(): ChartOptions {
    return sparklineOptions(
      {
        data: this.data(),
        type: this.type(),
        color: this.color(),
        curve: this.curve(),
        name: this.name(),
        reference: this.reference(),
        format: this.format(),
      },
      {
        renderer: this.renderer(),
        tooltip: this.tooltip(),
        palette: this.palette(),
        ariaLabel: this.ariaLabel(),
      },
    );
  }
}

/**
 * Four-quadrant matrix (priority matrix, Eisenhower, BCG, ...): tinted
 * quadrants with titles, dividers, and labelled dots placed without
 * overlapping labels. With `draggable`, dots can be dragged to another
 * quadrant (`pointDrop`; update `points` to move them).
 */
@Component({
  selector: "mn-quadrant-chart",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: CHART_SURFACE,
})
export class MnQuadrantChart extends MnCartesianChartBase {
  /** Points to place */
  readonly points = input.required<readonly QuadrantPoint[]>();
  /** Range of the horizontal axis (default `[0, 10]`) */
  readonly xDomain = input<[number, number] | undefined>(undefined);
  /** Range of the vertical axis (default `[0, 10]`) */
  readonly yDomain = input<[number, number] | undefined>(undefined);
  /** X value of the vertical divider (the middle of `xDomain` by default) */
  readonly xSplit = input<number | undefined>(undefined);
  /** Y value of the horizontal divider (the middle of `yDomain` by default) */
  readonly ySplit = input<number | undefined>(undefined);
  /** Titles and colors of the quadrants */
  readonly quadrants = input<QuadrantRegions | undefined>(undefined);
  /** Title of the horizontal axis */
  readonly xLabel = input<string | undefined>(undefined);
  /** Title of the vertical axis */
  readonly yLabel = input<string | undefined>(undefined);
  /** Texts at the ends of the dividers, drawn inside the plot */
  readonly axisLabels = input<QuadrantAxisLabels | undefined>(undefined);
  /** Shows the numeric ticks of the axes (default `true`) */
  readonly showTicks = input<boolean | undefined, unknown>(undefined, {
    transform: optionalBoolean,
  });
  /** Reverses the horizontal axis (e.g. "urgent" on the left) */
  readonly reverseX = input<boolean | undefined, unknown>(undefined, {
    transform: optionalBoolean,
  });
  /** Draws the labels next to the dots (default `true`) */
  readonly showLabels = input<boolean | undefined, unknown>(undefined, {
    transform: optionalBoolean,
  });
  /** Dot diameter in pixels (default 12) */
  readonly pointSize = input<number | undefined>(undefined);
  /** Name of the points in the tooltip */
  readonly name = input<string | undefined>(undefined);
  /** Lets the user drag the dots (`pointDrop`) */
  readonly draggable = input(false, { transform: booleanAttribute });

  /** A point was clicked */
  readonly pointClick = output<{ point: QuadrantPoint; index: number }>();
  /** The empty area of a quadrant was clicked */
  readonly quadrantClick = output<{
    quadrant: QuadrantCorner;
    x: number;
    y: number;
  }>();
  /** A dragged point was released (the chart does not move it: update `points`) */
  readonly pointDrop = output<QuadrantPointDrop>();

  private geometry() {
    return {
      xDomain: this.xDomain(),
      yDomain: this.yDomain(),
      xSplit: this.xSplit(),
      ySplit: this.ySplit(),
      reverseX: this.reverseX(),
    };
  }

  protected engineOptions(): ChartOptions {
    return quadrantChartOptions(
      {
        ...this.geometry(),
        points: this.points(),
        quadrants: this.quadrants(),
        xLabel: this.xLabel(),
        yLabel: this.yLabel(),
        axisLabels: this.axisLabels(),
        showTicks: this.showTicks(),
        showLabels: this.showLabels(),
        pointSize: this.pointSize(),
        name: this.name(),
        draggable: this.draggable(),
      },
      this.commonOptions(),
    );
  }

  protected override clicked(event: ChartHoverEvent): void {
    const index = event.items[0]?.index;
    const point = index === undefined ? undefined : this.points()[index];
    if (point && index !== undefined) this.pointClick.emit({ point, index });
  }

  protected override plotClicked(event: ChartPlotClickEvent): void {
    this.quadrantClick.emit({
      quadrant: quadrantOf(this.geometry(), event.x, event.y),
      x: event.x,
      y: event.y,
    });
  }

  protected override dropped(event: ChartDragEvent): void {
    const index = event.item.index;
    const point = this.points()[index];
    if (!point) return;
    this.pointDrop.emit({
      point,
      index,
      x: event.x,
      y: event.y,
      quadrant: quadrantOf(this.geometry(), event.x, event.y),
    });
  }
}
