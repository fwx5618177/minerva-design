// Color ramps of the 3D charts: built-in maps (matplotlib / d3 stops) and
// custom CSS color lists, sampled into 256-entry lookup tables.

import {
  packColor,
  parseColor,
  rampColor,
  type ColorResolver,
  type Rgba,
} from "../color";
import type { Chart3DColorMap, Chart3DColorScale } from "./types";

const hex = (value: string): Rgba => [
  parseInt(value.slice(1, 3), 16) / 255,
  parseInt(value.slice(3, 5), 16) / 255,
  parseInt(value.slice(5, 7), 16) / 255,
  1,
];

const RAMPS: Record<Chart3DColorMap, readonly string[]> = {
  viridis: [
    "#440154",
    "#482878",
    "#3e4989",
    "#31688e",
    "#26828e",
    "#1f9e89",
    "#35b779",
    "#6ece58",
    "#b5de2b",
    "#fde725",
  ],
  plasma: [
    "#0d0887",
    "#46039f",
    "#7201a8",
    "#9c179e",
    "#bd3786",
    "#d8576b",
    "#ed7953",
    "#fb9f3a",
    "#fdca26",
    "#f0f921",
  ],
  inferno: [
    "#000004",
    "#1b0c41",
    "#4a0c6b",
    "#781c6d",
    "#a52c60",
    "#cf4446",
    "#ed6925",
    "#fb9b06",
    "#f7d13d",
    "#fcffa4",
  ],
  magma: [
    "#000004",
    "#180f3d",
    "#440f76",
    "#721f81",
    "#9e2f7f",
    "#cd4071",
    "#f1605d",
    "#fd9668",
    "#feca8d",
    "#fcfdbf",
  ],
  cividis: [
    "#00224e",
    "#123570",
    "#3b496c",
    "#575d6d",
    "#707173",
    "#8a8678",
    "#a59c74",
    "#c3b369",
    "#e1cc55",
    "#fee838",
  ],
  turbo: [
    "#30123b",
    "#4145ab",
    "#4675ed",
    "#39a2fc",
    "#1bcfd4",
    "#24eca6",
    "#61fc6c",
    "#a4fc3b",
    "#d1e834",
    "#f3c63a",
    "#fe9b2d",
    "#f36315",
    "#d93806",
    "#b11901",
    "#7a0403",
  ],
  spectral: [
    "#5e4fa2",
    "#3288bd",
    "#66c2a5",
    "#abdda4",
    "#e6f598",
    "#ffffbf",
    "#fee08b",
    "#fdae61",
    "#f46d43",
    "#d53e4f",
    "#9e0142",
  ],
  coolwarm: [
    "#3b4cc0",
    "#6788ee",
    "#9abbff",
    "#c9d7f0",
    "#edd1c2",
    "#f7a889",
    "#e26952",
    "#b40426",
  ],
  terrain: [
    "#333399",
    "#1a66cc",
    "#0099ff",
    "#00cc66",
    "#66dd77",
    "#ccee88",
    "#ffff99",
    "#ccbb7a",
    "#997a5c",
    "#a08c86",
    "#d0c5c2",
    "#ffffff",
  ],
  blues: [
    "#f7fbff",
    "#deebf7",
    "#c6dbef",
    "#9ecae1",
    "#6baed6",
    "#4292c6",
    "#2171b5",
    "#08519c",
    "#08306b",
  ],
};

/** Names of the built-in ramps */
export const COLOR_MAPS = Object.keys(RAMPS) as Chart3DColorMap[];

/** Color stops of a scale; custom colors go through `resolve` (CSS variables included) */
export const colorStops = (
  scale: Chart3DColorScale | undefined,
  resolve?: ColorResolver,
): Rgba[] => {
  if (typeof scale === "string") {
    const ramp = RAMPS[scale as Chart3DColorMap] ?? RAMPS.viridis;
    return ramp.map(hex);
  }
  if (scale && scale.length > 0) {
    const fallback: Rgba = [0.5, 0.5, 0.5, 1];
    const stops = scale.map((c) =>
      resolve ? resolve(c, fallback) : (parseColor(c) ?? fallback),
    );
    return stops.length === 1 ? [stops[0], stops[0]] : stops;
  }
  return RAMPS.viridis.map(hex);
};

export const LUT_SIZE = 256;

/** A sampled color scale: packed `unorm8x4` colors and their RGBA */
export interface ColorLut {
  packed: Uint32Array;
  rgba: Rgba[];
  stops: Rgba[];
}

export const colorLut = (stops: readonly Rgba[]): ColorLut => {
  const packed = new Uint32Array(LUT_SIZE);
  const rgba: Rgba[] = [];
  for (let i = 0; i < LUT_SIZE; i++) {
    const c = rampColor(stops, i / (LUT_SIZE - 1));
    rgba.push(c);
    packed[i] = packColor(c);
  }
  return { packed, rgba, stops: [...stops] };
};

/** Index into the lookup table of `value` within `[min, max]` (clamped) */
export const lutIndex = (value: number, min: number, max: number): number => {
  const span = max - min;
  const t = span > 0 ? (value - min) / span : 0.5;
  const i = Math.round(t * (LUT_SIZE - 1));
  return i < 0 ? 0 : i > LUT_SIZE - 1 ? LUT_SIZE - 1 : i;
};
