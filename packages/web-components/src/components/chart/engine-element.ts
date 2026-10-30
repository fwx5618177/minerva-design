import { css, html, type PropertyValues } from "lit";
import { property } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import { MinervaElement, hostStyles } from "../../internal/minerva-element";

/**
 * What a chart engine factory of `minerva-design/charts/core` returns
 * (`createChart`, `createShapeChart`, ...): options can be replaced, the
 * instance destroyed.
 */
export interface EngineInstance<O> {
  setOptions(options: O): void;
  destroy(): void;
}

const cssLength = (value: string | number) =>
  typeof value === "number" || /^\d+(\.\d+)?$/.test(value)
    ? `${value}px`
    : value;

/**
 * Base of the chart elements: mounts an engine of
 * `minerva-design/charts/core` into a sized surface of the shadow root once
 * the element is rendered and connected, passes the new options on every
 * property change, and destroys it when the element is disconnected (a
 * reconnected element creates a new engine). Nothing runs on the server.
 *
 * A subclass names the factory (`createEngine`), turns its properties into
 * engine options (`engineOptions`, `null` while there is nothing to draw)
 * and forwards the engine events (`bindEngine`).
 */
export abstract class MinervaEngineElement<
  O,
  I extends EngineInstance<O>,
> extends MinervaElement {
  static override styles = [
    hostStyles,
    css`
      :host {
        display: block;
        width: 100%;
      }
      .root {
        position: relative;
        width: 100%;
      }
      .surface {
        position: absolute;
        inset: 0;
      }
    `,
  ];

  /** Height of the chart, the legend included: pixels or any CSS length (default 320, sparkline 48, gauge 240) */
  @property()
  height?: string | number;

  private engine: I | null = null;
  private offs: Array<() => void> = [];

  /** The engine instance (`minerva-design/charts/core`), `null` until the element is rendered and connected */
  get instance(): I | null {
    return this.engine;
  }

  /** Height used when the `height` attribute is not set */
  protected get defaultHeight(): string | number {
    return 320;
  }

  /** Creates the engine (e.g. `createChart(container, options)`) */
  protected abstract createEngine(container: HTMLElement, options: O): I;

  /** Engine options of the current properties; `null` while there is nothing to draw */
  protected abstract engineOptions(): O | null;

  /** Subscribes to the engine events; returns the unsubscribe functions */
  protected bindEngine?(engine: I): Array<() => void>;

  /** Called once the engine is created (e.g. to pass data streamed apart from the options) */
  protected engineMounted?(engine: I): void;

  /**
   * Applies a property change to the live engine; replaces the default
   * (`setOptions` with the new engine options) when data such as an order
   * book is passed through its own engine method
   */
  protected syncEngine?(engine: I, changed: PropertyValues): void;

  override connectedCallback(): void {
    super.connectedCallback();
    if (this.hasUpdated) this.mountEngine();
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.unmountEngine();
  }

  protected override updated(changed: PropertyValues): void {
    super.updated(changed);
    if (!this.engine) {
      this.mountEngine();
      return;
    }
    // the height only resizes the surface (the engine observes its size)
    if ([...changed.keys()].every((key) => key === "height")) return;
    if (this.syncEngine) {
      this.syncEngine(this.engine, changed);
      return;
    }
    const options = this.engineOptions();
    if (options) this.engine.setOptions(options);
  }

  private mountEngine(): void {
    if (this.engine || !this.isConnected) return;
    const surface =
      this.renderRoot.querySelector<HTMLElement>("[part=surface]");
    const options = surface ? this.engineOptions() : null;
    if (!surface || !options) return;
    const engine = this.createEngine(surface, options);
    this.engine = engine;
    this.offs = this.bindEngine?.(engine) ?? [];
    this.engineMounted?.(engine);
  }

  private unmountEngine(): void {
    for (const off of this.offs) off();
    this.offs = [];
    this.engine?.destroy();
    this.engine = null;
  }

  protected override render() {
    return html`<div
      part="root"
      class="root"
      style=${styleMap({ height: cssLength(this.height ?? this.defaultHeight) })}
    >
      <div part="surface" class="surface"></div>
    </div>`;
  }
}
