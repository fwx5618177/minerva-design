// DOM of a graph chart: legend, focusable stage with the data canvas (added
// by the renderer) and the label canvas, zoom buttons, wheel hint,
// tooltip, a visually hidden summary and a live region. Styled inline with
// the Minerva CSS variables.

export interface GraphDom {
  root: HTMLDivElement;
  legend: HTMLDivElement;
  stage: HTMLDivElement;
  /** Labels, badges, focus ring (above the data) */
  foreground: HTMLCanvasElement;
  controls: HTMLDivElement;
  zoomIn: HTMLButtonElement;
  zoomOut: HTMLButtonElement;
  fit: HTMLButtonElement;
  hint: HTMLDivElement;
  tooltip: HTMLDivElement;
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

const ICONS = {
  zoomIn: '<path d="M8 3.5v9M3.5 8h9"/>',
  zoomOut: '<path d="M3.5 8h9"/>',
  fit: '<path d="M2.5 6V2.5H6M10 2.5h3.5V6M13.5 10v3.5H10M6 13.5H2.5V10"/>',
};

const controlButton = (doc: Document, icon: keyof typeof ICONS) => {
  const button = style(doc.createElement("button"), {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "28px",
    height: "28px",
    padding: "0",
    margin: "0",
    border: "0",
    borderRadius: "6px",
    background: "transparent",
    color: "var(--text-secondary-color, #6b7280)",
    cursor: "pointer",
  });
  button.type = "button";
  button.innerHTML = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[icon]}</svg>`;
  return button;
};

export const createGraphDom = (container: HTMLElement): GraphDom => {
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
  root.className = "minerva-chart minerva-chart-graph";

  const legend = style(doc.createElement("div"), {
    display: "none",
    flexWrap: "wrap",
    alignItems: "center",
    gap: "4px 12px",
    padding: "0 4px 8px",
    fontSize: "12px",
    lineHeight: "18px",
  });
  legend.className = "minerva-chart-legend";

  const stage = style(doc.createElement("div"), {
    position: "relative",
    flex: "1 1 auto",
    minHeight: "0",
    overflow: "hidden",
    outline: "none",
    touchAction: "none",
    userSelect: "none",
    borderRadius: "6px",
    cursor: "grab",
  });
  stage.className = "minerva-chart-stage";
  stage.setAttribute("role", "figure");

  const foreground = layerCanvas(doc);
  foreground.className = "minerva-chart-labels";

  const controls = style(doc.createElement("div"), {
    position: "absolute",
    right: "8px",
    bottom: "8px",
    zIndex: "1",
    display: "flex",
    flexDirection: "column",
    gap: "2px",
    padding: "2px",
    borderRadius: "8px",
    border:
      "1px solid color-mix(in srgb, var(--border-color, #e5e7eb) 80%, transparent)",
    background:
      "color-mix(in srgb, var(--surface-elevated-color, var(--background-color, #fff)) 92%, transparent)",
    boxShadow: "0 2px 8px -2px rgba(15, 23, 42, 0.12)",
  });
  controls.className = "minerva-chart-controls";
  const zoomIn = controlButton(doc, "zoomIn");
  const zoomOut = controlButton(doc, "zoomOut");
  const fit = controlButton(doc, "fit");
  controls.append(zoomIn, zoomOut, fit);

  const hint = style(doc.createElement("div"), {
    position: "absolute",
    inset: "0",
    zIndex: "2",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    pointerEvents: "none",
    opacity: "0",
    transition: "opacity 160ms ease-out",
    background:
      "color-mix(in srgb, var(--text-color, #1f2937) 32%, transparent)",
    color: "#fff",
    fontSize: "14px",
    fontWeight: "500",
  });
  hint.className = "minerva-chart-hint";
  hint.setAttribute("aria-hidden", "true");

  const tooltip = style(doc.createElement("div"), {
    position: "absolute",
    left: "0",
    top: "0",
    zIndex: "3",
    display: "none",
    pointerEvents: "none",
    minWidth: "120px",
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
  summary.id = `minerva-chart-graph-summary-${++nextId}`;
  stage.setAttribute("aria-describedby", summary.id);

  const live = style(doc.createElement("div"), VISUALLY_HIDDEN);
  live.setAttribute("aria-live", "polite");

  stage.append(foreground, controls, hint, tooltip, summary, live);
  root.append(legend, stage);
  container.appendChild(root);
  return {
    root,
    legend,
    stage,
    foreground,
    controls,
    zoomIn,
    zoomOut,
    fit,
    hint,
    tooltip,
    summary,
    live,
  };
};

/** Color dot of the legend and the tooltip */
export const swatch = (doc: Document, color: string) =>
  style(doc.createElement("span"), {
    display: "inline-block",
    flex: "none",
    width: "9px",
    height: "9px",
    borderRadius: "50%",
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
