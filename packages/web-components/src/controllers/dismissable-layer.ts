import type { ReactiveController, ReactiveControllerHost } from "lit";
import {
  createDismissableLayer,
  type DismissableLayer,
  type DismissableLayerOptions,
} from "@minerva/core";

/**
 * Lit wrapper of core's `createDismissableLayer`: while active, the element
 * is a layer of the global stack (Escape only reaches the topmost layer,
 * pointer down / focus outside the layer and its branches dismiss it,
 * optional modal pointer blocking). Same stack as the React library's React
 * overlays, so mixed React / Web Component overlays nest correctly.
 */
export class DismissableLayerController implements ReactiveController {
  private layer: DismissableLayer | null = null;

  constructor(
    host: ReactiveControllerHost,
    private readonly options: () => DismissableLayerOptions,
  ) {
    host.addController(this);
  }

  /** Registers `element` as a layer (no-op when already active on it). */
  activate(element: Element): void {
    if (this.layer?.element === element) {
      this.layer.update(this.options());
      return;
    }
    this.deactivate();
    this.layer = createDismissableLayer(element, this.options());
  }

  /** Removes the layer from the stack. */
  deactivate(): void {
    this.layer?.destroy();
    this.layer = null;
  }

  get active(): boolean {
    return this.layer !== null;
  }

  hostDisconnected(): void {
    this.deactivate();
  }
}
