// Small mat4 / vector math and the orbit camera of the 3D charts.
// Matrices are column-major (the layout WebGL and WGSL expect), the world
// is right-handed with z up, and the projections follow the OpenGL clip
// convention (z in [-w, w]; the WGSL shaders remap it to [0, w]).

import type { Chart3DCameraState, Chart3DProjection } from "./types";

export type Vec3 = [number, number, number];
export type Mat4 = Float32Array;

const DEG = Math.PI / 180;

export const identity = (): Mat4 => {
  const m = new Float32Array(16);
  m[0] = m[5] = m[10] = m[15] = 1;
  return m;
};

/** `a × b` (applies `b` first) */
export const multiply = (a: Mat4, b: Mat4): Mat4 => {
  const out = new Float32Array(16);
  for (let col = 0; col < 4; col++) {
    for (let row = 0; row < 4; row++) {
      let sum = 0;
      for (let k = 0; k < 4; k++) sum += a[k * 4 + row] * b[col * 4 + k];
      out[col * 4 + row] = sum;
    }
  }
  return out;
};

/** OpenGL-style perspective projection (`fovy` in radians) */
export const perspective = (
  fovy: number,
  aspect: number,
  near: number,
  far: number,
): Mat4 => {
  const f = 1 / Math.tan(fovy / 2);
  const m = new Float32Array(16);
  m[0] = f / aspect;
  m[5] = f;
  m[10] = (far + near) / (near - far);
  m[11] = -1;
  m[14] = (2 * far * near) / (near - far);
  return m;
};

/** OpenGL-style orthographic projection */
export const orthographic = (
  left: number,
  right: number,
  bottom: number,
  top: number,
  near: number,
  far: number,
): Mat4 => {
  const m = new Float32Array(16);
  m[0] = 2 / (right - left);
  m[5] = 2 / (top - bottom);
  m[10] = -2 / (far - near);
  m[12] = -(right + left) / (right - left);
  m[13] = -(top + bottom) / (top - bottom);
  m[14] = -(far + near) / (far - near);
  m[15] = 1;
  return m;
};

export const sub = (a: Vec3, b: Vec3): Vec3 => [
  a[0] - b[0],
  a[1] - b[1],
  a[2] - b[2],
];
export const dot = (a: Vec3, b: Vec3): number =>
  a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
export const cross = (a: Vec3, b: Vec3): Vec3 => [
  a[1] * b[2] - a[2] * b[1],
  a[2] * b[0] - a[0] * b[2],
  a[0] * b[1] - a[1] * b[0],
];
export const normalize = (v: Vec3): Vec3 => {
  const length = Math.hypot(v[0], v[1], v[2]) || 1;
  return [v[0] / length, v[1] / length, v[2] / length];
};

/** View matrix of a camera at `eye` looking at `target` */
export const lookAt = (eye: Vec3, target: Vec3, up: Vec3): Mat4 => {
  const f = normalize(sub(target, eye));
  const s = normalize(cross(f, up));
  const u = cross(s, f);
  const m = new Float32Array(16);
  m[0] = s[0];
  m[4] = s[1];
  m[8] = s[2];
  m[1] = u[0];
  m[5] = u[1];
  m[9] = u[2];
  m[2] = -f[0];
  m[6] = -f[1];
  m[10] = -f[2];
  m[12] = -dot(s, eye);
  m[13] = -dot(u, eye);
  m[14] = dot(f, eye);
  m[15] = 1;
  return m;
};

/** `m × [x, y, z, 1]` */
export const transform = (
  m: Mat4,
  x: number,
  y: number,
  z: number,
): [number, number, number, number] => [
  m[0] * x + m[4] * y + m[8] * z + m[12],
  m[1] * x + m[5] * y + m[9] * z + m[13],
  m[2] * x + m[6] * y + m[10] * z + m[14],
  m[3] * x + m[7] * y + m[11] * z + m[15],
];

/** Inverse of a 4×4 matrix (`null` when singular) */
export const invert = (m: Mat4): Mat4 | null => {
  const a00 = m[0],
    a01 = m[1],
    a02 = m[2],
    a03 = m[3];
  const a10 = m[4],
    a11 = m[5],
    a12 = m[6],
    a13 = m[7];
  const a20 = m[8],
    a21 = m[9],
    a22 = m[10],
    a23 = m[11];
  const a30 = m[12],
    a31 = m[13],
    a32 = m[14],
    a33 = m[15];
  const b00 = a00 * a11 - a01 * a10;
  const b01 = a00 * a12 - a02 * a10;
  const b02 = a00 * a13 - a03 * a10;
  const b03 = a01 * a12 - a02 * a11;
  const b04 = a01 * a13 - a03 * a11;
  const b05 = a02 * a13 - a03 * a12;
  const b06 = a20 * a31 - a21 * a30;
  const b07 = a20 * a32 - a22 * a30;
  const b08 = a20 * a33 - a23 * a30;
  const b09 = a21 * a32 - a22 * a31;
  const b10 = a21 * a33 - a23 * a31;
  const b11 = a22 * a33 - a23 * a32;
  const det =
    b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
  if (!det) return null;
  const d = 1 / det;
  const out = new Float32Array(16);
  out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * d;
  out[1] = (a02 * b10 - a01 * b11 - a03 * b09) * d;
  out[2] = (a31 * b05 - a32 * b04 + a33 * b03) * d;
  out[3] = (a22 * b04 - a21 * b05 - a23 * b03) * d;
  out[4] = (a12 * b08 - a10 * b11 - a13 * b07) * d;
  out[5] = (a00 * b11 - a02 * b08 + a03 * b07) * d;
  out[6] = (a32 * b02 - a30 * b05 - a33 * b01) * d;
  out[7] = (a20 * b05 - a22 * b02 + a23 * b01) * d;
  out[8] = (a10 * b10 - a11 * b08 + a13 * b06) * d;
  out[9] = (a01 * b08 - a00 * b10 - a03 * b06) * d;
  out[10] = (a30 * b04 - a31 * b02 + a33 * b00) * d;
  out[11] = (a21 * b02 - a20 * b04 - a23 * b00) * d;
  out[12] = (a11 * b07 - a10 * b09 - a12 * b06) * d;
  out[13] = (a00 * b09 - a01 * b07 + a02 * b06) * d;
  out[14] = (a31 * b01 - a30 * b03 - a32 * b00) * d;
  out[15] = (a20 * b03 - a21 * b01 + a22 * b00) * d;
  return out;
};

// ------------------------------------------------------------------ camera

export const DEFAULT_CAMERA: Readonly<Chart3DCameraState> = {
  azimuth: 35,
  elevation: 24,
  zoom: 1,
  pan: [0, 0],
  projection: "perspective",
};

export const MIN_ZOOM = 0.3;
export const MAX_ZOOM = 12;

/** Keeps the angles in range (azimuth in (-180, 180], elevation in [-89, 89]) and the zoom in its bounds */
export const clampCamera = (camera: Chart3DCameraState): Chart3DCameraState => {
  let azimuth = camera.azimuth % 360;
  if (azimuth > 180) azimuth -= 360;
  if (azimuth <= -180) azimuth += 360;
  return {
    azimuth,
    elevation: Math.max(-89, Math.min(89, camera.elevation)),
    zoom: Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, camera.zoom)),
    pan: [camera.pan[0], camera.pan[1]],
    projection: camera.projection,
  };
};

/** Direction from the box center to the camera */
export const eyeDirection = (azimuth: number, elevation: number): Vec3 => {
  const a = azimuth * DEG;
  const e = elevation * DEG;
  return [Math.cos(e) * Math.sin(a), -Math.cos(e) * Math.cos(a), Math.sin(e)];
};

/** Area the box is fitted into, in CSS pixels of the stage */
export interface FitRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

/** Everything the renderers, the overlay and the picking need for a frame */
export interface CameraFrame {
  /** World -> clip */
  viewProj: Mat4;
  /** Clip -> world (`null` when degenerate) */
  inverse: Mat4 | null;
  /** Camera position (orthographic: far along the view direction) */
  eye: Vec3;
  /** Unit vector from the camera into the scene */
  forward: Vec3;
  /** Screen right / up in world space */
  right: Vec3;
  up: Vec3;
  orthographic: boolean;
  /** Distance of the camera to the box center */
  distance: number;
  /** Radius of the sphere around the box */
  radius: number;
  /** Stage size in CSS pixels */
  width: number;
  height: number;
}

/**
 * Camera matrices of a box with half extents `half`, fitted into `fit`
 * (inside a `width × height` stage), then zoomed and panned.
 */
export const cameraFrame = (
  camera: Chart3DCameraState,
  half: Vec3,
  width: number,
  height: number,
  fit: FitRect,
  fovDegrees = 32,
): CameraFrame => {
  const radius = Math.hypot(half[0], half[1], half[2]) || 1;
  const fov = Math.max(5, Math.min(120, fovDegrees)) * DEG;
  const orthographic =
    (camera.projection as Chart3DProjection) === "orthographic";
  const distance = radius / Math.sin(fov / 2);
  const dir = eyeDirection(camera.azimuth, camera.elevation);
  const eye: Vec3 = [dir[0] * distance, dir[1] * distance, dir[2] * distance];
  const view = lookAt(eye, [0, 0, 0], [0, 0, 1]);
  const near = Math.max(distance - radius * 2, distance * 0.05);
  const far = distance + radius * 2;
  const aspect = Math.max(1e-6, width / Math.max(1, height));
  // the bounding sphere spans the full clip height before the fit scale
  const projection = orthographic
    ? orthographic3(radius * aspect, radius, near, far)
    : perspective(fov, aspect, near, far);
  // fit the box into the fit rectangle with extents that do not depend on
  // the azimuth (no size change while turning): horizontally the diagonal of
  // the floor, vertically the height and the floor seen at the elevation
  const floor = Math.hypot(half[0], half[1]);
  const el = Math.abs(camera.elevation) * DEG;
  const vertical = half[2] * Math.cos(el) + floor * Math.sin(el);
  const margin = orthographic ? 1.02 : 1.12;
  const fitScale =
    Math.min(
      fit.height / Math.max(1e-6, height * (vertical / radius) * margin),
      fit.width / Math.max(1e-6, height * (floor / radius) * margin),
    ) * camera.zoom;
  const scaleX = fitScale;
  const scaleY = fitScale;
  const cx = fit.x + fit.width / 2 + camera.pan[0] * fit.height;
  const cy = fit.y + fit.height / 2 + camera.pan[1] * fit.height;
  const offsetX = (cx / Math.max(1, width)) * 2 - 1;
  const offsetY = 1 - (cy / Math.max(1, height)) * 2;
  const ndc = new Float32Array(16);
  ndc[0] = scaleX;
  ndc[5] = scaleY;
  ndc[10] = 1;
  ndc[15] = 1;
  ndc[12] = offsetX;
  ndc[13] = offsetY;
  const viewProj = multiply(ndc, multiply(projection, view));
  const forward = normalize([-dir[0], -dir[1], -dir[2]]);
  const right = normalize(cross(forward, [0, 0, 1]));
  const up = cross(right, forward);
  return {
    viewProj,
    inverse: invert(viewProj),
    eye,
    forward,
    right,
    up,
    orthographic,
    distance,
    radius,
    width,
    height,
  };
};

const orthographic3 = (
  halfWidth: number,
  halfHeight: number,
  near: number,
  far: number,
) => orthographic(-halfWidth, halfWidth, -halfHeight, halfHeight, near, far);

/** A world point on the stage: CSS pixels and the clip `w` (larger is farther in perspective) */
export interface ScreenPoint {
  x: number;
  y: number;
  /** Normalized depth: -1 near … 1 far */
  depth: number;
  /** In front of the camera */
  visible: boolean;
}

export const project = (
  frame: CameraFrame,
  x: number,
  y: number,
  z: number,
): ScreenPoint => {
  const [cx, cy, cz, cw] = transform(frame.viewProj, x, y, z);
  const w = cw === 0 ? 1e-9 : cw;
  return {
    x: ((cx / w + 1) / 2) * frame.width,
    y: ((1 - cy / w) / 2) * frame.height,
    depth: cz / w,
    visible: cw > 0,
  };
};

/** Ray under a stage pixel, in world space */
export interface Ray {
  origin: Vec3;
  dir: Vec3;
}

export const screenRay = (
  frame: CameraFrame,
  sx: number,
  sy: number,
): Ray | null => {
  if (!frame.inverse) return null;
  const nx = (sx / Math.max(1, frame.width)) * 2 - 1;
  const ny = 1 - (sy / Math.max(1, frame.height)) * 2;
  const unproject = (z: number): Vec3 => {
    const [x, y, zz, w] = transform(frame.inverse!, nx, ny, z);
    return [x / w, y / w, zz / w];
  };
  const a = unproject(-1);
  const b = unproject(1);
  return { origin: a, dir: normalize(sub(b, a)) };
};

/**
 * Distance along the ray to an axis-aligned box (slab test), `Infinity`
 * when missed
 */
export const rayBox = (ray: Ray, min: Vec3, max: Vec3): number => {
  let t0 = -Infinity;
  let t1 = Infinity;
  for (let i = 0; i < 3; i++) {
    const o = ray.origin[i];
    const d = ray.dir[i];
    if (Math.abs(d) < 1e-12) {
      if (o < min[i] || o > max[i]) return Infinity;
      continue;
    }
    let a = (min[i] - o) / d;
    let b = (max[i] - o) / d;
    if (a > b) [a, b] = [b, a];
    if (a > t0) t0 = a;
    if (b < t1) t1 = b;
    if (t0 > t1) return Infinity;
  }
  if (t1 < 0) return Infinity;
  return t0 >= 0 ? t0 : t1;
};

/** Möller–Trumbore ray / triangle distance, `Infinity` when missed */
export const rayTriangle = (
  ray: Ray,
  ax: number,
  ay: number,
  az: number,
  bx: number,
  by: number,
  bz: number,
  cx: number,
  cy: number,
  cz: number,
): number => {
  const e1x = bx - ax,
    e1y = by - ay,
    e1z = bz - az;
  const e2x = cx - ax,
    e2y = cy - ay,
    e2z = cz - az;
  const [dx, dy, dz] = ray.dir;
  const px = dy * e2z - dz * e2y;
  const py = dz * e2x - dx * e2z;
  const pz = dx * e2y - dy * e2x;
  const det = e1x * px + e1y * py + e1z * pz;
  if (Math.abs(det) < 1e-12) return Infinity;
  const inv = 1 / det;
  const tx = ray.origin[0] - ax;
  const ty = ray.origin[1] - ay;
  const tz = ray.origin[2] - az;
  const u = (tx * px + ty * py + tz * pz) * inv;
  if (u < 0 || u > 1) return Infinity;
  const qx = ty * e1z - tz * e1y;
  const qy = tz * e1x - tx * e1z;
  const qz = tx * e1y - ty * e1x;
  const v = (dx * qx + dy * qy + dz * qz) * inv;
  if (v < 0 || u + v > 1) return Infinity;
  const t = (e2x * qx + e2y * qy + e2z * qz) * inv;
  return t >= 0 ? t : Infinity;
};
