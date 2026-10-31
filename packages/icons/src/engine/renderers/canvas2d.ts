// Canvas2D backend: native strokes (drawIcon), works everywhere.

import { drawIcon } from "../canvas2d";
import type { Rgba } from "../color";
import { pixelSize } from "./batch";
import type { IconBackend, IconFrame } from "./types";

export const cssColor = ([r, g, b, a]: Rgba): string =>
  `rgba(${Math.round(r * 255)}, ${Math.round(g * 255)}, ${Math.round(b * 255)}, ${a})`;

export function createCanvas2dBackend(
  canvas: HTMLCanvasElement,
): IconBackend | null {
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;
  return {
    kind: "canvas2d",
    canvas,
    render(frame: IconFrame) {
      const [width, height] = pixelSize(frame);
      if (canvas.width !== width) canvas.width = width;
      if (canvas.height !== height) canvas.height = height;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, width, height);
      ctx.setTransform(frame.dpr, 0, 0, frame.dpr, 0, 0);
      for (const item of frame.items) {
        drawIcon(ctx, item.icon, {
          x: item.x,
          y: item.y,
          size: item.size,
          strokeWidth: item.strokeWidth,
          rotation: (item.rotation * 180) / Math.PI,
          color: cssColor(item.color),
        });
      }
    },
    destroy() {
      canvas.width = canvas.height = 0;
    },
  };
}
