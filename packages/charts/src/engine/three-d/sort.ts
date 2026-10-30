// Back-to-front order of the transparent meshes for the GPU backends:
// transparent items are drawn without writing depth, so their triangles must
// come farthest first to blend correctly where a surface folds over itself.
// Meshes are made of quads (6 indices: two triangles sharing an edge, as
// built for surface cells and bar faces); quads are sorted by the camera
// depth of their center with a bucket sort (O(n)), and only again when the
// camera moved. Canvas2D sorts every triangle itself (painter's algorithm).

import type { Frame3D, Item3D, MeshItem } from "./render-types";
import { VERTEX_STRIDE } from "./render-types";

/** Largest transparent mesh sorted (quads): a 512 × 512 surface grid */
export const MAX_SORTED_QUADS = 1 << 18;

const BUCKETS = 1 << 16;
const FLOATS = VERTEX_STRIDE / 4;

/**
 * Writes into `out` the quads of `indices` (6 indices each) ordered by
 * decreasing camera depth: view depth (clip w) in perspective, clip z in
 * orthographic projection. Equal depths keep their order.
 */
export const sortQuads = (
  indices: Uint32Array,
  vertices: Float32Array,
  viewProj: Float32Array,
  orthographic: boolean,
  out: Uint32Array,
  scratch: { keys: Float32Array; counts: Uint32Array },
): void => {
  const quads = Math.floor(indices.length / 6);
  const { keys, counts } = scratch;
  // depth = row 4 (w) or row 3 (z) of the column-major matrix
  const row = orthographic ? 2 : 3;
  const mx = viewProj[row] ?? 0;
  const my = viewProj[row + 4] ?? 0;
  const mz = viewProj[row + 8] ?? 0;
  let min = Infinity;
  let max = -Infinity;
  for (let q = 0; q < quads; q++) {
    const o = q * 6;
    let x = 0;
    let y = 0;
    let z = 0;
    // the 4 corners: indices 0, 1, 2 and 5 of the quad
    for (let c = 0; c < 4; c++) {
      const v = (indices[o + (c === 3 ? 5 : c)] ?? 0) * FLOATS;
      x += vertices[v] ?? 0;
      y += vertices[v + 1] ?? 0;
      z += vertices[v + 2] ?? 0;
    }
    const depth = mx * x + my * y + mz * z;
    keys[q] = depth;
    if (depth < min) min = depth;
    if (depth > max) max = depth;
  }
  counts.fill(0);
  const scale = max > min ? (BUCKETS - 1) / (max - min) : 0;
  // bucket 0 = farthest (clamped: the keys are rounded to float32)
  for (let q = 0; q < quads; q++) {
    const b = Math.min(
      BUCKETS - 1,
      Math.max(0, Math.floor((max - (keys[q] ?? max)) * scale)),
    );
    keys[q] = b;
    counts[b] = (counts[b] ?? 0) + 1;
  }
  let sum = 0;
  for (let b = 0; b < BUCKETS; b++) {
    const c = counts[b] ?? 0;
    counts[b] = sum;
    sum += c;
  }
  for (let q = 0; q < quads; q++) {
    const b = keys[q] ?? 0;
    const at = (counts[b] ?? 0) * 6;
    counts[b] = (counts[b] ?? 0) + 1;
    const o = q * 6;
    for (let j = 0; j < 6; j++) out[at + j] = indices[o + j] ?? 0;
  }
};

interface SortedMesh {
  version: number;
  source: Uint32Array;
  indices: Uint32Array;
  order: number;
}

const sameMatrix = (a: Float32Array | null, b: Float32Array) => {
  if (!a) return false;
  for (let i = 0; i < 16; i++) if (a[i] !== b[i]) return false;
  return true;
};

/**
 * Sorter of the transparent meshes: returns the items with the transparent
 * meshes' indices in back-to-front order (`order` changes when only the
 * indices must be uploaded again)
 */
export const createDepthSorter = () => {
  const sorted = new Map<string, SortedMesh>();
  let view: Float32Array | null = null;
  let orthographic = false;
  let order = 0;
  let scratch: { keys: Float32Array; counts: Uint32Array } | null = null;

  const sortable = (item: Item3D): item is MeshItem =>
    item.kind === "mesh" &&
    item.opacity < 1 &&
    item.indices.length >= 12 &&
    item.indices.length % 6 === 0 &&
    item.indices.length / 6 <= MAX_SORTED_QUADS;

  return (items: readonly Item3D[], frame: Frame3D): readonly Item3D[] => {
    if (!items.some(sortable)) {
      sorted.clear();
      return items;
    }
    const moved =
      !sameMatrix(view, frame.viewProj) || orthographic !== frame.orthographic;
    if (moved) {
      view = Float32Array.from(frame.viewProj);
      orthographic = frame.orthographic;
    }
    const seen = new Set<string>();
    const result = items.map((item): Item3D => {
      if (!sortable(item)) return item;
      seen.add(item.key);
      let entry = sorted.get(item.key);
      const stale =
        !entry ||
        entry.version !== item.version ||
        entry.source !== item.indices;
      if (stale || moved) {
        const quads = item.indices.length / 6;
        if (!scratch || scratch.keys.length < quads)
          scratch = {
            keys: new Float32Array(Math.max(quads, 1024)),
            counts: new Uint32Array(BUCKETS),
          };
        const out =
          entry && !stale && entry.indices.length === item.indices.length
            ? entry.indices
            : new Uint32Array(item.indices.length);
        sortQuads(
          item.indices,
          new Float32Array(item.vertices),
          frame.viewProj,
          frame.orthographic,
          out,
          scratch,
        );
        entry = {
          version: item.version,
          source: item.indices,
          indices: out,
          order: ++order,
        };
        sorted.set(item.key, entry);
      }
      return { ...item, indices: entry!.indices, order: entry!.order };
    });
    for (const key of sorted.keys()) if (!seen.has(key)) sorted.delete(key);
    return result;
  };
};
