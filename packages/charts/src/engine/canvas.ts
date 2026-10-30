// createCanvasChart: a whole chart drawn on one 2D canvas without any DOM:
// WeChat / Alipay / ByteDance mini-programs (`<canvas type="2d">`), Taro,
// uni-app, OffscreenCanvas, or a plain browser canvas. The host forwards
// touches / pointer events; everything else is handled here.

import { toCss } from "./color";
import {
  createChartController,
  scenePrimitives,
  type ChartController,
  type ChartControllerEventMap,
  type ChartPointerOptions,
  type ChartPrimitive,
  type ChartScene,
} from "./controller";
import { buildItems, cellStyleKey, type Origin } from "./items";
import { drawBackground, drawForeground, font } from "./overlay";
import { createCanvas2dPainter } from "./renderers/canvas2d";
import type { RenderItem } from "./renderers/types";
import { itemsSignature } from "./signature";
import type { ChartThemeInput } from "./theme";
import type { ChartOptions, ChartRect, ChartView } from "./types";

/**
 * The canvas a chart draws on: a browser `HTMLCanvasElement`, an
 * `OffscreenCanvas` or the node of a mini-program `<canvas type="2d">`
 * (`SelectorQuery.fields({ node: true })`)
 */
export interface ChartCanvas {
  width: number;
  height: number;
  getContext(type: "2d"): unknown;
  /** Mini-program canvases schedule their frames themselves */
  requestAnimationFrame?: (callback: () => void) => number;
  cancelAnimationFrame?: (id: number) => void;
}

/** A touch point relative to the canvas (`x` / `y`) with its identifier */
export interface ChartTouch {
  x: number;
  y: number;
  identifier?: number;
}

export interface CanvasChartConfig {
  canvas: ChartCanvas;
  /** Size of the canvas in CSS pixels (rpx converted by the host) */
  width: number;
  height: number;
  /**
   * Device pixel ratio (`wx.getWindowInfo().pixelRatio` in mini-programs)
   * @default 1
   */
  pixelRatio?: number;
  options: ChartOptions;
  /** Colors and fonts: values of the Minerva CSS variables */
  theme?: ChartThemeInput;
}

export interface CanvasChartInstance {
  setOptions(options: ChartOptions): void;
  setTheme(theme: ChartThemeInput | undefined): void;
  /** New CSS size (and pixel ratio) of the canvas */
  resize(width: number, height: number, pixelRatio?: number): void;
  /** Draws now (frames are otherwise scheduled automatically) */
  render(): void;
  /** Touch handlers: pass the `touches` / `changedTouches` of the event */
  touchStart(touches: readonly ChartTouch[]): void;
  touchMove(touches: readonly ChartTouch[]): void;
  touchEnd(changedTouches: readonly ChartTouch[]): void;
  touchCancel(changedTouches?: readonly ChartTouch[]): void;
  /** Mouse / pen handlers (H5, desktop mini-programs) */
  pointerDown(x: number, y: number, options?: ChartPointerOptions): void;
  pointerMove(x: number, y: number, options?: ChartPointerOptions): void;
  pointerUp(x: number, y: number, options?: ChartPointerOptions): void;
  pointerLeave(): void;
  /** Zooms around a pixel (factor < 1 zooms in) */
  zoomAt(x: number, y: number, factor: number): void;
  resetZoom(): void;
  getView(): ChartView;
  setView(view: Partial<ChartView>): void;
  toggleSeries(id: string): void;
  clearHover(): void;
  getPlotRect(): ChartRect | null;
  toPixel(x: number, y: number): { x: number; y: number } | null;
  fromPixel(x: number, y: number): { x: number; y: number } | null;
  /** The platform-free controller (scene, gestures) */
  getController(): ChartController;
  on<K extends keyof ChartControllerEventMap>(
    type: K,
    listener: (event: ChartControllerEventMap[K]) => void,
  ): () => void;
  destroy(): void;
}

const mid = (r: [number, number]) => (r[0] + r[1]) / 2;

const roundedRect = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) => {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.arcTo(x + w, y, x + w, y + r, r);
  ctx.lineTo(x + w, y + h - r);
  ctx.arcTo(x + w, y + h, x + w - r, y + h, r);
  ctx.lineTo(x + r, y + h);
  ctx.arcTo(x, y + h, x, y + h - r, r);
  ctx.lineTo(x, y + r);
  ctx.arcTo(x, y, x + r, y, r);
  ctx.closePath();
};

/**
 * Draws the shapes of `scenePrimitives` (CSS pixels of the chart) clipped to
 * the plot: the data of horizontal charts
 */
export const drawPrimitives = (
  ctx: CanvasRenderingContext2D,
  primitives: readonly ChartPrimitive[],
  plot: { x: number; y: number; width: number; height: number },
) => {
  ctx.save();
  ctx.beginPath();
  ctx.rect(plot.x, plot.y, plot.width, plot.height);
  ctx.clip();
  ctx.lineJoin = "round";
  ctx.lineCap = "round";
  for (const p of primitives) {
    if (p.kind === "area") {
      ctx.globalAlpha = p.opacity;
      ctx.fillStyle = p.color;
      p.segments.forEach((run, k) => {
        const bottoms = p.bottoms?.[k];
        const n = run.length / 2;
        if (n < 2) return;
        ctx.beginPath();
        for (let i = 0; i < n; i++) {
          if (i === 0) ctx.moveTo(run[0], run[1]);
          else ctx.lineTo(run[i * 2], run[i * 2 + 1]);
        }
        // back along the bottom edge (or the baseline)
        for (let i = n - 1; i >= 0; i--) {
          const b = bottoms ? bottoms[i] : p.baseline;
          if (p.horizontal) ctx.lineTo(b, run[i * 2 + 1]);
          else ctx.lineTo(run[i * 2], b);
        }
        ctx.closePath();
        ctx.fill();
      });
      ctx.globalAlpha = 1;
    } else if (p.kind === "line") {
      ctx.strokeStyle = p.color;
      ctx.lineWidth = p.width;
      ctx.beginPath();
      for (const run of p.segments) {
        for (let i = 0; i < run.length; i += 2) {
          if (i === 0) ctx.moveTo(run[0], run[1]);
          else ctx.lineTo(run[i], run[i + 1]);
        }
      }
      ctx.stroke();
    } else if (p.kind === "bars") {
      ctx.globalAlpha = p.opacity ?? 1;
      const r = p.radius ?? 0;
      for (let k = 0; k < p.rects.length; k += 4) {
        const [x, y, w, h] = [
          p.rects[k],
          p.rects[k + 1],
          p.rects[k + 2],
          p.rects[k + 3],
        ];
        ctx.fillStyle = p.colors?.[k / 4] ?? p.color;
        const radius = Math.min(r, w / 2, h / 2);
        if (radius > 0.5) {
          roundedRect(ctx, x, y, w, h, radius);
          ctx.fill();
        } else {
          ctx.fillRect(x, y, w, h);
        }
      }
      ctx.globalAlpha = 1;
    } else {
      const stroke = p.stroke ?? 0;
      for (let k = 0; k < p.dots.length; k += 3) {
        const color = p.colors[k / 3] ?? "#888";
        const r = p.dots[k + 2] / 2;
        ctx.beginPath();
        ctx.arc(
          p.dots[k],
          p.dots[k + 1],
          Math.max(0, r - stroke / 2),
          0,
          Math.PI * 2,
        );
        if (p.opacity > 0) {
          ctx.globalAlpha = p.opacity;
          ctx.fillStyle = color;
          ctx.fill();
        }
        if (stroke > 0) {
          // rings stay opaque (hollow box plot outliers)
          ctx.globalAlpha = 1;
          ctx.lineWidth = stroke;
          ctx.strokeStyle = color;
          ctx.stroke();
        }
      }
      ctx.globalAlpha = 1;
    }
  }
  ctx.restore();
};

/** The visual map of a heatmap: gradient bar, value labels, hover caret */
const drawColorLegend = (
  ctx: CanvasRenderingContext2D,
  ramp: NonNullable<NonNullable<ChartScene["legend"]>["colors"]>,
  scene: ChartScene,
) => {
  const { theme } = scene;
  const { bar, stops } = ramp;
  const n = stops.length;
  if (typeof ctx.createLinearGradient === "function") {
    const gradient = ctx.createLinearGradient(bar.x, 0, bar.x + bar.width, 0);
    stops.forEach((c, k) => gradient.addColorStop(k / Math.max(1, n - 1), c));
    ctx.fillStyle = gradient;
    roundedRect(ctx, bar.x, bar.y, bar.width, bar.height, bar.height / 2);
    ctx.fill();
  } else {
    // contexts without gradients: even steps
    const w = bar.width / n;
    stops.forEach((c, k) => {
      ctx.fillStyle = c;
      ctx.fillRect(bar.x + k * w, bar.y, w + 0.5, bar.height);
    });
  }
  ctx.fillStyle = toCss(theme.text, 0.35);
  for (const t of ramp.ticks)
    ctx.fillRect(Math.round(t), bar.y - 2, 1, bar.height + 4);
  ctx.font = font(theme, 11);
  ctx.textBaseline = "middle";
  ctx.fillStyle = toCss(theme.textMuted);
  for (const l of ramp.labels) {
    ctx.textAlign = l.align;
    ctx.fillText(l.text, l.x, l.y);
  }
  if (ramp.caret !== null) {
    roundedRect(ctx, ramp.caret - 2, bar.y - 3, 4, bar.height + 6, 2);
    ctx.fillStyle = toCss(theme.text);
    ctx.fill();
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = toCss(theme.background);
    ctx.stroke();
  }
};

/** Draws a scene (legend, axes, data, labels, hover) on a 2D context */
export const drawScene = (
  ctx: CanvasRenderingContext2D,
  scene: ChartScene,
  items: readonly RenderItem[],
  origin: Origin,
  pixelRatio: number,
  painter = createCanvas2dPainter(ctx),
) => {
  const { width, height, theme, model, view, layout } = scene;
  const { plot, scales } = layout;
  const dpr = pixelRatio;
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, Math.ceil(width * dpr), Math.ceil(height * dpr));
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  drawBackground(ctx, {
    width,
    height,
    scales,
    x: model.x,
    y: model.y,
    xTicks: layout.xTicks,
    yTicks: layout.yTicks,
    y2: model.y2,
    y2Ticks: layout.y2Ticks,
    theme,
    annotations: scene.annotations,
  });

  // color legend of heatmaps
  const ramp = scene.legend?.colors;
  if (ramp) drawColorLegend(ctx, ramp, scene);
  // legend
  if (scene.legend) {
    ctx.font = font(theme, 12);
    ctx.textBaseline = "middle";
    ctx.textAlign = "left";
    for (const e of scene.legend.entries) {
      const cy = e.box.y + e.box.height / 2;
      ctx.globalAlpha = e.hidden ? 0.45 : 1;
      ctx.fillStyle = e.color;
      if (e.shape === "dot") {
        ctx.beginPath();
        ctx.arc(e.box.x + 5, cy, 4, 0, Math.PI * 2);
        ctx.fill();
      } else if (e.shape === "line") {
        ctx.fillRect(e.box.x, cy - 1, 10, 2);
      } else {
        ctx.fillRect(e.box.x + 1, cy - 4, 8, 8);
      }
      ctx.fillStyle = toCss(theme.textMuted);
      ctx.fillText(e.name, e.box.x + 14, cy);
      if (e.hidden) {
        const w = e.box.width - 22;
        ctx.fillRect(e.box.x + 14, cy, w, 1);
      }
    }
    ctx.globalAlpha = 1;
  }

  // hover band of bars, below the data
  for (const mark of scene.hover?.marks ?? []) {
    if (mark.kind !== "band") continue;
    roundedRect(ctx, mark.x, mark.y, mark.width, mark.height, 6);
    ctx.fillStyle = toCss(theme.text, 0.06);
    ctx.fill();
  }

  // data (horizontal charts: as shapes, the painter draws vertical charts)
  if (scales.horizontal) {
    drawPrimitives(ctx, scenePrimitives(scene), plot);
  } else {
    paintData();
  }
  function paintData() {
    const scale = (range: [number, number], o: number, reverse: boolean) => {
      const s = 2 / (range[1] - range[0]);
      const offset = (o - range[0]) * s - 1;
      return reverse ? [-s, -offset] : [s, offset];
    };
    const [xScale, xOffset] = scale(view.x, origin.x, model.x.reverse);
    const [yScale, yOffset] = scale(view.y, origin.y, model.y.reverse);
    painter.paint(
      items,
      {
        transform: { xScale, xOffset, yScale, yOffset },
        width: Math.max(1, Math.round(plot.width * dpr)),
        height: Math.max(1, Math.round(plot.height * dpr)),
        dpr,
      },
      Math.round(plot.x * dpr),
      Math.round(plot.y * dpr),
    );
  }

  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  // soft row / column of a hovered heatmap cell, over the data
  for (const mark of scene.hover?.marks ?? []) {
    if (mark.kind !== "guide") continue;
    ctx.fillStyle = toCss(theme.text, 0.06);
    ctx.fillRect(mark.x, mark.y, mark.width, mark.height);
  }
  drawForeground(ctx, {
    width,
    height,
    scales,
    theme,
    annotations: scene.annotations,
    pointLabels: [],
    clear: false,
    connectors: scene.connectors,
    arrows: scene.arrows,
  });
  // dot labels placed by the scene
  if (scene.pointLabels.length) {
    ctx.save();
    ctx.font = font(theme);
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    ctx.lineWidth = 3;
    ctx.lineJoin = "round";
    ctx.strokeStyle = toCss(theme.background, 0.9);
    ctx.fillStyle = toCss(theme.text, 0.85);
    for (const { label, box } of scene.pointLabels) {
      ctx.strokeText(label.text, box.x, box.y + box.height / 2);
      ctx.fillText(label.text, box.x, box.y + box.height / 2);
    }
    ctx.restore();
  }

  // hover
  const hover = scene.hover;
  if (hover) {
    if (hover.crosshairX !== null) {
      ctx.save();
      ctx.strokeStyle = toCss(theme.textMuted, 0.55);
      ctx.lineWidth = 1;
      ctx.setLineDash([3, 3]);
      ctx.beginPath();
      const cx = Math.round(hover.crosshairX) + 0.5;
      ctx.moveTo(cx, plot.y);
      ctx.lineTo(cx, plot.y + plot.height);
      ctx.stroke();
      ctx.restore();
    }
    if (hover.crosshairY !== null) {
      ctx.save();
      ctx.strokeStyle = toCss(theme.textMuted, 0.55);
      ctx.lineWidth = 1;
      ctx.setLineDash([3, 3]);
      ctx.beginPath();
      const cy = Math.round(hover.crosshairY) + 0.5;
      ctx.moveTo(plot.x, cy);
      ctx.lineTo(plot.x + plot.width, cy);
      ctx.stroke();
      ctx.restore();
    }
    for (const mark of hover.marks) {
      if (mark.kind === "band" || mark.kind === "guide") continue;
      if (mark.kind === "cell") {
        // lifted: a little larger, with a soft shadow and an inner ring
        const grow = Math.min(3, mark.width * 0.06, mark.height * 0.06);
        const r = Math.max(2, mark.radius);
        ctx.save();
        ctx.shadowColor = "rgba(15, 23, 42, 0.4)";
        ctx.shadowBlur = 12;
        ctx.shadowOffsetY = 4;
        roundedRect(
          ctx,
          mark.x - grow,
          mark.y - grow,
          mark.width + grow * 2,
          mark.height + grow * 2,
          r,
        );
        ctx.fillStyle = mark.color;
        ctx.fill();
        ctx.restore();
        const inset = Math.min(2.75, mark.width / 5, mark.height / 5);
        if (mark.width > 8 && mark.height > 8) {
          roundedRect(
            ctx,
            mark.x + inset,
            mark.y + inset,
            mark.width - inset * 2,
            mark.height - inset * 2,
            Math.max(1, r - inset / 2),
          );
          ctx.lineWidth = 1.5;
          ctx.strokeStyle = mark.ring;
          ctx.stroke();
        }
        continue;
      }
      ctx.beginPath();
      ctx.arc(mark.x, mark.y, mark.size / 2 + 4, 0, Math.PI * 2);
      ctx.fillStyle = mark.halo;
      ctx.fill();
      ctx.beginPath();
      ctx.arc(mark.x, mark.y, mark.size / 2 - 1, 0, Math.PI * 2);
      ctx.fillStyle = mark.color;
      ctx.fill();
      ctx.lineWidth = 2;
      ctx.strokeStyle = toCss(theme.background);
      ctx.stroke();
    }
  }
  if (scene.dragging) {
    const d = scene.dragging;
    ctx.beginPath();
    ctx.arc(d.x, d.y, d.size / 2, 0, Math.PI * 2);
    ctx.fillStyle = d.color;
    ctx.globalAlpha = 0.85;
    ctx.fill();
    ctx.globalAlpha = 1;
    ctx.lineWidth = 2;
    ctx.strokeStyle = toCss(theme.background);
    ctx.stroke();
  }
  const tip = hover?.tooltip;
  if (tip) {
    const { box, lineHeight, padding } = tip;
    ctx.save();
    ctx.shadowColor = "rgba(15, 23, 42, 0.18)";
    ctx.shadowBlur = 16;
    ctx.shadowOffsetY = 6;
    roundedRect(ctx, box.x, box.y, box.width, box.height, 8);
    ctx.fillStyle = toCss(theme.background);
    ctx.fill();
    ctx.restore();
    roundedRect(
      ctx,
      box.x + 0.5,
      box.y + 0.5,
      box.width - 1,
      box.height - 1,
      8,
    );
    ctx.strokeStyle = toCss(theme.axis, 0.6);
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.textBaseline = "middle";
    let y = box.y + padding + lineHeight / 2;
    const left = box.x + padding + 2;
    const right = box.x + box.width - padding - 2;
    if (tip.text) {
      ctx.font = font(theme, 12);
      ctx.fillStyle = toCss(theme.text);
      ctx.textAlign = "left";
      for (const line of tip.text) {
        ctx.fillText(line, left, y);
        y += lineHeight;
      }
    } else {
      const { content } = tip;
      let x = left;
      if (content.titleColor) {
        ctx.fillStyle = content.titleColor;
        ctx.beginPath();
        ctx.arc(x + 4, y, 4, 0, Math.PI * 2);
        ctx.fill();
        x += 14;
      }
      ctx.font = font(theme, 12, 600);
      ctx.fillStyle = toCss(theme.text);
      ctx.textAlign = "left";
      ctx.fillText(content.title, x, y);
      y += lineHeight;
      if (content.subtitle) {
        ctx.font = font(theme, 11);
        ctx.fillStyle = toCss(theme.textMuted);
        ctx.fillText(content.subtitle, x, y - 2);
        y += lineHeight;
      }
      for (const row of content.rows) {
        x = left;
        if (row.color) {
          ctx.fillStyle = row.color;
          ctx.beginPath();
          ctx.arc(x + 4, y, 4, 0, Math.PI * 2);
          ctx.fill();
        }
        // names in one column, values right-aligned in another
        x += tip.swatchWidth;
        ctx.font = font(theme, 12);
        ctx.textAlign = "left";
        ctx.fillStyle = toCss(theme.textMuted);
        ctx.fillText(row.name, x, y);
        ctx.font = font(theme, 12, 600);
        ctx.textAlign = "right";
        ctx.fillStyle = toCss(theme.text);
        ctx.fillText(row.value, right, y);
        y += lineHeight;
      }
    }
  }
};

/**
 * Creates a chart drawn on a 2D canvas: line, area, bar and scatter series,
 * annotations, legend and tooltip, tap / drag / pinch gestures. Works
 * without a DOM (mini-programs); see `createChart` for the GPU version of
 * the web.
 */
export const createCanvasChart = (
  config: CanvasChartConfig,
): CanvasChartInstance => {
  const { canvas } = config;
  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D | null;
  let width = config.width;
  let height = config.height;
  let dpr = config.pixelRatio ?? 1;
  let destroyed = false;
  let frameId: number | null = null;
  let items: RenderItem[] = [];
  let itemsModel: unknown = null;
  let itemsKey0 = "";
  let itemsKey = "";
  let options = config.options;
  /** Ids of the themes seen (the controller replaces its theme on changes) */
  const themeIds = new WeakMap<object, number>();
  let themeCount = 0;
  const themeId = (theme: object) => {
    let id = themeIds.get(theme);
    if (id === undefined) themeIds.set(theme, (id = ++themeCount));
    return id;
  };
  let origin: Origin = { x: 0, y: 0 };
  let version = 0;
  let fontSet = "";

  const measureText = (text: string, f: string) => {
    if (!ctx) return text.length * 6.5;
    if (f !== fontSet) {
      ctx.font = f;
      fontSet = f;
    }
    return ctx.measureText(text).width;
  };

  const painter = ctx ? createCanvas2dPainter(ctx) : null;

  const g = globalThis as {
    requestAnimationFrame?: (cb: () => void) => number;
    cancelAnimationFrame?: (id: number) => void;
  };

  const render = () => {
    frameId = null;
    if (destroyed || !ctx || !painter) return;
    const scene = controller.getScene();
    if (!scene) return;
    const pw = Math.max(1, Math.round(width * dpr));
    const ph = Math.max(1, Math.round(height * dpr));
    if (canvas.width !== pw) canvas.width = pw;
    if (canvas.height !== ph) canvas.height = ph;
    fontSet = "";
    if (itemsModel !== scene.model) {
      itemsModel = scene.model;
      // a new model (any setOptions) keeps the items when nothing they
      // depend on changed
      itemsKey0 = itemsSignature(
        scene.model,
        themeId(scene.theme),
        (index) => options.series[index]?.stack,
      );
    }
    // heatmap cells: their gaps and corners follow their size on screen
    const sc = scene.layout.scales;
    const density = { x: 1 / Math.abs(sc.xPerPx), y: 1 / Math.abs(sc.yPerPx) };
    const key = `${itemsKey0}|${cellStyleKey(scene.model, density)}`;
    if (key !== itemsKey) {
      itemsKey = key;
      origin = { x: mid(scene.model.base.x), y: mid(scene.model.base.y) };
      items = buildItems(scene.model, origin, ++version, density);
    }
    drawScene(ctx, scene, items, origin, dpr, painter);
    fontSet = "";
  };

  const schedule = () => {
    if (destroyed || frameId !== null) return;
    if (canvas.requestAnimationFrame)
      frameId = canvas.requestAnimationFrame(render);
    else if (g.requestAnimationFrame) frameId = g.requestAnimationFrame(render);
    else frameId = setTimeout(render, 16) as unknown as number;
  };

  const controller = createChartController({
    options: config.options,
    theme: config.theme,
    measureText,
    onInvalidate: schedule,
  });
  controller.setSize(width, height);

  const touchOptions = (t: ChartTouch, i: number): ChartPointerOptions => ({
    id: t.identifier ?? i,
    touch: true,
  });

  return {
    setOptions: (o) => {
      options = o;
      controller.setOptions(o);
    },
    setTheme: (t) => controller.setTheme(t),
    resize(w, h, ratio) {
      width = w;
      height = h;
      if (ratio) dpr = ratio;
      controller.setSize(w, h);
      schedule();
    },
    render() {
      if (frameId !== null) {
        if (canvas.cancelAnimationFrame) canvas.cancelAnimationFrame(frameId);
        else if (g.cancelAnimationFrame) g.cancelAnimationFrame(frameId);
        else clearTimeout(frameId);
      }
      render();
    },
    touchStart(touches) {
      touches.forEach((t, i) =>
        controller.pointerDown(t.x, t.y, touchOptions(t, i)),
      );
    },
    touchMove(touches) {
      touches.forEach((t, i) =>
        controller.pointerMove(t.x, t.y, touchOptions(t, i)),
      );
    },
    touchEnd(touches) {
      touches.forEach((t, i) =>
        controller.pointerUp(t.x, t.y, touchOptions(t, i)),
      );
    },
    touchCancel(touches = [{ x: 0, y: 0 }]) {
      touches.forEach((t, i) => controller.pointerCancel(touchOptions(t, i)));
    },
    pointerDown: (x, y, o) => controller.pointerDown(x, y, o),
    pointerMove: (x, y, o) => controller.pointerMove(x, y, o),
    pointerUp: (x, y, o) => controller.pointerUp(x, y, o),
    pointerLeave: () => controller.pointerLeave(),
    zoomAt: (x, y, f) => controller.zoomAt(x, y, f),
    resetZoom: () => controller.resetZoom(),
    getView: () => controller.getView(),
    setView: (v) => controller.setView(v),
    toggleSeries: (id) => controller.toggleSeries(id),
    clearHover: () => controller.clearHover(),
    getPlotRect: () => controller.getPlotRect(),
    toPixel: (x, y) => controller.toPixel(x, y),
    fromPixel: (x, y) => controller.fromPixel(x, y),
    getController: () => controller,
    on: (type, listener) => controller.on(type, listener),
    destroy() {
      if (destroyed) return;
      destroyed = true;
      if (frameId !== null) {
        if (canvas.cancelAnimationFrame) canvas.cancelAnimationFrame(frameId);
        else if (g.cancelAnimationFrame) g.cancelAnimationFrame(frameId);
        else clearTimeout(frameId);
      }
      painter?.destroy();
      controller.destroy();
    },
  };
};
