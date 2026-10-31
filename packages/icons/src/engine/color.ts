// CSS colors for the GPU backends (Canvas2D takes CSS colors as is).

/** Red, green, blue, alpha between 0 and 1 (not premultiplied) */
export type Rgba = [number, number, number, number];

const BLACK: Rgba = [0, 0, 0, 1];

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);

const channel = (part: string, max: number) =>
  part.endsWith("%") ? parseFloat(part) / 100 : parseFloat(part) / max;

const hue = (part: string) => {
  const value = parseFloat(part);
  if (part.endsWith("turn")) return value * 360;
  if (part.endsWith("rad")) return (value * 180) / Math.PI;
  if (part.endsWith("grad")) return value * 0.9;
  return value;
};

const hslToRgb = (
  h: number,
  s: number,
  l: number,
): [number, number, number] => {
  const k = (n: number) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) =>
    l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return [f(0), f(8), f(4)];
};

/** Parses hex, rgb(a), hsl(a) and `transparent`; null for anything else */
export function parseColor(input: string): Rgba | null {
  const value = input.trim().toLowerCase();
  if (value === "transparent") return [0, 0, 0, 0];
  if (value.startsWith("#")) {
    const hex = value.slice(1);
    if (!/^[0-9a-f]+$/.test(hex)) return null;
    if (hex.length === 3 || hex.length === 4) {
      const v = [...hex].map((c) => parseInt(c + c, 16) / 255);
      return [v[0]!, v[1]!, v[2]!, v[3] ?? 1];
    }
    if (hex.length === 6 || hex.length === 8) {
      const v = [0, 2, 4, 6].map((i) =>
        i < hex.length ? parseInt(hex.slice(i, i + 2), 16) / 255 : 1,
      );
      return [v[0]!, v[1]!, v[2]!, v[3]!];
    }
    return null;
  }
  const fn = /^(rgba?|hsla?)\((.*)\)$/.exec(value);
  if (!fn) return null;
  const parts = fn[2]!
    .replace(/\s*\/\s*/, " / ")
    .split(/[\s,]+/)
    .filter((part) => part && part !== "/");
  if (parts.length < 3 || parts.length > 4) return null;
  if (parts.some((part) => Number.isNaN(parseFloat(part)))) return null;
  const alpha = parts[3] === undefined ? 1 : clamp01(channel(parts[3], 1));
  if (fn[1]!.startsWith("rgb")) {
    return [
      clamp01(channel(parts[0]!, 255)),
      clamp01(channel(parts[1]!, 255)),
      clamp01(channel(parts[2]!, 255)),
      alpha,
    ];
  }
  const [r, g, b] = hslToRgb(
    ((hue(parts[0]!) % 360) + 360) % 360,
    clamp01(parseFloat(parts[1]!) / 100),
    clamp01(parseFloat(parts[2]!) / 100),
  );
  return [r, g, b, alpha];
}

let probe: CanvasRenderingContext2D | null | undefined;

/** Named colors, oklch(), color()…: let the browser convert them */
const browserColor = (value: string): Rgba | null => {
  if (probe === undefined) {
    probe =
      typeof document === "undefined"
        ? null
        : (() => {
            try {
              const canvas = document.createElement("canvas");
              canvas.width = canvas.height = 1;
              return canvas.getContext("2d", { willReadFrequently: true });
            } catch {
              return null;
            }
          })();
  }
  if (!probe) return null;
  probe.fillStyle = "#000";
  probe.fillStyle = value;
  const normalized = String(probe.fillStyle);
  const parsed = parseColor(normalized);
  if (parsed) return parsed;
  try {
    probe.clearRect(0, 0, 1, 1);
    probe.fillRect(0, 0, 1, 1);
    const [r, g, b, a] = probe.getImageData(0, 0, 1, 1).data;
    if (!a) return [0, 0, 0, 0];
    return [
      r! / 255 / (a / 255),
      g! / 255 / (a / 255),
      b! / 255 / (a / 255),
      a / 255,
    ].map(clamp01) as Rgba;
  } catch {
    return null;
  }
};

const cache = new Map<string, Rgba>();

const VARIABLE =
  /var\(\s*(--[\w-]+)\s*(?:,\s*([^()]*(?:\([^()]*\))?[^()]*))?\)/;

/**
 * Any CSS color as RGBA. `currentColor` and `var(--x)` are read on `element`
 * (its computed style); unknown colors give opaque black.
 */
export function resolveColor(
  value: string | undefined,
  element?: Element | null,
): Rgba {
  let color = (value ?? "currentColor").trim();
  const style =
    element && typeof getComputedStyle === "function"
      ? getComputedStyle(element)
      : null;
  for (let depth = 0; depth < 8 && color.includes("var("); depth++) {
    color = color.replace(VARIABLE, (_, name: string, fallback?: string) => {
      const resolved = style?.getPropertyValue(name).trim();
      return resolved || fallback?.trim() || "currentColor";
    });
  }
  if (color.toLowerCase() === "currentcolor") {
    color = style?.color || "#000";
  }
  const cached = cache.get(color);
  if (cached) return cached;
  const rgba = parseColor(color) ?? browserColor(color) ?? BLACK;
  if (cache.size > 512) cache.clear();
  cache.set(color, rgba);
  return rgba;
}
