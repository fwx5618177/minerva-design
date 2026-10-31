import { css, html, nothing, svg, type PropertyValues } from "lit";
import { property } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { styleMap } from "lit/directives/style-map.js";
import {
  createIconSurface,
  getIcon,
  type IconDefinition,
  type IconRendererKind,
  type IconSurface,
  type IconSurfaceOptions,
} from "minerva-design/icons/core";
import { DEV, devWarn } from "../../internal/dev";
import { MinervaElement, hostStyles } from "../../internal/minerva-element";
import {
  RendererReporter,
  canvasRenderer,
  type IconRenderer,
} from "./renderer";

const DEFAULT_SIZE = 24;
const DEFAULT_STROKE_WIDTH = 2;

const positive = (value: number | undefined, fallback: number) =>
  typeof value === "number" && Number.isFinite(value) && value > 0
    ? value
    : fallback;

/**
 * An icon of minerva-design/icons (the `<Icon>` of React): inline SVG by
 * default (crisp at any size, styled by CSS, server-renderable), or a
 * canvas drawn with WebGPU, WebGL2, WebGL or Canvas2D (`renderer`) by a
 * backend shared by every canvas icon of the page. Set a built-in icon by
 * `name` (`search`, `arrow-up`...) or any icon, custom ones made with
 * `defineIcon` included, as the `icon` property. The stroke follows the
 * text color unless `color` is set.
 *
 * Without `label` the icon is decorative (hidden from assistive
 * technologies); with one it is an image with that accessible name. In
 * canvas mode the host gets `data-renderer` with the backend drawing.
 *
 * Published as the optional entry `minerva-design/web-components/icon`
 * (not part of the all-in-one entry nor the CDN bundle: it loads the icon
 * set `minerva-design/icons/core`).
 *
 * @summary Icon of the Minerva icon set, as inline SVG or on a GPU canvas.
 * @tag minerva-icon
 * @fires minerva-renderer-change - Canvas mode: the backend drew the icon (or fell back after a GPU loss); detail: { renderer }
 * @csspart icon - The <svg> (or the <canvas> in canvas mode) drawing the icon
 */
export class MinervaIcon extends MinervaElement {
  static override tagName = "minerva-icon";
  static override styles = [
    hostStyles,
    css`
      :host {
        display: inline-flex;
        flex: none;
        align-items: center;
        justify-content: center;
        vertical-align: middle;
        line-height: 0;
      }
      svg,
      canvas {
        display: block;
      }
    `,
  ];

  /** Name of a built-in icon (`search`, `arrow-up`...); the `icon` property wins over it */
  @property()
  name?: string;

  /** Icon definition (a built-in icon constant, or a custom icon of `defineIcon`); wins over `name`; property only */
  @property({ attribute: false })
  icon?: IconDefinition;

  /** Width and height in pixels */
  @property({ type: Number })
  size = 24;

  /** Stroke color, any CSS color (`currentColor` follows the text color) */
  @property()
  color = "currentColor";

  /** Stroke width on the 24×24 grid (scales with the size unless `absolute-stroke-width`) */
  @property({ type: Number, attribute: "stroke-width" })
  strokeWidth = 2;

  /** Keeps the stroke width in pixels whatever the size */
  @property({ type: Boolean, attribute: "absolute-stroke-width" })
  absoluteStrokeWidth = false;

  /** Accessible name: the icon becomes an image (role=img); without it the icon is hidden from assistive technologies */
  @property()
  label?: string;

  /** `svg` (inline SVG), or a canvas drawn with the backend preference (`auto` follows the page default) */
  @property()
  renderer: IconRenderer = "svg";

  private surface: IconSurface | null = null;
  private surfaceCanvas: HTMLCanvasElement | null = null;
  private readonly drawn = new RendererReporter(this, (renderer) =>
    this.emit("minerva-renderer-change", { renderer }),
  );

  /** Backend drawing the canvas (`webgpu`, `webgl2`, `webgl`, `canvas2d`); `null` in SVG mode or until drawn */
  getRenderer(): IconRendererKind | null {
    return this.drawn.current;
  }

  private definition(): IconDefinition | undefined {
    if (this.icon) return this.icon;
    if (!this.name) return undefined;
    const icon = getIcon(this.name);
    if (!icon && DEV) {
      devWarn(
        MinervaIcon.tagName,
        `unknown icon name "${this.name}": nothing is rendered (see icons of minerva-design/icons/core).`,
      );
    }
    return icon;
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.releaseSurface();
  }

  protected override updated(changed: PropertyValues): void {
    super.updated(changed);
    this.syncSurface();
  }

  /** Creates, updates or releases the canvas surface after a render */
  private syncSurface(): void {
    const canvas =
      this.renderRoot.querySelector<HTMLCanvasElement>("canvas[part=icon]");
    const icon = this.definition();
    const renderer = canvasRenderer(this.renderer);
    if (!this.isConnected || !canvas || !icon || !renderer) {
      this.releaseSurface();
      return;
    }
    if (this.surfaceCanvas !== canvas) this.releaseSurface();
    const size = positive(this.size, DEFAULT_SIZE);
    const strokeWidth = positive(this.strokeWidth, DEFAULT_STROKE_WIDTH);
    const options: IconSurfaceOptions = {
      icon,
      size,
      color: this.color || "currentColor",
      strokeWidth: this.absoluteStrokeWidth
        ? (strokeWidth * 24) / size
        : strokeWidth,
      renderer,
      onRendererChange: (kind) => this.drawn.report(kind),
    };
    if (this.surface) {
      this.surface.update(options);
    } else {
      this.surface = createIconSurface(canvas, options);
      this.surfaceCanvas = canvas;
    }
  }

  private releaseSurface(): void {
    this.surface?.destroy();
    this.surface = null;
    this.surfaceCanvas = null;
    this.drawn.clear();
  }

  protected override render() {
    const icon = this.definition();
    if (!icon) return nothing;
    const size = positive(this.size, DEFAULT_SIZE);
    const label = this.label || undefined;
    if (canvasRenderer(this.renderer)) {
      return html`<canvas
        part="icon"
        data-icon=${icon.name}
        role=${ifDefined(label && "img")}
        aria-label=${ifDefined(label)}
        aria-hidden=${ifDefined(label ? undefined : "true")}
        style=${styleMap({ width: `${size}px`, height: `${size}px` })}
      ></canvas>`;
    }
    const scaling = this.absoluteStrokeWidth ? "non-scaling-stroke" : undefined;
    return html`<svg
      part="icon"
      xmlns="http://www.w3.org/2000/svg"
      width=${size}
      height=${size}
      viewBox="0 0 24 24"
      fill="none"
      stroke=${this.color || "currentColor"}
      stroke-width=${positive(this.strokeWidth, DEFAULT_STROKE_WIDTH)}
      stroke-linecap="round"
      stroke-linejoin="round"
      data-icon=${icon.name}
      role=${ifDefined(label && "img")}
      aria-label=${ifDefined(label)}
      aria-hidden=${ifDefined(label ? undefined : "true")}
    >
      ${label ? svg`<title>${label}</title>` : nothing}
      ${icon.paths.map(
        (d) => svg`<path d=${d} vector-effect=${ifDefined(scaling)}></path>`,
      )}
    </svg>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "minerva-icon": MinervaIcon;
  }
}
