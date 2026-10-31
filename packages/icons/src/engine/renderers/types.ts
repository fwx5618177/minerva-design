// The backends behind icon canvases and canvas icons.

import type { Rgba } from "../color";
import type { IconDefinition, IconRendererKind } from "../types";

/** An icon ready to draw: positions and sizes in frame units (CSS pixels × dpr = device pixels) */
export interface FrameItem {
  icon: IconDefinition;
  x: number;
  y: number;
  size: number;
  /** Radians, clockwise */
  rotation: number;
  /** Grid units */
  strokeWidth: number;
  /** Opacity applied */
  color: Rgba;
}

export interface IconFrame {
  /** Frame size in its units */
  width: number;
  height: number;
  /** Device pixels per frame unit */
  dpr: number;
  items: readonly FrameItem[];
}

export interface IconBackend {
  readonly kind: IconRendererKind;
  readonly canvas: HTMLCanvasElement;
  /** Sizes the canvas to the frame and draws it (clearing first) */
  render(frame: IconFrame): void;
  destroy(): void;
}

/** Called once when the GPU context or device is lost */
export type BackendLostHandler = () => void;

/** Floats per instance: x, y, size, rotation, r, g, b, a (premultiplied), depth */
export const INSTANCE_FLOATS = 9;
export const INSTANCE_STRIDE = INSTANCE_FLOATS * 4;
