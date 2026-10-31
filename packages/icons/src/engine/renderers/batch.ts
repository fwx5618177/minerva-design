// What the GPU backends share: one vertex buffer holding the meshes of every
// icon drawn so far, and per frame one instance buffer (position, size,
// rotation, color, depth of each icon). Consecutive icons with the same mesh
// are drawn by one instanced draw call.

import { iconMesh, toleranceFor } from "../tessellate";
import { INSTANCE_FLOATS, type IconFrame } from "./types";

/** Meshes are dropped and rebuilt past this many floats (8 MB) */
const ATLAS_LIMIT = 2 * 1024 * 1024;

export class MeshAtlas {
  data = new Float32Array(16384);
  /** Floats in use */
  length = 0;
  /** Floats already on the GPU (the backend keeps it up to date) */
  uploaded = 0;
  private index = new Map<Float32Array, number>();

  /** First vertex and vertex count of a mesh, appended if new */
  add(mesh: Float32Array): [first: number, count: number] {
    let at = this.index.get(mesh);
    if (at === undefined) {
      if (this.length + mesh.length > this.data.length) {
        let capacity = this.data.length * 2;
        while (capacity < this.length + mesh.length) capacity *= 2;
        const data = new Float32Array(capacity);
        data.set(this.data.subarray(0, this.length));
        this.data = data;
      }
      at = this.length;
      this.data.set(mesh, at);
      this.length += mesh.length;
      this.index.set(mesh, at);
    }
    return [at / 2, mesh.length / 2];
  }

  reset() {
    this.index.clear();
    this.length = 0;
    this.uploaded = 0;
  }
}

export interface DrawRun {
  first: number;
  count: number;
  instance: number;
  instances: number;
}

export interface PreparedFrame {
  /** INSTANCE_FLOATS per item, in item order */
  instances: Float32Array;
  runs: DrawRun[];
}

/**
 * Instance data and draw runs of a frame. Depth decreases with the item
 * index (later icons in front): with a "less" depth test, the overlapping
 * triangles of one icon cover each pixel once, so translucent icons blend
 * like the SVG stroke, and later icons still paint over earlier ones.
 */
export function prepareFrame(
  frame: IconFrame,
  atlas: MeshAtlas,
  scratch?: Float32Array,
): PreparedFrame {
  const { items, dpr } = frame;
  const n = items.length;
  if (atlas.length > ATLAS_LIMIT) atlas.reset();
  const size = n * INSTANCE_FLOATS;
  const instances =
    scratch && scratch.length >= size
      ? scratch
      : new Float32Array(Math.max(size, 64));
  const runs: DrawRun[] = [];
  let last: DrawRun | null = null;
  let o = 0;
  for (let i = 0; i < n; i++) {
    const item = items[i]!;
    const mesh = iconMesh(
      item.icon,
      item.strokeWidth,
      toleranceFor(item.size * dpr),
    );
    const [r, g, b, a] = item.color;
    instances[o++] = item.x;
    instances[o++] = item.y;
    instances[o++] = item.size;
    instances[o++] = item.rotation;
    instances[o++] = r * a;
    instances[o++] = g * a;
    instances[o++] = b * a;
    instances[o++] = a;
    instances[o++] = 1 - (i + 1) / (n + 1);
    if (!mesh.length || a <= 0 || item.size <= 0) {
      last = null;
      continue;
    }
    const [first, count] = atlas.add(mesh);
    if (last && last.first === first && last.instance + last.instances === i) {
      last.instances++;
    } else {
      last = { first, count, instance: i, instances: 1 };
      runs.push(last);
    }
  }
  return { instances, runs };
}

/** Canvas size in device pixels for a frame */
export const pixelSize = (frame: IconFrame): [number, number] => [
  Math.max(1, Math.round(frame.width * frame.dpr)),
  Math.max(1, Math.round(frame.height * frame.dpr)),
];
