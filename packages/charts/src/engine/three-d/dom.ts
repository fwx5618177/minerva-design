// DOM of a 3D chart: legend, focusable stage with the canvas layers (back
// walls, data, labels / hover), tooltip, a visually hidden data summary and
// a live region. Styled inline with the Minerva CSS variables.

export interface Chart3DDom {
  root: HTMLDivElement;
  legend: HTMLDivElement;
  stage: HTMLDivElement;
  /** Walls, grid lines (below the data) */
  background: HTMLCanvasElement;
  /** Tick labels, titles, color bar, hover highlight (above the data) */
  foreground: HTMLCanvasElement;
  tooltip: HTMLDivElement;
  /** Visually hidden description of the data (`aria-describedby` of the stage) */
  summary: HTMLDivElement;
  live: HTMLDivElement;
}

export const style = <T extends HTMLElement>(
  el: T,
  css: Partial<CSSStyleDeclaration>,
): T => {
  Object.assign(el.style, css);
  return el;
};

const VISUALLY_HIDDEN: Partial<CSSStyleDeclaration> = {
  position: "absolute",
  width: "1px",
  height: "1px",
  overflow: "hidden",
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  whiteSpace: "nowrap",
};

let nextId = 0;

/** Canvas layer covering the stage */
export const layerCanvas = (doc: Document): HTMLCanvasElement => {
  const canvas = style(doc.createElement("canvas"), {
    position: "absolute",
    left: "0",
    top: "0",
    pointerEvents: "none",
  });
  canvas.setAttribute("aria-hidden", "true");
  return canvas;
};

export const createChart3DDom = (container: HTMLElement): Chart3DDom => {
  const doc = container.ownerDocument;
  const root = style(doc.createElement("div"), {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100%",
    minHeight: "0",
    fontFamily: "var(--font-family-sans, system-ui, sans-serif)",
    color: "var(--text-color, #1f2937)",
  });
  root.className = "minerva-chart minerva-chart-3d";

  const legend = style(doc.createElement("div"), {
    display: "none",
    flexWrap: "wrap",
    alignItems: "center",
    gap: "4px 14px",
    padding: "0 4px 8px",
    fontSize: "12px",
    lineHeight: "18px",
  });
  legend.className = "minerva-chart-legend";

  const stage = style(doc.createElement("div"), {
    position: "relative",
    flex: "1 1 auto",
    minHeight: "0",
    outline: "none",
    touchAction: "none",
    userSelect: "none",
    borderRadius: "6px",
    cursor: "grab",
  });
  stage.className = "minerva-chart-stage";
  stage.setAttribute("role", "figure");
  stage.setAttribute("aria-roledescription", "3D chart");

  const background = layerCanvas(doc);
  const foreground = layerCanvas(doc);

  const tooltip = style(doc.createElement("div"), {
    position: "absolute",
    left: "0",
    top: "0",
    zIndex: "2",
    display: "none",
    pointerEvents: "none",
    minWidth: "128px",
    maxWidth: "320px",
    padding: "8px 12px",
    borderRadius: "10px",
    border:
      "1px solid color-mix(in srgb, var(--border-color, #e5e7eb) 60%, transparent)",
    background: "var(--surface-elevated-color, var(--background-color, #fff))",
    color: "var(--text-color, #1f2937)",
    boxShadow:
      "0 12px 32px -8px rgba(15, 23, 42, 0.16), 0 4px 10px -4px rgba(15, 23, 42, 0.08)",
    fontSize: "12px",
    lineHeight: "20px",
    whiteSpace: "nowrap",
  });
  tooltip.className = "minerva-chart-tooltip";
  tooltip.setAttribute("role", "tooltip");

  const summary = style(doc.createElement("div"), VISUALLY_HIDDEN);
  summary.id = `minerva-chart-3d-summary-${++nextId}`;
  stage.setAttribute("aria-describedby", summary.id);

  const live = style(doc.createElement("div"), VISUALLY_HIDDEN);
  live.setAttribute("aria-live", "polite");

  stage.append(background, foreground, tooltip, summary, live);
  root.append(legend, stage);
  container.appendChild(root);
  return {
    root,
    legend,
    stage,
    background,
    foreground,
    tooltip,
    summary,
    live,
  };
};

/** Color square / dot of the legend and the tooltip */
export const swatch = (doc: Document, color: string, round: boolean) =>
  style(doc.createElement("span"), {
    display: "inline-block",
    flex: "none",
    width: "9px",
    height: "9px",
    borderRadius: round ? "50%" : "2px",
    background: color,
  });

/** Sizes a canvas to the stage (CSS pixels × device pixel ratio) */
export const sizeCanvas = (
  canvas: HTMLCanvasElement,
  width: number,
  height: number,
  dpr: number,
): void => {
  const w = Math.max(1, Math.round(width * dpr));
  const h = Math.max(1, Math.round(height * dpr));
  if (canvas.width !== w) canvas.width = w;
  if (canvas.height !== h) canvas.height = h;
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
};
