import type { PropType } from "vue";
import type {
  ChartRendererPreference,
  TradingBarsInput,
  TradingChartLabels,
  TradingChartStyle,
  TradingColorConvention,
  TradingCompareSeries,
  TradingCrosshairMode,
  TradingDrawing,
  TradingDrawingTool,
  TradingIndicator,
  TradingMarker,
  TradingPriceLine,
  TradingScaleMode,
  TradingTimeframe,
  TradingVolumeProfileOptions,
} from "minerva-design/charts/core";
import { chartFrameProps } from "./props";
import { raw } from "./engine";

const optionalBoolean = { type: Boolean, default: undefined } as const;

/** Props of TradingChart: the options of `createTradingChart` */
export const tradingChartProps = {
  ...chartFrameProps,
  /** Bars, oldest first; replaced when a new array / object is passed (stream with the handle's `update`) */
  bars: [Array, Object] as PropType<TradingBarsInput>,
  /** Duration of a bar; inferred from the bar times by default */
  timeframe: [Number, String] as PropType<TradingTimeframe>,
  /** Name shown in the legend and the accessible label (`"BTC/USDT"`) */
  symbol: String,
  /** How the bars are drawn (default `candles`) */
  chartStyle: String as PropType<TradingChartStyle>,
  /** Indicators, over the price or in panes below it, in this order */
  indicators: Array as PropType<readonly TradingIndicator[]>,
  /** Price scale of the price pane (default `linear`) */
  scaleMode: String as PropType<TradingScaleMode>,
  /** Colors of rising / falling bars: `redUp` swaps the defaults, `auto` follows the market convention of the `locale` (red up for CN, TW, JP, KR; default `greenUp`) */
  colorConvention: String as PropType<TradingColorConvention>,
  /** Color of rising bars (any CSS color, `var(--x)` included) */
  upColor: String,
  /** Color of falling bars */
  downColor: String,
  /** Decimals of the prices; detected from the data by default */
  precision: Number,
  /** Formats the prices (axis, legend, labels); overrides `precision` */
  formatPrice: Function as PropType<(price: number) => string>,
  /** Locale of the texts, numbers and dates (`"zh-CN"`); the page language by default */
  locale: String,
  /** Offset of the displayed times from UTC, in minutes (`480` for UTC+8); overrides `timeZone` */
  utcOffset: Number,
  /** Time zone of the time axis, the session breaks and the VWAP periods (IANA name such as `"America/New_York"`, or `"UTC"`); local time by default */
  timeZone: String,
  /** Dashed vertical lines where a day starts (intraday bars; default `false`) */
  sessionBreaks: optionalBoolean,
  /** Crosshair behaviour (default `magnet`) */
  crosshair: String as PropType<TradingCrosshairMode>,
  /** Legends with the values at the crosshair and the indicator toggles (default `true`) */
  legend: optionalBoolean,
  /** Line and axis label at the last price (default `true`) */
  lastPriceLine: optionalBoolean,
  /** Time left until the current bar closes, under the last price label (default `false`) */
  countdown: optionalBoolean,
  /** Marks the highest and lowest prices of the visible bars (default `true`) */
  highLowMarkers: optionalBoolean,
  /** Buy / sell markers */
  markers: Array as PropType<readonly TradingMarker[]>,
  /** Order, position, take profit / stop loss and alert lines */
  priceLines: Array as PropType<readonly TradingPriceLine[]>,
  /** A "+" button at the crosshair price reporting a limit order (`orderCreate`); with the chart focused, `B` / `S` arm a keyboard order (arrows move it, Enter confirms, Escape cancels; default `false`) */
  orderEntry: optionalBoolean,
  /** Volume by price of the visible bars, with its point of control and value area (`true` for the defaults; default `false`) */
  volumeProfile: {
    type: [Boolean, Object] as PropType<boolean | TradingVolumeProfileOptions>,
    default: undefined,
  },
  /** Comparison series (best read with `scaleMode: "percent"`) */
  compare: Array as PropType<readonly TradingCompareSeries[]>,
  /** Drawings; replaced when a new array is passed (see the `drawingsChange` event) */
  drawings: Array as PropType<readonly TradingDrawing[]>,
  /** Active drawing tool (default `cursor`) */
  drawingMode: String as PropType<TradingDrawingTool>,
  /** Keeps the drawing tool after a drawing is made (default `false`) */
  keepDrawingMode: optionalBoolean,
  /** Floating toolbar over the selected drawing: color, width, style, fill, lock, delete (default `true`) */
  drawingToolbar: optionalBoolean,
  /** Price of the `baseline` style; the close of the first visible bar by default */
  baselinePrice: Number,
  /** The automatic price scale also fits the visible drawings of each pane (default `false`) */
  autoscaleIncludesDrawings: optionalBoolean,
  /** Empty space after the last bar, in bars (default 8) */
  rightOffset: Number,
  /** Initial width of a bar, in pixels (default 8) */
  barSpacing: Number,
  /** Mouse wheel: `zoom`, `modifier` (zoom with Ctrl / ⌘ only) or `none` (default `zoom`) */
  wheel: String as PropType<"zoom" | "modifier" | "none">,
  /** Keeps panning after a quick drag (default `true`) */
  kineticScroll: optionalBoolean,
  /** Grid lines (default `true`) */
  grid: optionalBoolean,
  /** Large faint text behind the bars (`"BTCUSDT · 1H"`) */
  watermark: String,
  /** Overrides of the built-in texts of the `locale` */
  labels: Object as PropType<Partial<TradingChartLabels>>,
  /** Backend of the bars and lines: WebGPU, then WebGL2, WebGL, Canvas2D (default `auto`) */
  renderer: String as PropType<ChartRendererPreference>,
  /** Accessible label; built from the symbol by default */
  ariaLabel: String,
};

/** Size / update props of the components, never passed to the engines */
const FRAME = new Set(Object.keys(chartFrameProps));

/**
 * Engine options of the pass-through components (trading, order book):
 * every prop that is set but the size ones and `skip`, unwrapped
 */
export const definedOptions = <O>(
  props: Record<string, unknown>,
  skip: readonly string[] = [],
): O => {
  const options: Record<string, unknown> = {};
  for (const key of Object.keys(props)) {
    if (FRAME.has(key) || skip.includes(key)) continue;
    const value = props[key];
    if (value === undefined) continue;
    options[key] = raw(value);
  }
  return options as O;
};
