import {
  createChart,
  type ChartAnnotation,
  type ChartAxisOptions,
  type ChartCurve,
  type ChartDragEvent,
  type ChartHoverEvent,
  type ChartInstance,
  type ChartInteractionOptions,
  type ChartLegendOptions,
  type ChartOptions,
  type ChartPadding,
  type ChartPlotClickEvent,
  type ChartRendererKind,
  type ChartRendererPreference,
  type ChartSeries,
  type ChartSeriesType,
  type ChartTooltipOptions,
  type ChartView,
} from "minerva-design/charts/core";
import { raw, useChartEngine, useRootStyle } from "./engine";
import type { ChartHandle } from "./types";

/** The common props read by `engineOptions` */
interface CommonProps {
  xAxis?: ChartAxisOptions;
  yAxis?: ChartAxisOptions;
  renderer?: ChartRendererPreference;
  legend?: boolean | ChartLegendOptions;
  tooltip?: boolean | ChartTooltipOptions;
  crosshair?: boolean;
  annotations?: readonly ChartAnnotation[];
  interaction?: boolean | ChartInteractionOptions;
  padding?: ChartPadding;
  palette?: readonly string[];
  ariaLabel?: string;
  locale?: string;
  labels?: ChartOptions["labels"] | boolean;
  yAxis2?: ChartAxisOptions;
  orientation?: ChartOptions["orientation"];
}

/** Engine options of the common props */
export const engineOptions = (
  props: CommonProps,
  series: readonly ChartSeries[],
  stackMode?: ChartOptions["stackMode"],
): ChartOptions => ({
  series,
  xAxis: raw(props.xAxis),
  yAxis: raw(props.yAxis),
  renderer: props.renderer,
  legend: raw(props.legend),
  tooltip: raw(props.tooltip),
  crosshair: props.crosshair,
  annotations: raw(props.annotations),
  interaction: raw(props.interaction),
  padding: raw(props.padding),
  palette: raw(props.palette),
  ariaLabel: props.ariaLabel,
  locale: props.locale,
  // BarChart / WaterfallChart: `labels` writes the values (a boolean)
  labels: typeof props.labels === "object" ? raw(props.labels) : undefined,
  yAxis2: raw(props.yAxis2),
  orientation: props.orientation,
  stackMode,
});

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
  raw(series).map((item) => {
    const s = raw(item);
    const t = s.type ?? type;
    return {
      ...s,
      data: raw(s.data),
      type: t,
      ...(stack !== undefined && t === type ? { stack: s.stack ?? stack } : {}),
      ...(curve !== undefined && (t === "line" || t === "area")
        ? { curve: s.curve ?? curve }
        : {}),
    };
  });

/** Engine events forwarded by a cartesian chart */
export interface CartesianHandlers {
  hover?: (event: ChartHoverEvent | null) => void;
  click?: (event: ChartHoverEvent) => void;
  plotClick?: (event: ChartPlotClickEvent) => void;
  zoom?: (view: ChartView) => void;
  renderer?: (renderer: ChartRendererKind) => void;
  drop?: (event: ChartDragEvent) => void;
}

/** Engine (`createChart`), root style and template handle of a cartesian chart */
export function useCartesianChart(
  props: object & {
    deep?: boolean;
    width?: number | string;
    height?: number | string;
  },
  build: () => ChartOptions | null,
  handlers: CartesianHandlers,
  defaultHeight = 320,
) {
  const { setContainer, instance } = useChartEngine<
    ChartOptions,
    ChartInstance
  >(createChart, props, build, (chart) => [
    chart.on("hover", (event) => handlers.hover?.(event)),
    chart.on("click", (event) => handlers.click?.(event)),
    chart.on("plotClick", (event) => handlers.plotClick?.(event)),
    chart.on("zoom", (view) => handlers.zoom?.(view)),
    chart.on("renderer", (renderer) => handlers.renderer?.(renderer)),
    chart.on("drop", (event) => handlers.drop?.(event)),
  ]);
  const handle: ChartHandle = {
    resetZoom: () => instance.value?.resetZoom(),
    getView: () => instance.value?.getView() ?? null,
    setView: (view) => instance.value?.setView(view),
    getRenderer: () => instance.value?.getRenderer() ?? null,
    getInstance: () => instance.value,
  };
  return {
    setContainer,
    rootStyle: useRootStyle(props, defaultHeight),
    handle,
  };
}
