import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import {
  areaSeries,
  barSeries,
  boxplotData,
  boxplotSeries,
  bubbleSeries,
  candlestickSeries,
  ganttSeries,
  heatmapChartOptions,
  histogramSeries,
  lineSeries,
  presetLabels,
  quadrantCenter,
  quadrantChartOptions,
  quadrantGroups,
  quadrantLabels,
  quadrantOf,
  rangeAreaSeries,
  scatterSeries,
  sparklineOptions,
  waterfallSeries,
  type QuadrantCorner,
  type QuadrantPoint,
} from "../engine/presets";
import { resolveLocale } from "../engine/locale";
import type {
  ChartAnnotation,
  ChartDragEvent,
  ChartRect,
} from "../engine/types";
import { Chart, ChartBase, engineOptions } from "./Chart";
import type {
  AreaChartProps,
  BarChartProps,
  BoxPlotChartProps,
  BubbleChartProps,
  CandlestickChartProps,
  ChartCommonProps,
  GanttChartProps,
  HeatmapChartProps,
  HistogramChartProps,
  HorizontalBarChartProps,
  LineChartProps,
  MixedChartProps,
  QuadrantChartProps,
  QuadrantDropTarget,
  RangeAreaChartProps,
  ScatterChartProps,
  SparklineProps,
  WaterfallChartProps,
} from "./types";

const frameProps = (props: Omit<ChartCommonProps, "labels">) => ({
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
        labels: undefined,
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
    colorMidpoint,
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
        colorMidpoint,
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
      colorMidpoint,
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
    locale,
    labels,
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
        { renderer, tooltip, palette, ariaLabel, locale, labels },
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
      locale,
      labels,
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

/** Two clicks on the same point within this delay count as a double click */
const DOUBLE_CLICK_MS = 400;

const VISUALLY_HIDDEN: CSSProperties = {
  position: "absolute",
  width: 1,
  height: 1,
  margin: -1,
  padding: 0,
  border: 0,
  overflow: "hidden",
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  whiteSpace: "nowrap",
};

/** Quadrant reached from another with Shift + an arrow key */
const MOVES: Record<string, (corner: QuadrantCorner) => QuadrantCorner> = {
  ArrowUp: (c) => c.replace("bottom", "top") as QuadrantCorner,
  ArrowDown: (c) => c.replace("top", "bottom") as QuadrantCorner,
  ArrowLeft: (c) => c.replace("Right", "Left") as QuadrantCorner,
  ArrowRight: (c) => c.replace("Left", "Right") as QuadrantCorner,
};

const MOVE_SHORTCUTS =
  "Shift+ArrowUp Shift+ArrowDown Shift+ArrowLeft Shift+ArrowRight";

/** Header slot in the outer corner of a quadrant */
const headerStyle = (corner: QuadrantCorner): CSSProperties => {
  const top = corner.startsWith("top");
  const left = corner.endsWith("Left");
  return {
    position: "absolute",
    [top ? "top" : "bottom"]: 0,
    [left ? "left" : "right"]: 0,
    maxWidth: "100%",
    boxSizing: "border-box",
    padding: 8,
    display: "flex",
    justifyContent: left ? "flex-start" : "flex-end",
    pointerEvents: "auto",
  };
};

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
    onPointDoubleClick,
    onPointDrag,
    onPointDrop,
    onQuadrantClick,
    renderTooltip,
    quadrantContent,
    showCounts,
    selectedIndex,
    selectedIndices,
    renderQuadrantHeader,
    accessiblePoints = true,
    getPointProps,
    locale,
  } = props;
  const geometry = { xDomain, yDomain, xSplit, ySplit, reverseX };
  const [dropCorner, setDropCorner] = useState<QuadrantCorner | null>(null);
  const lastClick = useRef<{ index: number; time: number } | null>(null);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const [announcement, setAnnouncement] = useState("");
  // point moved with the keyboard: its button gets the focus back once the
  // new `points` render it in the list of its new quadrant
  const pendingFocus = useRef<{
    index: number;
    points: readonly QuadrantPoint[];
  } | null>(null);
  const layerRef = useRef<HTMLDivElement>(null);
  const hintId = useId();
  const texts = quadrantLabels(locale);
  const movable = !!onPointDrop && draggable !== false;
  const groups = useMemo(
    () =>
      quadrantGroups({ points, xDomain, yDomain, xSplit, ySplit, reverseX }),
    [points, xDomain, yDomain, xSplit, ySplit, reverseX],
  );
  const quadrantName = (corner: QuadrantCorner) =>
    quadrants?.[corner]?.label || texts[corner];
  const pointName = (point: QuadrantPoint, index: number) =>
    point.label || texts.point.replace("{n}", String(index + 1));

  useEffect(() => {
    const layer = layerRef.current;
    const pending = pendingFocus.current;
    if (pending && pending.points !== points) {
      pendingFocus.current = null;
      const button = layer?.querySelector<HTMLButtonElement>(
        `button[data-point-index="${pending.index}"]`,
      );
      if (button && document.activeElement !== button) button.focus();
    }
    // a focused button removed by a re-render does not report its blur
    if (
      focusedIndex !== null &&
      !pendingFocus.current &&
      !layer?.contains(document.activeElement)
    )
      setFocusedIndex(null);
  }, [points, focusedIndex]);

  // a release outside the plot ends the drag without a drop event
  useEffect(() => {
    if (!dropCorner) return;
    const release = () => setDropCorner(null);
    window.addEventListener("pointerup", release);
    return () => window.removeEventListener("pointerup", release);
  }, [dropCorner]);

  const dropAt = (event: ChartDragEvent): QuadrantDropTarget => ({
    x: event.x,
    y: event.y,
    quadrant: quadrantOf(geometry, event.x, event.y),
  });

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
      draggable: draggable ?? !!(onPointDrop || onPointDrag),
      showCounts: renderQuadrantHeader ? undefined : showCounts,
      selectedIndex,
      selectedIndices,
    },
    engineOptions({ ...props, series: [] }),
    { focusedIndex: accessiblePoints ? focusedIndex : null },
  );
  if (renderQuadrantHeader)
    // the React headers replace the drawn titles (the first four areas)
    options.annotations = options.annotations?.map((a, i) =>
      i < 4 && a.type === "rect"
        ? {
            ...a,
            label: undefined,
            badge: undefined,
            description: undefined,
            detail: undefined,
          }
        : a,
    );

  const [x0, x1] = xDomain ?? [0, 10];
  const [y0, y1] = yDomain ?? [0, 10];
  const fraction = (v: number, a: number, b: number) => (v - a) / (b - a || 1);

  const pointButton = (corner: QuadrantCorner, index: number) => {
    const point = points[index]!;
    const label = pointName(point, index);
    const selected =
      selectedIndex === index || !!selectedIndices?.includes(index);
    return (
      <div key={index} role="listitem">
        <button
          type="button"
          data-point-index={index}
          aria-label={`${label}, ${quadrantName(corner)}`}
          aria-current={selected ? "true" : undefined}
          aria-keyshortcuts={movable ? MOVE_SHORTCUTS : undefined}
          aria-describedby={movable ? hintId : undefined}
          onFocus={() => setFocusedIndex(index)}
          onBlur={(event) => {
            setFocusedIndex((current) => (current === index ? null : current));
            if (event.relatedTarget) pendingFocus.current = null;
          }}
          onClick={() => onPointClick?.(point, index)}
          onKeyDown={(event) => {
            const move =
              movable &&
              event.shiftKey &&
              !event.altKey &&
              !event.ctrlKey &&
              !event.metaKey
                ? MOVES[event.key]
                : undefined;
            if (!move) return;
            event.preventDefault();
            const target = move(corner);
            if (target === corner) return;
            pendingFocus.current = { index, points };
            onPointDrop!(point, index, {
              ...quadrantCenter(geometry, target),
              quadrant: target,
            });
            setAnnouncement(
              texts.moved
                .replace("{point}", label)
                .replace("{quadrant}", quadrantName(target)),
            );
          }}
        >
          {label}
        </button>
      </div>
    );
  };

  const overlay = (plot: ChartRect) => {
    const xs = xSplit ?? (x0 + x1) / 2;
    const ys = ySplit ?? (y0 + y1) / 2;
    const fx = fraction(xs, x0, x1);
    const fy = fraction(ys, y0, y1);
    const split = {
      x: plot.x + plot.width * (reverseX ? 1 - fx : fx),
      y: plot.y + plot.height * (1 - fy),
    };
    const tint = dropCorner
      ? (quadrants?.[dropCorner]?.color ?? "currentColor")
      : "";
    return [
      ...CORNERS.map((corner) =>
        quadrantContent?.[corner] ? (
          <div
            key={corner}
            className={`minerva-chart-quadrant minerva-chart-quadrant-${corner}`}
            style={cornerStyle(corner, plot, split)}
          >
            {quadrantContent[corner]}
          </div>
        ) : null,
      ),
      ...CORNERS.map((corner) => {
        if (!renderQuadrantHeader) return null;
        const group = groups[corner];
        const header = renderQuadrantHeader(corner, {
          count: group.points.length,
          points: group.points,
          indices: group.indices,
          region: quadrants?.[corner],
        });
        return header === null ||
          header === undefined ||
          header === false ? null : (
          <div
            key={`header-${corner}`}
            style={cornerStyle(corner, plot, split)}
          >
            <div
              className={`minerva-chart-quadrant-header minerva-chart-quadrant-header-${corner}`}
              style={headerStyle(corner)}
            >
              {header}
            </div>
          </div>
        );
      }),
      <div
        key="points"
        ref={layerRef}
        className="minerva-chart-quadrant-points"
        style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
      >
        {points.map((point, index) => {
          if (!Number.isFinite(point.x) || !Number.isFinite(point.y))
            return null;
          const fx = fraction(point.x, x0, x1);
          return (
            <span
              key={index}
              {...getPointProps?.(point, index)}
              aria-hidden="true"
              className="minerva-chart-quadrant-point"
              data-point-index={index}
              data-label={point.label}
              style={{
                position: "absolute",
                left: `${100 * (reverseX ? 1 - fx : fx)}%`,
                top: `${100 * (1 - fraction(point.y, y0, y1))}%`,
                width: 0,
                height: 0,
                pointerEvents: "none",
              }}
            />
          );
        })}
        {accessiblePoints ? (
          <>
            {CORNERS.map((corner) =>
              groups[corner].indices.length ? (
                <div
                  key={corner}
                  role="list"
                  data-quadrant={corner}
                  aria-label={quadrantName(corner)}
                  style={VISUALLY_HIDDEN}
                >
                  {groups[corner].indices.map((index) =>
                    pointButton(corner, index),
                  )}
                </div>
              ) : null,
            )}
            {movable ? (
              <span id={hintId} style={VISUALLY_HIDDEN}>
                {texts.moveHint}
              </span>
            ) : null}
            <div role="status" aria-live="polite" style={VISUALLY_HIDDEN}>
              {announcement}
            </div>
          </>
        ) : null}
      </div>,
      dropCorner ? (
        <div
          key="drop-target"
          className="minerva-chart-quadrant-target"
          style={{
            ...cornerStyle(dropCorner, plot, split),
            background: `color-mix(in srgb, ${tint} 14%, transparent)`,
            boxShadow: `inset 0 0 0 2px ${tint}`,
          }}
        />
      ) : null,
    ];
  };

  return (
    <ChartBase
      options={options}
      {...frameProps({
        ...props,
        onPointClick: undefined,
        renderTooltip: undefined,
      })}
      overlay={overlay}
      onPointClick={(event) => {
        const index = event.items[0]?.index;
        if (index === undefined || !points[index]) return;
        const now = Date.now();
        const last = lastClick.current;
        const double =
          last?.index === index && now - last.time < DOUBLE_CLICK_MS;
        lastClick.current = double ? null : { index, time: now };
        onPointClick?.(points[index], index);
        if (double) onPointDoubleClick?.(points[index], index);
      }}
      onPlotClick={
        onQuadrantClick
          ? (at) => onQuadrantClick(quadrantOf(geometry, at.x, at.y), at)
          : undefined
      }
      onDrag={(event) => {
        const index = event.item.index;
        const target = dropAt(event);
        setDropCorner(target.quadrant);
        if (points[index]) onPointDrag?.(points[index], index, target);
      }}
      onDrop={(event) => {
        setDropCorner(null);
        pendingFocus.current = null;
        const index = event.item.index;
        if (points[index] && onPointDrop)
          onPointDrop(points[index], index, dropAt(event));
      }}
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

/**
 * Horizontal bar chart: categories down the left side, values from the
 * left (rankings, long names, diverging surveys, stacked progress)
 */
export function HorizontalBarChart(props: HorizontalBarChartProps) {
  return <BarChart {...props} orientation="horizontal" />;
}

/**
 * Range area chart: bands between a lower (`y0`) and an upper edge
 * (confidence intervals, min-max ranges), mixable with lines
 */
export function RangeAreaChart(props: RangeAreaChartProps) {
  const { series: input, curve = "smooth" } = props;
  const series = useMemo(() => rangeAreaSeries(input, curve), [input, curve]);
  return (
    <ChartBase
      options={engineOptions({ ...props, series })}
      {...frameProps(props)}
    />
  );
}

/**
 * Combination chart: bars, lines and areas on one or two value axes
 * (`yAxis: "right"` series use `yAxis2`, aligned on the left grid)
 */
export function MixedChart(props: MixedChartProps) {
  return <Chart {...props} />;
}

/** Bubble chart: x, y and a value sized by area (√value diameters) */
export function BubbleChart(props: BubbleChartProps) {
  const { series: input, minSize, maxSize, maxValue } = props;
  const series = useMemo(
    () => bubbleSeries(input, { minSize, maxSize, maxValue }),
    [input, minSize, maxSize, maxValue],
  );
  return (
    <ChartBase
      options={engineOptions({ ...props, series })}
      {...frameProps(props)}
    />
  );
}

/**
 * Histogram: the distribution of raw samples in bins of equal width
 * (Freedman-Diaconis, Sturges or a count); millions of samples are binned
 * in milliseconds
 */
export function HistogramChart(props: HistogramChartProps) {
  const {
    values,
    bins,
    domain,
    nice,
    name,
    color,
    formatBin,
    series: extra,
    locale,
  } = props;
  // page language read at every render: a language switch renames the series
  const lang = resolveLocale(locale);
  const series = useMemo(
    () => [
      histogramSeries(values, {
        bins,
        domain,
        nice,
        name,
        color,
        format: formatBin,
        locale: lang,
      }),
      ...(extra ?? []),
    ],
    [values, bins, domain, nice, name, color, formatBin, extra, lang],
  );
  return (
    <ChartBase
      options={engineOptions({ ...props, series })}
      {...frameProps(props)}
    />
  );
}

/**
 * Box plot: medians, quartiles, whiskers and outliers of samples, from raw
 * values (`groups`) or computed statistics (`series`)
 */
export function BoxPlotChart(props: BoxPlotChartProps) {
  const {
    series: input,
    groups,
    name,
    whisker,
    orientation,
    locale,
    outlierShape,
    outlierSize,
  } = props;
  const groupName = name ?? presetLabels(resolveLocale(locale)).values;
  const series = useMemo(
    () =>
      boxplotSeries([
        ...(groups?.length
          ? [
              {
                id: "boxplot",
                name: groupName,
                data: boxplotData(groups, { whisker }),
              },
            ]
          : []),
        ...(input ?? []),
      ]).map((s) =>
        s.type === "boxplot"
          ? {
              ...s,
              outlierShape: s.outlierShape ?? outlierShape,
              outlierSize: s.outlierSize ?? outlierSize,
            }
          : s,
      ),
    [input, groups, groupName, whisker, outlierShape, outlierSize],
  );
  return (
    <ChartBase
      options={engineOptions({ ...props, series, orientation })}
      {...frameProps(props)}
    />
  );
}

/**
 * Waterfall (bridge) chart: how changes take a value from a start to an
 * end, with subtotals and totals (P&L bridges, budget variances)
 */
export function WaterfallChart(props: WaterfallChartProps) {
  const {
    steps,
    name,
    upColor,
    downColor,
    totalColor,
    start,
    labels = true,
    format,
    connector,
    orientation,
    locale,
  } = props;
  const lang = resolveLocale(locale);
  const series = useMemo(
    () => [
      waterfallSeries(steps, {
        name,
        upColor,
        downColor,
        totalColor,
        start,
        labels,
        format,
        connector,
        locale: lang,
      }),
    ],
    [
      steps,
      name,
      upColor,
      downColor,
      totalColor,
      start,
      labels,
      format,
      connector,
      lang,
    ],
  );
  return (
    <ChartBase
      options={engineOptions({
        ...props,
        labels: undefined,
        series,
        orientation,
      })}
      {...frameProps(props)}
    />
  );
}

/**
 * Gantt chart: tasks as bars on a time axis with their progress, groups,
 * milestones and a today line; zooms and pans along the time
 */
export function GanttChart(props: GanttChartProps) {
  const {
    tasks,
    colors,
    taskName,
    progressName,
    milestoneName,
    formatProgress,
    dependenciesName,
    dependencyArrows,
    dependencyColor,
    barLabels,
    today = false,
    todayLabel,
    xAxis,
    yAxis,
    annotations,
    interaction,
    legend,
    locale,
  } = props;
  const lang = resolveLocale(locale);
  const gantt = useMemo(
    () =>
      ganttSeries(tasks, {
        colors,
        taskName,
        progressName,
        milestoneName,
        formatProgress,
        dependenciesName,
        dependencyArrows,
        dependencyColor,
        barLabels,
        locale: lang,
      }),
    [
      tasks,
      colors,
      taskName,
      progressName,
      milestoneName,
      formatProgress,
      dependenciesName,
      dependencyArrows,
      dependencyColor,
      barLabels,
      lang,
    ],
  );
  const [mountedAt] = useState(() => Date.now());
  const now =
    today === false
      ? null
      : today === true
        ? mountedAt
        : today instanceof Date
          ? today.getTime()
          : today;
  const lines: ChartAnnotation[] =
    now === null
      ? []
      : [
          {
            type: "line",
            axis: "y",
            value: now,
            color: "var(--danger-color, #dc2626)",
            dash: [4, 3],
            label: todayLabel,
          },
        ];
  return (
    <ChartBase
      options={{
        ...engineOptions({
          ...props,
          series: gantt.series,
          orientation: "horizontal",
        }),
        xAxis: {
          type: "category",
          categories: gantt.categories,
          ...xAxis,
        },
        yAxis: {
          type: "time",
          min: gantt.domain[0],
          max: gantt.domain[1],
          ...yAxis,
        },
        annotations: [...(annotations ?? []), ...lines],
        dependencies: gantt.dependencies,
        interaction: interaction ?? { zoom: "y" },
        legend: legend ?? gantt.series.length > 1,
      }}
      {...frameProps(props)}
    />
  );
}
