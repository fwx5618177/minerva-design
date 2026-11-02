// DOM of a chart: legend, stage with the canvas layers, hover markers,
// tooltip and a live region. Styled inline with the Minerva CSS variables
// (and fallbacks), so the engine needs no stylesheet.

import { prefersReducedMotion, styleTooltip, themeTooltip } from "./tooltip";

export interface ChartDom {
  root: HTMLDivElement;
  legend: HTMLDivElement;
  stage: HTMLDivElement;
  background: HTMLCanvasElement;
  /** Hover band of bars, drawn below the data */
  underlay: HTMLDivElement;
  /**
   * Lifted hover marks (bars, heatmap cells): above the data canvas, below
   * the foreground canvas so the value labels stay readable
   */
  lift: HTMLDivElement;
  foreground: HTMLCanvasElement;
  hover: HTMLDivElement;
  crosshair: HTMLDivElement;
  tooltip: HTMLDivElement;
  live: HTMLDivElement;
}

const assign = (el: HTMLElement, style: Partial<CSSStyleDeclaration>) => {
  Object.assign(el.style, style);
  return el;
};

const layer = (doc: Document, tag: "canvas" | "div") =>
  assign(doc.createElement(tag), {
    position: "absolute",
    left: "0",
    top: "0",
    pointerEvents: "none",
  });

export const createChartDom = (container: HTMLElement): ChartDom => {
  const doc = container.ownerDocument;
  const root = assign(doc.createElement("div"), {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100%",
    minHeight: "0",
    fontFamily: "var(--font-family-sans, system-ui, sans-serif)",
    color: "var(--text-color, #1f2937)",
  }) as HTMLDivElement;
  root.className = "minerva-chart";

  const legend = assign(doc.createElement("div"), {
    display: "none",
    flexWrap: "wrap",
    alignItems: "center",
    gap: "4px 14px",
    padding: "0 4px 8px",
    fontSize: "12px",
    lineHeight: "18px",
  }) as HTMLDivElement;
  legend.className = "minerva-chart-legend";

  const stage = assign(doc.createElement("div"), {
    position: "relative",
    flex: "1 1 auto",
    minHeight: "0",
    outline: "none",
    touchAction: "pan-y",
    userSelect: "none",
    borderRadius: "6px",
  }) as HTMLDivElement;
  stage.className = "minerva-chart-stage";
  stage.setAttribute("role", "figure");
  stage.setAttribute("aria-roledescription", "chart");

  const background = layer(doc, "canvas") as HTMLCanvasElement;
  const foreground = layer(doc, "canvas") as HTMLCanvasElement;
  background.setAttribute("aria-hidden", "true");
  foreground.setAttribute("aria-hidden", "true");

  const hover = assign(layer(doc, "div"), {
    right: "0",
    bottom: "0",
    overflow: "hidden",
  }) as HTMLDivElement;
  hover.setAttribute("aria-hidden", "true");

  const underlay = assign(layer(doc, "div"), {
    right: "0",
    bottom: "0",
  }) as HTMLDivElement;
  underlay.setAttribute("aria-hidden", "true");

  // its own stacking context: the z-index of the lifted marks stays inside
  const lift = assign(layer(doc, "div"), {
    right: "0",
    bottom: "0",
    overflow: "hidden",
    isolation: "isolate",
  }) as HTMLDivElement;
  lift.setAttribute("aria-hidden", "true");

  const crosshair = assign(doc.createElement("div"), {
    position: "absolute",
    width: "0",
    borderLeft:
      "1px dashed color-mix(in srgb, var(--text-secondary-color, #6b7280) 45%, transparent)",
    display: "none",
  }) as HTMLDivElement;
  hover.appendChild(crosshair);

  const tooltip = styleTooltip(doc.createElement("div"), {
    zIndex: "2",
    display: "none",
    minWidth: "128px",
    maxWidth: "320px",
    padding: "8px 12px",
    borderRadius: "10px",
    fontSize: "12px",
    lineHeight: "20px",
    whiteSpace: "nowrap",
  });
  tooltip.className = "minerva-chart-tooltip";
  tooltip.setAttribute("role", "tooltip");

  const live = assign(doc.createElement("div"), {
    position: "absolute",
    width: "1px",
    height: "1px",
    overflow: "hidden",
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    whiteSpace: "nowrap",
  }) as HTMLDivElement;
  live.setAttribute("aria-live", "polite");

  stage.append(background, underlay, lift, foreground, hover, tooltip, live);
  root.append(legend, stage);
  container.appendChild(root);
  // translucent in the colors of the page until the host applies its theme
  themeTooltip(tooltip, stage);
  return {
    root,
    legend,
    stage,
    background,
    underlay,
    lift,
    foreground,
    hover,
    crosshair,
    tooltip,
    live,
  };
};

/** Canvas of the data layer, placed over the plot area */
export const createDataCanvas = (doc: Document): HTMLCanvasElement => {
  const canvas = layer(doc, "canvas") as HTMLCanvasElement;
  canvas.setAttribute("aria-hidden", "true");
  canvas.className = "minerva-chart-data";
  return canvas;
};

export const swatch = (
  doc: Document,
  color: string,
  shape: "dot" | "square" | "line",
) => {
  const el = doc.createElement("span");
  assign(el, {
    display: "inline-block",
    flex: "none",
    width: shape === "line" ? "14px" : "9px",
    height: shape === "line" ? "3px" : "9px",
    borderRadius: shape === "dot" ? "50%" : shape === "line" ? "2px" : "2px",
    background: color,
  });
  return el;
};

/** Marker of a hovered point: a dot with a ring in the background color, a tinted halo and a soft glow */
export const createMarker = (doc: Document) =>
  assign(doc.createElement("div"), {
    position: "absolute",
    boxSizing: "border-box",
    borderRadius: "50%",
    border: "2px solid var(--surface-color, var(--background-color, #fff))",
    transform: "translate(-50%, -50%)",
    transition: "box-shadow 120ms ease-out",
  }) as HTMLDivElement;

/** Halo of a hovered point: its tinted ring, a wider soft glow and a light shadow */
export const markerHalo = (halo: string) =>
  `0 0 0 4px ${halo}, 0 0 0 8px color-mix(in srgb, ${halo} 45%, transparent), 0 2px 6px rgba(15, 23, 42, 0.18)`;

/** The dot of a dragged point: lifted above the plot, ringed, with a shadow */
export const createDragDot = (doc: Document) =>
  assign(doc.createElement("div"), {
    position: "absolute",
    boxSizing: "border-box",
    borderRadius: "50%",
    border: "2px solid var(--surface-color, var(--background-color, #fff))",
    transform: "translate(-50%, -50%)",
    pointerEvents: "none",
    zIndex: "2",
    display: "none",
  }) as HTMLDivElement;

/** Shadows of a dragged dot in `color` */
export const dragDotShadow = (color: string) =>
  `0 0 0 5px color-mix(in srgb, ${color} 24%, transparent), 0 10px 22px -6px rgba(15, 23, 42, 0.5), 0 3px 8px rgba(15, 23, 42, 0.22)`;

/** Label of a dragged point (or of a hovered one): a pill above the plot */
export const createLabelPill = (doc: Document) =>
  assign(doc.createElement("div"), {
    position: "absolute",
    boxSizing: "border-box",
    maxWidth: "220px",
    padding: "2px 9px",
    borderRadius: "999px",
    border: "1px solid var(--border-color, rgba(148, 163, 184, 0.45))",
    background:
      "var(--surface-elevated-color, var(--surface-color, var(--background-color, #fff)))",
    color: "var(--text-color, #1f2937)",
    font: "600 12px/18px var(--font-family-sans, system-ui, sans-serif)",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    boxShadow: "0 6px 16px -6px rgba(15, 23, 42, 0.35)",
    pointerEvents: "none",
    zIndex: "2",
    display: "none",
  }) as HTMLDivElement;

/** Where a dragged point was: a dashed ring fading the dot drawn there */
export const createDragPlaceholder = (doc: Document) =>
  assign(doc.createElement("div"), {
    position: "absolute",
    boxSizing: "border-box",
    borderRadius: "50%",
    borderWidth: "1.5px",
    borderStyle: "dashed",
    transform: "translate(-50%, -50%)",
    pointerEvents: "none",
    display: "none",
  }) as HTMLDivElement;

/** The area a dragged point would land in, below the data */
export const createDropTarget = (doc: Document) =>
  assign(doc.createElement("div"), {
    position: "absolute",
    boxSizing: "border-box",
    borderRadius: "4px",
    pointerEvents: "none",
    display: "none",
  }) as HTMLDivElement;

/** Band behind the hovered bars (or outline of a heatmap cell) */
export const createBand = (doc: Document) =>
  assign(doc.createElement("div"), {
    position: "absolute",
    boxSizing: "border-box",
    borderRadius: "6px",
    background:
      "color-mix(in srgb, var(--text-color, #1f2937) 6%, transparent)",
  }) as HTMLDivElement;

/** Background of the plot (the backdrop of lifted translucent bars) */
export const PLOT_BACKGROUND =
  "var(--surface-color, var(--background-color, #fff))";

/** Shadow of a lifted bar / cell, below its halo */
export const LIFT_SHADOW = "0 8px 18px -6px rgba(15, 23, 42, 0.55)";

/** Scale of a hovered heatmap cell */
export const CELL_LIFT = 1.16;

/** Thin line in the primary color around the halo of a hovered cell */
export const CELL_ACCENT = {
  color: "color-mix(in srgb, var(--primary-color, #4f46e5) 60%, transparent)",
  width: 1.5,
};

/**
 * Box shadows of a lifted mark: a ring inside its edge, a halo of the plot
 * background (and an optional accent line) around it, the lift shadow.
 * `off` gives the same list collapsed (the start of the transition).
 */
export const liftShadow = (
  ring: { color: string; width: number } | null,
  halo: number,
  accent: { color: string; width: number } | null,
  off = false,
): string => {
  const k = off ? 0 : 1;
  const parts: string[] = [];
  if (ring) parts.push(`inset 0 0 0 ${ring.width * k}px ${ring.color}`);
  parts.push(`0 0 0 ${halo * k}px ${PLOT_BACKGROUND}`);
  if (accent)
    parts.push(`0 0 0 ${(halo + accent.width) * k}px ${accent.color}`);
  parts.push(off ? "0 0 0 0 rgba(15, 23, 42, 0)" : LIFT_SHADOW);
  return parts.join(", ");
};

/**
 * Plays the entry of a lifted mark (from its resting size, without its
 * rings) unless the user prefers reduced motion; the final style is set
 * on the element, so hosts without the Web Animations API show it at once
 */
export const playLift = (
  el: HTMLElement,
  from: Keyframe,
  to: Keyframe,
  win: Window | null,
) => {
  if (typeof el.animate !== "function" || prefersReducedMotion(win)) return;
  el.animate([from, to], {
    duration: 160,
    easing: "cubic-bezier(0.2, 0, 0, 1)",
  });
};

export { assign as styleElement };
