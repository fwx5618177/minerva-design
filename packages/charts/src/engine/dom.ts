// DOM of a chart: legend, stage with the canvas layers, hover markers,
// tooltip and a live region. Styled inline with the Minerva CSS variables
// (and fallbacks), so the engine needs no stylesheet.

export interface ChartDom {
  root: HTMLDivElement;
  legend: HTMLDivElement;
  stage: HTMLDivElement;
  background: HTMLCanvasElement;
  /** Hover band of bars, drawn below the data */
  underlay: HTMLDivElement;
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

  const crosshair = assign(doc.createElement("div"), {
    position: "absolute",
    width: "0",
    borderLeft:
      "1px dashed color-mix(in srgb, var(--text-secondary-color, #6b7280) 45%, transparent)",
    display: "none",
  }) as HTMLDivElement;
  hover.appendChild(crosshair);

  const tooltip = assign(doc.createElement("div"), {
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
    transition: "transform 80ms ease-out",
  }) as HTMLDivElement;
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

  stage.append(background, underlay, foreground, hover, tooltip, live);
  root.append(legend, stage);
  container.appendChild(root);
  return {
    root,
    legend,
    stage,
    background,
    underlay,
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

/** Marker of a hovered point: a dot with a thin ring in the background color and a soft halo */
export const createMarker = (doc: Document) =>
  assign(doc.createElement("div"), {
    position: "absolute",
    boxSizing: "border-box",
    borderRadius: "50%",
    border: "2px solid var(--surface-color, var(--background-color, #fff))",
    transform: "translate(-50%, -50%)",
    transition: "box-shadow 120ms ease-out",
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

export { assign as styleElement };
