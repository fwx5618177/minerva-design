// createChart: mounts a chart in a container and keeps it in sync with its
// options, its size, the theme and the user's interactions.

import type { AxisTicks } from "./axis";
import { lowerBound } from "./data";
import {
  createBarHighlight,
  createChartDom,
  createDataCanvas,
  createMarker,
  styleElement,
  swatch,
} from "./dom";
import { buildItems, type Origin } from "./items";
import { createScales, type Scales } from "./layout";
import { buildModel, type ChartModel, type DataCache } from "./model";
import {
  drawBackground,
  drawForeground,
  font,
  type ResolvedAnnotation,
} from "./overlay";
import { createRenderer } from "./renderers/detect";
import type { ChartRenderer, RenderItem } from "./renderers/types";
import {
  collectPointLabels,
  hitTest,
  hoverItemOf,
  hoverMarks,
  layoutChart,
  pointOf,
  resolveAnnotations,
  sameHover,
  showsCrosshair,
  tooltipContent,
} from "./scene";
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
  let lastPlot = "";
  let pointDrag: {
    id: number;
    item: ChartHoverItem;
    x: number;
    y: number;
    moved: boolean;
  } | null = null;
  let ghost: HTMLDivElement | null = null;
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
      dragPoints: o.dragPoints ?? false,
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

  const rebuild = () => {
    model = buildModel(options, theme, hidden, cache);
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
    annotations = resolveAnnotations(options.annotations, theme);
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
    dom.stage.style.touchAction = interaction()?.dragPoints ? "none" : "pan-y";
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

    if (bg) {
      bg.setTransform(dpr, 0, 0, dpr, 0, 0);
      bg.font = font(theme);
    }
    const layout = layoutChart({
      model,
      view,
      theme,
      width,
      height,
      padding: options.padding,
      measure: bg
        ? (text) => bg.measureText(text).width
        : (text) => text.length * theme.fontSize * 0.6,
    });
    const { plot } = layout;
    xTicks = layout.xTicks;
    yTicks = layout.yTicks;
    scales = layout.scales;
    const rect = plotRect();
    if (rect && rect.join() !== lastPlot) {
      lastPlot = rect.join();
      emit("layout", {
        x: rect[0],
        y: rect[1],
        width: rect[2],
        height: rect[3],
      });
    }

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
        pointLabels: collectPointLabels(model, view, scales),
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

  const hitAt = (px: number, py: number): ChartHoverEvent | null =>
    scales ? hitTest(model, scales, xTicks, px, py) : null;

  /** Plot area relative to the container: x, y, width, height */
  const plotRect = (): [number, number, number, number] | null => {
    const p = scales?.plot;
    if (!p) return null;
    return [
      p.x + dom.stage.offsetLeft,
      p.y + dom.stage.offsetTop,
      p.width,
      p.height,
    ];
  };

  /** A draggable point under the pointer (`interaction.dragPoints`) */
  const draggableAt = (px: number, py: number) => {
    if (!interaction()?.dragPoints) return null;
    const hit = hitAt(px, py);
    const item = hit?.items.find(
      (it) => model.series[it.seriesIndex].type === "scatter",
    );
    return item ?? null;
  };

  // ---------------------------------------------------------------- hover

  const setHover = (next: HoverState | null) => {
    const changed = !sameHover(hover?.event ?? null, next?.event ?? null);
    hover = next;
    renderHover();
    if (changed) emit("hover", next ? next.event : null);
  };

  const tooltipNode = (event: ChartHoverEvent): Node | string | null => {
    const custom = tooltipOptions()?.render;
    if (custom) return custom(event);
    const content = tooltipContent(model, event, yTicks);
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
    if (content.titleColor)
      header.appendChild(swatch(doc, content.titleColor, "dot"));
    header.appendChild(doc.createTextNode(content.title));
    fragment.append(header);
    for (const row of content.rows) {
      const el = doc.createElement("div");
      styleElement(el, { display: "flex", alignItems: "center", gap: "8px" });
      if (row.color) el.appendChild(swatch(doc, row.color, "dot"));
      const n = doc.createElement("span");
      styleElement(n, {
        flex: "1 1 auto",
        color: "var(--text-secondary-color, #6b7280)",
      });
      n.textContent = row.name;
      const v = doc.createElement("span");
      styleElement(v, {
        fontWeight: "600",
        fontVariantNumeric: "tabular-nums",
        marginLeft: "12px",
      });
      v.textContent = row.value;
      el.append(n, v);
      fragment.append(el);
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
      if (showsCrosshair(model, hover.event, options.crosshair)) {
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
      for (const mark of hoverMarks(model, sc, hover.event)) {
        if (mark.kind === "bar") {
          const el = pooled(highlights, highlightCount++, () =>
            createBarHighlight(doc),
          );
          styleElement(el, {
            left: `${mark.x}px`,
            top: `${mark.y}px`,
            width: `${mark.width}px`,
            height: `${mark.height}px`,
          });
          continue;
        }
        const el = pooled(markers, markerCount++, () => createMarker(doc));
        styleElement(el, {
          left: `${mark.x}px`,
          top: `${mark.y}px`,
          width: `${mark.size}px`,
          height: `${mark.size}px`,
          background: mark.color,
        });
      }
    }
    for (let i = markerCount; i < markers.length; i++)
      markers[i].style.display = "none";
    for (let i = highlightCount; i < highlights.length; i++)
      highlights[i].style.display = "none";

    const tip = dom.tooltip;
    const content =
      hover && sc && tooltipOptions() && !drag?.moved && !pointDrag?.moved
        ? tooltipNode(hover.event)
        : null;
    if (!hover || content === null || content === "") {
      tip.style.display = "none";
      return;
    }
    if (typeof content === "string") {
      tip.textContent = content;
      tip.style.whiteSpace = "pre";
    } else {
      tip.replaceChildren(content);
      tip.style.whiteSpace = "nowrap";
    }
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

  const dataAt = (x: number, y: number) => {
    const sc = scales;
    if (!sc) return null;
    const { plot } = sc;
    const cx = Math.max(plot.x, Math.min(plot.x + plot.width, x));
    const cy = Math.max(plot.y, Math.min(plot.y + plot.height, y));
    return { x: sc.pxToX(cx), y: sc.pxToY(cy) };
  };

  const moveGhost = (x: number, y: number, color: string | null) => {
    if (color === null) {
      if (ghost) ghost.style.display = "none";
      return;
    }
    if (!ghost) {
      ghost = createMarker(doc);
      dom.hover.appendChild(ghost);
    }
    const s = model.series.find((series) => series.type === "scatter");
    const size = (s?.pointSize ?? 8) + 8;
    dom.hover.style.width = `${dom.stage.clientWidth}px`;
    dom.hover.style.height = `${dom.stage.clientHeight}px`;
    styleElement(ghost, {
      display: "block",
      left: `${x}px`,
      top: `${y}px`,
      width: `${size}px`,
      height: `${size}px`,
      background: color,
    });
  };

  const onPointerMove = (event: PointerEvent) => {
    const { x, y } = localPoint(event);
    if (pointDrag && pointDrag.id === event.pointerId) {
      if (
        !pointDrag.moved &&
        Math.hypot(x - pointDrag.x, y - pointDrag.y) > 3
      ) {
        pointDrag.moved = true;
        dom.stage.setPointerCapture?.(event.pointerId);
        dom.stage.style.cursor = "grabbing";
      }
      if (pointDrag.moved) {
        const at = dataAt(x, y);
        if (at) {
          moveGhost(x, y, pointDrag.item.color);
          renderHover();
          emit("drag", { item: pointDrag.item, x: at.x, y: at.y });
        }
      }
      return;
    }
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
    const event2 = hitAt(x, y);
    setHover(
      event2
        ? { event: event2, anchorX: x, anchorY: y, keyboard: false }
        : null,
    );
    if (!drag && interaction()?.dragPoints) {
      dom.stage.style.cursor = draggableAt(x, y)
        ? "grab"
        : zoomed && interaction()?.pan
          ? "grab"
          : "";
    }
  };

  const onPointerDown = (event: PointerEvent) => {
    if (event.button !== 0) return;
    const { x, y } = localPoint(event);
    if (!inPlot(x, y)) return;
    const draggable = draggableAt(x, y);
    if (draggable) {
      pointDrag = { id: event.pointerId, item: draggable, x, y, moved: false };
      return;
    }
    drag = { id: event.pointerId, x, y, view: copyView(view), moved: false };
  };

  const onPointerUp = (event: PointerEvent) => {
    if (pointDrag && pointDrag.id === event.pointerId) {
      const { item, moved } = pointDrag;
      pointDrag = null;
      if (dom.stage.hasPointerCapture?.(event.pointerId)) {
        dom.stage.releasePointerCapture(event.pointerId);
      }
      moveGhost(0, 0, null);
      const { x, y } = localPoint(event);
      dom.stage.style.cursor = draggableAt(x, y) ? "grab" : "";
      if (moved) {
        const at = dataAt(x, y);
        if (at && event.type !== "pointercancel")
          emit("drop", { item, x: at.x, y: at.y });
        renderHover();
      } else {
        const hit = hitAt(x, y);
        if (hit) emit("click", hit);
      }
      return;
    }
    if (!drag || drag.id !== event.pointerId) return;
    const moved = drag.moved;
    drag = null;
    if (dom.stage.hasPointerCapture?.(event.pointerId)) {
      dom.stage.releasePointerCapture(event.pointerId);
    }
    dom.stage.style.cursor = zoomed && interaction()?.pan ? "grab" : "";
    if (!moved) {
      const { x, y } = localPoint(event);
      const hit = hitAt(x, y);
      if (hit) emit("click", hit);
      else if (event.type !== "pointercancel" && inPlot(x, y)) {
        const at = dataAt(x, y);
        if (at) emit("plotClick", at);
      }
    } else {
      renderHover();
    }
  };

  const onPointerLeave = () => {
    if (!drag?.moved && !pointDrag?.moved) setHover(null);
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
    const leadItem = hoverItemOf(series, index);
    const others =
      model.tooltipMode === "axis" && series.type !== "scatter"
        ? (hitAt(p.px, p.py)?.items ?? []).filter(
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
    getPlotRect() {
      const rect = plotRect();
      return rect
        ? { x: rect[0], y: rect[1], width: rect[2], height: rect[3] }
        : null;
    },
    toPixel(x, y) {
      if (!scales) return null;
      return {
        x: scales.xToPx(x) + dom.stage.offsetLeft,
        y: scales.yToPx(y) + dom.stage.offsetTop,
      };
    },
    fromPixel(x, y) {
      if (!scales) return null;
      return {
        x: scales.pxToX(x - dom.stage.offsetLeft),
        y: scales.pxToY(y - dom.stage.offsetTop),
      };
    },
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
