import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  effect,
  ElementRef,
  inject,
  Injector,
  input,
  output,
  untracked,
} from "@angular/core";
import {
  createIconCanvas,
  type IconCanvasController,
  type IconCanvasItem,
  type IconRendererKind,
  type IconRendererPreference,
} from "minerva-design/icons/core";
import { cssSize } from "./size";

/**
 * Many icons on one canvas: one instanced GPU draw per run of identical
 * icons (WebGPU, WebGL2, WebGL) or Canvas2D. For dense pictures, maps,
 * particles, animations of thousands of icons; for icons in the UI, use
 * `MnIcon`. With `renderer` `auto`, it follows the global default
 * (`setDefaultIconRenderer`) live.
 */
@Component({
  selector: "mn-icon-canvas",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: "minerva-icon-canvas",
    "[attr.role]": "labelled() ? 'img' : null",
    "[attr.aria-hidden]": "labelled() ? null : 'true'",
    "[attr.aria-label]": "title() || ariaLabel() || null",
    "[attr.aria-labelledby]": "ariaLabelledby() || null",
    "[attr.title]": "null",
    "[style.display]": "'block'",
    "[style.position]": "'relative'",
    "[style.width]": "cssWidth()",
    "[style.height]": "cssHeight()",
  },
  template: "",
})
export class MnIconCanvas {
  /** Icons to draw, in painting order (later ones on top), positions in CSS pixels */
  readonly items = input.required<readonly IconCanvasItem[]>();
  /** Backend preference; `auto` follows the global default */
  readonly renderer = input<IconRendererPreference>("auto");
  /** Width (a number is in pixels) */
  readonly width = input<number | string>("100%");
  /** Height (a number is in pixels) */
  readonly height = input<number | string>(240);
  /** Device pixel ratio (`window.devicePixelRatio` by default) */
  readonly pixelRatio = input<number | undefined>(undefined);
  /** Accessible name of the whole picture (`role="img"`); without it the canvas is hidden from assistive technologies */
  readonly title = input<string | undefined>(undefined);
  /** Accessible name without `title` (the picture becomes `role="img"`) */
  readonly ariaLabel = input<string | undefined>(undefined, {
    alias: "aria-label",
  });
  /** id(s) of the element(s) naming the picture (it becomes `role="img"`) */
  readonly ariaLabelledby = input<string | undefined>(undefined, {
    alias: "aria-labelledby",
  });
  /** The backend started, and again after a fallback */
  readonly rendererChange = output<IconRendererKind>();

  protected readonly labelled = computed(
    () => !!this.title() || !!this.ariaLabel() || !!this.ariaLabelledby(),
  );
  protected readonly cssWidth = computed(() => cssSize(this.width()));
  protected readonly cssHeight = computed(() => cssSize(this.height()));

  private controller: IconCanvasController | null = null;

  constructor() {
    const host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
    const injector = inject(Injector);
    afterNextRender(() => {
      const controller = createIconCanvas(host, {
        items: untracked(this.items),
        renderer: untracked(this.renderer),
        pixelRatio: untracked(this.pixelRatio),
        onRendererChange: (kind) => this.rendererChange.emit(kind),
      });
      this.controller = controller;
      effect(
        () => {
          const items = this.items();
          untracked(() => controller.setItems(items));
        },
        { injector },
      );
      effect(
        () => {
          const options = {
            renderer: this.renderer(),
            pixelRatio: this.pixelRatio(),
          };
          untracked(() => controller.setOptions(options));
        },
        { injector },
      );
    });
    inject(DestroyRef).onDestroy(() => {
      this.controller?.destroy();
      this.controller = null;
    });
  }

  /** The backend drawing (null until it started) */
  getRenderer(): IconRendererKind | null {
    return this.controller?.renderer ?? null;
  }

  /** The `<canvas>` element (null before the first render in the browser) */
  getCanvas(): HTMLCanvasElement | null {
    return this.controller?.canvas ?? null;
  }

  /** Resolves once the backend started and the current items are drawn */
  ready(): Promise<IconRendererKind> {
    return (
      this.controller?.ready() ??
      Promise.reject(new Error("MnIconCanvas is not mounted"))
    );
  }
}
