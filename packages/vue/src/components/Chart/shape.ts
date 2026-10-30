import {
  createShapeChart,
  type CalendarDate,
  type CalendarHeatmapOptions,
  type ChartPadding,
  type ShapeChartCommonOptions,
  type ShapeChartInstance,
  type ShapeChartOptions,
  type ShapeDrillEvent,
  type ShapeHoverEvent,
  type ShapeLegendOptions,
  type ShapeToggleEvent,
  type ShapeTooltipOptions,
} from "minerva-design/charts/core";
import { raw, useChartEngine, useRootStyle } from "./engine";
import type { ShapeChartHandle } from "./types";

/** The common props read by `shapeCommonOptions` */
interface ShapeCommonProps {
  palette?: readonly string[];
  legend?: boolean | ShapeLegendOptions;
  tooltip?: boolean | ShapeTooltipOptions;
  format?: (value: number) => string;
  percentFormat?: (share: number) => string;
  hidden?: readonly number[];
  animation?: boolean;
  padding?: ChartPadding;
  ariaLabel?: string;
  locale?: string;
  texts?: ShapeChartCommonOptions["texts"];
}

/** Engine options shared by every shape chart */
export const shapeCommonOptions = (
  props: ShapeCommonProps,
): ShapeChartCommonOptions => ({
  palette: raw(props.palette),
  legend: raw(props.legend),
  tooltip: raw(props.tooltip),
  format: props.format,
  percentFormat: props.percentFormat,
  hidden: props.hidden ? [...props.hidden] : undefined,
  animation: props.animation,
  padding: raw(props.padding),
  ariaLabel: props.ariaLabel,
  locale: props.locale,
  texts: raw(props.texts),
});

/** Engine events forwarded by a shape chart */
export interface ShapeHandlers {
  hover?: (event: ShapeHoverEvent | null) => void;
  click?: (event: ShapeHoverEvent) => void;
  toggle?: (event: ShapeToggleEvent) => void;
  drill?: (event: ShapeDrillEvent) => void;
}

/** Engine (`createShapeChart`), root style and template handle of a shape chart */
export function useShapeChart(
  props: object & {
    deep?: boolean;
    width?: number | string;
    height?: number | string;
  },
  build: () => ShapeChartOptions | null,
  handlers: ShapeHandlers,
  defaultHeight: number | (() => number) = 320,
) {
  const { setContainer, instance } = useChartEngine<
    ShapeChartOptions,
    ShapeChartInstance
  >(createShapeChart, props, build, (chart) => [
    chart.on("hover", (event) => handlers.hover?.(event)),
    chart.on("click", (event) => handlers.click?.(event)),
    chart.on("toggle", (event) => handlers.toggle?.(event)),
    chart.on("drill", (event) => handlers.drill?.(event)),
  ]);
  const handle: ShapeChartHandle = {
    toggle: (index) => instance.value?.toggle(index),
    drill: (path) => instance.value?.drill(path),
    getInstance: () => instance.value,
  };
  return {
    setContainer,
    rootStyle: useRootStyle(props, defaultHeight),
    handle,
  };
}

const dateOf = (date: CalendarDate) =>
  date instanceof Date ? date : new Date(date);

/**
 * Strips of a calendar heatmap (`weeks` layout): one per year when the
 * range spans several years, for its default height
 */
export const calendarStrips = (range: CalendarHeatmapOptions["range"]) => {
  if (!Array.isArray(range)) return 1;
  const [start, end] = range as readonly [CalendarDate, CalendarDate];
  const y0 = dateOf(start).getFullYear();
  const y1 = dateOf(end).getFullYear();
  const days =
    (dateOf(end).getTime() - dateOf(start).getTime()) / 86_400_000 + 1;
  return y1 > y0 && days > 371 ? y1 - y0 + 1 : 1;
};
