import type {
  ChartCurve,
  ChartSeries,
  ChartSeriesType,
} from "minerva-design/charts/core";

/**
 * Gives the series without a `type` the type of the element (the presets of
 * the React components): `stack` / `curve` apply to the series of that type
 * that do not set their own.
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
