// Props of the React bindings (minerva-design/icons).

import type { HTMLAttributes, Ref, SVGProps } from "react";
import type {
  IconCanvasItem,
  IconDefinition,
  IconRendererKind,
  IconRendererPreference,
} from "../engine/types";

/** How an `Icon` is drawn: inline SVG, or a canvas backend */
export type IconRenderer = "svg" | IconRendererPreference;

export interface IconProps extends Omit<
  SVGProps<SVGSVGElement>,
  "ref" | "color" | "stroke" | "strokeWidth" | "children" | "name"
> {
  /** The icon to draw: a built-in one (e.g. `searchIcon`) or a `defineIcon` result */
  icon: IconDefinition;
  /** Width and height (a number is in pixels; canvas renderers also follow CSS sizes such as `"1em"`) @default 24 */
  size?: number | string;
  /** Stroke color, any CSS color @default "currentColor" */
  color?: string;
  /** Stroke width on the 24×24 grid (scales with the size) @default 2 */
  strokeWidth?: number;
  /** Keeps `strokeWidth` in pixels whatever the size @default false */
  absoluteStrokeWidth?: boolean;
  /** Accessible name: the icon becomes `role="img"`; without it (or an `aria-label`) the icon is hidden from assistive technologies */
  title?: string;
  /**
   * Inline SVG (default), or a `<canvas>` drawn by a backend shared by every
   * canvas icon of the page: "auto" (the global default, see
   * `setDefaultIconRenderer`), "webgpu", "webgl2", "webgl" or "canvas2d"
   * @default "svg"
   */
  renderer?: IconRenderer;
  /** Canvas renderers: called with the backend that drew the icon */
  onRendererChange?: (kind: IconRendererKind) => void;
  /** The `<svg>` element, or the `<canvas>` with a canvas renderer */
  ref?: Ref<SVGSVGElement | HTMLCanvasElement>;
}

/** Props of the named icon components (`SearchIcon`, …): `IconProps` without `icon` */
export type NamedIconProps = Omit<IconProps, "icon">;

export interface DynamicIconProps extends NamedIconProps {
  /** Name of a built-in icon (e.g. `"arrow-up"`); unknown names render nothing */
  name: string;
}

/** Imperative handle of `IconCanvas` */
export interface IconCanvasHandle {
  /** The backend drawing (null until it started) */
  getRenderer(): IconRendererKind | null;
  /** The `<canvas>` element (null before mount) */
  getCanvas(): HTMLCanvasElement | null;
  /** Resolves once the backend started and the current items are drawn */
  ready(): Promise<IconRendererKind>;
}

export interface IconCanvasProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "children" | "title"
> {
  /** Icons to draw, in painting order (later ones on top), positions in CSS pixels */
  items: readonly IconCanvasItem[];
  /** Backend preference; "auto" follows the global default @default "auto" */
  renderer?: IconRendererPreference;
  /** Width (a number is in pixels) @default "100%" */
  width?: number | string;
  /** Height (a number is in pixels) @default 240 */
  height?: number | string;
  /** Device pixel ratio @default window.devicePixelRatio */
  pixelRatio?: number;
  /** Accessible name of the whole picture (`role="img"`); without it the canvas is hidden from assistive technologies */
  title?: string;
  /** Called with the backend once it started, and again after a fallback */
  onRendererChange?: (kind: IconRendererKind) => void;
  /** Imperative handle */
  ref?: Ref<IconCanvasHandle>;
}
