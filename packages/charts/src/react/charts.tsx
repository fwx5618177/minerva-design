import {
  useEffect,
  useId,
  useLayoutEffect,
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
  DEFAULT_QUADRANT_COLORS,
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
import { styleTooltip, themeTooltip } from "../engine/tooltip";
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

/** Data position of a dragged point, pushed to its info card on every move */
interface CardPosition {
  x: number;
  y: number;
}

/**
 * A point index valid for one `points` array: a stale index (the points
 * changed, e.g. a task was deleted) names no point
 */
interface PointRef {
  index: number;
  points: readonly QuadrantPoint[];
}

/** Minimal event emitter: the card subscribes, the drag handler emits */
const createPositionEmitter = () => {
  const listeners = new Set<(position: CardPosition) => void>();
  return {
    on(listener: (position: CardPosition) => void) {
      listeners.add(listener);
      return () => void listeners.delete(listener);
    },
    emit(position: CardPosition) {
      listeners.forEach((listener) => listener(position));
    },
  };
};

/** Room between the edge of the point card and its dot, CSS pixels */
const CARD_PAD_X = 8;
const CARD_PAD_Y = 5;
/** Room between the dot of the card and its text */
const CARD_DOT_GAP = 7;
/** Height of the first row of the card: the name, or the name and actions */
const CARD_ROW = 18;
const CARD_ACTIONS_ROW = 24;
/** How far the card may reach past the plot edges */
const CARD_OVERHANG = 6;
/**
 * The card stays this long after the pointer leaves its dot: time to reach
 * its actions
 */
const CARD_LINGER_MS = 180;

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
  // the engine draws the dragged dot and its label under the pointer: the
  // options stay the same during a drag (no re-render on every move)
  const [dragging, setDragging] = useState<number | null>(null);
  const [hoveredRef, setHoveredRef] = useState<PointRef | null>(null);
  // pointer (or focus) in the point card: its point stays active
  const [heldRef, setHeldRef] = useState<PointRef | null>(null);
  const hovered = hoveredRef?.points === points ? hoveredRef.index : null;
  const held = heldRef?.points === points ? heldRef.index : null;
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const holdTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
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
  // info card of the active point: placed on the DOM (and fed the drag
  // positions through an emitter), so a drag renders no React per move
  const cardRef = useRef<HTMLDivElement>(null);
  const cardQuadrantRef = useRef<HTMLSpanElement>(null);
  const cardDotRef = useRef<HTMLSpanElement>(null);
  const cardContentRef = useRef<HTMLDivElement>(null);
  const cardThemed = useRef<number | null>(null);
  const dragAt = useRef<CardPosition | null>(null);
  const placeCard = useRef<() => void>(() => {});
  const positions = useMemo(() => createPositionEmitter(), []);
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
      selectedIndex: selected,
      selectedIndices,
    },
    engineOptions({ ...props, series: [] }),
    { focusedIndex: accessiblePoints ? focusedIndex : null },
  );
  // the point card names the hovered, focused, selected or dragged point:
  // no tooltip, no label chip and no drag pill of the engine beside it
  options.tooltip = false;
  if (typeof options.interaction === "object")
    options.interaction = {
      ...options.interaction,
      dragLabel: false,
      hoverLabel: false,
    };
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

  // nothing is attached to a point while it is dragged; the hovered point
  // shows its card unless the tooltip is off
  const hoverCard = props.tooltip !== false;
  const activeIndex =
    dragging !== null
      ? null
      : (held ?? (hoverCard ? hovered : null) ?? focusedIndex ?? selected);
  // one card for the point: hovered, focused, selected or dragged (it
  // follows the pointer then)
  const cardIndex =
    dragging !== null
      ? dragging
      : activeIndex != null && points[activeIndex]
        ? activeIndex
        : null;
  const cardPoint = cardIndex === null ? null : (points[cardIndex] ?? null);
  const cardActions =
    cardPoint && cardIndex !== null && dragging === null
      ? (props.renderPointActions?.(cardPoint, cardIndex) ?? null)
      : null;
  const hasActions =
    cardActions !== null && cardActions !== undefined && cardActions !== false;
  const cardCustom =
    cardPoint && cardIndex !== null && dragging === null && renderTooltip
      ? renderTooltip(cardPoint, cardIndex)
      : null;
  const cardRow = hasActions ? CARD_ACTIONS_ROW : CARD_ROW;
  const cardDot = cardPoint?.size ?? pointSize ?? 12;

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

  const hold = (index: number | null) => {
    if (holdTimer.current) clearTimeout(holdTimer.current);
    holdTimer.current = null;
    if (index !== null) return setHeldRef({ index, points });
    holdTimer.current = setTimeout(() => setHeldRef(null), CARD_LINGER_MS);
  };

  useEffect(
    () => () => {
      if (hoverTimer.current) clearTimeout(hoverTimer.current);
      if (holdTimer.current) clearTimeout(holdTimer.current);
    },
    [],
  );

  // the card names the point: its drawn label gives way (keeping its place)
  useEffect(() => {
    engineRef.current?.setLabelHidden(
      cardIndex !== null && dragging === null
        ? { seriesIndex: 0, index: cardIndex }
        : null,
    );
  }, [cardIndex, dragging]);

  // after every render (new points, plot size, active point)
  useLayoutEffect(() => {
    placeCard.current = () => {
      const el = cardRef.current;
      // the overlay holding the card covers the plot area
      const plot = el?.parentElement;
      if (!el || !plot || !cardPoint || cardIndex === null) return;
      // the colors of the theme, read again when another point shows it
      const fresh = cardThemed.current !== cardIndex;
      if (fresh) {
        cardThemed.current = cardIndex;
        themeTooltip(el, el);
      }
      const live = dragging !== null ? dragAt.current : null;
      const at = live ?? cardPoint;
      const fx = fraction(at.x, x0, x1);
      const visualX = reverseX ? 1 - fx : fx;
      const plotWidth = parseFloat(plot.style.width) || plot.clientWidth;
      const plotHeight = parseFloat(plot.style.height) || plot.clientHeight;
      const left = visualX * plotWidth;
      const top = (1 - fraction(at.y, y0, y1)) * plotHeight;
      // the dot of the card lies on the point (the border is 1px); the
      // lifted dot of a drag is larger: the card keeps off it
      const reach = 1 + CARD_PAD_X + cardDot / 2 + (live ? 8 : 0);
      const width = el.offsetWidth;
      const height = el.offsetHeight;
      // the text on the side with room (mirrored near the right edge); a
      // side that still fits is kept (no flipping back and forth in a drag)
      let mirrored = visualX > 0.6;
      if (width) {
        const overRight = left - reach + width - plotWidth;
        const overLeft = width - reach - left;
        const was = fresh ? undefined : el.dataset.side;
        mirrored =
          was === "start" && overRight <= CARD_OVERHANG
            ? false
            : was === "end" && overLeft <= CARD_OVERHANG
              ? true
              : overRight > 0 && overLeft < overRight;
      }
      // the dot on the first row, the card kept in the plot near its edges
      let cardTop = top - (1 + CARD_PAD_Y + cardRow / 2);
      if (height)
        cardTop = Math.max(
          -CARD_OVERHANG,
          Math.min(cardTop, plotHeight + CARD_OVERHANG - height),
        );
      const side = mirrored ? "end" : "start";
      const layout = `${side}|${hasActions}|${cardDot}`;
      el.dataset.side = side;
      if (el.dataset.layout !== layout) {
        el.dataset.layout = layout;
        const lead = `${CARD_PAD_X + cardDot + CARD_DOT_GAP}px`;
        const trail = hasActions ? "4px" : "12px";
        el.style.paddingLeft = mirrored ? trail : lead;
        el.style.paddingRight = mirrored ? lead : trail;
        el.style.textAlign = mirrored ? "right" : "left";
        const content = cardContentRef.current;
        if (content)
          content.style.gridTemplateAreas = mirrored
            ? '"actions label" ". meta"'
            : '"label actions" "meta ."';
        if (content)
          content.style.gridTemplateColumns = mirrored
            ? "auto minmax(0, 1fr)"
            : "minmax(0, 1fr) auto";
      }
      el.style.transform = `translate(${left}px, ${cardTop}px) translate(${
        mirrored ? `calc(-100% + ${reach}px)` : `${-reach}px`
      }, 0)`;
      const corner = quadrantOf(geometry, at.x, at.y);
      const region = quadrants?.[corner];
      const name = region?.badge
        ? `${region.badge} · ${quadrantName(corner)}`
        : quadrantName(corner);
      const label = cardQuadrantRef.current;
      if (label && label.textContent !== name) label.textContent = name;
      const dot = cardDotRef.current;
      if (dot) {
        const color =
          cardPoint.color ??
          region?.color ??
          DEFAULT_QUADRANT_COLORS[
            quadrantOf(geometry, cardPoint.x, cardPoint.y)
          ];
        dot.style.display = live ? "none" : "block";
        dot.style.left = mirrored ? "auto" : `${CARD_PAD_X}px`;
        dot.style.right = mirrored ? `${CARD_PAD_X}px` : "auto";
        dot.style.top = `${top - cardTop - 1 - cardDot / 2}px`;
        dot.style.background = color;
        dot.style.boxShadow = `0 0 0 2px var(--surface-color, var(--background-color, #fff)), 0 0 0 4px color-mix(in srgb, ${color} 45%, transparent)`;
      }
    };
    if (cardIndex === null) cardThemed.current = null;
    placeCard.current();
  });

  // drag positions move the card directly, once per frame
  useEffect(() => {
    const win = typeof window === "undefined" ? null : window;
    let frame = 0;
    const off = positions.on((position) => {
      dragAt.current = position;
      if (!win?.requestAnimationFrame) return placeCard.current();
      if (!frame)
        frame = win.requestAnimationFrame(() => {
          frame = 0;
          placeCard.current();
        });
    });
    return () => {
      off();
      if (frame) win?.cancelAnimationFrame(frame);
    };
  }, [positions]);

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
              data-active={index === activeIndex ? "" : undefined}
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
      cardPoint && cardIndex !== null ? (
        <div
          key="point-card"
          ref={(el) => {
            if (el && !el.dataset.styled) {
              el.dataset.styled = "";
              styleTooltip(el, {
                zIndex: "3",
                boxSizing: "border-box",
                maxWidth: "min(280px, calc(100% + 12px))",
                paddingTop: `${CARD_PAD_Y}px`,
                paddingBottom: `${CARD_PAD_Y}px`,
                borderRadius: "12px",
                fontSize: "12px",
                lineHeight: "18px",
              });
              // the colors of the theme around it
              themeTooltip(el, el);
            }
            cardRef.current = el;
            // the overlay re-renders alone when the plot moves or resizes
            if (el) placeCard.current();
          }}
          className="minerva-chart-quadrant-card"
          data-point-preview={cardIndex}
          data-dragging={dragging !== null ? "" : undefined}
        >
          <span
            ref={cardDotRef}
            aria-hidden="true"
            data-card-dot=""
            style={{
              position: "absolute",
              width: cardDot,
              height: cardDot,
              borderRadius: "50%",
              pointerEvents: "none",
            }}
          />
          {/* the dot lets the pointer through to the chart (hover, drag);
              the text and the actions hold the card */}
          <div
            ref={cardContentRef}
            data-card-content=""
            onPointerEnter={() => hold(cardIndex)}
            onPointerLeave={() => hold(null)}
            onFocus={() => hold(cardIndex)}
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget as Node))
                hold(null);
            }}
            style={{
              display: "grid",
              columnGap: 6,
              alignItems: "center",
              minHeight: cardRow,
              pointerEvents: dragging !== null ? "none" : "auto",
            }}
          >
            {/* a click on the name acts like a click on the dot (a native
                listener: the actions are the controls of the card) */}
            <div
              aria-hidden="true"
              ref={(el) => {
                if (el) el.onclick = () => clickPoint(cardIndex);
              }}
              style={{
                gridArea: "label",
                minWidth: 0,
                cursor: "pointer",
              }}
            >
              {cardCustom ?? (
                <strong
                  style={{
                    display: "block",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    fontWeight: 600,
                  }}
                >
                  {cardPoint.label}
                </strong>
              )}
            </div>
            {hasActions ? (
              <div
                data-card-actions=""
                style={{
                  gridArea: "actions",
                  alignSelf: "start",
                  display: "flex",
                  alignItems: "center",
                  height: CARD_ACTIONS_ROW,
                }}
              >
                {cardActions}
              </div>
            ) : null}
            <span
              ref={cardQuadrantRef}
              aria-hidden="true"
              style={{
                gridArea: "meta",
                display: cardCustom ? "none" : "block",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                color: "var(--text-secondary-color, #6b7280)",
                fontSize: 11,
                lineHeight: "16px",
              }}
            />
          </div>
        </div>
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
      onInstance={(chart) => {
        engineRef.current = chart;
      }}
      onPointClick={(event) => {
        const index = event.items[0]?.index;
        if (index !== undefined) clickPoint(index);
      }}
      onPlotClick={
        onQuadrantClick
          ? (at) => onQuadrantClick(quadrantOf(geometry, at.x, at.y), at)
          : undefined
      }
      onHover={(event) => {
        const index = event?.items[0]?.index ?? null;
        if (hoverTimer.current) clearTimeout(hoverTimer.current);
        hoverTimer.current = null;
        if (index !== null) setHoveredRef({ index, points });
        // off the dot: the card stays a moment (the pointer may be on its
        // way to the actions)
        else
          hoverTimer.current = setTimeout(
            () => setHoveredRef(null),
            CARD_LINGER_MS,
          );
        props.onHover?.(event);
      }}
      onDragStart={(event) => {
        dragAt.current = { x: event.x, y: event.y };
        setDragging(event.item.index);
      }}
      onDragEnd={() => {
        dragAt.current = null;
        setDragging(null);
      }}
      onDrag={(event) => {
        const index = event.item.index;
        positions.emit({ x: event.x, y: event.y });
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
