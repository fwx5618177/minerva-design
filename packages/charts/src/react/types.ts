import type { CSSProperties, Ref } from "react";
import type {
  ChartAnnotation,
  ChartAxisOptions,
  ChartHoverEvent,
  ChartInstance,
  ChartLegendOptions,
  ChartInteractionOptions,
  ChartPadding,
  ChartRendererKind,
  ChartRendererPreference,
  ChartSeries,
  ChartTooltipOptions,
  ChartView,
} from "../engine/types";

/** Imperative handle of the chart components (`ref`) */
export interface ChartHandle {
  /** Shows the whole data range */
  resetZoom(): void;
  /** Visible range */
  getView(): ChartView | null;
  /** Sets the visible range */
  setView(view: Partial<ChartView>): void;
  /** Backend in use, `null` until ready */
  getRenderer(): ChartRendererKind | null;
  /** The underlying engine instance (minerva-design/charts/core) */
  getInstance(): ChartInstance | null;
}

/** Props shared by every chart component */
export interface ChartCommonProps {
  /**
   * Height of the chart (the legend included); numbers are pixels
   * @default 320
   */
  height?: number | string;
  /**
   * Width of the chart; numbers are pixels
   * @default "100%"
   */
  width?: number | string;
  /** X axis */
  xAxis?: ChartAxisOptions;
  /** Y axis */
  yAxis?: ChartAxisOptions;
  /**
   * Backend of the data layer: `auto` tries WebGPU, then WebGL2, then Canvas2D
   * @default "auto"
   */
  renderer?: ChartRendererPreference;
  /** Legend; shown by default when several series have a name */
  legend?: boolean | ChartLegendOptions;
  /** Tooltip; `false` disables it */
  tooltip?: boolean | ChartTooltipOptions;
  /** Vertical guide line following the pointer */
  crosshair?: boolean;
  /** Background areas and reference lines */
  annotations?: readonly ChartAnnotation[];
  /**
   * Zoom (Ctrl / ⌘ + wheel, pinch), pan (drag), double-click reset and keyboard navigation; `false` makes the chart static
   * @default true
   */
  interaction?: boolean | ChartInteractionOptions;
  /** Space around the plot area, in pixels */
  padding?: ChartPadding;
  /** Series colors (defaults to the `--chart-series-1..8` CSS variables, then the theme colors) */
  palette?: readonly string[];
  /** Accessible name of the chart */
  ariaLabel?: string;
  /** Called when the hovered (or keyboard-focused) points change */
  onHover?: (event: ChartHoverEvent | null) => void;
  /** Called when a point (or bar) is clicked */
  onPointClick?: (event: ChartHoverEvent) => void;
  /** Called when the user zooms or pans */
  onZoom?: (view: ChartView) => void;
  /** Called with the backend once it is ready (and when it falls back after a GPU loss) */
  onRendererChange?: (renderer: ChartRendererKind) => void;
  /** Additional class name of the root element */
  className?: string;
  /** Inline styles of the root element */
  style?: CSSProperties;
  /** Imperative handle */
  ref?: Ref<ChartHandle>;
}

/** Props of Chart: any mix of line, area, bar and scatter series */
export interface ChartProps extends ChartCommonProps {
  /** Data series; each sets its own `type` */
  series: readonly ChartSeries[];
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

/** Props of ScatterChart */
export interface ScatterChartProps extends ChartCommonProps {
  /** Series drawn as dots unless they set a `type` */
  series: readonly ChartSeries[];
}

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

/** Props of QuadrantChart */
export interface QuadrantChartProps extends Omit<
  ChartCommonProps,
  "onPointClick" | "xAxis" | "yAxis"
> {
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
  /** Called with the clicked point and its index */
  onPointClick?: (point: QuadrantPoint, index: number) => void;
}
