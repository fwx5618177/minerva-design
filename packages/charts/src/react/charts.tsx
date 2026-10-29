import { useMemo } from "react";
import type {
  ChartAnnotation,
  ChartSeries,
  ChartSeriesType,
} from "../engine/types";
import { ChartBase, engineOptions } from "./Chart";
import type {
  BarChartProps,
  ChartCommonProps,
  LineChartProps,
  QuadrantChartProps,
  QuadrantRegion,
  ScatterChartProps,
} from "./types";

const withType = (
  series: readonly ChartSeries[],
  type: ChartSeriesType,
  stack?: string,
): ChartSeries[] =>
  series.map((s) => ({
    ...s,
    type: s.type ?? type,
    ...(stack !== undefined && (s.type ?? type) === "bar"
      ? { stack: s.stack ?? stack }
      : {}),
  }));

const frameProps = (props: ChartCommonProps) => ({
  height: props.height,
  width: props.width,
  className: props.className,
  style: props.style,
  handleRef: props.ref,
  onHover: props.onHover,
  onPointClick: props.onPointClick,
  onZoom: props.onZoom,
  onRendererChange: props.onRendererChange,
});

/** Line (or area) chart; handles millions of points on the GPU */
export function LineChart(props: LineChartProps) {
  const { series: input, area = false } = props;
  const series = useMemo(
    () => withType(input, area ? "area" : "line"),
    [input, area],
  );
  return (
    <ChartBase
      options={engineOptions({ ...props, series })}
      {...frameProps(props)}
    />
  );
}

/** Bar chart: grouped side by side, or stacked */
export function BarChart(props: BarChartProps) {
  const { series: input, stacked = false } = props;
  const series = useMemo(
    () => withType(input, "bar", stacked ? "stack" : undefined),
    [input, stacked],
  );
  return (
    <ChartBase
      options={engineOptions({ ...props, series })}
      {...frameProps(props)}
    />
  );
}

/** Scatter chart: zooms on both axes, hit testing through a spatial index */
export function ScatterChart(props: ScatterChartProps) {
  const { series: input } = props;
  const series = useMemo(() => withType(input, "scatter"), [input]);
  return (
    <ChartBase
      options={engineOptions({ ...props, series })}
      {...frameProps(props)}
    />
  );
}

const DEFAULT_QUADRANT_COLORS = {
  topLeft: "var(--danger-color, #ef4444)",
  topRight: "var(--primary-color, #4f46e5)",
  bottomLeft: "var(--warning-color, #f59e0b)",
  bottomRight: "var(--text-secondary-color, #64748b)",
} as const;

type Corner = keyof typeof DEFAULT_QUADRANT_COLORS;

/**
 * Four-quadrant matrix (priority matrix, Eisenhower, BCG, ...): tinted
 * quadrants with titles, dividers, and labelled dots placed without
 * overlapping labels.
 */
export function QuadrantChart(props: QuadrantChartProps) {
  const {
    points,
    xDomain = [0, 10],
    yDomain = [0, 10],
    xSplit,
    ySplit,
    quadrants,
    xLabel,
    yLabel,
    reverseX = false,
    showLabels = true,
    pointSize = 12,
    name,
    onPointClick,
  } = props;
  const [x0, x1] = xDomain;
  const [y0, y1] = yDomain;
  const xs = xSplit ?? (x0 + x1) / 2;
  const ys = ySplit ?? (y0 + y1) / 2;

  const regions = useMemo(() => {
    const region = (
      corner: Corner,
    ): Required<Pick<QuadrantRegion, "color">> & QuadrantRegion => ({
      ...quadrants?.[corner],
      color: quadrants?.[corner]?.color ?? DEFAULT_QUADRANT_COLORS[corner],
    });
    return {
      topLeft: region("topLeft"),
      topRight: region("topRight"),
      bottomLeft: region("bottomLeft"),
      bottomRight: region("bottomRight"),
    };
  }, [quadrants]);

  const series = useMemo((): ChartSeries[] => {
    const cornerOf = (x: number, y: number): Corner => {
      const right = reverseX ? x < xs : x >= xs;
      const top = y >= ys;
      return top
        ? right
          ? "topRight"
          : "topLeft"
        : right
          ? "bottomRight"
          : "bottomLeft";
    };
    return [
      {
        type: "scatter",
        name: name ?? "",
        pointSize,
        showLabels,
        opacity: 0.9,
        data: points.map((p) => ({
          x: p.x,
          y: p.y,
          label: p.label,
          size: p.size,
          color: p.color ?? regions[cornerOf(p.x, p.y)].color,
        })),
      },
    ];
  }, [points, regions, reverseX, xs, ys, name, pointSize, showLabels]);

  const annotations = useMemo((): ChartAnnotation[] => {
    // visual left / right -> data ranges
    const left: [number, number] = reverseX ? [xs, x1] : [x0, xs];
    const right: [number, number] = reverseX ? [x0, xs] : [xs, x1];
    const rect = (
      corner: Corner,
      [xa, xb]: [number, number],
      [ya, yb]: [number, number],
      position: "top-left" | "top-right" | "bottom-left" | "bottom-right",
    ): ChartAnnotation => ({
      type: "rect",
      x0: xa,
      x1: xb,
      y0: ya,
      y1: yb,
      color: regions[corner].color,
      opacity: 0.07,
      label: regions[corner].label,
      labelPosition: position,
    });
    return [
      rect("topLeft", left, [ys, y1], "top-left"),
      rect("topRight", right, [ys, y1], "top-right"),
      rect("bottomLeft", left, [y0, ys], "bottom-left"),
      rect("bottomRight", right, [y0, ys], "bottom-right"),
      {
        type: "line",
        axis: "x",
        value: xs,
        dash: [],
        color: "var(--border-strong-color, var(--border-color, #cbd5e1))",
      },
      {
        type: "line",
        axis: "y",
        value: ys,
        dash: [],
        color: "var(--border-strong-color, var(--border-color, #cbd5e1))",
      },
      ...(props.annotations ?? []),
    ];
  }, [regions, reverseX, x0, x1, y0, y1, xs, ys, props.annotations]);

  const options = engineOptions({
    ...props,
    series,
    annotations,
    xAxis: {
      min: x0,
      max: x1,
      title: xLabel,
      reverse: reverseX,
      nice: false,
      grid: false,
      tickCount: 4,
    },
    yAxis: {
      min: y0,
      max: y1,
      title: yLabel,
      nice: false,
      grid: false,
      tickCount: 4,
    },
    legend: props.legend ?? false,
    interaction: props.interaction ?? { zoom: false },
  });

  return (
    <ChartBase
      options={options}
      {...frameProps({ ...props, onPointClick: undefined })}
      onPointClick={
        onPointClick
          ? (event) => {
              const index = event.items[0]?.index;
              if (index !== undefined && points[index])
                onPointClick(points[index], index);
            }
          : undefined
      }
    />
  );
}
