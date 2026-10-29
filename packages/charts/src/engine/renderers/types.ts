// Contract between the chart and its data-layer backends.

import type { Rgba } from "../color";
import type { ChartRendererKind } from "../types";

/**
 * Data -> clip-space transform. Positions are uploaded relative to an
 * origin (float32 keeps its precision for timestamps), so
 * `clip = relative * scale + offset`.
 */
export interface RenderTransform {
  xScale: number;
  xOffset: number;
  yScale: number;
  yOffset: number;
}

export interface RenderFrame {
  transform: RenderTransform;
  /** Size of the drawing buffer in device pixels */
  width: number;
  height: number;
  /** Device pixel ratio */
  dpr: number;
}

/** Missing values are written as this sentinel (NaN is unreliable in shaders) */
export const GAP = 3e38;

interface RenderItemBase {
  /** Identifies the GPU resources of the item */
  key: string;
  /** Changes when the buffers must be uploaded again */
  version: number;
  /** Straight RGBA */
  color: Rgba;
}

export interface LineItem extends RenderItemBase {
  kind: "line";
  /** Interleaved relative x, y */
  points: Float32Array;
  count: number;
  /** CSS pixels */
  width: number;
  sorted: boolean;
}

export interface AreaItem extends RenderItemBase {
  kind: "area";
  /** Interleaved relative x, y (top) and y of the bottom edge (baseline or stack below) */
  points: Float32Array;
  count: number;
  opacity: number;
  sorted: boolean;
}

export interface BarItem extends RenderItemBase {
  kind: "bar";
  /** Per bar: relative x (center) f32, y0 f32, y1 f32, color unorm8x4 */
  instances: ArrayBuffer;
  count: number;
  /** Half of the bar width, in relative x units */
  halfWidth: number;
  /** Corner radius in CSS pixels */
  radius: number;
  /** Space removed on every side, in CSS pixels (heatmap cells) */
  inset: number;
  /** Smallest half width / half height, in CSS pixels (wicks, flat candles) */
  minHalf: number;
  /** Instances are sorted by x */
  sorted: boolean;
}

export interface ScatterItem extends RenderItemBase {
  kind: "scatter";
  /** Per point: x f32, y f32, diameter (CSS px) f32, color unorm8x4 */
  instances: ArrayBuffer;
  count: number;
  opacity: number;
  /** Outline width in CSS pixels */
  stroke: number;
}

export type RenderItem = LineItem | AreaItem | BarItem | ScatterItem;

export interface ChartRenderer {
  readonly kind: ChartRendererKind;
  readonly canvas: HTMLCanvasElement;
  /** Drawing buffer size in device pixels */
  resize(width: number, height: number): void;
  render(items: readonly RenderItem[], frame: RenderFrame): void;
  destroy(): void;
}

/** Called when the backend is lost (GPU reset, too many contexts, ...) */
export type RendererLostHandler = () => void;

export const SCATTER_STRIDE = 16;
/** Bytes per bar instance */
export const BAR_STRIDE = 16;
/** Floats per area point */
export const AREA_STRIDE = 3;
