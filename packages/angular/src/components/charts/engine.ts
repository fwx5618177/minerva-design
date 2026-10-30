import {
  afterNextRender,
  booleanAttribute,
  computed,
  DestroyRef,
  Directive,
  effect,
  ElementRef,
  inject,
  Injector,
  input,
  signal,
  untracked,
  viewChild,
} from "@angular/core";

/**
 * What a chart engine factory of `minerva-design/charts/core` returns
 * (`createChart`, `createShapeChart`, ...): options can be replaced, the
 * instance destroyed.
 */
export interface EngineInstance<O> {
  setOptions(options: O): void;
  destroy(): void;
}

const cssSize = (value: number | string) =>
  typeof value === "number" || /^\d+(\.\d+)?$/.test(value)
    ? `${value}px`
    : value;

/** `booleanAttribute` keeping `undefined` (the engine default applies) */
export const optionalBoolean = (value: unknown): boolean | undefined =>
  value === undefined || value === null ? undefined : booleanAttribute(value);

/** Template of the chart components: the surface the engine renders into */
export const CHART_SURFACE = `<div #surface style="position:absolute;inset:0"></div>`;

/**
 * Base of the chart components: mounts an engine of
 * `minerva-design/charts/core` into the `#surface` of the template after
 * the first render (browser only: nothing runs during SSR), passes new
 * options whenever an input read by `engineOptions()` changes (signals, no
 * zone needed), and destroys it with the component.
 *
 * A subclass names the factory (`createEngine`), turns its inputs into
 * engine options (`engineOptions`, `null` while there is nothing to draw)
 * and forwards the engine events (`bindEngine`).
 */
@Directive({
  host: {
    "data-minerva": "chart",
    "[style.display]": "'block'",
    "[style.position]": "'relative'",
    "[style.width]": "cssWidth()",
    "[style.height]": "cssHeight()",
  },
})
export abstract class MnChartEngine<O, I extends EngineInstance<O>> {
  /** Height of the chart (the legend included); numbers are pixels, strings any CSS length (default 320) */
  readonly height = input<number | string | undefined>(undefined);
  /** Width of the chart; numbers are pixels (default `100%`) */
  readonly width = input<number | string | undefined>(undefined);

  private readonly engine = signal<I | null>(null);
  /** The engine instance (minerva-design/charts/core), `null` before the first render */
  readonly instance = this.engine.asReadonly();

  private readonly surface =
    viewChild.required<ElementRef<HTMLElement>>("surface");
  protected readonly cssWidth = computed(() => cssSize(this.width() ?? "100%"));
  protected readonly cssHeight = computed(() =>
    cssSize(this.height() ?? this.defaultHeight()),
  );

  /** Height used when the `height` input is not set */
  protected defaultHeight(): number {
    return 320;
  }

  /** Creates the engine (e.g. `createChart(container, options)`) */
  protected abstract createEngine(container: HTMLElement, options: O): I;

  /** Engine options of the current inputs; `null` while there is nothing to draw */
  protected abstract engineOptions(): O | null;

  /** Subscribes to the engine events; returns the unsubscribe functions */
  protected bindEngine?(engine: I): Array<() => void>;

  constructor() {
    const injector = inject(Injector);
    let offs: Array<() => void> = [];
    afterNextRender(() => {
      effect(
        () => {
          const options = this.engineOptions();
          if (!options) return;
          untracked(() => {
            const current = this.engine();
            if (current) {
              current.setOptions(options);
              return;
            }
            const created = this.createEngine(
              this.surface().nativeElement,
              options,
            );
            this.engine.set(created);
            offs = this.bindEngine?.(created) ?? [];
          });
        },
        { injector },
      );
    });
    inject(DestroyRef).onDestroy(() => {
      for (const off of offs) off();
      offs = [];
      this.engine()?.destroy();
      this.engine.set(null);
    });
  }
}
