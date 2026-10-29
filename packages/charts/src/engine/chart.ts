// createChart: mounts a chart in a container and keeps it in sync with its
// options, its size, the theme and the user's interactions.

import { axisTicks, type AxisTicks } from "./axis";
import { mix, resolveColor, toCss } from "./color";
import { lowerBound, nearestIndex } from "./data";
import {
  createBarHighlight,
  createChartDom,
  createDataCanvas,
  createMarker,
  styleElement,
  swatch,
} from "./dom";
import { buildItems, type Origin } from "./items";
import { computePlot, createScales, type Scales } from "./layout";
import {
  buildModel,
  gridOf,
  type ChartModel,
  type DataCache,
  type SeriesModel,
} from "./model";
import {
  drawBackground,
  drawForeground,
  font,
  type PointLabel,
  type ResolvedAnnotation,
} from "./overlay";
import { createRenderer } from "./renderers/detect";
import type { ChartRenderer, RenderItem } from "./renderers/types";
import { readTheme, watchTheme, type ChartTheme } from "./theme";
import type {
  ChartEventMap,
  ChartHoverEvent,
  ChartHoverItem,
  ChartInstance,
  ChartInteractionOptions,
  ChartOptions,
  ChartRendererKind,
  ChartTooltipOptions,
  ChartView,
} from "./types";
import {
  clampRange,
  panRange,
  sameRange,
  wheelFactor,
  zoomRange,
  type Range,
} from "./viewport";

const MAX_POINT_LABELS = 300;
const DEFAULT_PADDING = { top: 12, right: 16, bottom: 4, left: 4 };

interface Candidate {
  series: SeriesModel;
  index: number;
  /** Pixel position of the point */
  px: number;
  py: number;
  dx: number;
  dist: number;
  inside: boolean;
}

interface HoverState {
  event: ChartHoverEvent;
  /** Tooltip anchor in stage pixels */
  anchorX: number;
  anchorY: number;
  keyboard: boolean;
}

const mid = (r: Range) => (r[0] + r[1]) / 2;
const copyView = (v: ChartView): ChartView => ({
  x: [v.x[0], v.x[1]],
  y: [v.y[0], v.y[1]],
});

/**
 * Creates a chart inside `container` (which must have a size). The data
 * layer uses WebGPU when available, then WebGL2, then Canvas2D.
 */
export const createChart = (
  container: HTMLElement,
  initialOptions: ChartOptions,
): ChartInstance => {
  const doc = container.ownerDocument;
  const win = doc.defaultView;
  const dom = createChartDom(container);
  const cache: DataCache = new Map();
  const hidden = new Set<string>();
  const listeners: {
    [K in keyof ChartEventMap]?: Set<(event: ChartEventMap[K]) => void>;
  } = {};

  let options = initialOptions;
  let theme: ChartTheme = readTheme(dom.root, options.palette);
  let model: ChartModel;
  let view: ChartView = { x: [0, 1], y: [0, 1] };
  let zoomed = false;
  let origin: Origin = { x: 0, y: 0 };
  let items: RenderItem[] = [];
  let itemsDirty = true;
  let version = 0;
  let annotations: ResolvedAnnotation[] = [];
  let scales: Scales | null = null;
  let xTicks: AxisTicks | null = null;
  let yTicks: AxisTicks | null = null;
  let renderer: ChartRenderer | null = null;
  let rendererToken = 0;
  let destroyed = false;
  let frameId = 0;
  let hover: HoverState | null = null;
  let drag: {
    id: number;
    x: number;
    y: number;
    view: ChartView;
    moved: boolean;
  } | null = null;
  const markers: HTMLDivElement[] = [];
  const highlights: HTMLDivElement[] = [];
  let themeVersion = 0;
  let itemsSignature = "";
  const objectIds = new WeakMap<object, number>();
  let objectCounter = 0;
  const idOf = (value: object) => {
    let id = objectIds.get(value);
    if (id === undefined) objectIds.set(value, (id = ++objectCounter));
    return id;
  };

  let resolveReady: (kind: ChartRendererKind | null) => void = () => {};
  const ready = new Promise<ChartRendererKind | null>((resolve) => {
    resolveReady = resolve;
  });

  const emit = <K extends keyof ChartEventMap>(
    type: K,
    event: ChartEventMap[K],
  ) => {
    listeners[type]?.forEach((listener) => listener(event));
  };

  const interaction = (): Required<ChartInteractionOptions> | null => {
    const value = options.interaction;
    if (value === false) return null;
    const o = typeof value === "object" ? value : {};
    return {
      zoom: o.zoom ?? true,
      wheel: o.wheel ?? "modifier",
      pan: o.pan ?? true,
      keyboard: o.keyboard ?? true,
    };
  };

  const tooltipOptions = (): ChartTooltipOptions | null =>
    options.tooltip === false
      ? null
      : typeof options.tooltip === "object"
        ? options.tooltip
        : {};

  const invalidate = () => {
    if (destroyed || frameId) return;
    frameId = win?.requestAnimationFrame
      ? win.requestAnimationFrame(frame)
      : (setTimeout(frame, 16) as unknown as number);
  };

  // ---------------------------------------------------------------- model

  const resolveAnnotations = (): ResolvedAnnotation[] =>
    (options.annotations ?? []).map((a) => {
      if (a.type === "rect") {
        const color = a.color
          ? resolveColor(a.color, dom.root, theme.primary)
          : theme.primary;
        return {
          type: "rect",
          x0: a.x0,
          x1: a.x1,
          y0: a.y0,
          y1: a.y1,
          color,
          opacity: a.opacity ?? 0.08,
          label: a.label,
          labelPosition: a.labelPosition ?? "top-left",
          labelColor: a.labelColor
            ? resolveColor(a.labelColor, dom.root, color)
            : mix(color, theme.text, 0.2),
        };
      }
      return {
        type: "line",
        axis: a.axis,
        value: a.value,
        color: a.color
          ? resolveColor(a.color, dom.root, theme.textMuted)
          : theme.textMuted,
        width: a.width ?? 1,
        dash: [...(a.dash ?? [4, 4])],
        label: a.label,
      };
    });

  const rebuild = () => {
    model = buildModel(options, theme, hidden, cache, dom.root);
    const { base, zoom, minSpan } = model;
    if (!zoomed) {
      view = copyView(base);
    } else {
      view = {
        x: zoom.x ? clampRange(view.x, base.x, minSpan.x) : [...base.x],
        y: zoom.y ? clampRange(view.y, base.y, minSpan.y) : [...base.y],
      };
      zoomed = !sameRange(view.x, base.x) || !sameRange(view.y, base.y);
    }
    // Unchanged data and styles (e.g. a React re-render): keep the GPU
    // buffers and the hover state
    const signature = [
      themeVersion,
      model.baseline,
      base.x.join(),
      base.y.join(),
      ...model.series.map((s) =>
        [
          s.key,
          s.type,
          idOf(s.cols),
          s.colorCss,
          s.hidden,
          s.lineWidth,
          s.pointSize,
          s.opacity,
          s.barOffset,
          s.barHalfWidth,
          options.series[s.index].stack ?? "",
        ].join("|"),
      ),
    ].join("\n");
    if (signature !== itemsSignature) {
      itemsSignature = signature;
      origin = { x: mid(base.x), y: mid(base.y) };
      itemsDirty = true;
      if (hover && !hover.keyboard) hover = null;
    }
    annotations = resolveAnnotations();
    renderLegend();
    updateAccessibility();
    invalidate();
  };

  /** float32 positions lose precision far from the origin: re-center when deeply zoomed */
  const ensureOrigin = () => {
    const far = (r: Range, o: number) =>
      Math.max(Math.abs(r[0] - o), Math.abs(r[1] - o)) > (r[1] - r[0]) * 2000;
    if (far(view.x, origin.x) || far(view.y, origin.y)) {
      origin = { x: mid(view.x), y: mid(view.y) };
      itemsDirty = true;
    }
  };

  // --------------------------------------------------------------- legend

  const renderLegend = () => {
    const legendOption = options.legend;
    const named = options.series.filter((s) => s.name).length;
    const show = legendOption === undefined ? named > 1 : !!legendOption;
    const config = typeof legendOption === "object" ? legendOption : {};
    const toggle = config.toggle ?? true;
    const focused = [...dom.legend.children].indexOf(
      doc.activeElement as Element,
    );
    dom.legend.replaceChildren();
    dom.legend.style.display = show ? "flex" : "none";
    if (!show) return;
    const bottom = config.position === "bottom";
    dom.legend.style.order = bottom ? "1" : "0";
    dom.legend.style.padding = bottom ? "8px 4px 0" : "0 4px 8px";
    for (const s of model.series) {
      const item = doc.createElement(toggle ? "button" : "span");
      if (item instanceof HTMLButtonElement) {
        item.type = "button";
        item.setAttribute("aria-pressed", String(!s.hidden));
        item.addEventListener("click", () => {
          if (hidden.has(s.id)) hidden.delete(s.id);
          else hidden.add(s.id);
          rebuild();
        });
      }
      styleElement(item, {
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        padding: "2px 4px",
        margin: "0",
        border: "0",
        borderRadius: "4px",
        background: "none",
        font: "inherit",
        color: "var(--text-secondary-color, #6b7280)",
        cursor: toggle ? "pointer" : "default",
        opacity: s.hidden ? "0.45" : "1",
        textDecoration: s.hidden ? "line-through" : "none",
      });
      item.append(
        swatch(
          doc,
          s.colorCss,
          s.type === "scatter" ? "dot" : s.type === "line" ? "line" : "square",
        ),
        doc.createTextNode(s.name),
      );
      dom.legend.appendChild(item);
    }
    if (focused >= 0)
      (dom.legend.children[focused] as HTMLElement | undefined)?.focus();
  };

  const updateAccessibility = () => {
    const names = model.series.map((s) => s.name).join(", ");
    dom.stage.setAttribute(
      "aria-label",
      options.ariaLabel ?? (names ? `Chart: ${names}` : "Chart"),
    );
    const keyboard = interaction()?.keyboard;
    if (keyboard) dom.stage.tabIndex = 0;
    else dom.stage.removeAttribute("tabindex");
  };

  // ---------------------------------------------------------------- frame

  const sizeCanvas = (
    canvas: HTMLCanvasElement,
    width: number,
    height: number,
    dpr: number,
  ) => {
    const w = Math.max(1, Math.round(width * dpr));
    const h = Math.max(1, Math.round(height * dpr));
    if (canvas.width !== w) canvas.width = w;
    if (canvas.height !== h) canvas.height = h;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
  };

  const transformFor = (range: Range, o: number, reverse: boolean) => {
    const scale = 2 / (range[1] - range[0]);
    const offset = (o - range[0]) * scale - 1;
    return reverse ? [-scale, -offset] : [scale, offset];
  };

  const collectPointLabels = (s: Scales): PointLabel[] => {
    const labels: PointLabel[] = [];
    for (const series of model.series) {
      if (series.hidden || series.type !== "scatter" || !series.showLabels)
        continue;
      const { x, y, count, labels: texts, size } = series.cols;
      if (!texts) continue;
      for (let i = 0; i < count && labels.length < MAX_POINT_LABELS; i++) {
        const text = texts[i];
        if (!text) continue;
        const xi = x[i];
        const yi = y[i];
        if (
          xi < view.x[0] ||
          xi > view.x[1] ||
          yi < view.y[0] ||
          yi > view.y[1]
        )
          continue;
        const d = size && size[i] > 0 ? size[i] : series.pointSize;
        labels.push({ x: s.xToPx(xi), y: s.yToPx(yi), r: d / 2, text });
      }
    }
    return labels;
  };

  function frame() {
    frameId = 0;
    if (destroyed) return;
    const width = dom.stage.clientWidth;
    const height = dom.stage.clientHeight;
    if (width <= 0 || height <= 0) return;
    const dpr = win?.devicePixelRatio || 1;
    sizeCanvas(dom.background, width, height, dpr);
    sizeCanvas(dom.foreground, width, height, dpr);
    const bg = dom.background.getContext("2d");
    const fg = dom.foreground.getContext("2d");

    const fontSize = theme.fontSize;
    // same count as the nice range of the model (its ends are then ticks),
    // fewer on short charts
    const yCount =
      model.y.tickCount ??
      (height >= 220 ? 5 : Math.max(2, Math.round((height - 48) / 52)));
    yTicks = axisTicks(model.y, view.y, yCount);
    let yLabelWidth = 0;
    let categoryWidth = 48;
    if (bg) {
      bg.setTransform(dpr, 0, 0, dpr, 0, 0);
      bg.font = font(theme);
      if (model.y.visible) {
        for (const label of yTicks.labels) {
          yLabelWidth = Math.max(yLabelWidth, bg.measureText(label).width);
        }
      }
      if (model.x.type === "category") {
        categoryWidth = 0;
        const step = Math.max(1, Math.floor(model.x.categories.length / 200));
        for (let i = 0; i < model.x.categories.length; i += step) {
          categoryWidth = Math.max(
            categoryWidth,
            bg.measureText(model.x.categories[i]).width,
          );
        }
      }
    }
    const padding = { ...DEFAULT_PADDING, ...options.padding };
    const plot = computePlot({
      width,
      height,
      padding,
      yLabelWidth: model.y.visible ? Math.ceil(yLabelWidth) : 0,
      xAxisVisible: model.x.visible,
      xTitle: !!model.x.title && model.x.visible,
      yTitle: !!model.y.title && model.y.visible,
      fontSize,
    });
    const xCount =
      model.x.type === "category"
        ? Math.max(1, Math.floor(plot.width / (categoryWidth + 14)))
        : (model.x.tickCount ?? Math.max(2, Math.floor(plot.width / 96)));
    xTicks = axisTicks(model.x, view.x, xCount);
    scales = createScales(plot, view, model.x.reverse, model.y.reverse);

    if (bg) {
      drawBackground(bg, {
        width,
        height,
        scales,
        x: model.x,
        y: model.y,
        xTicks,
        yTicks,
        theme,
        annotations,
      });
    }
    if (fg) {
      fg.setTransform(dpr, 0, 0, dpr, 0, 0);
      drawForeground(fg, {
        width,
        height,
        scales,
        theme,
        annotations,
        pointLabels: collectPointLabels(scales),
      });
    }

    if (renderer) {
      const canvas = renderer.canvas;
      styleElement(canvas, {
        left: `${plot.x}px`,
        top: `${plot.y}px`,
        width: `${plot.width}px`,
        height: `${plot.height}px`,
      });
      const bw = Math.max(1, Math.round(plot.width * dpr));
      const bh = Math.max(1, Math.round(plot.height * dpr));
      if (canvas.width !== bw || canvas.height !== bh) renderer.resize(bw, bh);
      ensureOrigin();
      if (itemsDirty) {
        version++;
        items = buildItems(model, origin, version);
        itemsDirty = false;
      }
      const [xScale, xOffset] = transformFor(view.x, origin.x, model.x.reverse);
      const [yScale, yOffset] = transformFor(view.y, origin.y, model.y.reverse);
      renderer.render(items, {
        transform: { xScale, xOffset, yScale, yOffset },
        width: bw,
        height: bh,
        dpr,
      });
    }
    renderHover();
  }

  // ------------------------------------------------------------ hit tests

  const pointOf = (s: SeriesModel, i: number, sc: Scales) => {
    const xv = s.cols.x[i] + (s.type === "bar" ? s.barOffset : 0);
    const yv = s.type === "bar" && s.barTop ? s.barTop[i] : s.cols.y[i];
    return { px: sc.xToPx(xv), py: sc.yToPx(yv) };
  };

  const candidateOf = (
    s: SeriesModel,
    i: number,
    px: number,
    py: number,
    sc: Scales,
  ): Candidate => {
    const p = pointOf(s, i, sc);
    let inside = false;
    if (s.type === "bar" && s.barBase) {
      const half = s.barHalfWidth / sc.xPerPx;
      const base = sc.yToPx(s.barBase[i]);
      inside =
        Math.abs(px - p.px) <= half &&
        py >= Math.min(base, p.py) - 2 &&
        py <= Math.max(base, p.py) + 2;
    }
    return {
      series: s,
      index: i,
      px: p.px,
      py: p.py,
      dx: Math.abs(sc.xToPx(s.cols.x[i]) - px),
      dist: inside ? 0 : Math.hypot(p.px - px, p.py - py),
      inside,
    };
  };

  const nearestScatter = (
    s: SeriesModel,
    px: number,
    py: number,
    sc: Scales,
  ) => {
    const radius = Math.max(s.pointSize / 2 + 6, 10);
    const xv = sc.pxToX(px);
    const yv = sc.pxToY(py);
    const rx = radius * sc.xPerPx;
    const ry = radius * sc.yPerPx;
    let best = -1;
    let bestDist = Infinity;
    const { x, y, size } = s.cols;
    gridOf(s).query(xv - rx, xv + rx, yv - ry, yv + ry, (i) => {
      const d = Math.hypot(sc.xToPx(x[i]) - px, sc.yToPx(y[i]) - py);
      const reach = Math.max(
        (size && size[i] > 0 ? size[i] : s.pointSize) / 2 + 4,
        8,
      );
      if (d <= reach && d <= bestDist) {
        bestDist = d;
        best = i;
      }
    });
    return best;
  };

  const nearestX = (s: SeriesModel, xv: number) => {
    const { x, y, count, sorted } = s.cols;
    if (sorted) return nearestIndex(x, y, count, xv);
    let best = -1;
    let bestD = Infinity;
    for (let i = 0; i < count; i++) {
      if (!Number.isFinite(y[i])) continue;
      const d = Math.abs(x[i] - xv);
      if (d < bestD) {
        bestD = d;
        best = i;
      }
    }
    return best;
  };

  const toItem = (c: Candidate): ChartHoverItem => {
    const s = c.series;
    const pc = s.pointColors?.[c.index];
    const label = s.cols.labels?.[c.index];
    return {
      seriesIndex: s.index,
      seriesId: s.id,
      seriesName: s.name,
      index: c.index,
      x: s.cols.x[c.index],
      y: s.cols.y[c.index],
      color: pc ? toCss(pc) : s.colorCss,
      ...(label !== undefined ? { label } : {}),
    };
  };

  const eventOf = (candidates: Candidate[]): ChartHoverEvent | null => {
    if (!candidates.length) return null;
    candidates.sort((a, b) => a.series.index - b.series.index);
    const hoverItems = candidates.map(toItem);
    const x = hoverItems[0].x;
    return {
      items: hoverItems,
      x,
      xLabel: xTicks?.formatValue(x) ?? String(x),
    };
  };

  const hitTest = (px: number, py: number): ChartHoverEvent | null => {
    const sc = scales;
    if (!sc) return null;
    const { plot } = sc;
    const margin = 6;
    if (
      px < plot.x - margin ||
      px > plot.x + plot.width + margin ||
      py < plot.y - margin ||
      py > plot.y + plot.height + margin
    ) {
      return null;
    }
    const xv = sc.pxToX(px);
    const scatter: Candidate[] = [];
    const others: Candidate[] = [];
    for (const s of model.series) {
      if (s.hidden || s.cols.count === 0) continue;
      if (s.type === "scatter") {
        const i = nearestScatter(s, px, py, sc);
        if (i >= 0) scatter.push(candidateOf(s, i, px, py, sc));
      } else {
        const i = nearestX(s, xv);
        if (i >= 0) others.push(candidateOf(s, i, px, py, sc));
      }
    }
    if (model.tooltipMode === "nearest") {
      const all = [...scatter, ...others].filter(
        (c) => c.inside || c.series.type === "scatter" || c.dist <= 32,
      );
      if (!all.length) return null;
      const best = all.reduce((a, b) => (b.dist <= a.dist ? b : a));
      return eventOf([best]);
    }
    if (!others.length) {
      if (!scatter.length) return null;
      return eventOf([scatter.reduce((a, b) => (b.dist <= a.dist ? b : a))]);
    }
    const bestDx = Math.min(...others.map((c) => c.dx));
    const bandPx = model.x.type === "category" ? 0.5 / sc.xPerPx : 0;
    const aligned = others.filter((c) => c.dx <= bestDx + Math.max(1, bandPx));
    const first = aligned.reduce((a, b) => (b.dx < a.dx ? b : a));
    const ordered = [first, ...aligned.filter((c) => c !== first), ...scatter];
    const event = eventOf(ordered);
    if (event) {
      event.x = toItem(first).x;
      event.xLabel = xTicks?.formatValue(event.x) ?? String(event.x);
    }
    return event;
  };

  // ---------------------------------------------------------------- hover

  const setHover = (next: HoverState | null) => {
    const changed =
      (hover === null) !== (next === null) ||
      (hover &&
        next &&
        (hover.event.items.length !== next.event.items.length ||
          hover.event.items.some(
            (it, i) =>
              it.index !== next.event.items[i].index ||
              it.seriesIndex !== next.event.items[i].seriesIndex,
          )));
    hover = next;
    renderHover();
    if (changed) emit("hover", next ? next.event : null);
  };

  const tooltipContent = (event: ChartHoverEvent): Node | string | null => {
    const custom = tooltipOptions()?.render;
    if (custom) return custom(event);
    const fragment = doc.createDocumentFragment();
    const header = doc.createElement("div");
    styleElement(header, {
      display: "flex",
      alignItems: "center",
      gap: "6px",
      fontWeight: "600",
      marginBottom: "4px",
      color: "var(--text-color, #1f2937)",
    });
    const row = (color: string | null, name: string, value: string) => {
      const el = doc.createElement("div");
      styleElement(el, { display: "flex", alignItems: "center", gap: "8px" });
      if (color) el.appendChild(swatch(doc, color, "dot"));
      const n = doc.createElement("span");
      styleElement(n, {
        flex: "1 1 auto",
        color: "var(--text-secondary-color, #6b7280)",
      });
      n.textContent = name;
      const v = doc.createElement("span");
      styleElement(v, {
        fontWeight: "600",
        fontVariantNumeric: "tabular-nums",
        marginLeft: "12px",
      });
      v.textContent = value;
      el.append(n, v);
      return el;
    };
    const yFormat = yTicks?.formatValue ?? String;
    const scatterOnly = event.items.every(
      (it) => model.series[it.seriesIndex].type === "scatter",
    );
    if (scatterOnly && event.items.length === 1) {
      const it = event.items[0];
      header.append(
        swatch(doc, it.color, "dot"),
        doc.createTextNode(it.label ?? it.seriesName),
      );
      fragment.append(
        header,
        row(null, model.x.title ?? "x", event.xLabel),
        row(null, model.y.title ?? "y", yFormat(it.y)),
      );
      if (it.label !== undefined && model.series.length > 1) {
        fragment.append(row(null, "", it.seriesName));
      }
      return fragment;
    }
    header.textContent = event.xLabel;
    fragment.append(header);
    for (const it of event.items) {
      const name = it.label ? `${it.seriesName} · ${it.label}` : it.seriesName;
      fragment.append(row(it.color, name, yFormat(it.y)));
    }
    return fragment;
  };

  const pooled = <T extends HTMLElement>(
    pool: T[],
    i: number,
    make: () => T,
  ) => {
    if (!pool[i]) {
      pool[i] = make();
      dom.hover.appendChild(pool[i]);
    }
    pool[i].style.display = "block";
    return pool[i];
  };

  function renderHover() {
    const sc = scales;
    let markerCount = 0;
    let highlightCount = 0;
    dom.crosshair.style.display = "none";
    if (hover && sc) {
      const { plot } = sc;
      dom.hover.style.width = `${dom.stage.clientWidth}px`;
      dom.hover.style.height = `${dom.stage.clientHeight}px`;
      const axisMode = model.tooltipMode === "axis";
      const showCrosshair =
        options.crosshair ??
        (axisMode &&
          hover.event.items.some(
            (it) => model.series[it.seriesIndex].type !== "scatter",
          ));
      if (showCrosshair) {
        const first = hover.event.items[0];
        const cx = sc.xToPx(first.x);
        if (cx >= plot.x && cx <= plot.x + plot.width) {
          styleElement(dom.crosshair, {
            display: "block",
            left: `${Math.round(cx)}px`,
            top: `${plot.y}px`,
            height: `${plot.height}px`,
          });
        }
      }
      for (const it of hover.event.items) {
        const s = model.series[it.seriesIndex];
        if (s.type === "bar" && s.barBase && s.barTop) {
          const cx = sc.xToPx(it.x + s.barOffset);
          const half = Math.max(s.barHalfWidth / sc.xPerPx, 1);
          const a = sc.yToPx(s.barBase[it.index]);
          const b = sc.yToPx(s.barTop[it.index]);
          const el = pooled(highlights, highlightCount++, () =>
            createBarHighlight(doc),
          );
          styleElement(el, {
            left: `${cx - half}px`,
            top: `${Math.min(a, b)}px`,
            width: `${half * 2}px`,
            height: `${Math.max(1, Math.abs(a - b))}px`,
          });
          continue;
        }
        const px = sc.xToPx(it.x);
        const py = sc.yToPx(it.y);
        if (
          px < plot.x - 1 ||
          px > plot.x + plot.width + 1 ||
          py < plot.y - 1 ||
          py > plot.y + plot.height + 1
        ) {
          continue;
        }
        const d =
          s.type === "scatter"
            ? (s.cols.size && s.cols.size[it.index] > 0
                ? s.cols.size[it.index]
                : s.pointSize) + 6
            : Math.max(10, s.lineWidth * 2 + 6);
        const el = pooled(markers, markerCount++, () => createMarker(doc));
        styleElement(el, {
          left: `${px}px`,
          top: `${py}px`,
          width: `${d}px`,
          height: `${d}px`,
          background: it.color,
        });
      }
    }
    for (let i = markerCount; i < markers.length; i++)
      markers[i].style.display = "none";
    for (let i = highlightCount; i < highlights.length; i++)
      highlights[i].style.display = "none";

    const tip = dom.tooltip;
    const content =
      hover && sc && tooltipOptions() && !drag?.moved
        ? tooltipContent(hover.event)
        : null;
    if (!hover || content === null || content === "") {
      tip.style.display = "none";
      return;
    }
    if (typeof content === "string") tip.textContent = content;
    else tip.replaceChildren(content);
    tip.style.display = "block";
    const stageW = dom.stage.clientWidth;
    const stageH = dom.stage.clientHeight;
    const w = tip.offsetWidth;
    const h = tip.offsetHeight;
    let left = hover.anchorX + 16;
    if (left + w > stageW - 4) left = hover.anchorX - 16 - w;
    left = Math.max(4, Math.min(left, stageW - w - 4));
    const top = Math.max(4, Math.min(hover.anchorY - h / 2, stageH - h - 4));
    tip.style.transform = `translate(${Math.round(left)}px, ${Math.round(top)}px)`;
  }

  // ---------------------------------------------------------- interaction

  const setViewInternal = (next: ChartView, notify: boolean) => {
    const { base, minSpan } = model;
    view = {
      x: clampRange(next.x, base.x, minSpan.x),
      y: clampRange(next.y, base.y, minSpan.y),
    };
    zoomed = !sameRange(view.x, base.x) || !sameRange(view.y, base.y);
    const it = interaction();
    dom.stage.style.cursor = zoomed && it?.pan ? "grab" : "";
    if (notify) emit("zoom", copyView(view));
    invalidate();
  };

  const zoomAt = (px: number, py: number, factor: number) => {
    const sc = scales;
    if (!sc) return;
    const next = copyView(view);
    if (model.zoom.x) next.x = zoomRange(view.x, sc.pxToX(px), factor);
    if (model.zoom.y) next.y = zoomRange(view.y, sc.pxToY(py), factor);
    setViewInternal(next, true);
  };

  const localPoint = (event: { clientX: number; clientY: number }) => {
    const rect = dom.stage.getBoundingClientRect();
    return { x: event.clientX - rect.left, y: event.clientY - rect.top };
  };

  const inPlot = (x: number, y: number) => {
    const p = scales?.plot;
    return (
      !!p && x >= p.x && x <= p.x + p.width && y >= p.y && y <= p.y + p.height
    );
  };

  const onPointerMove = (event: PointerEvent) => {
    const { x, y } = localPoint(event);
    if (drag && drag.id === event.pointerId) {
      const dx = x - drag.x;
      const dy = y - drag.y;
      if (!drag.moved && Math.hypot(dx, dy) > 3) {
        const it = interaction();
        if (zoomed && it?.pan) {
          drag.moved = true;
          dom.stage.setPointerCapture?.(event.pointerId);
          dom.stage.style.cursor = "grabbing";
        }
      }
      if (drag.moved && scales) {
        const next = copyView(drag.view);
        if (model.zoom.x)
          next.x = panRange(
            drag.view.x,
            -dx * scales.xPerPx * (model.x.reverse ? -1 : 1),
          );
        if (model.zoom.y)
          next.y = panRange(
            drag.view.y,
            dy * scales.yPerPx * (model.y.reverse ? -1 : 1),
          );
        setViewInternal(next, true);
        return;
      }
    }
    const event2 = hitTest(x, y);
    setHover(
      event2
        ? { event: event2, anchorX: x, anchorY: y, keyboard: false }
        : null,
    );
  };

  const onPointerDown = (event: PointerEvent) => {
    if (event.button !== 0) return;
    const { x, y } = localPoint(event);
    if (!inPlot(x, y)) return;
    drag = { id: event.pointerId, x, y, view: copyView(view), moved: false };
  };

  const onPointerUp = (event: PointerEvent) => {
    if (!drag || drag.id !== event.pointerId) return;
    const moved = drag.moved;
    drag = null;
    if (dom.stage.hasPointerCapture?.(event.pointerId)) {
      dom.stage.releasePointerCapture(event.pointerId);
    }
    dom.stage.style.cursor = zoomed && interaction()?.pan ? "grab" : "";
    if (!moved) {
      const { x, y } = localPoint(event);
      const hit = hitTest(x, y);
      if (hit) emit("click", hit);
    } else {
      renderHover();
    }
  };

  const onPointerLeave = () => {
    if (!drag?.moved) setHover(null);
  };

  const onWheel = (event: WheelEvent) => {
    const it = interaction();
    if (!it || it.zoom === false || (!model.zoom.x && !model.zoom.y)) return;
    const { x, y } = localPoint(event);
    if (!inPlot(x, y)) return;
    const modifier = event.ctrlKey || event.metaKey;
    if (it.wheel === "always" || modifier) {
      event.preventDefault();
      zoomAt(
        x,
        y,
        wheelFactor(
          event.deltaY,
          event.deltaMode,
          event.ctrlKey && !event.metaKey,
        ),
      );
    } else if (
      zoomed &&
      model.zoom.x &&
      scales &&
      Math.abs(event.deltaX) > Math.abs(event.deltaY)
    ) {
      event.preventDefault();
      const next = copyView(view);
      next.x = panRange(
        view.x,
        event.deltaX * scales.xPerPx * (model.x.reverse ? -1 : 1),
      );
      setViewInternal(next, true);
    }
  };

  const onDoubleClick = (event: MouseEvent) => {
    const { x, y } = localPoint(event);
    if (interaction() && zoomed && inPlot(x, y)) resetZoom();
  };

  /** Keyboard: moves along the first visible series (or the one in focus) */
  const moveFocus = (step: number) => {
    const sc = scales;
    if (!sc) return;
    const current = hover?.keyboard ? hover.event.items[0] : null;
    const series =
      (current && model.series[current.seriesIndex]) ??
      model.series.find((s) => !s.hidden && s.cols.count > 0);
    if (!series) return;
    const { x, y, count } = series.cols;
    let index: number;
    if (current) {
      index = current.index + step;
    } else {
      // first point inside the view
      index = series.cols.sorted ? lowerBound(x, count, view.x[0]) : 0;
      if (step < 0)
        index = series.cols.sorted
          ? lowerBound(x, count, view.x[1]) - 1
          : count - 1;
    }
    while (index >= 0 && index < count && !Number.isFinite(y[index]))
      index += step || 1;
    if (index < 0 || index >= count) return;
    // keep the point visible
    let current2 = sc;
    if (model.zoom.x && (x[index] < view.x[0] || x[index] > view.x[1])) {
      const span = view.x[1] - view.x[0];
      setViewInternal(
        { x: [x[index] - span / 2, x[index] + span / 2], y: view.y },
        true,
      );
      current2 = scales = createScales(
        sc.plot,
        view,
        model.x.reverse,
        model.y.reverse,
      );
    }
    const p = pointOf(series, index, current2);
    const leadItem = toItem(candidateOf(series, index, p.px, p.py, current2));
    const others =
      model.tooltipMode === "axis" && series.type !== "scatter"
        ? (hitTest(p.px, p.py)?.items ?? []).filter(
            (it) => it.seriesIndex !== series.index,
          )
        : [];
    const event: ChartHoverEvent = {
      items: [leadItem, ...others],
      x: leadItem.x,
      xLabel: xTicks?.formatValue(leadItem.x) ?? String(leadItem.x),
    };
    setHover({ event, anchorX: p.px, anchorY: p.py, keyboard: true });
    const it = leadItem;
    dom.live.textContent = `${it.seriesName}: ${event.xLabel}, ${yTicks?.formatValue(it.y) ?? it.y}${it.label ? ` (${it.label})` : ""}`;
  };

  const onKeyDown = (event: KeyboardEvent) => {
    if (!interaction()?.keyboard) return;
    const center = () => {
      const p = scales?.plot;
      return p ? [p.x + p.width / 2, p.y + p.height / 2] : [0, 0];
    };
    switch (event.key) {
      case "ArrowRight":
      case "ArrowLeft":
        event.preventDefault();
        moveFocus((event.key === "ArrowRight") !== model.x.reverse ? 1 : -1);
        break;
      case "+":
      case "=": {
        if (!model.zoom.x && !model.zoom.y) return;
        event.preventDefault();
        const [cx, cy] = center();
        zoomAt(cx, cy, 0.8);
        break;
      }
      case "-":
      case "_": {
        if (!model.zoom.x && !model.zoom.y) return;
        event.preventDefault();
        const [cx, cy] = center();
        zoomAt(cx, cy, 1.25);
        break;
      }
      case "0":
        event.preventDefault();
        resetZoom();
        break;
      case "Escape":
        if (hover) {
          event.preventDefault();
          setHover(null);
        }
        break;
      default:
        break;
    }
  };

  const onFocus = () => {
    let visible: boolean;
    try {
      visible = dom.stage.matches(":focus-visible");
    } catch {
      visible = true;
    }
    if (visible)
      dom.stage.style.boxShadow = "0 0 0 2px var(--primary-color, #4f46e5)";
  };

  const onBlur = () => {
    dom.stage.style.boxShadow = "";
    if (hover?.keyboard) setHover(null);
  };

  const stage = dom.stage;
  stage.addEventListener("pointermove", onPointerMove);
  stage.addEventListener("pointerdown", onPointerDown);
  stage.addEventListener("pointerup", onPointerUp);
  stage.addEventListener("pointercancel", onPointerUp);
  stage.addEventListener("pointerleave", onPointerLeave);
  stage.addEventListener("wheel", onWheel, { passive: false });
  stage.addEventListener("dblclick", onDoubleClick);
  stage.addEventListener("keydown", onKeyDown);
  stage.addEventListener("focus", onFocus);
  stage.addEventListener("blur", onBlur);

  const resizeObserver =
    typeof ResizeObserver === "function"
      ? new ResizeObserver(() => invalidate())
      : null;
  resizeObserver?.observe(dom.stage);

  const refreshTheme = () => {
    if (destroyed) return;
    theme = readTheme(dom.root, options.palette);
    themeVersion++;
    rebuild();
  };
  const unwatchTheme = watchTheme(refreshTheme);

  // ------------------------------------------------------------- renderer

  const initRenderer = async (exclude: Set<ChartRendererKind> = new Set()) => {
    const token = ++rendererToken;
    const next = await createRenderer(
      options.renderer ?? "auto",
      () => createDataCanvas(doc),
      (kind) => {
        if (destroyed || renderer?.kind !== kind) return;
        renderer.destroy();
        renderer.canvas.remove();
        renderer = null;
        void initRenderer(new Set([...exclude, kind]));
      },
      exclude,
    );
    if (destroyed || token !== rendererToken) {
      next?.destroy();
      return;
    }
    if (renderer) {
      renderer.destroy();
      renderer.canvas.remove();
    }
    renderer = next;
    if (next) {
      dom.root.dataset.renderer = next.kind;
      dom.stage.insertBefore(next.canvas, dom.foreground);
      itemsDirty = true;
      emit("renderer", next.kind);
    }
    resolveReady(next?.kind ?? null);
    invalidate();
  };

  // ------------------------------------------------------------------ api

  function resetZoom() {
    if (!zoomed) return;
    setViewInternal(copyView(model.base), true);
  }

  rebuild();
  void initRenderer();

  const instance: ChartInstance = {
    setOptions(next) {
      if (destroyed) return;
      const previous = options;
      options = next;
      if ((next.palette ?? []).join() !== (previous.palette ?? []).join()) {
        theme = readTheme(dom.root, next.palette);
        themeVersion++;
      }
      if ((next.renderer ?? "auto") !== (previous.renderer ?? "auto"))
        void initRenderer();
      rebuild();
    },
    resize() {
      invalidate();
    },
    resetZoom,
    getView: () => copyView(view),
    setView(next) {
      if (destroyed) return;
      setViewInternal({ x: next.x ?? view.x, y: next.y ?? view.y }, false);
    },
    getRenderer: () => renderer?.kind ?? null,
    ready,
    refreshTheme,
    on(type, listener) {
      let set = listeners[type] as Set<typeof listener> | undefined;
      if (!set) {
        set = new Set();
        (listeners as Record<string, unknown>)[type] = set;
      }
      set.add(listener);
      return () => {
        set.delete(listener);
      };
    },
    destroy() {
      if (destroyed) return;
      destroyed = true;
      if (frameId) {
        if (win?.cancelAnimationFrame) win.cancelAnimationFrame(frameId);
        else clearTimeout(frameId);
      }
      resizeObserver?.disconnect();
      unwatchTheme();
      stage.removeEventListener("wheel", onWheel);
      renderer?.destroy();
      renderer = null;
      dom.root.remove();
      for (const key of Object.keys(listeners)) {
        delete (listeners as Record<string, unknown>)[key];
      }
    },
  };
  return instance;
};
