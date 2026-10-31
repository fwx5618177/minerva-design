import {
  ICON_RENDERER_PREFERENCES,
  type IconRendererKind,
} from "minerva-design/icons/core";
import { setHostAttribute } from "../../internal/hydration";

/**
 * Backend preference of an icon canvas: `auto` (the page default set with
 * `setDefaultIconRenderer`), or the backend tried first (falling back along
 * WebGPU, WebGL2, WebGL, Canvas2D)
 */
export type IconCanvasRenderer =
  "auto" | "webgpu" | "webgl2" | "webgl" | "canvas2d";

/** How `<minerva-icon>` draws: inline SVG, or a canvas with a backend preference */
export type IconRenderer =
  "svg" | "auto" | "webgpu" | "webgl2" | "webgl" | "canvas2d";

const CANVAS_RENDERERS: ReadonlySet<string> = new Set<IconCanvasRenderer>(
  ICON_RENDERER_PREFERENCES,
);

/** The canvas preference of an attribute value; `null` for "svg" and unknown values */
export const canvasRenderer = (
  value: string | null | undefined,
): IconCanvasRenderer | null =>
  value && CANVAS_RENDERERS.has(value) ? (value as IconCanvasRenderer) : null;

/**
 * Mirrors the backend drawing an element's canvas as its `data-renderer`
 * host attribute (hydration-safe) and reports each change once.
 */
export class RendererReporter {
  private kind: IconRendererKind | null = null;
  private readonly host: HTMLElement;
  private readonly changed: (kind: IconRendererKind) => void;

  constructor(host: HTMLElement, changed: (kind: IconRendererKind) => void) {
    this.host = host;
    this.changed = changed;
  }

  get current(): IconRendererKind | null {
    return this.kind;
  }

  report(kind: IconRendererKind): void {
    if (this.kind === kind) return;
    this.kind = kind;
    setHostAttribute(this.host, "data-renderer", kind);
    this.changed(kind);
  }

  /** Nothing draws anymore (SVG mode, no icon, disconnected) */
  clear(): void {
    if (!this.kind) return;
    this.kind = null;
    setHostAttribute(this.host, "data-renderer", null);
  }
}
