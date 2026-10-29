import type { PropType } from "vue";
import type {
  CanvasChartInstance,
  ChartAnnotation,
  ChartAxisOptions,
  ChartInteractionOptions,
  ChartLegendOptions,
  ChartPadding,
  ChartSeries,
  ChartTooltipOptions,
  ChartView,
  QuadrantAxisLabels,
  QuadrantCorner,
  QuadrantPoint,
  QuadrantRegions,
} from "@minerva/charts/canvas";

export type {
  CanvasChartInstance,
  ChartAnnotation,
  ChartAxisOptions,
  ChartHoverEvent,
  ChartHoverItem,
  ChartInteractionOptions,
  ChartLegendOptions,
  ChartPadding,
  ChartPlotClickEvent,
  ChartSeries,
  ChartSeriesData,
  ChartTooltipOptions,
  ChartView,
  QuadrantAxisLabels,
  QuadrantCorner,
  QuadrantPoint,
  QuadrantRegion,
  QuadrantRegions,
} from "@minerva/charts/canvas";

/** Imperative handle of the chart components (template `ref`) */
export interface ChartHandle {
  /** Shows the whole data range */
  resetZoom(): void;
  /** Visible range, `null` until the canvas is ready */
  getView(): ChartView | null;
  /** Sets the visible range */
  setView(view: Partial<ChartView>): void;
  /** Always `canvas2d` once the canvas is ready, `null` before */
  getRenderer(): "canvas2d" | null;
  /** The underlying canvas chart, `null` until the canvas is ready */
  getInstance(): CanvasChartInstance | null;
  /** Measures the canvas again (after a layout change the chart cannot see) */
  resize(): void;
}

/** Where a dragged QuadrantChart point was dropped */
export interface QuadrantDropTarget {
  /** Data coordinates of the drop */
  x: number;
  y: number;
  /** Quadrant of the drop, as seen on screen */
  quadrant: QuadrantCorner;
}

// Booleans and boolean unions default to `undefined` (not Vue's `false`) so
// the engine defaults apply when they are omitted.

/** Props shared by every chart component */
export const chartCommonProps = {
  /** Height of the chart (the legend included); numbers are pixels, strings any CSS length (rpx included) */
  height: { type: [Number, String] as PropType<number | string>, default: 320 },
  /** Width of the chart; numbers are pixels */
  width: {
    type: [Number, String] as PropType<number | string>,
    default: "100%",
  },
  /** Legend; shown by default when several series have a name */
  legend: {
    type: [Boolean, Object] as PropType<boolean | ChartLegendOptions>,
    default: undefined,
  },
  /** Tooltip; `false` disables it (`render` may return a string) */
  tooltip: {
    type: [Boolean, Object] as PropType<boolean | ChartTooltipOptions>,
    default: undefined,
  },
  /** Vertical guide line following the finger */
  crosshair: { type: Boolean, default: undefined },
  /** Background areas and reference lines */
  annotations: Array as PropType<readonly ChartAnnotation[]>,
  /** Pinch zoom, pan, double tap reset; `false` makes the chart static */
  interaction: {
    type: [Boolean, Object] as PropType<boolean | ChartInteractionOptions>,
    default: undefined,
  },
  /** Space around the plot area, in pixels */
  padding: Object as PropType<ChartPadding>,
  /** Series colors (defaults to the theme colors) */
  palette: Array as PropType<readonly string[]>,
  /** Accessible name of the chart */
  ariaLabel: String,
  /** Keeps the page from scrolling while a finger moves on the chart */
  disableScroll: { type: Boolean, default: undefined },
};

/** X / Y axes (every chart but QuadrantChart) */
export const chartAxisProps = {
  /** X axis */
  xAxis: Object as PropType<ChartAxisOptions>,
  /** Y axis */
  yAxis: Object as PropType<ChartAxisOptions>,
};

/** Data series */
export const chartSeriesProps = {
  /** Data series (replace the array or a `data` array to update the chart) */
  series: { type: Array as PropType<readonly ChartSeries[]>, required: true },
} as const;

/** Props of QuadrantChart (besides the common ones) */
export const quadrantChartProps = {
  /** Points to place (replace the array to update the chart) */
  points: { type: Array as PropType<readonly QuadrantPoint[]>, required: true },
  /** Range of the horizontal axis (default `[0, 10]`) */
  xDomain: Array as unknown as PropType<[number, number]>,
  /** Range of the vertical axis (default `[0, 10]`) */
  yDomain: Array as unknown as PropType<[number, number]>,
  /** X value of the vertical divider (the middle of `xDomain` by default) */
  xSplit: Number,
  /** Y value of the horizontal divider (the middle of `yDomain` by default) */
  ySplit: Number,
  /** Titles and colors of the quadrants */
  quadrants: Object as PropType<QuadrantRegions>,
  /** Title of the horizontal axis */
  xLabel: String,
  /** Title of the vertical axis */
  yLabel: String,
  /** Texts at the ends of the dividers, drawn inside the plot */
  axisLabels: Object as PropType<QuadrantAxisLabels>,
  /** Shows the numeric ticks of the axes (default `true`) */
  showTicks: { type: Boolean, default: undefined },
  /** Reverses the horizontal axis */
  reverseX: { type: Boolean, default: undefined },
  /** Draws the labels next to the dots (default `true`) */
  showLabels: { type: Boolean, default: undefined },
  /** Dot diameter in pixels (default 12) */
  pointSize: Number,
  /** Name of the points in the tooltip */
  name: String,
  /** Lets the user drag the dots (default: when a `pointDrop` listener is set) */
  draggable: { type: Boolean, default: undefined },
} as const;
