// createChart: mounts a chart in a container and keeps it in sync with its
// options, its size, the theme and the user's interactions.

import type { AxisTicks } from "./axis";
import { lowerBound } from "./data";
import {
  createBand,
  createChartDom,
  createDataCanvas,
  createMarker,
  styleElement,
  swatch,
} from "./dom";
import {
  buildItems,
  cellStyleKey,
  type Origin,
  type PixelDensity,
} from "./items";
import { chartAriaLabel } from "./labels";
import { createScales, toData, toScreen, type Scales } from "./layout";
import { watchLocale } from "./locale";
import {
  buildModel,
  fromPlotX,
  fromPlotY,
  heatPosition,
  toPlotX,
  toPlotY,
  viewFromValues,
  viewToValues,
  type ChartModel,
  type DataCache,
} from "./model";
import {
  drawBackground,
  drawForeground,
  font,
  type ResolvedAnnotation,
} from "./overlay";
import { createRenderer } from "./renderers/detect";
import { followDefaultRenderer } from "./renderers/follow";
import type { ChartRenderer, RenderItem } from "./renderers/types";
import {
  collectPointLabels,
  colorLegend,
  connectorSegments,
  crosshairAt,
  dependencyArrows,
  hitTest,
  hoverItemOf,
  hoverMarks,
  layoutChart,
  legendShape,
  legendShown,
  pointOf,
  resolveAnnotations,
  resolveDependencies,
  sameHover,
  tooltipContent,
  type ResolvedDependency,
} from "./scene";
import { itemsSignature } from "./signature";
import {
  readTheme,
  themeColorsChanged,
  watchTheme,
  type ChartTheme,
} from "./theme";
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
 * layer uses WebGPU when available, then WebGL2, then WebGL, then Canvas2D.
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
  let dependencies: ResolvedDependency[] = [];
  let scales: Scales | null = null;
  let xTicks: AxisTicks | null = null;
  let yTicks: AxisTicks | null = null;
  let y2Ticks: AxisTicks | null = null;
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
  const bands: HTMLDivElement[] = [];
  const cells: HTMLDivElement[] = [];
  const guides: HTMLDivElement[] = [];
  /** Hover caret of the color legend (heatmaps) */
  let legendCaret: HTMLDivElement | null = null;
  let cellKey = "";
  let themeVersion = 0;
  let itemsSignatureKey = "";
  let legendKey = "";
  /** What the hover layer shows: kept while the hovered points are the same */
  let shownMarks: {
    event: ChartHoverEvent;
    model: ChartModel;
    scales: Scales;
  } | null = null;
  let shownTip: {
    event: ChartHoverEvent;
    model: ChartModel;
    yTicks: AxisTicks | null;
    width: number;
    height: number;
  } | null = null;

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

  let interactionOf: ChartOptions | null = null;
  let interactionValue: Required<ChartInteractionOptions> | null = null;
  /** Resolved `interaction` option (cached: read on every pointer move) */
  const interaction = (): Required<ChartInteractionOptions> | null => {
    if (interactionOf === options) return interactionValue;
    interactionOf = options;
    const value = options.interaction;
    if (value === false) return (interactionValue = null);
    const o = typeof value === "object" ? value : {};
    return (interactionValue = {
      zoom: o.zoom ?? true,
      wheel: o.wheel ?? "modifier",
      pan: o.pan ?? true,
      keyboard: o.keyboard ?? true,
      dragPoints: o.dragPoints ?? false,
    });
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
    const signature = itemsSignature(
      model,
      themeVersion,
      (index) => options.series[index]?.stack,
    );
    if (signature !== itemsSignatureKey) {
      itemsSignatureKey = signature;
      origin = { x: mid(base.x), y: mid(base.y) };
      itemsDirty = true;
      if (hover && !hover.keyboard) hover = null;
    }
    annotations = resolveAnnotations(
      options.annotations,
      theme,
      model.y.type === "log" ? Math.log10 : undefined,
      model.x.type === "log" ? Math.log10 : undefined,
    );
    dependencies = resolveDependencies(options.dependencies, theme);
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
    const show = legendShown(legendOption, model, named);
    const config = typeof legendOption === "object" ? legendOption : {};
    const toggle = config.toggle ?? true;
    const bottom = config.position === "bottom";
    const colors = show ? colorLegend(model) : null;
    // rebuild the DOM only when what it shows changed
    let key = `${show}|${bottom}|${toggle}`;
    if (colors) {
      key += `\n${colors.stops.join(";")}|${colors.labels.map((l) => l.text).join(";")}`;
    } else if (show) {
      for (const s of model.series)
        key += `\n${s.id}\u0001${s.name}\u0001${s.colorCss}\u0001${legendShape(s.type)}\u0001${s.hidden}`;
    }
    if (key === legendKey) return;
    legendKey = key;
    const focused = [...dom.legend.children].indexOf(
      doc.activeElement as Element,
    );
    dom.legend.replaceChildren();
    legendCaret = null;
    dom.legend.style.display = show ? "flex" : "none";
    if (!show) return;
    dom.legend.style.order = bottom ? "1" : "0";
    dom.legend.style.padding = bottom ? "8px 4px 0" : "0 4px 8px";
    if (colors) {
      // visual map: the ramp with its values, the hovered value marked
      dom.legend.style.justifyContent = "flex-end";
      const ramp = doc.createElement("div");
      styleElement(ramp, {
        display: "flex",
        alignItems: "center",
        gap: "8px",
        color: "var(--text-secondary-color, #6b7280)",
        fontSize: "11px",
        fontVariantNumeric: "tabular-nums",
      });
      const first = colors.labels[0];
      const last = colors.labels[colors.labels.length - 1];
      const bar = doc.createElement("div");
      styleElement(bar, {
        position: "relative",
        width: "160px",
        height: "8px",
        borderRadius: "4px",
        background: `linear-gradient(to right, ${colors.stops.join(", ")})`,
        boxShadow:
          "inset 0 0 0 1px color-mix(in srgb, var(--text-color, #1f2937) 8%, transparent)",
      });
      if (colors.labels.length > 2) {
        const tick = doc.createElement("div");
        styleElement(tick, {
          position: "absolute",
          left: "50%",
          top: "-2px",
          width: "1px",
          height: "12px",
          background:
            "color-mix(in srgb, var(--text-color, #1f2937) 35%, transparent)",
        });
        bar.appendChild(tick);
      }
      legendCaret = doc.createElement("div");
      styleElement(legendCaret, {
        position: "absolute",
        top: "-3px",
        width: "4px",
        height: "14px",
        marginLeft: "-2px",
        borderRadius: "2px",
        background: "var(--text-color, #1f2937)",
        boxShadow:
          "0 0 0 1.5px var(--surface-color, var(--background-color, #fff))",
        display: "none",
      });
      bar.appendChild(legendCaret);
      const text = (value: string) => {
        const el = doc.createElement("span");
        el.textContent = value;
        return el;
      };
      ramp.append(text(first?.text ?? ""), bar, text(last?.text ?? ""));
      dom.legend.appendChild(ramp);
      return;
    }
    dom.legend.style.justifyContent = "";
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
        swatch(doc, s.colorCss, legendShape(s.type)),
        doc.createTextNode(s.name),
      );
      dom.legend.appendChild(item);
    }
    if (focused >= 0)
      (dom.legend.children[focused] as HTMLElement | undefined)?.focus();
  };

  const updateAccessibility = () => {
    dom.stage.setAttribute(
      "aria-label",
      options.ariaLabel ?? chartAriaLabel(model),
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
    y2Ticks = layout.y2Ticks;
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
        y2: model.y2,
        y2Ticks,
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
        pointLabels: collectPointLabels(model, view, scales, yTicks),
        connectors: connectorSegments(model, scales),
        arrows: dependencyArrows(model, scales, dependencies),
      });
    }

    if (renderer) {
      const canvas = renderer.canvas;
      // horizontal charts: the data layer is drawn as a vertical chart on a
      // transposed canvas (its x axis runs down the plot, its y axis right)
      const transposed = model.horizontal;
      const cw = transposed ? plot.height : plot.width;
      const ch = transposed ? plot.width : plot.height;
      styleElement(canvas, {
        left: `${plot.x}px`,
        top: `${plot.y}px`,
        width: `${cw}px`,
        height: `${ch}px`,
        transformOrigin: transposed ? "0 0" : "",
        transform: transposed ? "matrix(0, 1, 1, 0, 0, 0)" : "",
      });
      const bw = Math.max(1, Math.round(cw * dpr));
      const bh = Math.max(1, Math.round(ch * dpr));
      if (canvas.width !== bw || canvas.height !== bh) renderer.resize(bw, bh);
      ensureOrigin();
      // heatmap cells: their gaps and corners follow their size on screen
      const density: PixelDensity = {
        x: 1 / Math.abs(scales.xPerPx),
        y: 1 / Math.abs(scales.yPerPx),
      };
      const key = cellStyleKey(model, density);
      if (key !== cellKey) {
        cellKey = key;
        itemsDirty = true;
      }
      if (itemsDirty) {
        version++;
        items = buildItems(model, origin, version, density);
        itemsDirty = false;
      }
      const [xScale, xOffset] = transformFor(view.x, origin.x, model.x.reverse);
      const [yScale, yOffset] = transformFor(
        view.y,
        origin.y,
        // the top of the transposed canvas is the left of the plot
        transposed ? !model.y.reverse : model.y.reverse,
      );
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
    const content = tooltipContent(model, event, yTicks, y2Ticks);
    const fragment = doc.createDocumentFragment();
    const header = doc.createElement("div");
    styleElement(header, {
      display: "flex",
      alignItems: "center",
      gap: "6px",
      fontWeight: "600",
      marginBottom: content.subtitle ? "0" : "4px",
      color: "var(--text-color, #1f2937)",
    });
    if (content.titleColor)
      header.appendChild(swatch(doc, content.titleColor, "dot"));
    header.appendChild(doc.createTextNode(content.title));
    fragment.append(header);
    if (content.subtitle) {
      const sub = doc.createElement("div");
      styleElement(sub, {
        color: "var(--text-secondary-color, #6b7280)",
        fontSize: "11px",
        margin: "1px 0 6px",
        paddingLeft: content.titleColor ? "14px" : "0",
      });
      sub.textContent = content.subtitle;
      fragment.append(sub);
    }
    if (!content.rows.length) return fragment;
    // a label column and a value column (right-aligned, tabular figures)
    const swatches = content.rows.some((row) => row.color);
    const grid = doc.createElement("div");
    styleElement(grid, {
      display: "grid",
      gridTemplateColumns: swatches
        ? "auto minmax(0, 1fr) auto"
        : "minmax(0, 1fr) auto",
      columnGap: "0",
      rowGap: "2px",
      alignItems: "center",
    });
    for (const row of content.rows) {
      if (swatches) {
        const cell = doc.createElement("span");
        styleElement(cell, {
          display: "inline-flex",
          width: "14px",
          justifyContent: "flex-start",
        });
        if (row.color) cell.appendChild(swatch(doc, row.color, "dot"));
        grid.appendChild(cell);
      }
      const n = doc.createElement("span");
      styleElement(n, {
        color: "var(--text-secondary-color, #6b7280)",
        paddingRight: "16px",
        overflow: "hidden",
        textOverflow: "ellipsis",
      });
      n.textContent = row.name;
      const v = doc.createElement("span");
      styleElement(v, {
        fontWeight: "600",
        fontVariantNumeric: "tabular-nums",
        textAlign: "right",
        color: "var(--text-color, #1f2937)",
      });
      v.textContent = row.value;
      grid.append(n, v);
    }
    fragment.append(grid);
    return fragment;
  };

  const pooled = <T extends HTMLElement>(
    pool: T[],
    i: number,
    make: () => T,
    parent: HTMLElement = dom.hover,
  ) => {
    if (!pool[i]) {
      pool[i] = make();
      parent.appendChild(pool[i]);
    }
    pool[i].style.display = "block";
    return pool[i];
  };

  function renderHover() {
    const sc = scales;
    const marksShown =
      !!hover &&
      !!sc &&
      !!shownMarks &&
      shownMarks.scales === sc &&
      shownMarks.model === model &&
      sameHover(shownMarks.event, hover.event);
    // pointer moves over the same points: the markers stay where they are
    if (!marksShown) renderMarks(sc);

    const tip = dom.tooltip;
    if (!hover || !sc || !tooltipOptions() || drag?.moved || pointDrag?.moved) {
      tip.style.display = "none";
      return;
    }
    const custom = tooltipOptions()?.render;
    let w: number;
    let h: number;
    if (
      !custom &&
      shownTip &&
      shownTip.model === model &&
      shownTip.yTicks === yTicks &&
      sameHover(shownTip.event, hover.event) &&
      tip.style.display === "block"
    ) {
      // same content: only the position follows the pointer
      w = shownTip.width;
      h = shownTip.height;
    } else {
      shownTip = null;
      const content = tooltipNode(hover.event);
      if (content === null || content === "") {
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
      w = tip.offsetWidth;
      h = tip.offsetHeight;
      if (!custom)
        shownTip = { event: hover.event, model, yTicks, width: w, height: h };
    }
    const stageW = dom.stage.clientWidth;
    const stageH = dom.stage.clientHeight;
    let left = hover.anchorX + 16;
    if (left + w > stageW - 4) left = hover.anchorX - 16 - w;
    left = Math.max(4, Math.min(left, stageW - w - 4));
    const top = Math.max(4, Math.min(hover.anchorY - h / 2, stageH - h - 4));
    tip.style.transform = `translate(${Math.round(left)}px, ${Math.round(top)}px)`;
  }

  /** Crosshair, point markers, bar bands and lifted heatmap cells */
  function renderMarks(sc: Scales | null) {
    let markerCount = 0;
    let bandCount = 0;
    let cellCount = 0;
    let guideCount = 0;
    renderLegendCaret();
    shownMarks = null;
    dom.crosshair.style.display = "none";
    if (hover && sc) {
      shownMarks = { event: hover.event, model, scales: sc };
      const { plot } = sc;
      dom.hover.style.width = `${dom.stage.clientWidth}px`;
      dom.hover.style.height = `${dom.stage.clientHeight}px`;
      const guide = crosshairAt(model, sc, hover.event, options.crosshair);
      if (guide !== null) {
        const line =
          "1px dashed color-mix(in srgb, var(--text-secondary-color, #6b7280) 45%, transparent)";
        styleElement(
          dom.crosshair,
          sc.horizontal
            ? {
                display: "block",
                left: `${plot.x}px`,
                top: `${Math.round(guide)}px`,
                width: `${plot.width}px`,
                height: "0",
                borderLeft: "0",
                borderTop: line,
              }
            : {
                display: "block",
                left: `${Math.round(guide)}px`,
                top: `${plot.y}px`,
                width: "0",
                height: `${plot.height}px`,
                borderLeft: line,
                borderTop: "0",
              },
        );
      }
      for (const mark of hoverMarks(model, sc, hover.event)) {
        if (mark.kind === "band" || mark.kind === "guide") {
          const el =
            mark.kind === "band"
              ? pooled(bands, bandCount++, () => createBand(doc), dom.underlay)
              : pooled(guides, guideCount++, () =>
                  styleElement(createBand(doc), {
                    borderRadius: "0",
                    background:
                      "color-mix(in srgb, var(--text-color, #1f2937) 6%, transparent)",
                  }),
                );
          styleElement(el, {
            left: `${mark.x}px`,
            top: `${mark.y}px`,
            width: `${mark.width}px`,
            height: `${mark.height}px`,
          });
          continue;
        }
        if (mark.kind === "cell") {
          // the cell lifted above its neighbours, a ring inside its edge
          const el = pooled(cells, cellCount++, () =>
            styleElement(createBand(doc), {
              boxShadow:
                "0 8px 18px -6px rgba(15, 23, 42, 0.6), 0 0 0 1px rgba(15, 23, 42, 0.12)",
              outlineStyle: "solid",
              outlineWidth: "1.5px",
              outlineOffset: "-4px",
              transform: "scale(1.12)",
            }),
          );
          styleElement(el, {
            left: `${mark.x}px`,
            top: `${mark.y}px`,
            width: `${mark.width}px`,
            height: `${mark.height}px`,
            background: mark.color,
            borderRadius: `${Math.max(mark.radius, 2)}px`,
            outlineColor: mark.ring,
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
          boxShadow: `0 0 0 4px ${mark.halo}`,
        });
      }
    }
    for (let i = markerCount; i < markers.length; i++)
      markers[i].style.display = "none";
    for (let i = bandCount; i < bands.length; i++)
      bands[i].style.display = "none";
    for (let i = cellCount; i < cells.length; i++)
      cells[i].style.display = "none";
    for (let i = guideCount; i < guides.length; i++)
      guides[i].style.display = "none";
  }

  /** Marks the hovered heatmap value on the color legend */
  function renderLegendCaret() {
    const caret = legendCaret;
    if (!caret) return;
    const it = hover?.event.items[0];
    const s = it ? model.series[it.seriesIndex] : undefined;
    if (!it || !s || s.type !== "heatmap" || it.value === undefined) {
      caret.style.display = "none";
      return;
    }
    caret.style.display = "block";
    caret.style.left = `${(heatPosition(s, it.value) * 100).toFixed(2)}%`;
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
    if (notify) emit("zoom", viewToValues(model, view));
    invalidate();
  };

  const zoomAt = (px: number, py: number, factor: number) => {
    const sc = scales;
    if (!sc) return;
    const next = copyView(view);
    const at = toData(sc, px, py);
    if (model.zoom.x) next.x = zoomRange(view.x, at.x, factor);
    if (model.zoom.y) next.y = zoomRange(view.y, at.y, factor);
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
    const p = toData(sc, cx, cy);
    // values of the axes (not logarithms)
    return { x: fromPlotX(model, p.x), y: fromPlotY(model, p.y) };
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
        const from = toData(scales, drag.x, drag.y);
        const to = toData(scales, x, y);
        if (model.zoom.x) next.x = panRange(drag.view.x, from.x - to.x);
        if (model.zoom.y) next.y = panRange(drag.view.y, from.y - to.y);
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
      !scales.horizontal &&
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
        model.horizontal,
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
        if (model.horizontal) return;
        event.preventDefault();
        moveFocus((event.key === "ArrowRight") !== model.x.reverse ? 1 : -1);
        break;
      case "ArrowDown":
      case "ArrowUp":
        // horizontal charts: the x axis runs down
        if (!model.horizontal) return;
        event.preventDefault();
        moveFocus((event.key === "ArrowDown") !== model.x.reverse ? 1 : -1);
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
    const next = readTheme(dom.root, options.palette);
    // the watcher fires on any class / style change of <html> / <body>:
    // keep the GPU buffers unless a color really changed
    if (themeColorsChanged(theme, next)) themeVersion++;
    theme = next;
    rebuild();
  };
  const unwatchTheme = watchTheme(refreshTheme);
  // charts without `locale` follow the page language
  const unwatchLocale = watchLocale(() => {
    if (!destroyed && !options.locale) rebuild();
  });

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
  const unfollowDefault = followDefaultRenderer(
    () => options.renderer,
    () => void initRenderer(),
  );

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
    getView: () => viewToValues(model, view),
    setView(next) {
      if (destroyed) return;
      setViewInternal(viewFromValues(model, next, view), false);
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
      const p = toScreen(scales, toPlotX(model, x), toPlotY(model, y));
      return {
        x: p.x + dom.stage.offsetLeft,
        y: p.y + dom.stage.offsetTop,
      };
    },
    fromPixel(x, y) {
      if (!scales) return null;
      const p = toData(
        scales,
        x - dom.stage.offsetLeft,
        y - dom.stage.offsetTop,
      );
      return { x: fromPlotX(model, p.x), y: fromPlotY(model, p.y) };
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
      unfollowDefault();
      unwatchTheme();
      unwatchLocale();
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
