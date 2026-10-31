// Canvas2D drawing of a single icon: native strokes, same result as the SVG.

import { flattenIconPath } from "./path";
import { iconPathData } from "./svg";
import type { DrawIconOptions, IconDefinition } from "./types";

const paths = new WeakMap<IconDefinition, Path2D | null>();

const hasPath2D = () =>
  typeof Path2D === "function" &&
  (() => {
    try {
      // some environments (old WebViews, mini-programs) lack the SVG constructor
      new Path2D("M0 0L1 1");
      return true;
    } catch {
      return false;
    }
  })();

let path2dSupport: boolean | undefined;

const path2d = (icon: IconDefinition): Path2D | null => {
  path2dSupport ??= hasPath2D();
  if (!path2dSupport) return null;
  let path = paths.get(icon);
  if (path === undefined) {
    try {
      path = new Path2D(iconPathData(icon));
    } catch {
      path = null;
    }
    paths.set(icon, path);
  }
  return path;
};

/** Minimal 2D context drawIcon needs (DOM, OffscreenCanvas, mini-program canvases) */
export type IconDrawingContext = Pick<
  CanvasRenderingContext2D,
  | "save"
  | "restore"
  | "translate"
  | "rotate"
  | "scale"
  | "beginPath"
  | "moveTo"
  | "lineTo"
  | "closePath"
  | "stroke"
  | "strokeStyle"
  | "lineWidth"
  | "lineCap"
  | "lineJoin"
  | "globalAlpha"
>;

/**
 * Draws an icon on a 2D context, `size` units wide from (`x`, `y`), in the
 * context's current transform. One stroke for the whole icon, so translucent
 * colors don't darken where parts overlap. `currentColor` is not known to a
 * canvas: pass a color (black by default).
 */
export function drawIcon(
  ctx: IconDrawingContext,
  icon: IconDefinition,
  options: DrawIconOptions = {},
): void {
  const {
    x = 0,
    y = 0,
    size = 24,
    color,
    strokeWidth = 2,
    rotation = 0,
    opacity = 1,
  } = options;
  if (size <= 0 || strokeWidth <= 0 || opacity <= 0) return;
  ctx.save();
  ctx.translate(x + size / 2, y + size / 2);
  if (rotation) ctx.rotate((rotation * Math.PI) / 180);
  const scale = size / 24;
  ctx.scale(scale, scale);
  ctx.translate(-12, -12);
  ctx.globalAlpha *= Math.min(1, opacity);
  ctx.strokeStyle =
    !color || color.toLowerCase() === "currentcolor" ? "#000" : color;
  ctx.lineWidth = strokeWidth;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  const path = path2d(icon);
  if (path) {
    (ctx as CanvasRenderingContext2D).stroke(path);
  } else {
    // flattened finely enough for the drawn size
    const tolerance = Math.min(0.1, 0.2 / Math.max(scale, 0.01));
    ctx.beginPath();
    for (const d of icon.paths) {
      for (const line of flattenIconPath(d, tolerance)) {
        const p = line.points;
        ctx.moveTo(p[0]!, p[1]!);
        for (let i = 2; i < p.length; i += 2) ctx.lineTo(p[i]!, p[i + 1]!);
        if (line.closed) ctx.closePath();
      }
    }
    ctx.stroke();
  }
  ctx.restore();
}
