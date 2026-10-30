// Back-to-front order of the transparent meshes for the GPU backends:
// transparent items are drawn without writing depth, so their triangles must
// come farthest first to blend correctly where a surface folds over itself
// or where several transparent surfaces / bar series overlap. Meshes are
// made of quads (6 indices: two triangles sharing an edge, as built for
// surface cells and bar faces); quads are sorted by the camera depth of
// their center with a bucket sort (O(n)), and only again when the camera
// moved. Several transparent meshes are merged into one item (opacity baked
// into the vertex colors) so that their quads are sorted together; above
// the sort budget, the meshes are drawn by decreasing depth of their center
// with their own quads sorted. Canvas2D sorts every triangle of every item
// itself (painter's algorithm).

import type { Frame3D, Item3D, MeshItem } from "./render-types";
import { VERTEX_STRIDE, writesDepth } from "./render-types";

/** Largest number of transparent quads sorted: a 512 × 512 surface grid */
export const MAX_SORTED_QUADS = 1 << 18;

/** Key of the merged transparent meshes */
export const MERGED_KEY = "transparent";

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

/**
 * One transparent item made of several meshes: vertices concatenated (the
 * opacity of every mesh multiplies the alpha of its vertex colors), indices
 * shifted. Drawn with opacity 1, without writing depth.
 */
export const mergeMeshes = (
  meshes: readonly MeshItem[],
  key: string,
  version: number,
): MeshItem => {
  let vertexCount = 0;
  let indexCount = 0;
  for (const m of meshes) {
    vertexCount += m.vertexCount;
    indexCount += m.indices.length;
  }
  const vertices = new ArrayBuffer(vertexCount * VERTEX_STRIDE);
  const bytes = new Uint8Array(vertices);
  const indices = new Uint32Array(indexCount);
  let base = 0;
  let at = 0;
  for (const m of meshes) {
    const length = Math.min(
      m.vertices.byteLength,
      m.vertexCount * VERTEX_STRIDE,
    );
    bytes.set(new Uint8Array(m.vertices, 0, length), base * VERTEX_STRIDE);
    const opacity = Math.max(0, Math.min(1, m.opacity));
    if (opacity < 1) {
      for (let v = 0; v < m.vertexCount; v++) {
        const a = (base + v) * VERTEX_STRIDE + 27;
        bytes[a] = Math.round((bytes[a] ?? 0) * opacity);
      }
    }
    const source = m.indices;
    for (let j = 0; j < source.length; j++)
      indices[at + j] = (source[j] ?? 0) + base;
    base += m.vertexCount;
    at += source.length;
  }
  return {
    kind: "mesh",
    key,
    version,
    opacity: 1,
    transparent: true,
    vertices,
    vertexCount,
    indices,
  };
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

const isTransparentMesh = (item: Item3D): item is MeshItem =>
  item.kind === "mesh" && !writesDepth(item);

/** Made of whole quads: its triangles can be sorted by pairs */
const isQuadMesh = (item: MeshItem) =>
  item.indices.length > 0 && item.indices.length % 6 === 0;

/** Center of the bounding box of a mesh's vertices */
const meshCenter = (item: MeshItem): [number, number, number] => {
  const f = new Float32Array(
    item.vertices,
    0,
    Math.min(item.vertices.byteLength / 4, item.vertexCount * FLOATS),
  );
  const min = [Infinity, Infinity, Infinity];
  const max = [-Infinity, -Infinity, -Infinity];
  for (let o = 0; o + 2 < f.length; o += FLOATS) {
    for (let k = 0; k < 3; k++) {
      const v = f[o + k] ?? 0;
      if (v < (min[k] ?? 0)) min[k] = v;
      if (v > (max[k] ?? 0)) max[k] = v;
    }
  }
  return [0, 1, 2].map((k) =>
    min[k]! <= max[k]! ? (min[k]! + max[k]!) / 2 : 0,
  ) as [number, number, number];
};

/**
 * Sorter of the transparent meshes: returns the items with the transparent
 * meshes merged into one item (`MERGED_KEY`) whose quads are in back-to-front
 * order, or — above `MAX_SORTED_QUADS` or for meshes that aren't made of
 * quads — the transparent meshes ordered by decreasing depth of their
 * center, each with its own quads sorted. `order` changes when only the
 * indices must be uploaded again.
 */
export const createDepthSorter = () => {
  const sorted = new Map<string, SortedMesh>();
  const centers = new Map<
    string,
    { version: number; center: [number, number, number] }
  >();
  let merged: { signature: string; item: MeshItem } | null = null;
  let mergedVersion = 0;
  let view: Float32Array | null = null;
  let orthographic = false;
  let order = 0;
  let scratch: { keys: Float32Array; counts: Uint32Array } | null = null;

  /** Sorts the quads of a mesh when stale or when the camera moved */
  const sortMesh = (
    item: MeshItem,
    frame: Frame3D,
    moved: boolean,
    seen: Set<string>,
  ): MeshItem => {
    const quads = item.indices.length / 6;
    if (!isQuadMesh(item) || quads < 2 || quads > MAX_SORTED_QUADS) return item;
    seen.add(item.key);
    let entry = sorted.get(item.key);
    const stale =
      !entry || entry.version !== item.version || entry.source !== item.indices;
    if (stale || moved) {
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
  };

  /** Camera depth of the center of a mesh (larger: farther) */
  const centerDepth = (item: MeshItem, frame: Frame3D) => {
    let entry = centers.get(item.key);
    if (!entry || entry.version !== item.version) {
      entry = { version: item.version, center: meshCenter(item) };
      centers.set(item.key, entry);
    }
    const m = frame.viewProj;
    const row = frame.orthographic ? 2 : 3;
    const [x, y, z] = entry.center;
    return (
      (m[row] ?? 0) * x +
      (m[row + 4] ?? 0) * y +
      (m[row + 8] ?? 0) * z +
      (m[row + 12] ?? 0)
    );
  };

  return (items: readonly Item3D[], frame: Frame3D): readonly Item3D[] => {
    const transparent = items.filter(isTransparentMesh);
    if (transparent.length === 0) {
      sorted.clear();
      centers.clear();
      merged = null;
      return items;
    }
    const moved =
      !sameMatrix(view, frame.viewProj) || orthographic !== frame.orthographic;
    if (moved) {
      view = Float32Array.from(frame.viewProj);
      orthographic = frame.orthographic;
    }
    const seen = new Set<string>();
    let quads = 0;
    for (const m of transparent) quads += m.indices.length / 6;
    const result: Item3D[] = [];
    if (
      transparent.length >= 2 &&
      quads <= MAX_SORTED_QUADS &&
      transparent.every(isQuadMesh)
    ) {
      // one item: every transparent quad sorted together
      const signature = transparent
        .map((m) => `${m.key}@${m.version}@${m.opacity}`)
        .join("|");
      if (!merged || merged.signature !== signature) {
        merged = {
          signature,
          item: mergeMeshes(transparent, MERGED_KEY, ++mergedVersion),
        };
      }
      const item = sortMesh(merged.item, frame, moved, seen);
      let placed = false;
      for (const it of items) {
        if (!isTransparentMesh(it)) result.push(it);
        else if (!placed) {
          result.push(item);
          placed = true;
        }
      }
    } else {
      merged = null;
      // farthest mesh first, its own quads sorted
      const ordered = transparent
        .map((m) => ({ m, depth: centerDepth(m, frame) }))
        .sort((a, b) => b.depth - a.depth)
        .map((e) => sortMesh(e.m, frame, moved, seen));
      let next = 0;
      for (const it of items)
        result.push(isTransparentMesh(it) ? ordered[next++]! : it);
    }
    for (const key of sorted.keys()) if (!seen.has(key)) sorted.delete(key);
    for (const key of centers.keys())
      if (!transparent.some((m) => m.key === key)) centers.delete(key);
    return result;
  };
};
