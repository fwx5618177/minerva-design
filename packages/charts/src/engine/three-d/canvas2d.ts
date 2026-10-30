// Canvas2D backend of the 3D charts: CPU projection and the painter's
// algorithm (every triangle, dot and segment of every item sorted back to
// front together: transparent meshes and dots blend in the right order),
// lighting per vertex as on the GPU (gradients across the triangles whose
// corners differ). The chart thins the point clouds and resamples
// the surfaces for this backend (`CPU_BUDGET`): what it gets is what is
// drawn, and what can be hovered. Small dots are anti-aliased sprites (soft
// discs, glows); a cloud thinned to 1 dot out of k keeps the look of the
// full cloud (`thinnedDot`).

import {
  POINT_GLOW,
  drawOrder,
  type Frame3D,
  type Item3D,
  type Renderer3D,
} from "./render-types";

const TRIANGLE = 0;
const POINT = 1;
const SEGMENT = 2;

/** Side of the sprites (px); the glow halo reaches 2.2 × the core radius */
const SPRITE = 32;
const GLOW_REACH = 2.2;
/** Dots up to this radius (device px) are disc sprites, larger ones arcs */
const SPRITE_DISC_MAX = 4;
/** The disc sprites extend past the dot radius by this factor (soft edge) */
const DISC_REACH = 1.25;
/** Largest growth of the radius of a thinned dot */
const MAX_GROW = 3;

/**
 * Alpha and radius factor of a dot standing for `thinned` dots of the full
 * cloud (alpha `alpha`) spread around it: the dot covers their area (radius
 * × √k, at most × 3) and keeps the density of the cloud, k / grow² dots
 * per dot area: their light adds up (additive blending, at most 1) or their
 * coverage stacks, 1 − (1 − alpha)^(k / grow²). A haze of faint dots, as
 * the GPU draws it, instead of sparse bright sparkles.
 */
export const thinnedDot = (
  alpha: number,
  thinned: number,
  additive: boolean,
  maxGrow = MAX_GROW,
): { alpha: number; grow: number } => {
  const k = Math.max(1, thinned);
  if (alpha <= 0) return { alpha: 0, grow: 1 };
  const grow = Math.max(1, Math.min(maxGrow, Math.sqrt(k)));
  const density = k / (grow * grow);
  if (additive) return { alpha: Math.min(1, alpha * density), grow };
  const a = Math.min(alpha, 0.999);
  if (density === 1) return { alpha: Math.min(alpha, 1), grow };
  return { alpha: 1 - Math.pow(1 - a, density), grow };
};

/**
 * Glow profile (as the GPU shaders): an anti-aliased core and a gaussian
 * halo; `d` and `r` in pixels. Returns the alpha and the whitening.
 */
export const glowProfile = (d: number, r: number): [number, number] => {
  const core = Math.max(0, Math.min(1, r * 0.6 + 0.5 - d));
  const q = d / r;
  return [core + (1 - core) * Math.exp(-1.2 * q * q), 0.2 * core];
};

interface Projected {
  x: Float32Array;
  y: Float32Array;
  z: Float32Array;
  w: Float32Array;
}

const projectAll = (
  m: Float32Array,
  data: Float32Array,
  stride: number,
  offset: number,
  count: number,
  width: number,
  height: number,
): Projected => {
  const x = new Float32Array(count);
  const y = new Float32Array(count);
  const z = new Float32Array(count);
  const w = new Float32Array(count);
  for (let i = 0; i < count; i++) {
    const o = i * stride + offset;
    const px = data[o];
    const py = data[o + 1];
    const pz = data[o + 2];
    const cw = m[3] * px + m[7] * py + m[11] * pz + m[15];
    const iw = 1 / (cw > 1e-9 ? cw : 1e-9);
    x[i] = ((m[0] * px + m[4] * py + m[8] * pz + m[12]) * iw + 1) * 0.5 * width;
    y[i] =
      (1 - (m[1] * px + m[5] * py + m[9] * pz + m[13]) * iw) * 0.5 * height;
    z[i] = (m[2] * px + m[6] * py + m[10] * pz + m[14]) * iw;
    w[i] = cw;
  }
  return { x, y, z, w };
};

const clamp255 = (v: number) => (v < 0 ? 0 : v > 255 ? 255 : Math.round(v));

/**
 * Lit color (RGB, 0–255) of every vertex of a mesh: Blinn-Phong as in the
 * GPU shaders, two-sided (the normal turned toward the eye)
 */
export const lightVertices = (
  vertices: ArrayBuffer,
  count: number,
  frame: Frame3D,
): Float32Array => {
  const f32 = new Float32Array(vertices);
  const u8 = new Uint8Array(vertices);
  const out = new Float32Array(count * 3);
  const [ambient, diffuse, specular, shininess] = frame.lighting;
  const [lx, ly, lz] = frame.light;
  const [cx, cy, cz] = frame.eye;
  for (let v = 0; v < count; v++) {
    const o = v * 7;
    let nx = f32[o + 3];
    let ny = f32[o + 4];
    let nz = f32[o + 5];
    const len = Math.hypot(nx, ny, nz);
    if (len > 1e-6) {
      nx /= len;
      ny /= len;
      nz /= len;
    } else {
      nx = 0;
      ny = 0;
      nz = 1;
    }
    let ex = cx - f32[o];
    let ey = cy - f32[o + 1];
    let ez = cz - f32[o + 2];
    const el = Math.hypot(ex, ey, ez) || 1;
    ex /= el;
    ey /= el;
    ez /= el;
    if (nx * ex + ny * ey + nz * ez < 0) {
      nx = -nx;
      ny = -ny;
      nz = -nz;
    }
    const lambert = Math.max(0, nx * lx + ny * ly + nz * lz);
    let hx = lx + ex;
    let hy = ly + ey;
    let hz = lz + ez;
    const hl = Math.hypot(hx, hy, hz) || 1;
    hx /= hl;
    hy /= hl;
    hz /= hl;
    const spec =
      specular > 0
        ? Math.pow(Math.max(0, nx * hx + ny * hy + nz * hz), shininess) *
          specular *
          255
        : 0;
    const light = ambient + diffuse * lambert;
    const c = v * 28 + 24;
    out[v * 3] = u8[c] * light + spec;
    out[v * 3 + 1] = u8[c + 1] * light + spec;
    out[v * 3 + 2] = u8[c + 2] * light + spec;
  }
  return out;
};

/**
 * Axis of the linear gradient reproducing a value given at the 3 corners of
 * a screen triangle (affine over it): from where it is lowest to where it
 * is highest, and the offset of each corner on it. Null when it hardly
 * changes or the triangle is degenerate.
 */
export const gradientAxis = (
  x: readonly [number, number, number],
  y: readonly [number, number, number],
  s: readonly [number, number, number],
): { x0: number; y0: number; x1: number; y1: number; t: number[] } | null => {
  const d1x = x[1] - x[0];
  const d1y = y[1] - y[0];
  const d2x = x[2] - x[0];
  const d2y = y[2] - y[0];
  const det = d1x * d2y - d1y * d2x;
  if (Math.abs(det) < 1e-6) return null;
  const ds1 = s[1] - s[0];
  const ds2 = s[2] - s[0];
  // screen gradient of the value: g · d1 = ds1, g · d2 = ds2
  const gx = (ds1 * d2y - ds2 * d1y) / det;
  const gy = (d1x * ds2 - d2x * ds1) / det;
  const gg = gx * gx + gy * gy;
  const lo = Math.min(s[0], s[1], s[2]);
  const hi = Math.max(s[0], s[1], s[2]);
  if (!(gg > 1e-12) || hi - lo < 1e-6) return null;
  const k0 = (lo - s[0]) / gg;
  const k1 = (hi - s[0]) / gg;
  return {
    x0: x[0] + gx * k0,
    y0: y[0] + gy * k0,
    x1: x[0] + gx * k1,
    y1: y[0] + gy * k1,
    t: [0, 1, 2].map((i) => (s[i]! - lo) / (hi - lo)),
  };
};

/**
 * Triangles whose corner colors differ by more than this (0–255, on one
 * channel) are filled with a gradient (smooth like the GPU): the others,
 * most of a surface, with their mean color (much cheaper)
 */
const GRADIENT_SPREAD = 14;

export const createCanvas2d3D = (
  canvas: HTMLCanvasElement,
): Renderer3D | null => {
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;
  const styles = new Map<number, string>();
  const style = (r: number, g: number, b: number) => {
    const key = (clamp255(r) << 16) | (clamp255(g) << 8) | clamp255(b);
    let s = styles.get(key);
    if (s === undefined) {
      s = `rgb(${key >> 16},${(key >> 8) & 255},${key & 255})`;
      if (styles.size > 4096) styles.clear();
      styles.set(key, s);
    }
    return s;
  };
  // sprites by shape and color (4 bits per channel); null: no offscreen canvas
  const sprites = new Map<number, HTMLCanvasElement | null>();
  const sprite = (glow: boolean, r: number, g: number, b: number) => {
    const key =
      ((glow ? 1 : 0) << 12) |
      ((clamp255(r) >> 4) << 8) |
      ((clamp255(g) >> 4) << 4) |
      (clamp255(b) >> 4);
    let s = sprites.get(key);
    if (s === undefined) {
      s = makeSprite(
        canvas,
        glow,
        ((key >> 8) & 15) * 17,
        ((key >> 4) & 15) * 17,
        (key & 15) * 17,
      );
      sprites.set(key, s);
    }
    return s;
  };

  const render = (items: readonly Item3D[], frame: Frame3D) => {
    const { width, height } = canvas;
    const dpr = frame.dpr;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, width, height);
    const ordered = drawOrder(items);
    const m = frame.viewProj;
    const fogR = frame.fog[0] * 255;
    const fogG = frame.fog[1] * 255;
    const fogB = frame.fog[2] * 255;

    // ---- collect the primitives
    const projected: (Projected | null)[] = [];
    // typed views of every item (floats and bytes of the same buffer)
    const floats: Float32Array[] = [];
    const bytes: Uint8Array[] = [];
    // lit color of every mesh vertex (null for dots and segments)
    const lit: (Float32Array | null)[] = [];
    let capacity = 0;
    for (const item of ordered) {
      capacity += item.kind === "mesh" ? item.indices.length / 3 : item.count;
    }
    const depth = new Float32Array(capacity);
    const kind = new Uint8Array(capacity);
    const owner = new Uint16Array(capacity);
    const element = new Uint32Array(capacity);
    let n = 0;
    ordered.forEach((item, k) => {
      const raw = item.kind === "mesh" ? item.vertices : item.data;
      floats.push(new Float32Array(raw));
      bytes.push(new Uint8Array(raw));
      lit.push(
        item.kind === "mesh"
          ? lightVertices(item.vertices, item.vertexCount, frame)
          : null,
      );
      if (item.kind === "mesh") {
        const f32 = floats[k]!;
        const p = projectAll(m, f32, 7, 0, item.vertexCount, width, height);
        projected.push(p);
        const idx = item.indices;
        for (let t = 0; t + 2 < idx.length; t += 3) {
          const a = idx[t];
          const b = idx[t + 1];
          const c = idx[t + 2];
          if (p.w[a] <= 0 || p.w[b] <= 0 || p.w[c] <= 0) continue;
          depth[n] = (p.z[a] + p.z[b] + p.z[c]) / 3;
          kind[n] = TRIANGLE;
          owner[n] = k;
          element[n] = t;
          n++;
        }
      } else if (item.kind === "points") {
        const f32 = floats[k]!;
        const p = projectAll(m, f32, 5, 0, item.count, width, height);
        projected.push(p);
        for (let i = 0; i < item.count; i++) {
          if (p.w[i] <= 0) continue;
          depth[n] = p.z[i];
          kind[n] = POINT;
          owner[n] = k;
          element[n] = i;
          n++;
        }
      } else {
        const f32 = floats[k]!;
        // both ends: projected as two interleaved point lists
        const a = projectAll(m, f32, 7, 0, item.count, width, height);
        const b = projectAll(m, f32, 7, 3, item.count, width, height);
        projected.push({
          x: concat(a.x, b.x),
          y: concat(a.y, b.y),
          z: concat(a.z, b.z),
          w: concat(a.w, b.w),
        });
        const bias = item.bias * 5;
        for (let i = 0; i < item.count; i++) {
          if (a.w[i] <= 0 || b.w[i] <= 0) continue;
          depth[n] = (a.z[i] + b.z[i]) / 2 - bias;
          kind[n] = SEGMENT;
          owner[n] = k;
          element[n] = i;
          n++;
        }
      }
    });
    const order = new Uint32Array(n);
    for (let i = 0; i < n; i++) order[i] = i;
    order.sort((a, b) => depth[b] - depth[a]);

    // ---- draw back to front
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    let currentAlpha = -1;
    const alpha = (value: number) => {
      if (value !== currentAlpha) {
        ctx.globalAlpha = value;
        currentAlpha = value;
      }
    };
    let lighter = false;
    const composite = (add: boolean) => {
      if (add !== lighter) {
        ctx.globalCompositeOperation = add ? "lighter" : "source-over";
        lighter = add;
      }
    };
    const near = frame.distance - frame.radius;
    const exposure = Math.max(0, frame.exposure);
    for (let o = 0; o < n; o++) {
      const i = order[o];
      const item = ordered[owner[i]];
      const p = projected[owner[i]];
      const f32 = floats[owner[i]];
      const u8 = bytes[owner[i]];
      if (!item || !p || !f32 || !u8) continue;
      const e = element[i];
      composite(item.kind === "points" && !!item.additive);
      if (item.kind === "mesh" && kind[i] === TRIANGLE) {
        const a = item.indices[e];
        const b = item.indices[e + 1];
        const c = item.indices[e + 2];
        // smooth shading like the GPU (per-fragment there): the colors of
        // the lit vertices, blended by a gradient where they differ (steep
        // cells of a color-mapped surface), else their mean. One flat color
        // per triangle shows the grid as rings and steps on curved surfaces.
        const lc = lit[owner[i]];
        if (!lc) continue;
        const ca = a * 28 + 24;
        const cb = b * 28 + 24;
        const cc = c * 28 + 24;
        const ac = (u8[ca + 3] + u8[cb + 3] + u8[cc + 3]) / 765;
        let fill: string | CanvasGradient = style(
          (lc[a * 3] + lc[b * 3] + lc[c * 3]) / 3,
          (lc[a * 3 + 1] + lc[b * 3 + 1] + lc[c * 3 + 1]) / 3,
          (lc[a * 3 + 2] + lc[b * 3 + 2] + lc[c * 3 + 2]) / 3,
        );
        // the channel that changes most gives the axis of the gradient
        let channel = 0;
        let spread = 0;
        for (let ch = 0; ch < 3; ch++) {
          const va = lc[a * 3 + ch];
          const vb = lc[b * 3 + ch];
          const vc = lc[c * 3 + ch];
          const d = Math.max(va, vb, vc) - Math.min(va, vb, vc);
          if (d > spread) {
            spread = d;
            channel = ch;
          }
        }
        if (spread > GRADIENT_SPREAD) {
          const axis = gradientAxis(
            [p.x[a], p.x[b], p.x[c]],
            [p.y[a], p.y[b], p.y[c]],
            [lc[a * 3 + channel], lc[b * 3 + channel], lc[c * 3 + channel]],
          );
          if (axis) {
            const gradient = ctx.createLinearGradient(
              axis.x0,
              axis.y0,
              axis.x1,
              axis.y1,
            );
            [a, b, c].forEach((v, k) =>
              gradient.addColorStop(
                axis.t[k]!,
                style(lc[v * 3], lc[v * 3 + 1], lc[v * 3 + 2]),
              ),
            );
            fill = gradient;
          }
        }
        alpha(item.opacity * ac);
        ctx.beginPath();
        ctx.moveTo(p.x[a], p.y[a]);
        ctx.lineTo(p.x[b], p.y[b]);
        ctx.lineTo(p.x[c], p.y[c]);
        ctx.closePath();
        ctx.fillStyle = fill;
        ctx.fill();
        if (item.opacity >= 1 && !item.transparent) {
          // hides the anti-aliasing seams between neighbouring triangles
          ctx.strokeStyle = fill;
          ctx.lineWidth = Math.max(1, dpr * 0.6);
          ctx.stroke();
        }
      } else if (item.kind === "points" && kind[i] === POINT) {
        const scale =
          item.perspective && !frame.orthographic
            ? Math.max(
                0.5,
                Math.min(2, frame.distance / Math.max(p.w[e], 1e-6)),
              )
            : 1;
        const glow = item.style === POINT_GLOW;
        const additive = !!item.additive;
        const raw0 = (Math.max(0, f32[e * 5 + 3]) * dpr * scale) / 2;
        const min = glow ? 0.75 : 0.5;
        const c = e * 20 + 16;
        const wx = f32[e * 5] - frame.eye[0];
        const wy = f32[e * 5 + 1] - frame.eye[1];
        const wz = f32[e * 5 + 2] - frame.eye[2];
        const fog =
          Math.max(
            0,
            Math.min(1, (Math.hypot(wx, wy, wz) - near) / (2 * frame.radius)),
          ) * 0.45;
        let r = u8[c];
        let g = u8[c + 1];
        let b = u8[c + 2];
        // alpha of the dot as the GPU draws it (sub-pixel dots: by area)
        let a =
          item.opacity *
          (u8[c + 3] / 255) *
          Math.min(1, (raw0 * raw0) / (min * min));
        if (additive) {
          a *= (1 - fog) * exposure;
        } else {
          r += (fogR - r) * fog;
          g += (fogG - g) * fog;
          b += (fogB - b) * fog;
        }
        // thinned clouds: each dot stands for the dropped ones (blended
        // dots grow only while small: big markers keep their size)
        const dot = thinnedDot(
          a,
          item.thinned ?? 1,
          additive,
          additive
            ? MAX_GROW
            : 1 + (MAX_GROW - 1) * Math.max(0, Math.min(1, (4 - raw0) / 2.5)),
        );
        const radius = Math.max(raw0, min) * dot.grow;
        alpha(dot.alpha);
        const image =
          glow || radius <= SPRITE_DISC_MAX ? sprite(glow, r, g, b) : null;
        if (image) {
          const reach = glow ? radius * GLOW_REACH : radius * DISC_REACH;
          ctx.drawImage(
            image,
            p.x[e] - reach,
            p.y[e] - reach,
            reach * 2,
            reach * 2,
          );
        } else {
          ctx.fillStyle = style(r, g, b);
          ctx.beginPath();
          ctx.arc(p.x[e], p.y[e], radius, 0, Math.PI * 2);
          ctx.fill();
        }
      } else if (item.kind === "lines" && kind[i] === SEGMENT) {
        const c = e * 28 + 24;
        const half = p.x.length / 2;
        alpha(item.opacity * (u8[c + 3] / 255));
        ctx.strokeStyle = style(u8[c], u8[c + 1], u8[c + 2]);
        ctx.lineWidth = Math.max(0.5, item.width * dpr);
        ctx.beginPath();
        ctx.moveTo(p.x[e], p.y[e]);
        ctx.lineTo(p.x[half + e], p.y[half + e]);
        ctx.stroke();
      }
    }
    ctx.globalAlpha = 1;
    composite(false);
  };

  return {
    kind: "canvas2d",
    canvas,
    resize(width, height) {
      canvas.width = Math.max(1, width);
      canvas.height = Math.max(1, height);
    },
    render(items, frame) {
      render(items, frame);
    },
    destroy() {
      styles.clear();
      sprites.clear();
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    },
  };
};

const concat = (a: Float32Array, b: Float32Array) => {
  const out = new Float32Array(a.length + b.length);
  out.set(a, 0);
  out.set(b, a.length);
  return out;
};

/**
 * A sprite of a color (`SPRITE` px): a glow (core and halo filling it) or
 * an anti-aliased disc (radius `SPRITE / 2 / DISC_REACH`, a soft 1 px edge
 * once scaled to the dot); null without offscreen canvas
 */
const makeSprite = (
  canvas: HTMLCanvasElement,
  glow: boolean,
  r: number,
  g: number,
  b: number,
): HTMLCanvasElement | null => {
  const image = canvas.ownerDocument.createElement("canvas");
  image.width = SPRITE;
  image.height = SPRITE;
  const ctx = image.getContext("2d");
  if (!ctx || typeof ctx.createImageData !== "function") return null;
  const pixels = ctx.createImageData(SPRITE, SPRITE) as ImageData | undefined;
  if (!pixels) return null;
  const center = SPRITE / 2;
  const radius = center / (glow ? GLOW_REACH : DISC_REACH);
  for (let y = 0; y < SPRITE; y++) {
    for (let x = 0; x < SPRITE; x++) {
      const d = Math.hypot(x + 0.5 - center, y + 0.5 - center);
      const [a, white] = glow
        ? glowProfile(d, radius)
        : [discProfile(d, radius, center - radius), 0];
      const o = (y * SPRITE + x) * 4;
      pixels.data[o] = r + (255 - r) * white;
      pixels.data[o + 1] = g + (255 - g) * white;
      pixels.data[o + 2] = b + (255 - b) * white;
      pixels.data[o + 3] = d < center ? a * 255 : 0;
    }
  }
  ctx.putImageData(pixels, 0, 0);
  return image;
};

/**
 * Alpha of an anti-aliased disc of radius `r` at the distance `d`, with an
 * edge `edge` wide (pixels of the sprite): 1 inside, smooth to 0 outside
 */
export const discProfile = (d: number, r: number, edge: number): number => {
  const t = Math.max(0, Math.min(1, (r + edge / 2 - d) / edge));
  return t * t * (3 - 2 * t);
};
