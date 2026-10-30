// Contract between the 3D chart and its data-layer backends.

import type { Rgba } from "../color";
import type { ChartRendererKind } from "../types";
import type { Vec3 } from "./math";

/** Bytes per point instance: x, y, z f32, diameter (CSS px) f32, color unorm8x4 */
export const POINT_STRIDE = 20;
/** Bytes per mesh vertex: position f32x3, normal f32x3, color unorm8x4 */
export const VERTEX_STRIDE = 28;
/** Bytes per line segment instance: a f32x3, b f32x3, color unorm8x4 */
export const SEGMENT_STRIDE = 28;

interface ItemBase {
  /** Identifies the GPU resources of the item */
  key: string;
  /** Changes when the buffers must be uploaded again */
  version: number;
  /** 0-1; below 1 the item is drawn without writing depth */
  opacity: number;
}

/** Instanced billboards shaded as small spheres */
export interface PointsItem extends ItemBase {
  kind: "points";
  data: ArrayBuffer;
  count: number;
  /** Scales the dots with the distance (perspective) */
  perspective: boolean;
}

/** Lit triangles (surfaces, bars) */
export interface MeshItem extends ItemBase {
  kind: "mesh";
  vertices: ArrayBuffer;
  vertexCount: number;
  indices: Uint32Array;
  /**
   * Changes when only the order of the triangles changed (transparent meshes
   * sorted back to front): the index buffer is rewritten, same length
   */
  order?: number;
}

/** Screen-space wide segments (wireframes, contours, polylines) */
export interface LinesItem extends ItemBase {
  kind: "lines";
  data: ArrayBuffer;
  count: number;
  /** CSS pixels */
  width: number;
  /** Pulls the lines towards the camera (wireframes over their surface) */
  bias: number;
}

export type Item3D = PointsItem | MeshItem | LinesItem;

export interface Frame3D {
  /** World -> clip (OpenGL convention) */
  viewProj: Float32Array;
  eye: Vec3;
  /** Unit vector towards the light, in world space */
  light: Vec3;
  orthographic: boolean;
  /** Distance of the camera to the box center (reference of the point sizes) */
  distance: number;
  /** Radius of the sphere around the box (depth cue range) */
  radius: number;
  /** Drawing buffer size in device pixels */
  width: number;
  height: number;
  dpr: number;
  /** ambient, diffuse, specular, shininess */
  lighting: readonly [number, number, number, number];
  /** Background color: far points fade towards it */
  fog: Rgba;
}

export interface Renderer3D {
  readonly kind: ChartRendererKind;
  readonly canvas: HTMLCanvasElement;
  /** Drawing buffer size in device pixels */
  resize(width: number, height: number): void;
  render(items: readonly Item3D[], frame: Frame3D): void;
  destroy(): void;
}

/**
 * Order of the draws: opaque meshes, points, transparent meshes, then lines
 * (wireframes and contours stay visible over transparent surfaces)
 */
export const drawOrder = (items: readonly Item3D[]): Item3D[] => {
  const rank = (item: Item3D) =>
    item.kind === "mesh"
      ? item.opacity < 1
        ? 2
        : 0
      : item.kind === "points"
        ? 1
        : 3;
  return items
    .map((item, i) => ({ item, i, r: rank(item) }))
    .sort((a, b) => a.r - b.r || a.i - b.i)
    .map((e) => e.item);
};
