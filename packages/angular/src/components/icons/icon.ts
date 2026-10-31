import {
  afterNextRender,
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  Directive,
  effect,
  ElementRef,
  inject,
  Injector,
  input,
  numberAttribute,
  output,
  signal,
  untracked,
  viewChild,
  type Signal,
} from "@angular/core";
import {
  getIcon,
  type IconDefinition,
  type IconRendererKind,
  type IconRendererPreference,
  type IconSurface,
} from "minerva-design/icons/core";

type SurfaceFactory =
  typeof import("minerva-design/icons/surface").createIconSurface;

import { cssSize, numericSize } from "./size";

/** How an icon is drawn: inline SVG, or a canvas backend */
export type IconRenderer = "svg" | IconRendererPreference;

/** Template of the icon components: inline SVG, or a canvas (`renderer`) */
const ICON_TEMPLATE = `
  @if (definition(); as icon) {
    @if (renderer() === "svg") {
      <svg
        xmlns="http://www.w3.org/2000/svg"
        [attr.width]="size()"
        [attr.height]="size()"
        viewBox="0 0 24 24"
        fill="none"
        [attr.stroke]="color()"
        [attr.stroke-width]="strokeWidth()"
        stroke-linecap="round"
        stroke-linejoin="round"
        [attr.data-icon]="icon.name"
        class="minerva-icon"
        [attr.role]="labelled() ? 'img' : null"
        [attr.aria-hidden]="labelled() ? null : 'true'"
        [attr.aria-label]="ariaLabel() || null"
        [attr.aria-labelledby]="ariaLabelledby() || null"
      >
        @if (title()) {
          <title>{{ title() }}</title>
        }
        @for (d of icon.paths; track $index) {
          <path
            [attr.d]="d"
            [attr.vector-effect]="
              absoluteStrokeWidth() ? 'non-scaling-stroke' : null
            "
          />
        }
      </svg>
    } @else {
      <canvas
        #canvas
        class="minerva-icon"
        [attr.data-icon]="icon.name"
        [attr.role]="labelled() ? 'img' : null"
        [attr.aria-hidden]="labelled() ? null : 'true'"
        [attr.aria-label]="title() || ariaLabel() || null"
        [attr.aria-labelledby]="ariaLabelledby() || null"
        [style.display]="'inline-block'"
        [style.vertical-align]="'middle'"
        [style.width]="cssSize()"
        [style.height]="cssSize()"
      ></canvas>
    }
  }
`;

/**
 * Base of `MnIcon` and `MnDynamicIcon`: the style inputs, the inline SVG,
 * and the canvas mode. The host is `display: contents` (the inner `<svg>` /
 * `<canvas class="minerva-icon">` is the box, like React's `Icon`); its
 * `title` / `aria-label` / `aria-labelledby` attributes move to that element.
 *
 * The canvas renderers (`minerva-design/icons/surface`) are loaded in the
 * browser with the first canvas icon: SVG-only applications never download
 * them, and nothing runs on the server.
 */
@Directive({
  host: {
    style: "display: contents",
    "[attr.title]": "null",
    "[attr.aria-label]": "null",
    "[attr.aria-labelledby]": "null",
  },
})
export abstract class MnIconBase {
  /** Width and height (a number is in pixels; canvas renderers also follow CSS sizes such as `"1em"`) */
  readonly size = input<number | string, number | string>(24, {
    transform: numericSize,
  });
  /** Stroke color, any CSS color */
  readonly color = input<string>("currentColor");
  /** Stroke width on the 24×24 grid (scales with the size) */
  readonly strokeWidth = input<number, unknown>(2, {
    transform: numberAttribute,
  });
  /** Keeps `strokeWidth` in pixels whatever the size */
  readonly absoluteStrokeWidth = input<boolean, unknown>(false, {
    transform: booleanAttribute,
  });
  /** Accessible name: the icon becomes `role="img"`; without it (or an `aria-label`) the icon is hidden from assistive technologies */
  readonly title = input<string | undefined>(undefined);
  /** Accessible name without a `<title>` (the icon becomes `role="img"`) */
  readonly ariaLabel = input<string | undefined>(undefined, {
    alias: "aria-label",
  });
  /** id(s) of the element(s) naming the icon (the icon becomes `role="img"`) */
  readonly ariaLabelledby = input<string | undefined>(undefined, {
    alias: "aria-labelledby",
  });
  /**
   * Inline SVG (default), or a `<canvas>` drawn by a backend shared by every
   * canvas icon of the page: `auto` (the global default, see
   * `setDefaultIconRenderer`), `webgpu`, `webgl2`, `webgl` or `canvas2d`
   */
  readonly renderer = input<IconRenderer>("svg");
  /** Canvas renderers: the backend that drew the icon */
  readonly rendererChange = output<IconRendererKind>();

  /** The icon drawn (`null`: nothing is rendered) */
  protected abstract readonly definition: Signal<IconDefinition | null>;

  protected readonly labelled = computed(
    () => !!this.title() || !!this.ariaLabel() || !!this.ariaLabelledby(),
  );
  protected readonly cssSize = computed(() => cssSize(this.size()));

  private readonly canvas = viewChild<ElementRef<HTMLCanvasElement>>("canvas");
  // CSS sizes ("1em", "100%") are measured
  private readonly measured = signal<number | null>(null);
  private readonly factory = signal<SurfaceFactory | null>(null);

  constructor() {
    const injector = inject(Injector);
    let surface: IconSurface | null = null;
    let surfaceCanvas: HTMLCanvasElement | null = null;
    let disposed = false;
    const release = () => {
      surface?.destroy();
      surface = null;
      surfaceCanvas = null;
    };

    afterNextRender(() => {
      effect(
        () => {
          if (this.renderer() === "svg" || untracked(this.factory)) return;
          void import("minerva-design/icons/surface").then(
            ({ createIconSurface }) => {
              if (!disposed) this.factory.set(createIconSurface);
            },
          );
        },
        { injector },
      );

      effect(
        (onCleanup) => {
          const element = this.canvas()?.nativeElement;
          const size = this.size();
          this.measured.set(null);
          if (!element || typeof size === "number") return;
          const measure = () =>
            this.measured.set(element.getBoundingClientRect().width);
          measure();
          if (typeof ResizeObserver !== "function") return;
          const observer = new ResizeObserver(measure);
          observer.observe(element);
          onCleanup(() => observer.disconnect());
        },
        { injector },
      );

      effect(
        () => {
          const element = this.canvas()?.nativeElement;
          const create = this.factory();
          const icon = this.definition();
          const renderer = this.renderer();
          const size = this.size();
          const pixels = typeof size === "number" ? size : this.measured();
          if (renderer === "svg" || !icon || !element || !create) {
            release();
            return;
          }
          if (!pixels || pixels <= 0) return;
          const strokeWidth = this.strokeWidth();
          const options = {
            icon,
            size: pixels,
            color: this.color(),
            strokeWidth: this.absoluteStrokeWidth()
              ? (strokeWidth * 24) / pixels
              : strokeWidth,
            renderer,
            onRendererChange: (kind: IconRendererKind) =>
              this.rendererChange.emit(kind),
          };
          untracked(() => {
            if (surface && surfaceCanvas === element) {
              surface.update(options);
            } else {
              release();
              surface = create(element, options);
              surfaceCanvas = element;
            }
          });
        },
        { injector },
      );
    });

    inject(DestroyRef).onDestroy(() => {
      disposed = true;
      release();
    });
  }
}

/**
 * An icon of minerva-design/icons: inline SVG by default (crisp, styled by
 * CSS, server-rendered), or a canvas drawn with WebGPU, WebGL2, WebGL or
 * Canvas2D (`renderer`). The color follows the text color unless set.
 * Pass a built-in icon constant of `minerva-design/icons/core` (e.g.
 * `searchIcon`) or a `defineIcon` result.
 */
@Component({
  selector: "mn-icon",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: ICON_TEMPLATE,
})
export class MnIcon extends MnIconBase {
  /** The icon to draw: a built-in one (e.g. `searchIcon`) or a `defineIcon` result */
  readonly icon = input.required<IconDefinition>();

  protected readonly definition = computed<IconDefinition | null>(() =>
    this.icon(),
  );
}

/**
 * A built-in icon chosen by name at runtime (from data, a CMS…). It bundles
 * the whole set: prefer `MnIcon` with an icon constant when the icon is
 * known when writing the code.
 */
@Component({
  selector: "mn-dynamic-icon",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: ICON_TEMPLATE,
})
export class MnDynamicIcon extends MnIconBase {
  /** Name of a built-in icon (e.g. `"arrow-up"`); unknown names render nothing */
  readonly name = input.required<string>();

  protected readonly definition = computed<IconDefinition | null>(
    () => getIcon(this.name()) ?? null,
  );
}
