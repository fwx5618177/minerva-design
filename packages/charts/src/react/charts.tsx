import {
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
  type CSSProperties,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
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
import {
  QUADRANT_CORNERS,
  QUADRANT_MOVE_SHORTCUTS,
  isQuadrantMoveKey,
  quadrantHoverEvent,
  quadrantKeyTarget,
  quadrantMoveDrop,
  quadrantMovedText,
  quadrantName as nameOfQuadrant,
  quadrantNavTarget,
  quadrantPointName,
} from "../engine/quadrant-keyboard";
import { resolveLocale } from "../engine/locale";
import {
  createQuadrantPointCard,
  withQuadrantCard,
  type QuadrantPointCard,
  type QuadrantPointCardOptions,
} from "../engine/quadrant-card";
import type {
  ChartAnnotation,
  ChartDragEvent,
  ChartInstance,
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

const CORNERS = QUADRANT_CORNERS;

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

/** Index of the point of the card, read by the portals of the card */
const createIndexStore = () => {
  let value: number | null = null;
  const listeners = new Set<() => void>();
  return {
    get: () => value,
    set(next: number | null) {
      if (next === value) return;
      value = next;
      listeners.forEach((listener) => listener());
    },
    subscribe(listener: () => void) {
      listeners.add(listener);
      return () => void listeners.delete(listener);
    },
  };
};

type IndexStore = ReturnType<typeof createIndexStore>;

/**
 * The actions (and the custom content) of the point card: the only part of
 * the matrix rendered again when another point shows the card
 */
function PointCardSlots({
  card,
  store,
  points,
  renderActions,
  renderContent,
}: {
  card: QuadrantPointCard;
  store: IndexStore;
  points: readonly QuadrantPoint[];
  renderActions?: (point: QuadrantPoint, index: number) => ReactNode;
  renderContent?: (point: QuadrantPoint, index: number) => ReactNode;
}) {
  const index = useSyncExternalStore(store.subscribe, store.get, store.get);
  const point = index === null ? undefined : points[index];
  // the size of the card follows its new content
  useLayoutEffect(() => card.place());
  if (index === null || !point) return null;
  const actions = renderActions?.(point, index);
  const content = renderContent?.(point, index);
  return (
    <>
      {actions !== null && actions !== undefined && actions !== false
        ? createPortal(actions, card.actions)
        : null}
      {content !== null && content !== undefined && content !== false
        ? createPortal(content, card.content)
        : null}
    </>
  );
}

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
  const engineRef = useRef<ChartInstance | null>(null);
  const [selection, setSelection] = useState<number | null>(null);
  const selected = selectedIndex !== undefined ? selectedIndex : selection;
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
  // the point card is DOM of its own (shared with the other renderers):
  // hover, focus and drag moves render nothing here; only its actions are
  // rendered again (`PointCardSlots`) when another point shows it
  const [card, setCard] = useState<QuadrantPointCard | null>(null);
  const cardStore = useMemo(() => createIndexStore(), []);
  const hintId = useId();
  const texts = quadrantLabels(locale);
  const movable = !!onPointDrop && draggable !== false;
  const groups = useMemo(
    () =>
      quadrantGroups({
        points,
        xDomain,
        yDomain,
        xSplit,
        ySplit,
        reverseX,
      }),
    [points, xDomain, yDomain, xSplit, ySplit, reverseX],
  );
  const quadrantName = (corner: QuadrantCorner) =>
    nameOfQuadrant(corner, { quadrants }, texts);
  const pointName = (point: QuadrantPoint, index: number) =>
    quadrantPointName(point, index, texts);
  // the accessible buttons in list order (arrow navigation)
  const order = CORNERS.flatMap((corner) => groups[corner].indices);
  const focusHover = (index: number | null) =>
    props.onHover?.(
      quadrantHoverEvent(
        { points, ...geometry, quadrants, xLabel, yLabel, name },
        index,
        locale,
      ),
    );

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

  const dropAt = (event: ChartDragEvent): QuadrantDropTarget => ({
    x: event.x,
    y: event.y,
    quadrant: quadrantOf(geometry, event.x, event.y),
  });

  // the point card names the hovered, focused, selected or dragged point:
  // no tooltip, no label chip and no drag pill of the engine beside it
  const options = withQuadrantCard(
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
        draggable: draggable ?? !!(onPointDrop || onPointDrag),
        showCounts: renderQuadrantHeader ? undefined : showCounts,
        selectedIndex: selected,
        selectedIndices,
      },
      engineOptions({ ...props, series: [] }),
      { focusedIndex: accessiblePoints ? focusedIndex : null },
    ),
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
          aria-keyshortcuts={movable ? QUADRANT_MOVE_SHORTCUTS : undefined}
          aria-describedby={movable ? hintId : undefined}
          onFocus={() => {
            setFocusedIndex(index);
            focusHover(index);
          }}
          onBlur={(event) => {
            setFocusedIndex((current) => (current === index ? null : current));
            if (event.relatedTarget) pendingFocus.current = null;
            const next = event.relatedTarget as Element | null;
            if (
              !next?.closest?.("button[data-point-index]") &&
              !pendingFocus.current
            )
              focusHover(null);
          }}
          onClick={() => {
            setSelection(index);
            onPointClick?.(point, index);
          }}
          onKeyDown={(event) => {
            if (!(movable && isQuadrantMoveKey(event))) {
              const next = quadrantNavTarget(event, order, index);
              if (next === null) return;
              event.preventDefault();
              layerRef.current
                ?.querySelector<HTMLButtonElement>(
                  `button[data-point-index="${next}"]`,
                )
                ?.focus();
              return;
            }
            event.preventDefault();
            const target = quadrantKeyTarget(event, corner);
            if (!target) return;
            pendingFocus.current = { index, points };
            onPointDrop!(point, index, quadrantMoveDrop(geometry, target));
            setAnnouncement(
              quadrantMovedText(texts, label, quadrantName(target)),
            );
          }}
        >
          {label}
        </button>
      </div>
    );
  };

  // a click on a dot or on its card: selects it, two quick ones in a row
  // count as a double click
  const clickPoint = (index: number) => {
    const point = points[index];
    if (!point) return;
    const now = Date.now();
    const last = lastClick.current;
    const double = last?.index === index && now - last.time < DOUBLE_CLICK_MS;
    lastClick.current = double ? null : { index, time: now };
    setSelection(index);
    onPointClick?.(point, index);
    if (double) onPointDoubleClick?.(point, index);
  };

  // the dot anchors of the point of the card (`data-active`)
  const markActive = (index: number | null) => {
    layerRef.current
      ?.querySelectorAll<HTMLElement>(".minerva-chart-quadrant-point")
      .forEach((anchor) => {
        if (anchor.dataset.pointIndex === String(index))
          anchor.dataset.active = "";
        else delete anchor.dataset.active;
      });
  };

  const latest = useRef(props);
  const cardOptionsRef = useRef<() => QuadrantPointCardOptions>(() => ({
    config: { points },
  }));
  const cardOptions = (): QuadrantPointCardOptions => ({
    config: { points, ...geometry, quadrants, xLabel, yLabel, name },
    locale,
    pointSize,
    // the hovered point shows its card unless the tooltip is off
    hover: props.tooltip !== false,
    selectedIndex: selected,
    // a plain chart rings its selected point; a board keeps its card (the
    // actions of the point stay at hand)
    showSelected: !!props.renderPointActions,
    hasActions: (index) => {
      const { points: now, renderPointActions } = latest.current;
      const point = now[index];
      const node = point ? renderPointActions?.(point, index) : null;
      return node !== null && node !== undefined && node !== false;
    },
    custom: !!renderTooltip,
    chart: engineRef.current,
    onClick: clickPoint,
    onChange: (index) => {
      cardStore.set(index);
      markActive(index);
    },
    // Escape closes the card and drops a selection of the chart's own
    onDismiss: () => setSelection(null),
  });

  // after every render: new points, selection, texts (hover, focus and drag
  // moves go to the card directly)
  useLayoutEffect(() => {
    latest.current = props;
    cardOptionsRef.current = cardOptions;
    card?.update(cardOptions());
    markActive(cardStore.get());
  });
  // the box of the card is rendered once the plot is laid out
  const cardHost = useCallback((host: HTMLDivElement | null) => {
    if (!host) return;
    const next = createQuadrantPointCard(host, cardOptionsRef.current());
    setCard(next);
    return () => {
      next.destroy();
      setCard(null);
    };
  }, []);
  // the focused point button, named again by the new points
  useLayoutEffect(() => {
    card?.focus(accessiblePoints ? focusedIndex : null);
  }, [card, focusedIndex, accessiblePoints, points]);

  const overlay = (plot: ChartRect) => {
    const xs = xSplit ?? (x0 + x1) / 2;
    const ys = ySplit ?? (y0 + y1) / 2;
    const fx = fraction(xs, x0, x1);
    const fy = fraction(ys, y0, y1);
    const split = {
      x: plot.x + plot.width * (reverseX ? 1 - fx : fx),
      y: plot.y + plot.height * (1 - fy),
    };
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
            <div
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
      // the box of the point card (DOM of its own, filled by the card)
      <div
        key="point-card"
        ref={cardHost}
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: plot.width,
          height: plot.height,
          pointerEvents: "none",
        }}
      />,
    ];
  };

  return (
    <>
      <ChartBase
        options={options}
        {...frameProps({
          ...props,
          onPointClick: undefined,
          renderTooltip: undefined,
        })}
        overlay={overlay}
        onInstance={(chart) => {
          engineRef.current = chart;
        }}
        onPointClick={(event) => {
          const index = event.items[0]?.index;
          if (index !== undefined) clickPoint(index);
        }}
        onPlotClick={(at) => {
          // a click beside the points drops a selection of the chart's own
          setSelection(null);
          onQuadrantClick?.(quadrantOf(geometry, at.x, at.y), at);
        }}
        onHover={(event) => {
          card?.hover(event?.items[0]?.index ?? null);
          props.onHover?.(event);
        }}
        onDragStart={(event) =>
          card?.drag(event.item.index, { x: event.x, y: event.y })
        }
        onDragEnd={() => card?.drag(null)}
        onDrag={(event) => {
          const index = event.item.index;
          card?.move({ x: event.x, y: event.y });
          if (points[index] && onPointDrag)
            onPointDrag(points[index], index, dropAt(event));
        }}
        onDrop={(event) => {
          pendingFocus.current = null;
          const index = event.item.index;
          if (points[index] && onPointDrop)
            onPointDrop(points[index], index, dropAt(event));
        }}
      />
      {card ? (
        <PointCardSlots
          card={card}
          store={cardStore}
          points={points}
          renderActions={props.renderPointActions}
          renderContent={renderTooltip}
        />
      ) : null}
    </>
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
