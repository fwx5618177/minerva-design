// SVG output: the reference rendering of every icon (the canvas backends
// draw the same strokes).

import type { IconDefinition, IconSvgOptions } from "./types";

/** Presentation attributes shared by every renderer of an SVG icon */
export const SVG_STROKE_ATTRIBUTES = {
  fill: "none",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
} as const;

const escape = (value: string | number) =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const ATTRIBUTE_NAME = /^[a-zA-Z_:][-a-zA-Z0-9_:.]*$/;

/** The path data of an icon as one `d` (subpaths concatenated) */
export const iconPathData = (icon: IconDefinition): string =>
  icon.paths.join(" ");

/** An icon as a standalone `<svg>` string (for HTML, data URIs, files) */
export function toSvg(
  icon: IconDefinition,
  options: IconSvgOptions = {},
): string {
  const {
    size = 24,
    color = "currentColor",
    strokeWidth = 2,
    title,
    className,
    attributes = {},
  } = options;
  const attrs: Record<string, string | number> = {
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    ...SVG_STROKE_ATTRIBUTES,
    stroke: color,
    "stroke-width": strokeWidth,
  };
  if (className) attrs.class = className;
  if (title) attrs.role = "img";
  else attrs["aria-hidden"] = "true";
  for (const [name, value] of Object.entries(attributes)) {
    if (ATTRIBUTE_NAME.test(name)) attrs[name] = value;
  }
  const head = Object.entries(attrs)
    .map(([name, value]) => `${name}="${escape(value)}"`)
    .join(" ");
  const body = icon.paths.map((d) => `<path d="${escape(d)}"/>`).join("");
  const label = title ? `<title>${escape(title)}</title>` : "";
  return `<svg ${head}>${label}${body}</svg>`;
}

/** An icon as a `data:image/svg+xml` URI (CSS backgrounds, `<img>`, favicons) */
export const toSvgDataUri = (
  icon: IconDefinition,
  options: IconSvgOptions = {},
): string =>
  `data:image/svg+xml,${encodeURIComponent(
    toSvg(icon, {
      ...options,
      // an <img> has no currentColor: black unless a color is given
      color: options.color ?? "#000",
    }),
  )}`;
