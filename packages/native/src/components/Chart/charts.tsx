import { useMemo } from "react";
import {
  AccessibilityInfo,
  View,
  type AccessibilityActionEvent,
} from "react-native";
import {
  barSeries,
  lineSeries,
  quadrantAccessibleGroups,
  quadrantChartOptions,
  quadrantGroups,
  quadrantLabels,
  quadrantMoveDrop,
  quadrantMovedText,
  quadrantName,
  quadrantOf,
  scatterSeries,
  type ChartHoverEvent,
  type ChartOptions,
  type ChartRect,
  type ChartSeries,
  type QuadrantAccessiblePoint,
  type QuadrantCorner,
} from "@minerva/charts/canvas";
import { useI18n } from "../../theme/MinervaProvider";
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

/** Name of the accessibility action moving a point to a quadrant */
const MOVE_ACTION = "move:";
/** Size of the accessible element of a point (a touch target) */
const POINT_TARGET = 32;

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
    renderQuadrantHeader,
    renderPointActions,
    showCounts,
    selectedIndex,
    selectedIndices,
    accessiblePoints = true,
  } = props;
  const { language } = useI18n();
  const locale = props.locale ?? language;
  const base = useEngineOptions(props, NO_SERIES);
  const dragPoints = draggable ?? !!onPointDrop;
  // like the web: Shift + arrows there, accessibility actions here
  const movable = !!onPointDrop && draggable !== false;
  const customHeaders = !!renderQuadrantHeader;
  const options = useMemo(() => {
    const result = quadrantChartOptions(
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
        showCounts: customHeaders ? undefined : showCounts,
        selectedIndex,
        selectedIndices,
      },
      base,
    );
    if (!customHeaders) return result;
    // the React headers replace the drawn titles (the first four areas)
    return {
      ...result,
      annotations: result.annotations?.map((a, i) =>
        i < 4 && a.type === "rect"
          ? {
              ...a,
              label: undefined,
              badge: undefined,
              description: undefined,
              detail: undefined,
            }
          : a,
      ),
    };
  }, [
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
    customHeaders,
    showCounts,
    selectedIndex,
    selectedIndices,
    base,
  ]);
  const geometry = { xDomain, yDomain, xSplit, ySplit, reverseX };
  const accessible = useMemo(
    () =>
      accessiblePoints
        ? quadrantAccessibleGroups(
            {
              points,
              xDomain,
              yDomain,
              xSplit,
              ySplit,
              reverseX,
              quadrants,
              xLabel,
              yLabel,
              name,
            },
            locale,
          ).flatMap((group) => group.points)
        : [],
    [
      accessiblePoints,
      points,
      xDomain,
      yDomain,
      xSplit,
      ySplit,
      reverseX,
      quadrants,
      xLabel,
      yLabel,
      name,
      locale,
    ],
  );

  const onAction = (
    p: QuadrantAccessiblePoint,
    event: AccessibilityActionEvent,
  ) => {
    const action = event.nativeEvent.actionName;
    if (action === "activate") {
      onPointClick?.(p.point, p.index);
      return;
    }
    if (!movable || !action.startsWith(MOVE_ACTION)) return;
    const target = action.slice(MOVE_ACTION.length) as QuadrantCorner;
    if (!p.moves.some((m) => m.quadrant === target)) return;
    onPointDrop!(p.point, p.index, quadrantMoveDrop(geometry, target));
    const texts = quadrantLabels(locale);
    AccessibilityInfo.announceForAccessibility?.(
      quadrantMovedText(
        texts,
        p.name,
        quadrantName(target, { quadrants }, texts),
      ),
    );
  };

  /** One accessible element per point, over its dot (touches go through) */
  const pointViews = (plot: ChartRect) => {
    const [x0, x1] = xDomain ?? [0, 10];
    const [y0, y1] = yDomain ?? [0, 10];
    const selected = new Set([
      ...(selectedIndices ?? []),
      ...(selectedIndex !== undefined && selectedIndex !== null
        ? [selectedIndex]
        : []),
    ]);
    return accessible.map((p) => {
      const fx = (p.point.x - x0) / (x1 - x0 || 1);
      const fy = (p.point.y - y0) / (y1 - y0 || 1);
      return (
        <View
          key={`point-${p.index}`}
          pointerEvents="none"
          accessible
          accessibilityRole="button"
          accessibilityLabel={p.description}
          accessibilityState={{ selected: selected.has(p.index) }}
          accessibilityActions={[
            { name: "activate" },
            ...(movable
              ? p.moves.map((m) => ({
                  name: `${MOVE_ACTION}${m.quadrant}`,
                  label: m.label,
                }))
              : []),
          ]}
          onAccessibilityAction={(event) => onAction(p, event)}
          style={{
            position: "absolute",
            left: plot.width * (reverseX ? 1 - fx : fx) - POINT_TARGET / 2,
            top: plot.height * (1 - fy) - POINT_TARGET / 2,
            width: POINT_TARGET,
            height: POINT_TARGET,
          }}
          {...part("chart", "point", {
            index: String(p.index),
            quadrant: p.quadrant,
          })}
        />
      );
    });
  };

  /** Rectangle of a quadrant, relative to the plot area */
  const quadrantRect = (corner: QuadrantCorner, plot: ChartRect) => {
    const [x0, x1] = xDomain ?? [0, 10];
    const [y0, y1] = yDomain ?? [0, 10];
    const xs = xSplit ?? (x0 + x1) / 2;
    const ys = ySplit ?? (y0 + y1) / 2;
    const fx = (xs - x0) / (x1 - x0 || 1);
    const fy = (ys - y0) / (y1 - y0 || 1);
    // split point relative to the plot area
    const sx = plot.width * (reverseX ? 1 - fx : fx);
    const sy = plot.height * (1 - fy);
    const left = corner.endsWith("Left");
    const top = corner.startsWith("top");
    return {
      position: "absolute" as const,
      left: left ? 0 : sx,
      top: top ? 0 : sy,
      width: left ? sx : plot.width - sx,
      height: top ? sy : plot.height - sy,
    };
  };

  const contentViews = quadrantContent
    ? (plot: ChartRect) =>
        CORNERS.map((corner) => {
          const content = quadrantContent[corner];
          if (content === undefined || content === null || content === false)
            return null;
          return (
            <View
              key={corner}
              pointerEvents="box-none"
              style={quadrantRect(corner, plot)}
              {...part("chart", "quadrant", { corner })}
            >
              {content}
            </View>
          );
        })
    : undefined;

  /** The React headers of the quadrants (`renderQuadrantHeader`) */
  const headerViews = renderQuadrantHeader
    ? (plot: ChartRect) => {
        const groups = quadrantGroups({
          points,
          xDomain,
          yDomain,
          xSplit,
          ySplit,
          reverseX,
        });
        return CORNERS.map((corner) => {
          const group = groups[corner];
          const header = renderQuadrantHeader(corner, {
            count: group.points.length,
            points: group.points,
            indices: group.indices,
            region: quadrants?.[corner],
          });
          if (header === undefined || header === null || header === false)
            return null;
          const left = corner.endsWith("Left");
          const top = corner.startsWith("top");
          return (
            <View
              key={`header-${corner}`}
              pointerEvents="box-none"
              style={quadrantRect(corner, plot)}
            >
              <View
                pointerEvents="box-none"
                style={{
                  position: "absolute",
                  [top ? "top" : "bottom"]: 0,
                  [left ? "left" : "right"]: 0,
                  maxWidth: "100%",
                  padding: 6,
                  flexDirection: "row",
                  justifyContent: left ? "flex-start" : "flex-end",
                }}
                {...part("chart", "quadrant-header", { corner })}
              >
                {header}
              </View>
            </View>
          );
        });
      }
    : undefined;

  /** Content next to the selected point, kept inside the plot area */
  const actionViews = renderPointActions
    ? (plot: ChartRect) => {
        const index = selectedIndex;
        const point =
          index === undefined || index === null ? undefined : points[index];
        if (
          index === undefined ||
          index === null ||
          !point ||
          !Number.isFinite(point.x) ||
          !Number.isFinite(point.y)
        )
          return [];
        const content = renderPointActions(point, index);
        if (content === undefined || content === null || content === false)
          return [];
        const [x0, x1] = xDomain ?? [0, 10];
        const [y0, y1] = yDomain ?? [0, 10];
        const fx = (point.x - x0) / (x1 - x0 || 1);
        const fy = (point.y - y0) / (y1 - y0 || 1);
        const px = plot.width * (reverseX ? 1 - fx : fx);
        const py = plot.height * (1 - fy);
        // clear of the dot and its selection ring
        const gap = (point.size ?? pointSize ?? 12) / 2 + 8;
        // above the dot unless it is close to the top edge
        const above = py > plot.height / 3;
        const onLeft = px <= plot.width / 2;
        return [
          <View
            key="point-actions"
            pointerEvents="box-none"
            style={{
              position: "absolute",
              ...(above
                ? { bottom: Math.max(0, plot.height - py + gap) }
                : { top: Math.min(plot.height, py + gap) }),
              ...(onLeft
                ? { left: Math.max(0, px - 16) }
                : { right: Math.max(0, plot.width - px - 16) }),
              flexDirection: "row",
            }}
            {...part("chart", "point-actions", { index: String(index) })}
          >
            {content}
          </View>,
        ];
      }
    : undefined;

  const overlay =
    contentViews || headerViews || actionViews || accessible.length
      ? (plot: ChartRect) => [
          ...(contentViews?.(plot) ?? []),
          ...(headerViews?.(plot) ?? []),
          ...pointViews(plot),
          ...(actionViews?.(plot) ?? []),
        ]
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
