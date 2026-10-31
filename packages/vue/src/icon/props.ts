// Props shared by Icon, DynamicIcon and the named icon components.
import type { PropType } from "vue";
import type { IconRendererPreference } from "minerva-design/icons/core";

/** How an `Icon` is drawn: inline SVG, or a canvas backend */
export type IconRenderer = "svg" | IconRendererPreference;

export const iconStyleProps = {
  /** Width and height (a number is in pixels; canvas renderers also follow CSS sizes such as `"1em"`) */
  size: { type: [Number, String] as PropType<number | string>, default: 24 },
  /** Stroke color, any CSS color */
  color: { type: String, default: "currentColor" },
  /** Stroke width on the 24×24 grid (scales with the size) */
  strokeWidth: { type: Number, default: 2 },
  /** Keeps `strokeWidth` in pixels whatever the size */
  absoluteStrokeWidth: { type: Boolean, default: false },
  /** Accessible name: the icon becomes `role="img"`; without it (or an `aria-label`) the icon is hidden from assistive technologies */
  title: String,
  /**
   * Inline SVG (default), or a `<canvas>` drawn by a backend shared by every
   * canvas icon of the page: `auto` (the global default, see
   * `setDefaultIconRenderer`), `webgpu`, `webgl2`, `webgl` or `canvas2d`
   */
  renderer: { type: String as PropType<IconRenderer>, default: "svg" },
} as const;

export const cssSize = (size: number | string) =>
  typeof size === "number" ? `${size}px` : size;
