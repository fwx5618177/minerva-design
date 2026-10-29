// createCanvasChart: a whole chart drawn on one 2D canvas without any DOM:
// WeChat / Alipay / ByteDance mini-programs (`<canvas type="2d">`), Taro,
// uni-app, OffscreenCanvas, or a plain browser canvas. The host forwards
// touches / pointer events; everything else is handled here.

import { toCss } from "./color";
import {
  createChartController,
  type ChartController,
  type ChartControllerEventMap,
  type ChartPointerOptions,
  type ChartScene,
} from "./controller";
import { buildItems, type Origin } from "./items";
import { drawBackground, drawForeground, font } from "./overlay";
import { createCanvas2dPainter } from "./renderers/canvas2d";
import type { RenderItem } from "./renderers/types";
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
    theme,
    annotations: scene.annotations,
  });

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

  // data
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

  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  drawForeground(ctx, {
    width,
    height,
    scales,
    theme,
    annotations: scene.annotations,
    pointLabels: [],
    clear: false,
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
    for (const mark of hover.marks) {
      if (mark.kind === "bar") {
        ctx.fillStyle = toCss(theme.text, 0.08);
        ctx.fillRect(mark.x - 2, mark.y - 2, mark.width + 4, mark.height + 2);
        continue;
      }
      ctx.beginPath();
      ctx.arc(mark.x, mark.y, mark.size / 2, 0, Math.PI * 2);
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
    ctx.strokeStyle = toCss(theme.axis);
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
      for (const row of content.rows) {
        x = left;
        if (row.color) {
          ctx.fillStyle = row.color;
          ctx.beginPath();
          ctx.arc(x + 4, y, 4, 0, Math.PI * 2);
          ctx.fill();
          x += 14;
        }
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
      origin = { x: mid(scene.model.base.x), y: mid(scene.model.base.y) };
      items = buildItems(scene.model, origin, ++version);
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
    setOptions: (o) => controller.setOptions(o),
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
