// createIconCanvas: many icons on one <canvas>, drawn by the best backend
// (one instanced GPU draw per run of identical icons, or Canvas2D).

import { resolveColor, type Rgba } from "./color";
import { subscribeDefaultIconRenderer } from "./defaults";
import { createIconBackend } from "./renderers/detect";
import type { FrameItem, IconBackend } from "./renderers/types";
import { observeTheme } from "./theme";
import type {
  IconCanvasController,
  IconCanvasItem,
  IconCanvasOptions,
  IconRendererKind,
} from "./types";

const raf = (callback: () => void): (() => void) => {
  if (typeof requestAnimationFrame === "function") {
    const id = requestAnimationFrame(callback);
    return () => cancelAnimationFrame(id);
  }
  const id = setTimeout(callback, 16);
  return () => clearTimeout(id);
};

/** Frame items of icon canvas items: colors resolved on `host`, opacity applied */
export const frameItems = (
  items: readonly IconCanvasItem[],
  host: Element,
): FrameItem[] => {
  const colors = new Map<string | undefined, Rgba>();
  return items.map((item) => {
    let rgba = colors.get(item.color);
    if (!rgba) {
      rgba = resolveColor(item.color, host);
      colors.set(item.color, rgba);
    }
    const opacity = Math.min(1, Math.max(0, item.opacity ?? 1));
    return {
      icon: item.icon,
      x: item.x,
      y: item.y,
      size: item.size ?? 24,
      rotation: ((item.rotation ?? 0) * Math.PI) / 180,
      strokeWidth: item.strokeWidth ?? 2,
      color: [rgba[0], rgba[1], rgba[2], rgba[3] * opacity],
    };
  });
};

/**
 * Draws many icons on one canvas appended to `container` (sized to it unless
 * `width`/`height` are given). The backend follows `renderer` (WebGPU ->
 * WebGL2 -> WebGL -> Canvas2D fallback); with "auto" it follows the global
 * default and switches live when it changes. The container gets
 * `data-renderer` with the backend drawing. A lost GPU context restarts the
 * backend (twice lost: that backend is skipped from then on).
 */
export function createIconCanvas(
  container: HTMLElement,
  options: IconCanvasOptions = {},
): IconCanvasController {
  let { items = [], ...settings } = options;
  let backend: IconBackend | null = null;
  let generation = 0;
  let destroyed = false;
  let reported: IconRendererKind | null = null;
  let cancelFrame: (() => void) | null = null;
  let waiting: {
    resolve: (kind: IconRendererKind) => void;
    reject: (error: Error) => void;
  }[] = [];
  const exclude = new Set<IconRendererKind>();
  const losses = new Map<IconRendererKind, number>();

  const newCanvas = () => {
    const canvas = document.createElement("canvas");
    canvas.setAttribute("aria-hidden", "true");
    canvas.style.display = "block";
    sizeCanvas(canvas);
    return canvas;
  };
  const sizeCanvas = (canvas: HTMLCanvasElement) => {
    canvas.style.width =
      settings.width === undefined ? "100%" : `${settings.width}px`;
    canvas.style.height =
      settings.height === undefined ? "100%" : `${settings.height}px`;
  };
  let canvas = newCanvas();
  let pristine: HTMLCanvasElement | null = canvas;
  container.appendChild(canvas);

  const draw = () => {
    cancelFrame?.();
    cancelFrame = null;
    if (destroyed || !backend) return;
    const width = settings.width ?? container.clientWidth;
    const height = settings.height ?? container.clientHeight;
    if (width > 0 && height > 0) {
      backend.render({
        width,
        height,
        dpr:
          settings.pixelRatio ??
          (typeof devicePixelRatio === "number" ? devicePixelRatio : 1),
        items: frameItems(items, container),
      });
    }
    const kind = backend.kind;
    const resolvers = waiting;
    waiting = [];
    resolvers.forEach(({ resolve }) => resolve(kind));
  };

  const schedule = () => {
    if (destroyed || cancelFrame) return;
    cancelFrame = raf(draw);
  };

  const start = () => {
    const token = ++generation;
    const makeCanvas = () => {
      if (pristine) {
        const first = pristine;
        pristine = null;
        return first;
      }
      return newCanvas();
    };
    const onLost = (kind: IconRendererKind) => {
      if (destroyed || backend?.kind !== kind) return;
      const count = (losses.get(kind) ?? 0) + 1;
      losses.set(kind, count);
      if (count >= 2) exclude.add(kind);
      start();
    };
    void createIconBackend(settings.renderer, makeCanvas, onLost, exclude).then(
      (next) => {
        if (destroyed || token !== generation) {
          next?.destroy();
          return;
        }
        backend?.destroy();
        backend = next;
        if (!next) {
          const rejected = waiting;
          waiting = [];
          rejected.forEach(({ reject }) =>
            reject(new Error("No icon renderer could start")),
          );
          return;
        }
        if (next.canvas !== canvas) {
          sizeCanvas(next.canvas);
          if (canvas.parentNode === container) {
            container.replaceChild(next.canvas, canvas);
          } else {
            container.appendChild(next.canvas);
          }
          canvas = next.canvas;
        }
        container.dataset.renderer = next.kind;
        if (reported !== next.kind) {
          reported = next.kind;
          settings.onRendererChange?.(next.kind);
        }
        draw();
      },
    );
  };

  const unfollow = subscribeDefaultIconRenderer(() => {
    if (!settings.renderer || settings.renderer === "auto") start();
  });
  const unwatchTheme = observeTheme(schedule);
  const resizeObserver =
    typeof ResizeObserver === "function" ? new ResizeObserver(schedule) : null;
  resizeObserver?.observe(container);

  start();

  return {
    get renderer() {
      return backend?.kind ?? null;
    },
    get canvas() {
      return canvas;
    },
    setItems(next) {
      items = next;
      schedule();
    },
    setOptions(next) {
      const restart =
        "renderer" in next &&
        (next.renderer ?? "auto") !== (settings.renderer ?? "auto");
      settings = { ...settings, ...next };
      sizeCanvas(canvas);
      if (restart) start();
      else schedule();
    },
    render: draw,
    ready() {
      if (destroyed) return Promise.reject(new Error("Icon canvas destroyed"));
      return new Promise<IconRendererKind>((resolve, reject) => {
        waiting.push({ resolve, reject });
        if (backend) schedule();
      });
    },
    destroy() {
      if (destroyed) return;
      destroyed = true;
      cancelFrame?.();
      unfollow();
      unwatchTheme();
      resizeObserver?.disconnect();
      backend?.destroy();
      backend = null;
      canvas.remove();
      delete container.dataset.renderer;
    },
  };
}
