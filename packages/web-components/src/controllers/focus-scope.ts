import type { ReactiveController, ReactiveControllerHost } from "lit";
import {
  contains,
  createFocusScope,
  getActiveElement,
  type FocusScope,
  type FocusScopeOptions,
} from "@minerva/dom";

/**
 * Lit wrapper of core's `createFocusScope` (auto-focus, optional trap with
 * Tab looping, focus restoration). Core walks the flat tree, so a container
 * in a shadow root includes the content slotted into it.
 */
export class FocusScopeController implements ReactiveController {
  private scope: FocusScope | null = null;
  private container: HTMLElement | null = null;

  constructor(
    host: ReactiveControllerHost,
    private readonly options: () => FocusScopeOptions,
  ) {
    host.addController(this);
  }

  activate(container: HTMLElement): void {
    if (this.scope && this.container === container) return;
    this.deactivate();
    this.container = container;
    this.scope = createFocusScope(container, this.options());
    this.scope.activate();
  }

  /**
   * Stops the scope; focus is restored per the `restoreFocus` option.
   * Focus still inside the container is released first: slotted content
   * stays connected when an element hides its panel (unlike unmounted React
   * content), and core only restores focus once it left the container.
   */
  deactivate(): void {
    const container = this.container;
    const active = container ? getActiveElement(document) : null;
    if (container && active && contains(container, active)) {
      (active as HTMLElement).blur?.();
    }
    this.scope?.deactivate();
    this.scope = null;
    this.container = null;
  }

  get active(): boolean {
    return this.scope !== null;
  }

  hostDisconnected(): void {
    this.deactivate();
  }
}
