// DOM host of the order book widgets: a sized Canvas2D layer, a frame
// scheduler coalescing any number of updates into one requestAnimationFrame,
// paused while the widget is off screen, theme watching, resize observing,
// a tooltip and a tiny event emitter.

import { styleElement } from "../dom";
import { readTheme, watchTheme, type ChartTheme } from "../theme";

export interface HostConfig {
  /** Class of the root element */
  className: string;
  /** Draws a frame; returns `true` to get another one (animations) */
  draw(now: number): boolean;
  /** The theme changed (colors must be resolved again) */
  onTheme?(): void;
}

export interface Host {
  readonly doc: Document;
  readonly root: HTMLDivElement;
  readonly canvas: HTMLCanvasElement;
  readonly ctx: CanvasRenderingContext2D | null;
  readonly tooltip: HTMLDivElement;
  /** Size of the widget in CSS pixels, read at the start of every frame */
  width: number;
  height: number;
  dpr: number;
  theme: ChartTheme;
  /** Requests a frame (coalesced) */
  invalidate(): void;
  /** Sizes the canvas to the root; `false` when it has no size */
  measure(): boolean;
  /** Places the tooltip next to a point, inside the widget */
  placeTooltip(
    tip: HTMLElement,
    x: number,
    y: number,
    prefer?: "left" | "right",
  ): void;
  /** New tooltip element (one is created with the host) */
  createTooltip(): HTMLDivElement;
  /** Text read by screen readers (visually hidden, updated at most once a second) */
  describe(text: string): void;
  destroy(): void;
}

/** Tooltip look of the chart engine (dom.ts), copied for the widgets */
const TOOLTIP_STYLE: Partial<CSSStyleDeclaration> = {
  position: "absolute",
  left: "0",
  top: "0",
  zIndex: "2",
  display: "none",
  pointerEvents: "none",
  padding: "6px 10px",
  borderRadius: "8px",
  border:
    "1px solid color-mix(in srgb, var(--border-color, #e5e7eb) 60%, transparent)",
  background: "var(--surface-elevated-color, var(--background-color, #fff))",
  color: "var(--text-color, #1f2937)",
  boxShadow:
    "0 12px 32px -8px rgba(15, 23, 42, 0.18), 0 4px 10px -4px rgba(15, 23, 42, 0.1)",
  fontSize: "12px",
  lineHeight: "18px",
  whiteSpace: "nowrap",
  fontVariantNumeric: "tabular-nums",
};

export const createHost = (
  container: HTMLElement,
  config: HostConfig,
): Host => {
  const doc = container.ownerDocument;
  const win = doc.defaultView;
  const root = styleElement(doc.createElement("div"), {
    position: "relative",
    width: "100%",
    height: "100%",
    minHeight: "0",
    overflow: "hidden",
    userSelect: "none",
    fontFamily: "var(--font-family-sans, system-ui, sans-serif)",
    color: "var(--text-color, #1f2937)",
    borderRadius: "inherit",
  }) as HTMLDivElement;
  root.className = `minerva-orderbook ${config.className}`;
  const canvas = styleElement(doc.createElement("canvas"), {
    position: "absolute",
    left: "0",
    top: "0",
    pointerEvents: "none",
  }) as HTMLCanvasElement;
  canvas.setAttribute("aria-hidden", "true");
  let ctx: CanvasRenderingContext2D | null;
  try {
    ctx = canvas.getContext("2d");
  } catch {
    ctx = null;
  }
  root.appendChild(canvas);
  container.appendChild(root);

  const createTooltip = () => {
    const tip = styleElement(
      doc.createElement("div"),
      TOOLTIP_STYLE,
    ) as HTMLDivElement;
    tip.className = "minerva-orderbook-tooltip";
    tip.setAttribute("role", "tooltip");
    root.appendChild(tip);
    return tip;
  };
  const tooltip = createTooltip();

  const summary = styleElement(doc.createElement("div"), {
    position: "absolute",
    width: "1px",
    height: "1px",
    overflow: "hidden",
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    whiteSpace: "nowrap",
  });
  root.appendChild(summary);
  let summaryText = "";
  let summaryAt = -Infinity;

  let destroyed = false;
  let frameId = 0;
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  let pending = false;
  let visible = true;

  const raf =
    win && typeof win.requestAnimationFrame === "function"
      ? (cb: (t: number) => void) => win.requestAnimationFrame(cb)
      : null;

  const run = () => {
    frameId = 0;
    timeoutId = null;
    if (destroyed) return;
    pending = false;
    if (!host.measure()) return;
    const now =
      typeof performance !== "undefined" ? performance.now() : Date.now();
    if (config.draw(now)) host.invalidate();
  };

  const schedule = () => {
    if (frameId || timeoutId !== null || destroyed) return;
    if (raf) frameId = raf(run);
    else timeoutId = setTimeout(run, 16);
  };

  const host: Host = {
    doc,
    root,
    canvas,
    ctx,
    tooltip,
    width: 0,
    height: 0,
    dpr: 1,
    theme: readTheme(root),
    invalidate() {
      pending = true;
      if (visible) schedule();
    },
    measure() {
      const width = root.clientWidth;
      const height = root.clientHeight;
      if (width <= 0 || height <= 0) return false;
      const dpr = win?.devicePixelRatio || 1;
      const w = Math.max(1, Math.round(width * dpr));
      const h = Math.max(1, Math.round(height * dpr));
      if (canvas.width !== w) canvas.width = w;
      if (canvas.height !== h) canvas.height = h;
      if (host.width !== width || host.height !== height) {
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
      }
      host.width = width;
      host.height = height;
      host.dpr = dpr;
      return true;
    },
    placeTooltip(tip, x, y, prefer = "right") {
      const tw = tip.offsetWidth;
      const th = tip.offsetHeight;
      const gap = 14;
      let left = prefer === "right" ? x + gap : x - gap - tw;
      if (left + tw > host.width - 4) left = x - gap - tw;
      if (left < 4) left = Math.min(x + gap, host.width - tw - 4);
      const top = Math.max(4, Math.min(y - th / 2, host.height - th - 4));
      tip.style.transform = `translate(${Math.round(Math.max(4, left))}px, ${Math.round(top)}px)`;
    },
    createTooltip,
    describe(text) {
      if (text === summaryText) return;
      const now = Date.now();
      if (now - summaryAt < 1000 && summaryText) return;
      summaryAt = now;
      summaryText = text;
      summary.textContent = text;
    },
    destroy() {
      destroyed = true;
      if (frameId && win) win.cancelAnimationFrame(frameId);
      if (timeoutId !== null) clearTimeout(timeoutId);
      resizeObserver?.disconnect();
      intersection?.disconnect();
      unwatchTheme();
      root.remove();
    },
  };

  const resizeObserver =
    typeof ResizeObserver === "function"
      ? new ResizeObserver(() => host.invalidate())
      : null;
  resizeObserver?.observe(root);

  // no frames while off screen: updates only touch the data, the next
  // visible frame draws the latest state
  const intersection =
    win && typeof win.IntersectionObserver === "function"
      ? new win.IntersectionObserver((entries) => {
          const entry = entries[entries.length - 1];
          if (!entry) return;
          visible = entry.isIntersecting;
          if (visible && pending) schedule();
        })
      : null;
  intersection?.observe(root);

  const unwatchTheme = watchTheme(() => {
    if (destroyed) return;
    host.theme = readTheme(root);
    config.onTheme?.();
    host.invalidate();
  });

  return host;
};

/** Minimal typed event emitter */
export const createEmitter = <M extends object>() => {
  const handlers = new Map<keyof M, Set<(payload: never) => void>>();
  return {
    on<K extends keyof M>(event: K, handler: (payload: M[K]) => void) {
      let set = handlers.get(event);
      if (!set) handlers.set(event, (set = new Set()));
      set.add(handler as (payload: never) => void);
      return () => {
        set.delete(handler as (payload: never) => void);
      };
    },
    emit<K extends keyof M>(event: K, payload: M[K]) {
      const set = handlers.get(event);
      if (!set) return;
      for (const handler of set) (handler as (p: M[K]) => void)(payload);
    },
    has(event: keyof M) {
      return (handlers.get(event)?.size ?? 0) > 0;
    },
    clear() {
      handlers.clear();
    },
  };
};

/** Pointer position relative to an element */
export const localPoint = (
  element: HTMLElement,
  event: { clientX: number; clientY: number },
): [number, number] => {
  const rect = element.getBoundingClientRect();
  return [event.clientX - rect.left, event.clientY - rect.top];
};

/**
 * Rows of a tooltip: label / value pairs, an optional title (colored text,
 * and a badge: a colored dot and a short text at its right)
 */
export const tooltipHtml = (
  doc: Document,
  tip: HTMLElement,
  title: {
    text: string;
    color?: string;
    badge?: { text: string; color: string };
  } | null,
  rows: readonly (readonly [string, string])[],
) => {
  // the content only changes when the hovered values do
  const badge = title?.badge;
  const key = `${title?.text ?? ""}|${title?.color ?? ""}|${badge ? `${badge.text}:${badge.color}` : ""}|${rows.map((r) => r.join("=")).join("|")}`;
  if (tip.dataset.key === key) return;
  tip.dataset.key = key;
  tip.textContent = "";
  if (title) {
    const head = styleElement(doc.createElement("div"), {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "12px",
      fontWeight: "600",
      marginBottom: "2px",
      color: title.color ?? "inherit",
    });
    const text = doc.createElement("span");
    text.textContent = title.text;
    head.appendChild(text);
    if (badge) {
      const tag = styleElement(doc.createElement("span"), {
        display: "inline-flex",
        alignItems: "center",
        gap: "5px",
        fontWeight: "500",
        color: badge.color,
      });
      tag.className = "minerva-orderbook-tooltip-badge";
      const dot = styleElement(doc.createElement("span"), {
        width: "7px",
        height: "7px",
        borderRadius: "50%",
        background: badge.color,
        flex: "none",
      });
      tag.append(dot, doc.createTextNode(badge.text));
      head.appendChild(tag);
    }
    tip.appendChild(head);
  }
  for (const [label, value] of rows) {
    const row = styleElement(doc.createElement("div"), {
      display: "flex",
      justifyContent: "space-between",
      gap: "16px",
    });
    const l = styleElement(doc.createElement("span"), {
      color: "var(--text-secondary-color, #6b7280)",
    });
    l.textContent = label;
    const v = styleElement(doc.createElement("span"), { fontWeight: "500" });
    v.textContent = value;
    row.append(l, v);
    tip.appendChild(row);
  }
};
