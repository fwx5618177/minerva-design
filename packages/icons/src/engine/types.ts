// Public types of minerva-design/icons/core.

/**
 * An icon: SVG path data on a 24×24 grid, always stroked (never filled) with
 * round caps and joins. The built-in icons and `defineIcon` both produce it.
 */
export interface IconDefinition {
  /** Unique kebab-case name, e.g. `arrow-up` */
  readonly name: string;
  /** SVG path `d` strings (M L H V C S Q T A Z, absolute or relative) on the 24×24 grid */
  readonly paths: readonly string[];
  /** Group of the icon, e.g. `arrows` (built-in icons always have one) */
  readonly category?: string;
  /** Search words besides the name */
  readonly tags?: readonly string[];
}

/** Categories of the built-in icons */
export type IconCategory =
  | "arrows"
  | "actions"
  | "interface"
  | "media"
  | "files"
  | "communication"
  | "data"
  | "finance"
  | "status"
  | "devices";

/** A backend that draws icons on a canvas */
export type IconRendererKind = "webgpu" | "webgl2" | "webgl" | "canvas2d";

/**
 * Backend preference of a canvas: a backend (falling back along
 * WebGPU -> WebGL2 -> WebGL -> Canvas2D if it cannot start), or "auto"
 * (the global default, see `setDefaultIconRenderer`)
 */
export type IconRendererPreference = "auto" | IconRendererKind;

/** Shared drawing options (sizes in CSS pixels) */
export interface IconStyle {
  /** Width and height in CSS pixels @default 24 */
  size?: number;
  /** Any CSS color; `currentColor` reads the color of the host element @default "currentColor" */
  color?: string;
  /** Stroke width on the 24×24 grid (scales with the size) @default 2 */
  strokeWidth?: number;
  /** Clockwise rotation in degrees, around the center @default 0 */
  rotation?: number;
  /** Opacity between 0 and 1 @default 1 */
  opacity?: number;
}

/** Options of `toSvg` */
export interface IconSvgOptions {
  /** Width and height (a number is in pixels) @default 24 */
  size?: number | string;
  /** Stroke color @default "currentColor" */
  color?: string;
  /** Stroke width on the 24×24 grid @default 2 */
  strokeWidth?: number;
  /** Accessible name: adds `role="img"` and a `<title>`; without it the SVG is `aria-hidden` */
  title?: string;
  /** `class` attribute */
  className?: string;
  /** Extra attributes, escaped (e.g. `{ "data-icon": "x" }`) */
  attributes?: Record<string, string | number>;
}

/** Options of `drawIcon` (Canvas2D) */
export interface DrawIconOptions extends IconStyle {
  /** Left edge in the context's current units @default 0 */
  x?: number;
  /** Top edge in the context's current units @default 0 */
  y?: number;
}

/** One icon drawn by an icon canvas */
export interface IconCanvasItem extends IconStyle {
  /** The icon to draw */
  icon: IconDefinition;
  /** Left edge in CSS pixels, from the canvas' top-left corner */
  x: number;
  /** Top edge in CSS pixels, from the canvas' top-left corner */
  y: number;
}

/** Options of `createIconCanvas` */
export interface IconCanvasOptions {
  /** Icons to draw, in painting order (later ones on top) */
  items?: readonly IconCanvasItem[];
  /** Backend preference @default "auto" */
  renderer?: IconRendererPreference;
  /** Fixed width in CSS pixels; by default the container's width */
  width?: number;
  /** Fixed height in CSS pixels; by default the container's height */
  height?: number;
  /** Device pixel ratio @default window.devicePixelRatio */
  pixelRatio?: number;
  /** Called with the backend once it started, and again after a fallback */
  onRendererChange?: (kind: IconRendererKind) => void;
}

/** A canvas drawing many icons in one GPU draw (or Canvas2D) */
export interface IconCanvasController {
  /** The backend drawing (null until it started) */
  readonly renderer: IconRendererKind | null;
  /** The `<canvas>` element inside the container */
  readonly canvas: HTMLCanvasElement;
  /** Replaces the icons; drawn on the next animation frame */
  setItems(items: readonly IconCanvasItem[]): void;
  /** Updates options; a new `renderer` restarts the backend */
  setOptions(options: Omit<IconCanvasOptions, "items">): void;
  /** Draws now (instead of the next animation frame) */
  render(): void;
  /** Resolves once the backend started and the current items are drawn */
  ready(): Promise<IconRendererKind>;
  /** Removes the canvas and releases the GPU resources */
  destroy(): void;
}

/** Options of `createIconSurface` */
export interface IconSurfaceOptions extends Omit<IconStyle, "rotation"> {
  /** The icon to draw */
  icon: IconDefinition;
  /** Backend preference @default "auto" */
  renderer?: IconRendererPreference;
  /** Device pixel ratio @default window.devicePixelRatio */
  pixelRatio?: number;
  /** Called with the backend once it drew, and again after a fallback */
  onRendererChange?: (kind: IconRendererKind) => void;
}

/** A single icon on its own `<canvas>`, drawn by a backend shared by the page */
export interface IconSurface {
  /** The backend that drew it (null until the first frame) */
  readonly renderer: IconRendererKind | null;
  /** Replaces the options; redrawn on the next animation frame */
  update(options: IconSurfaceOptions): void;
  /** Stops drawing (the canvas is left in place) */
  destroy(): void;
}
