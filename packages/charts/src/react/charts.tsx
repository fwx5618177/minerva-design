import { useMemo, type CSSProperties } from "react";
import {
  areaSeries,
  barSeries,
  candlestickSeries,
  heatmapChartOptions,
  lineSeries,
  quadrantChartOptions,
  quadrantOf,
  scatterSeries,
  sparklineOptions,
  type QuadrantCorner,
} from "../engine/presets";
import type { ChartRect } from "../engine/types";
import { ChartBase, engineOptions } from "./Chart";
import type {
  AreaChartProps,
  BarChartProps,
  CandlestickChartProps,
  ChartCommonProps,
  HeatmapChartProps,
  LineChartProps,
  QuadrantChartProps,
  ScatterChartProps,
  SparklineProps,
} from "./types";

const frameProps = (props: ChartCommonProps) => ({
  height: props.height,
  width: props.width,
  className: props.className,
  style: props.style,
  handleRef: props.ref,
  onHover: props.onHover,
  onPointClick: props.onPointClick,
  onPlotClick: props.onPlotClick,
  onZoom: props.onZoom,
  onRendererChange: props.onRendererChange,
  renderTooltip: props.renderTooltip,
});

/** Line (or area) chart; handles millions of points on the GPU */
export function LineChart(props: LineChartProps) {
  const {
    series: input,
    area = false,
    curve,
    stacked = false,
    percent = false,
  } = props;
  const series = useMemo(
    () => lineSeries(input, area, { curve, stacked: stacked || percent }),
    [input, area, curve, stacked, percent],
  );
  return (
    <ChartBase
      options={engineOptions({
        ...props,
        series,
        stackMode: percent ? "percent" : undefined,
      })}
      {...frameProps(props)}
    />
  );
}

/** Area chart: smooth by default, stacked or 100% stacked */
export function AreaChart(props: AreaChartProps) {
  const {
    series: input,
    curve = "smooth",
    stacked = false,
    percent = false,
  } = props;
  const series = useMemo(
    () => areaSeries(input, { curve, stacked: stacked || percent }),
    [input, curve, stacked, percent],
  );
  return (
    <ChartBase
      options={engineOptions({
        ...props,
        series,
        stackMode: percent ? "percent" : undefined,
      })}
      {...frameProps(props)}
    />
  );
}

/** Bar chart: grouped side by side, stacked or 100% stacked, with optional value labels */
export function BarChart(props: BarChartProps) {
  const {
    series: input,
    stacked = false,
    percent = false,
    labels = false,
  } = props;
  const series = useMemo(
    () => barSeries(input, stacked || percent, labels),
    [input, stacked, percent, labels],
  );
  return (
    <ChartBase
      options={engineOptions({
        ...props,
        series,
        stackMode: percent ? "percent" : undefined,
      })}
      {...frameProps(props)}
    />
  );
}

/** Candlestick (OHLC) chart: rising and falling candles, zoomable on the GPU */
export function CandlestickChart(props: CandlestickChartProps) {
  const { series: input } = props;
  const series = useMemo(() => candlestickSeries(input), [input]);
  return (
    <ChartBase
      options={engineOptions({ ...props, series })}
      {...frameProps(props)}
    />
  );
}

/** Heatmap: a grid of cells colored by value (categories or numbers on both axes) */
export function HeatmapChart(props: HeatmapChartProps) {
  const {
    data,
    xCategories,
    yCategories,
    colorScale,
    valueRange,
    name,
    radius,
    format,
  } = props;
  const series = useMemo(
    () =>
      heatmapChartOptions({
        data,
        xCategories,
        yCategories,
        colorScale,
        valueRange,
        name,
        radius,
        format,
      }).series,
    [
      data,
      xCategories,
      yCategories,
      colorScale,
      valueRange,
      name,
      radius,
      format,
    ],
  );
  const base = engineOptions({ ...props, series });
  return (
    <ChartBase
      options={{
        ...heatmapChartOptions(
          { data, xCategories, yCategories },
          {
            ...base,
            legend: props.legend,
            interaction: props.interaction,
            tooltip: props.tooltip,
          },
        ),
        series,
      }}
      {...frameProps(props)}
    />
  );
}

/** Word-sized chart without axes: a trend in a table cell, a KPI card, ... */
export function Sparkline(props: SparklineProps) {
  const {
    data,
    type,
    color,
    curve,
    name,
    reference,
    format,
    height = 48,
    width,
    renderer,
    tooltip,
    palette,
    ariaLabel,
    className,
    style,
    ref,
    onHover,
    renderTooltip,
  } = props;
  const options = useMemo(
    () =>
      sparklineOptions(
        { data, type, color, curve, name, reference, format },
        { renderer, tooltip, palette, ariaLabel },
      ),
    [
      data,
      type,
      color,
      curve,
      name,
      reference,
      format,
      renderer,
      tooltip,
      palette,
      ariaLabel,
    ],
  );
  return (
    <ChartBase
      options={options}
      height={height}
      width={width}
      className={className}
      style={style}
      handleRef={ref}
      onHover={onHover}
      renderTooltip={renderTooltip}
    />
  );
}

/** Scatter chart: zooms on both axes, hit testing through a spatial index */
export function ScatterChart(props: ScatterChartProps) {
  const { series: input } = props;
  const series = useMemo(() => scatterSeries(input), [input]);
  return (
    <ChartBase
      options={engineOptions({ ...props, series })}
      {...frameProps(props)}
    />
  );
}

const CORNERS: QuadrantCorner[] = [
  "topLeft",
  "topRight",
  "bottomLeft",
  "bottomRight",
];

const cornerStyle = (
  corner: QuadrantCorner,
  plot: ChartRect,
  split: { x: number; y: number },
): CSSProperties => {
  const left = corner.endsWith("Left");
  const top = corner.startsWith("top");
  return {
    position: "absolute",
    left: left ? 0 : split.x - plot.x,
    top: top ? 0 : split.y - plot.y,
    width: left ? split.x - plot.x : plot.x + plot.width - split.x,
    height: top ? split.y - plot.y : plot.y + plot.height - split.y,
    pointerEvents: "none",
  };
};

/**
 * Four-quadrant matrix (priority matrix, Eisenhower, BCG, ...): tinted
 * quadrants with titles, dividers, and labelled dots placed without
 * overlapping labels. Dots can be dragged to another quadrant.
 */
export function QuadrantChart(props: QuadrantChartProps) {
  const {
    points,
    xDomain,
    yDomain,
    xSplit,
    ySplit,
    quadrants,
    xLabel,
    yLabel,
    axisLabels,
    showTicks,
    reverseX,
    showLabels,
    pointSize,
    name,
    draggable,
    onPointClick,
    onPointDrop,
    onQuadrantClick,
    renderTooltip,
    quadrantContent,
  } = props;
  const geometry = { xDomain, yDomain, xSplit, ySplit, reverseX };

  const options = quadrantChartOptions(
    {
      points,
      xDomain,
      yDomain,
      xSplit,
      ySplit,
      quadrants,
      xLabel,
      yLabel,
      axisLabels,
      showTicks,
      reverseX,
      showLabels,
      pointSize,
      name,
      draggable: draggable ?? !!onPointDrop,
    },
    engineOptions({ ...props, series: [] }),
  );

  const overlay = quadrantContent
    ? (plot: ChartRect) => {
        const [x0, x1] = xDomain ?? [0, 10];
        const [y0, y1] = yDomain ?? [0, 10];
        const xs = xSplit ?? (x0 + x1) / 2;
        const ys = ySplit ?? (y0 + y1) / 2;
        const fx = (xs - x0) / (x1 - x0 || 1);
        const fy = (ys - y0) / (y1 - y0 || 1);
        const split = {
          x: plot.x + plot.width * (reverseX ? 1 - fx : fx),
          y: plot.y + plot.height * (1 - fy),
        };
        return CORNERS.map((corner) =>
          quadrantContent[corner] ? (
            <div
              key={corner}
              className={`minerva-chart-quadrant minerva-chart-quadrant-${corner}`}
              style={cornerStyle(corner, plot, split)}
            >
              {quadrantContent[corner]}
            </div>
          ) : null,
        );
      }
    : undefined;

  return (
    <ChartBase
      options={options}
      {...frameProps({
        ...props,
        onPointClick: undefined,
        renderTooltip: undefined,
      })}
      overlay={overlay}
      onPointClick={
        onPointClick
          ? (event) => {
              const index = event.items[0]?.index;
              if (index !== undefined && points[index])
                onPointClick(points[index], index);
            }
          : undefined
      }
      onPlotClick={
        onQuadrantClick
          ? (at) => onQuadrantClick(quadrantOf(geometry, at.x, at.y), at)
          : undefined
      }
      onDrop={
        onPointDrop
          ? (event) => {
              const index = event.item.index;
              if (!points[index]) return;
              onPointDrop(points[index], index, {
                x: event.x,
                y: event.y,
                quadrant: quadrantOf(geometry, event.x, event.y),
              });
            }
          : undefined
      }
      renderTooltip={
        renderTooltip
          ? (event) => {
              const index = event.items[0]?.index;
              return index !== undefined && points[index]
                ? renderTooltip(points[index], index)
                : null;
            }
          : undefined
      }
    />
  );
}
