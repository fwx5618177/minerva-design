import { css, html, type PropertyValues } from "lit";
import { property } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { styleMap } from "lit/directives/style-map.js";
import {
  createIconCanvas,
  type IconCanvasController,
  type IconCanvasItem,
  type IconCanvasOptions,
  type IconRendererKind,
} from "minerva-design/icons/core";
import { MinervaElement, hostStyles } from "../../internal/minerva-element";
import {
  RendererReporter,
  canvasRenderer,
  type IconCanvasRenderer,
} from "./renderer";

const positive = (value: number | undefined) =>
  typeof value === "number" && Number.isFinite(value) && value > 0
    ? value
    : undefined;

/** CSS size of a `width` / `height` value (a number is in pixels) */
const cssSize = (value: number | string | undefined, fallback: string) => {
  if (typeof value === "number") {
    return Number.isFinite(value) && value >= 0 ? `${value}px` : fallback;
  }
  return value?.trim() || fallback;
};

/** `width="320"` is 320 pixels, `width="50%"` any CSS size */
const lengthConverter = {
  fromAttribute: (value: string | null): number | string | undefined =>
    value === null
      ? undefined
      : /^\s*\d+(\.\d+)?\s*$/.test(value)
        ? Number(value)
        : value,
  toAttribute: (value: number | string | undefined) =>
    value === undefined ? null : String(value),
};

/** Options passed on to the canvas when they change */
const SETTINGS = ["renderer", "pixelRatio"];

/**
 * Many icons of minerva-design/icons on one canvas (the `<IconCanvas>` of
 * React): one instanced GPU draw per run of identical icons (WebGPU, WebGL2,
 * WebGL) or Canvas2D, for dense pictures, maps, particles or animations of
 * thousands of icons; for icons in the UI use `<minerva-icon>`. Set the
 * icons (`IconCanvasItem`: `icon`, `x`, `y`, `size`, `color`, `rotation`,
 * `opacity`...) as the `items` property; replace the array to redraw.
 *
 * The canvas fills a box of `width` × `height` (100% × 240 pixels by
 * default; a number is in pixels, any CSS size works) and follows its size.
 * With `renderer` `auto` it follows the page default
 * (`setDefaultIconRenderer`) live. The host gets `data-renderer` with the
 * backend drawing.
 *
 * Published as the optional entry `minerva-design/web-components/icon`.
 *
 * @summary Thousands of icons on one GPU canvas.
 * @tag minerva-icon-canvas
 * @fires minerva-renderer-change - The backend started (or fell back after a GPU loss); detail: { renderer }
 * @csspart surface - The box the canvas is drawn in (role=img when labelled)
 */
export class MinervaIconCanvas extends MinervaElement {
  static override tagName = "minerva-icon-canvas";
  static override styles = [
    hostStyles,
    css`
      :host {
        display: block;
        position: relative;
      }
      .surface {
        position: relative;
        max-width: 100%;
      }
    `,
  ];

  /** Icons to draw, in painting order (later ones on top); replace the array to redraw; property only */
  @property({ attribute: false })
  items: readonly IconCanvasItem[] = [];

  /** Backend preference (`auto` follows the page default) */
  @property()
  renderer: IconCanvasRenderer = "auto";

  /** Width of the canvas box: a number is in pixels, or any CSS size */
  @property({ converter: lengthConverter })
  width: number | string = "100%";

  /** Height of the canvas box: a number is in pixels, or any CSS size */
  @property({ converter: lengthConverter })
  height: number | string = 240;

  /** Device pixel ratio of the canvas; by default the screen's */
  @property({ type: Number, attribute: "pixel-ratio" })
  pixelRatio?: number;

  /** Accessible name of the picture (role=img); without it the canvas is hidden from assistive technologies */
  @property()
  label?: string;

  private controller: IconCanvasController | null = null;
  private readonly drawn = new RendererReporter(this, (renderer) =>
    this.emit("minerva-renderer-change", { renderer }),
  );

  /** The `<canvas>` drawn into, `null` until the element is rendered and connected */
  get canvas(): HTMLCanvasElement | null {
    return this.controller?.canvas ?? null;
  }

  /** Backend drawing (`webgpu`, `webgl2`, `webgl`, `canvas2d`), `null` until it started */
  getRenderer(): IconRendererKind | null {
    return this.controller?.renderer ?? null;
  }

  /** Resolves with the backend once it started and the current items are drawn; rejects when the element is not connected or no backend can start */
  async ready(): Promise<IconRendererKind> {
    await this.updateComplete;
    if (!this.controller) {
      throw new Error("<minerva-icon-canvas> is not connected");
    }
    return this.controller.ready();
  }

  private settings(): Omit<IconCanvasOptions, "items"> {
    return {
      renderer: canvasRenderer(this.renderer) ?? "auto",
      pixelRatio: positive(this.pixelRatio),
    };
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.controller?.destroy();
    this.controller = null;
    this.drawn.clear();
  }

  protected override updated(changed: PropertyValues): void {
    super.updated(changed);
    if (!this.controller) {
      this.mount();
      return;
    }
    if (changed.has("items")) this.controller.setItems(this.items ?? []);
    if (SETTINGS.some((key) => changed.has(key))) {
      this.controller.setOptions(this.settings());
    }
  }

  private mount(): void {
    if (this.controller || !this.isConnected) return;
    const surface =
      this.renderRoot.querySelector<HTMLElement>("[part=surface]");
    if (!surface) return;
    this.controller = createIconCanvas(surface, {
      ...this.settings(),
      items: this.items ?? [],
      onRendererChange: (kind) => this.drawn.report(kind),
    });
  }

  protected override render() {
    const label = this.label || undefined;
    return html`<div
      part="surface"
      class="surface"
      role=${ifDefined(label && "img")}
      aria-label=${ifDefined(label)}
      aria-hidden=${ifDefined(label ? undefined : "true")}
      style=${styleMap({
        width: cssSize(this.width, "100%"),
        height: cssSize(this.height, "240px"),
      })}
    ></div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "minerva-icon-canvas": MinervaIconCanvas;
  }
}
