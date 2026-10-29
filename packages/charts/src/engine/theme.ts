// Chart colors and fonts read from the Minerva CSS variables.

import { mix, resolveColor, type Rgba } from "./color";

export interface ChartTheme {
  palette: Rgba[];
  text: Rgba;
  textMuted: Rgba;
  grid: Rgba;
  axis: Rgba;
  background: Rgba;
  surface: Rgba;
  primary: Rgba;
  fontFamily: string;
  /** Tick label font size in CSS pixels */
  fontSize: number;
}

/** Used when no CSS variable is defined (e.g. without the Minerva stylesheet) */
const DEFAULT_PALETTE = [
  "#4f46e5",
  "#10b981",
  "#f59e0b",
  "#ef4444",
  "#0ea5e9",
  "#8b5cf6",
  "#14b8a6",
  "#f97316",
];

const readVar = (style: CSSStyleDeclaration | null, name: string) =>
  style?.getPropertyValue(name).trim() ?? "";

/** Reads the theme from the computed style of `element` */
export const readTheme = (
  element: Element | null,
  palette?: readonly string[],
): ChartTheme => {
  const style =
    element && typeof getComputedStyle === "function"
      ? getComputedStyle(element)
      : null;
  const color = (names: string[], fallback: string): Rgba => {
    for (const name of names) {
      if (readVar(style, name)) return resolveColor(`var(${name})`, element);
    }
    return resolveColor(fallback, element);
  };

  const background = color(
    ["--surface-color", "--background-color"],
    "#ffffff",
  );
  const text = color(["--text-color"], "#1f2937");
  const textMuted = color(
    ["--text-secondary-color", "--text-muted-color"],
    "#6b7280",
  );
  const border = color(["--border-color"], "#e5e7eb");

  let colors: Rgba[];
  if (palette && palette.length) {
    colors = palette.map((c) => resolveColor(c, element));
  } else {
    const custom: Rgba[] = [];
    for (let i = 1; i <= 8; i++) {
      const name = `--chart-series-${i}`;
      if (readVar(style, name))
        custom.push(resolveColor(`var(${name})`, element));
    }
    if (custom.length) {
      colors = custom;
    } else {
      const themed = [
        "--primary-color",
        "--success-color",
        "--warning-color",
        "--danger-color",
        "--info-color",
      ].map((name, i) =>
        readVar(style, name)
          ? resolveColor(`var(${name})`, element)
          : resolveColor(DEFAULT_PALETTE[i], element),
      );
      colors = [
        ...themed,
        ...DEFAULT_PALETTE.slice(5).map((c) => resolveColor(c, element)),
      ];
    }
  }

  const fontFamily =
    readVar(style, "--font-family-sans") ||
    (style?.fontFamily ?? "") ||
    "system-ui, -apple-system, 'Segoe UI', sans-serif";

  return {
    palette: colors,
    text,
    textMuted,
    grid: mix(background, border, 0.75),
    axis: border,
    background,
    surface: background,
    primary: colors[0],
    fontFamily,
    fontSize: 11,
  };
};

/**
 * Calls `onChange` when the theme may have changed: attributes of `<html>` /
 * `<body>` (class, style, data-theme) and the color scheme.
 */
export const watchTheme = (onChange: () => void): (() => void) => {
  if (typeof document === "undefined") return () => {};
  const cleanups: (() => void)[] = [];
  if (typeof MutationObserver === "function") {
    const observer = new MutationObserver(onChange);
    for (const node of [document.documentElement, document.body]) {
      if (node) {
        observer.observe(node, {
          attributes: true,
          attributeFilter: ["class", "style", "data-theme", "data-mode"],
        });
      }
    }
    cleanups.push(() => observer.disconnect());
  }
  if (typeof matchMedia === "function") {
    const query = matchMedia("(prefers-color-scheme: dark)");
    query.addEventListener?.("change", onChange);
    cleanups.push(() => query.removeEventListener?.("change", onChange));
  }
  return () => cleanups.forEach((fn) => fn());
};
