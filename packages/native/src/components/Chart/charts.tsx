import { useMemo } from "react";
import { View } from "react-native";
import {
  barSeries,
  lineSeries,
  quadrantChartOptions,
  quadrantOf,
  scatterSeries,
  type ChartHoverEvent,
  type ChartOptions,
  type ChartRect,
  type ChartSeries,
  type QuadrantCorner,
} from "@minerva/charts/canvas";
import { part } from "../../internal/parts";
import { ChartBase, engineOptions } from "./ChartBase";
import type {
  BarChartProps,
  ChartCommonProps,
  ChartProps,
  HorizontalBarChartProps,
  LineChartProps,
  QuadrantChartProps,
  ScatterChartProps,
} from "./types";

/** Engine options of the common props, kept while the props are the same */
function useEngineOptions(
  props: Omit<
    ChartCommonProps,
    "onPointClick" | "onPlotClick" | "renderTooltip" | "labels"
  > & {
    /** Texts of the engine (a boolean is the `labels` of a bar chart) */
    labels?: ChartCommonProps["labels"] | boolean;
  },
  series: readonly ChartSeries[],
  extra?: Pick<ChartOptions, "orientation" | "yAxis2" | "dependencies">,
): ChartOptions {
  const {
    xAxis,
    yAxis,
    legend,
    tooltip,
    crosshair,
    annotations,
    interaction,
    padding,
    palette,
    ariaLabel,
    locale,
    labels: labelsProp,
  } = props;
  const labels = typeof labelsProp === "object" ? labelsProp : undefined;
  const orientation = extra?.orientation;
  const yAxis2 = extra?.yAxis2;
  const dependencies = extra?.dependencies;
  return useMemo(
    () => ({
      ...engineOptions({
        series,
        xAxis,
        yAxis,
        legend,
        tooltip,
        crosshair,
        annotations,
        interaction,
        padding,
        palette,
        ariaLabel,
        locale,
        labels,
      }),
      ...(orientation ? { orientation } : null),
      ...(yAxis2 ? { yAxis2 } : null),
      ...(dependencies ? { dependencies } : null),
    }),
    [
      series,
      orientation,
      yAxis2,
      dependencies,
      xAxis,
      yAxis,
      legend,
      tooltip,
      crosshair,
      annotations,
      interaction,
      padding,
      palette,
      ariaLabel,
      locale,
      labels,
    ],
  );
}

const frameProps = (props: Omit<ChartCommonProps, "labels">) => ({
  height: props.height,
  width: props.width,
  style: props.style,
  testID: props.testID,
  handleRef: props.ref,
  onHover: props.onHover,
  onPointClick: props.onPointClick,
  onPlotClick: props.onPlotClick,
  onZoom: props.onZoom,
  renderTooltip: props.renderTooltip,
});

/**
 * Chart mixing line, area, bar and scatter series, drawn with views:
 * tap for the tooltip, pinch to zoom, drag to pan, double tap to reset.
 * Themed by the closest `MinervaProvider` (light / dark).
 */
export function Chart(props: ChartProps) {
  const { series, orientation, yAxis2, dependencies } = props;
  const options = useEngineOptions(props, series, {
    orientation,
    yAxis2,
    dependencies,
  });
  return <ChartBase options={options} {...frameProps(props)} />;
}

/** Line (or area) chart; large series are decimated to the pixel columns */
export function LineChart(props: LineChartProps) {
  const { series: input, area = false } = props;
  const series = useMemo(() => lineSeries(input, area), [input, area]);
  const options = useEngineOptions(props, series);
  return <ChartBase options={options} {...frameProps(props)} />;
}

/** Bar chart: grouped side by side, or stacked */
export function BarChart(props: BarChartProps) {
  const { series: input, stacked = false } = props;
  const series = useMemo(() => barSeries(input, stacked), [input, stacked]);
  const options = useEngineOptions(props, series);
  return <ChartBase options={options} {...frameProps(props)} />;
}

/**
 * Horizontal bar chart: categories down the left side (rankings, long
 * names, surveys), grouped, stacked or with the values at the bar ends
 */
export function HorizontalBarChart(props: HorizontalBarChartProps) {
  const { series: input, stacked = false, labels = false } = props;
  const series = useMemo(
    () => barSeries(input, stacked, labels),
    [input, stacked, labels],
  );
  const options = useEngineOptions(props, series, {
    orientation: "horizontal",
  });
  return <ChartBase options={options} {...frameProps(props)} />;
}

/** Scatter chart: zooms on both axes; large point sets are merged per cell */
export function ScatterChart(props: ScatterChartProps) {
  const { series: input } = props;
  const series = useMemo(() => scatterSeries(input), [input]);
  const options = useEngineOptions(props, series);
  return <ChartBase options={options} {...frameProps(props)} />;
}

const CORNERS: QuadrantCorner[] = [
  "topLeft",
  "topRight",
  "bottomLeft",
  "bottomRight",
];

const NO_SERIES: readonly ChartSeries[] = [];

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
  const base = useEngineOptions(props, NO_SERIES);
  const dragPoints = draggable ?? !!onPointDrop;
  const options = useMemo(
    () =>
      quadrantChartOptions(
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
          draggable: dragPoints,
        },
        base,
      ),
    [
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
      dragPoints,
      base,
    ],
  );
  const geometry = { xDomain, yDomain, xSplit, ySplit, reverseX };

  const overlay = quadrantContent
    ? (plot: ChartRect) => {
        const [x0, x1] = xDomain ?? [0, 10];
        const [y0, y1] = yDomain ?? [0, 10];
        const xs = xSplit ?? (x0 + x1) / 2;
        const ys = ySplit ?? (y0 + y1) / 2;
        const fx = (xs - x0) / (x1 - x0 || 1);
        const fy = (ys - y0) / (y1 - y0 || 1);
        // split point relative to the plot area
        const sx = plot.width * (reverseX ? 1 - fx : fx);
        const sy = plot.height * (1 - fy);
        return CORNERS.map((corner) => {
          const content = quadrantContent[corner];
          if (content === undefined || content === null || content === false)
            return null;
          const left = corner.endsWith("Left");
          const top = corner.startsWith("top");
          return (
            <View
              key={corner}
              pointerEvents="box-none"
              style={{
                position: "absolute",
                left: left ? 0 : sx,
                top: top ? 0 : sy,
                width: left ? sx : plot.width - sx,
                height: top ? sy : plot.height - sy,
              }}
              {...part("chart", "quadrant", { corner })}
            >
              {content}
            </View>
          );
        });
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
          ? (event: ChartHoverEvent) => {
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
