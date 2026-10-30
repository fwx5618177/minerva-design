import type { ReactNode, Ref } from "react";
import type { DimensionValue, StyleProp, ViewStyle } from "react-native";
import type {
  ChartAnnotation,
  ChartAxisOptions,
  ChartController,
  ChartDependency,
  ChartHoverEvent,
  ChartInteractionOptions,
  ChartLabels,
  ChartLegendOptions,
  ChartOrientation,
  ChartPadding,
  ChartPlotClickEvent,
  ChartRect,
  ChartSeries,
  ChartTooltipOptions,
  ChartView,
  QuadrantConfig,
  QuadrantCorner,
  QuadrantPoint,
} from "@minerva/charts/canvas";

export type {
  ChartAnnotation,
  ChartAxisOptions,
  ChartAxisType,
  ChartColumnData,
  ChartDragEvent,
  ChartHoverEvent,
  ChartHoverItem,
  ChartInteractionOptions,
  ChartLabelPosition,
  ChartLabels,
  ChartLegendOptions,
  ChartLineAnnotation,
  ChartOrientation,
  ChartPadding,
  ChartPlotClickEvent,
  ChartPointDatum,
  ChartRect,
  ChartRectAnnotation,
  ChartSeries,
  ChartSeriesData,
  ChartSeriesType,
  ChartTextAnnotation,
  ChartTimeZone,
  ChartTooltipLabels,
  ChartTooltipOptions,
  ChartView,
  ChartXValue,
  QuadrantAxisLabels,
  QuadrantConfig,
  QuadrantCorner,
  QuadrantPoint,
  QuadrantRegion,
  QuadrantRegions,
} from "@minerva/charts/canvas";

/** Imperative handle of the chart components (`ref`) */
export interface ChartHandle {
  /** Shows the whole data range */
  resetZoom(): void;
  /** Visible range */
  getView(): ChartView | null;
  /** Sets the visible range */
  setView(view: Partial<ChartView>): void;
  /** Plot area in pixels of the chart (`null` before the first layout) */
  getPlotRect(): ChartRect | null;
  /** The platform-free chart controller (scene, gestures, pixel <-> data) */
  getController(): ChartController | null;
}

/** Props shared by every chart component */
export interface ChartCommonProps {
  /**
   * Height of the chart (the legend included)
   * @default 320
   */
  height?: DimensionValue;
  /**
   * Width of the chart
   * @default "100%"
   */
  width?: DimensionValue;
  /** X axis */
  xAxis?: ChartAxisOptions;
  /** Y axis */
  yAxis?: ChartAxisOptions;
  /** Legend; shown by default when several series have a name (tap toggles a series) */
  legend?: boolean | ChartLegendOptions;
  /** Tooltip shown on tap / while scrubbing; `false` disables it */
  tooltip?: boolean | ChartTooltipOptions;
  /** Vertical guide line following the finger */
  crosshair?: boolean;
  /** Background areas, reference lines and texts */
  annotations?: readonly ChartAnnotation[];
  /**
   * Pinch to zoom, drag to pan when zoomed, double tap to reset; `false` makes the chart static
   * @default true
   */
  interaction?: boolean | ChartInteractionOptions;
  /** Space around the plot area, in pixels */
  padding?: ChartPadding;
  /** Series colors (defaults to the `chart-series-1..8` tokens, then the theme colors) */
  palette?: readonly string[];
  /** Accessible name of the chart */
  ariaLabel?: string;
  /**
   * Locale of the texts and numbers the chart writes (tooltip rows, compact
   * units `k` / `万`, separators, month and weekday names of time axes)
   * @default the device language when the runtime exposes it, else English
   */
  locale?: string;
  /** Overrides of the built-in texts of the `locale` */
  labels?: Partial<ChartLabels>;
  /** Called when the highlighted points change */
  onHover?: (event: ChartHoverEvent | null) => void;
  /** Called when a point (or bar) is tapped */
  onPointClick?: (event: ChartHoverEvent) => void;
  /** Called when the plot area is tapped where there is no point */
  onPlotClick?: (event: ChartPlotClickEvent) => void;
  /** React content of the tooltip (replaces the default content) */
  renderTooltip?: (event: ChartHoverEvent) => ReactNode;
  /** Called when the user zooms or pans */
  onZoom?: (view: ChartView) => void;
  /** Styles of the root view */
  style?: StyleProp<ViewStyle>;
  /** Test identifier of the root view */
  testID?: string;
  /** Imperative handle */
  ref?: Ref<ChartHandle>;
}

/** Props of Chart: any mix of line, area, bar, scatter and box plot series */
export interface ChartProps extends ChartCommonProps {
  /** Data series; each sets its own `type` */
  series: readonly ChartSeries[];
  /** Right value axis of the series with `yAxis: "right"` (dual axis charts) */
  yAxis2?: ChartAxisOptions;
  /**
   * `horizontal` puts the x axis (categories) down the left side
   * @default "vertical"
   */
  orientation?: ChartOrientation;
  /**
   * Arrows between categories, e.g. the dependencies of a Gantt chart
   * (`ganttSeries(...).dependencies`): elbows from the end of a bar to the
   * start of another
   */
  dependencies?: readonly ChartDependency[];
}

/** Props of LineChart */
export interface LineChartProps extends ChartCommonProps {
  /** Series drawn as lines (or areas with `area`) unless they set a `type` */
  series: readonly ChartSeries[];
  /**
   * Fills the area under the lines
   * @default false
   */
  area?: boolean;
}

/** Props of BarChart */
export interface BarChartProps extends ChartCommonProps {
  /** Series drawn as bars unless they set a `type` (e.g. a `line` overlay) */
  series: readonly ChartSeries[];
  /**
   * Stacks the bars of every series (otherwise they are grouped side by side)
   * @default false
   */
  stacked?: boolean;
}

/** Props of HorizontalBarChart */
export interface HorizontalBarChartProps extends Omit<BarChartProps, "labels"> {
  /**
   * Writes the value at the end of every bar
   * @default false
   */
  labels?: boolean;
}

/** Props of ScatterChart */
export interface ScatterChartProps extends ChartCommonProps {
  /** Series drawn as dots unless they set a `type` */
  series: readonly ChartSeries[];
}

/** Where a dragged QuadrantChart point was dropped */
export interface QuadrantDropTarget {
  /** Data coordinates of the drop */
  x: number;
  y: number;
  /** Quadrant of the drop, as seen on screen */
  quadrant: QuadrantCorner;
}

/** Props of QuadrantChart */
export interface QuadrantChartProps
  extends
    Omit<
      ChartCommonProps,
      "onPointClick" | "onPlotClick" | "renderTooltip" | "xAxis" | "yAxis"
    >,
    QuadrantConfig {
  /** Called with the tapped point and its index */
  onPointClick?: (point: QuadrantPoint, index: number) => void;
  /** Called when the empty area of a quadrant is tapped */
  onQuadrantClick?: (
    quadrant: QuadrantCorner,
    position: { x: number; y: number },
  ) => void;
  /**
   * Called when a dragged point is released; the dots become draggable
   * when it is set (the chart does not move them: update `points`)
   */
  onPointDrop?: (
    point: QuadrantPoint,
    index: number,
    target: QuadrantDropTarget,
  ) => void;
  /** React content of the tooltip of a point */
  renderTooltip?: (point: QuadrantPoint, index: number) => ReactNode;
  /**
   * React content placed over each quadrant (e.g. an add button); the
   * content receives touches, the rest of the quadrant does not
   */
  quadrantContent?: Partial<Record<QuadrantCorner, ReactNode>>;
}
