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
  const body = icon.paths
    .map((d, i) => {
      const stroke = icon.colors?.[i];
      return `<path d="${escape(d)}"${stroke ? ` stroke="${escape(stroke)}"` : ""}/>`;
    })
    .join("");
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

const BASE64 =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

/**
 * UTF-8 bytes of a string as base64. Written out because the runtimes that
 * need base64 data URIs (mini programs) have neither `btoa` nor `TextEncoder`.
 */
export function utf8ToBase64(text: string): string {
  const bytes: number[] = [];
  for (const char of text) {
    const code = char.codePointAt(0)!;
    if (code < 0x80) bytes.push(code);
    else if (code < 0x800) bytes.push(0xc0 | (code >> 6), 0x80 | (code & 63));
    else if (code < 0x10000)
      bytes.push(
        0xe0 | (code >> 12),
        0x80 | ((code >> 6) & 63),
        0x80 | (code & 63),
      );
    else
      bytes.push(
        0xf0 | (code >> 18),
        0x80 | ((code >> 12) & 63),
        0x80 | ((code >> 6) & 63),
        0x80 | (code & 63),
      );
  }
  let out = "";
  for (let i = 0; i < bytes.length; i += 3) {
    const [a, b, c] = [bytes[i]!, bytes[i + 1], bytes[i + 2]];
    const chunk = (a << 16) | ((b ?? 0) << 8) | (c ?? 0);
    out +=
      BASE64[chunk >> 18]! +
      BASE64[(chunk >> 12) & 63]! +
      (b === undefined ? "=" : BASE64[(chunk >> 6) & 63]!) +
      (c === undefined ? "=" : BASE64[chunk & 63]!);
  }
  return out;
}

/**
 * An icon as a base64 `data:image/svg+xml;base64,` URI: for image hosts that
 * reject percent-encoded SVG, such as the `<image>` of WeChat mini programs
 */
export const toSvgBase64DataUri = (
  icon: IconDefinition,
  options: IconSvgOptions = {},
): string =>
  `data:image/svg+xml;base64,${utf8ToBase64(
    toSvg(icon, { ...options, color: options.color ?? "#000" }),
  )}`;
