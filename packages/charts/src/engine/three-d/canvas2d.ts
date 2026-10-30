// Canvas2D backend of the 3D charts: CPU projection and the painter's
// algorithm (every triangle, dot and segment of every item sorted back to
// front together: transparent meshes blend in the right order), flat
// lighting per triangle. The chart thins the point clouds and resamples the
// surfaces for this backend (`CPU_BUDGET`): what it gets is what is drawn,
// and what can be hovered.

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

/** Side of the glow sprites (px); the halo reaches 2.2 × the core radius */
const SPRITE = 32;
const GLOW_REACH = 2.2;

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
  // glow sprites by color (4 bits per channel); null: no offscreen canvas
  const sprites = new Map<number, HTMLCanvasElement | null>();
  const sprite = (r: number, g: number, b: number) => {
    const key =
      ((clamp255(r) >> 4) << 8) |
      ((clamp255(g) >> 4) << 4) |
      (clamp255(b) >> 4);
    let s = sprites.get(key);
    if (s === undefined) {
      s = makeSprite(
        canvas,
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
    const [ambient, diffuse, specular, shininess] = frame.lighting;
    const L = frame.light;
    const fogR = frame.fog[0] * 255;
    const fogG = frame.fog[1] * 255;
    const fogB = frame.fog[2] * 255;

    // ---- collect the primitives
    const projected: (Projected | null)[] = [];
    // typed views of every item (floats and bytes of the same buffer)
    const floats: Float32Array[] = [];
    const bytes: Uint8Array[] = [];
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
        // flat normal facing the camera
        const ax = f32[a * 7],
          ay = f32[a * 7 + 1],
          az = f32[a * 7 + 2];
        const ux = f32[b * 7] - ax,
          uy = f32[b * 7 + 1] - ay,
          uz = f32[b * 7 + 2] - az;
        const vx = f32[c * 7] - ax,
          vy = f32[c * 7 + 1] - ay,
          vz = f32[c * 7 + 2] - az;
        let nx = uy * vz - uz * vy;
        let ny = uz * vx - ux * vz;
        let nz = ux * vy - uy * vx;
        const len = Math.hypot(nx, ny, nz) || 1;
        nx /= len;
        ny /= len;
        nz /= len;
        let ex = frame.eye[0] - ax;
        let ey = frame.eye[1] - ay;
        let ez = frame.eye[2] - az;
        const el = Math.hypot(ex, ey, ez) || 1;
        ex /= el;
        ey /= el;
        ez /= el;
        if (nx * ex + ny * ey + nz * ez < 0) {
          nx = -nx;
          ny = -ny;
          nz = -nz;
        }
        const lambert = Math.max(0, nx * L[0] + ny * L[1] + nz * L[2]);
        let hx = L[0] + ex;
        let hy = L[1] + ey;
        let hz = L[2] + ez;
        const hl = Math.hypot(hx, hy, hz) || 1;
        hx /= hl;
        hy /= hl;
        hz /= hl;
        const spec =
          Math.pow(Math.max(0, nx * hx + ny * hy + nz * hz), shininess) *
          specular *
          255;
        const light = ambient + diffuse * lambert;
        const ca = a * 28 + 24;
        const cb = b * 28 + 24;
        const cc = c * 28 + 24;
        const r = (u8[ca] + u8[cb] + u8[cc]) / 3;
        const g = (u8[ca + 1] + u8[cb + 1] + u8[cc + 1]) / 3;
        const bl = (u8[ca + 2] + u8[cb + 2] + u8[cc + 2]) / 3;
        const ac = (u8[ca + 3] + u8[cb + 3] + u8[cc + 3]) / 765;
        const fill = style(
          r * light + spec,
          g * light + spec,
          bl * light + spec,
        );
        alpha(item.opacity * ac);
        ctx.beginPath();
        ctx.moveTo(p.x[a], p.y[a]);
        ctx.lineTo(p.x[b], p.y[b]);
        ctx.lineTo(p.x[c], p.y[c]);
        ctx.closePath();
        ctx.fillStyle = fill;
        ctx.fill();
        if (item.opacity >= 1 && !item.transparent) {
          // hides the seams between neighbouring triangles
          ctx.strokeStyle = fill;
          ctx.lineWidth = 0.75;
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
        // thinned clouds: denser (and, glowing, larger) dots
        const thinned = Math.max(1, item.thinned ?? 1);
        const grow = glow ? Math.sqrt(Math.sqrt(thinned)) : 1;
        const raw = (Math.max(0, f32[e * 5 + 3]) * dpr * scale * grow) / 2;
        const radius = Math.max(raw, glow ? 0.75 : 0.5);
        const coverage = Math.min(1, (raw * raw) / (radius * radius));
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
        let a =
          item.opacity * (u8[c + 3] / 255) * coverage * Math.sqrt(thinned);
        if (item.additive) {
          a *= 1 - fog;
        } else {
          r += (fogR - r) * fog;
          g += (fogG - g) * fog;
          b += (fogB - b) * fog;
        }
        alpha(Math.min(1, a));
        const image = glow ? sprite(r, g, b) : null;
        if (image) {
          const reach = radius * GLOW_REACH;
          ctx.drawImage(
            image,
            p.x[e] - reach,
            p.y[e] - reach,
            reach * 2,
            reach * 2,
          );
        } else {
          ctx.fillStyle = style(r, g, b);
          if (radius < 1.5) {
            ctx.fillRect(
              p.x[e] - radius,
              p.y[e] - radius,
              radius * 2,
              radius * 2,
            );
          } else {
            ctx.beginPath();
            ctx.arc(p.x[e], p.y[e], radius, 0, Math.PI * 2);
            ctx.fill();
          }
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

/** A glow sprite of a color (`SPRITE` px, the halo filling it), or null */
const makeSprite = (
  canvas: HTMLCanvasElement,
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
  const radius = center / GLOW_REACH;
  for (let y = 0; y < SPRITE; y++) {
    for (let x = 0; x < SPRITE; x++) {
      const d = Math.hypot(x + 0.5 - center, y + 0.5 - center);
      const [a, white] = glowProfile(d, radius);
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
