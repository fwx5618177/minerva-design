// Chart colors and fonts read from the Minerva CSS variables.

import {
  domColorResolver,
  memoizeColorResolver,
  mix,
  resolveStaticColor,
  sameColor,
  type ColorResolver,
  type MemoizedColorResolver,
  type Rgba,
} from "./color";

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
  /** Resolves the colors of the options (`var(--x)` included); static colors only when omitted */
  resolve?: ColorResolver;
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

/**
 * Reads the theme from the computed style of `element`. Its resolver caches
 * the colors (DOM probes are costly): read the theme again to see new values.
 */
export const readTheme = (
  element: Element | null,
  palette?: readonly string[],
): ChartTheme => {
  const style =
    element && typeof getComputedStyle === "function"
      ? getComputedStyle(element)
      : null;
  return buildTheme(
    (name) => readVar(style, name),
    memoizeColorResolver(domColorResolver(element)),
    palette,
    style?.fontFamily ?? "",
  );
};

const THEME_COLORS = [
  "text",
  "textMuted",
  "grid",
  "axis",
  "background",
  "surface",
  "primary",
] as const;

/**
 * Whether `next` (a re-read of `previous`) resolves any color differently:
 * the theme colors, the palette and every color `previous` has resolved so
 * far (series, points, annotations...). `true` when it cannot tell.
 */
export const themeColorsChanged = (
  previous: ChartTheme,
  next: ChartTheme,
): boolean => {
  if (previous === next) return false;
  if (previous.palette.length !== next.palette.length) return true;
  if (previous.palette.some((c, i) => !sameColor(c, next.palette[i])))
    return true;
  if (THEME_COLORS.some((key) => !sameColor(previous[key], next[key])))
    return true;
  const cache = (previous.resolve as Partial<MemoizedColorResolver> | undefined)
    ?.cache;
  if (!cache || !next.resolve) return true;
  const probe: Rgba = [NaN, NaN, NaN, NaN];
  for (const [value, color] of cache) {
    const resolved = next.resolve(value, probe);
    if (!sameColor(color, resolved === probe ? null : resolved)) return true;
  }
  return false;
};

/** Theme of the charts drawn without a DOM (mini-programs, React Native) */
export interface ChartThemeInput {
  /**
   * Values of the Minerva CSS variables (`--primary-color`, `--text-color`,
   * `--chart-series-1`, ...) used for the theme colors and to resolve
   * `var(--name)` colors of the options
   */
  variables?: Readonly<Record<string, string>>;
  /** Series colors (hex / rgb) */
  palette?: readonly string[];
  /** Font family of the labels */
  fontFamily?: string;
  /**
   * Font size of the tick labels, in pixels
   * @default 11
   */
  fontSize?: number;
}

/** Builds a theme from plain values (no DOM) */
export const createTheme = (
  input: ChartThemeInput = {},
  palette?: readonly string[],
): ChartTheme => {
  const variables = input.variables ?? {};
  const theme = buildTheme(
    (name) => variables[name]?.trim() ?? "",
    staticColorResolver(variables),
    palette?.length ? palette : input.palette,
    "",
  );
  return {
    ...theme,
    ...(input.fontFamily ? { fontFamily: input.fontFamily } : {}),
    ...(input.fontSize ? { fontSize: input.fontSize } : {}),
  };
};

/** Resolver of `var(--name, fallback)` colors against plain variables */
export const staticColorResolver =
  (variables: Readonly<Record<string, string>>): ColorResolver =>
  (value, fallback) =>
    resolveStaticColor(value, variables, fallback);

const buildTheme = (
  readVariable: (name: string) => string,
  resolve: ColorResolver,
  palette: readonly string[] | undefined,
  inheritedFont: string,
): ChartTheme => {
  const fallbackGray: Rgba = [0.4, 0.4, 0.4, 1];
  const resolveColor = (value: string) => resolve(value, fallbackGray);
  const color = (names: string[], fallback: string): Rgba => {
    for (const name of names) {
      if (readVariable(name)) return resolveColor(`var(${name})`);
    }
    return resolveColor(fallback);
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
    colors = palette.map((c) => resolveColor(c));
  } else {
    const custom: Rgba[] = [];
    for (let i = 1; i <= 8; i++) {
      const name = `--chart-series-${i}`;
      if (readVariable(name)) custom.push(resolveColor(`var(${name})`));
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
        readVariable(name)
          ? resolveColor(`var(${name})`)
          : resolveColor(DEFAULT_PALETTE[i]),
      );
      colors = [
        ...themed,
        ...DEFAULT_PALETTE.slice(5).map((c) => resolveColor(c)),
      ];
    }
  }

  const fontFamily =
    readVariable("--font-family-sans") ||
    inheritedFont ||
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
    resolve,
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
