import type { ReactiveController, ReactiveControllerHost } from "lit";
import {
  createRovingFocus,
  type RovingFocus,
  type RovingFocusOptions,
} from "@minerva/dom";

/**
 * Lit wrapper of core's `createRovingFocus` (one tabbable item, arrow keys /
 * Home / End / optional typeahead). Items may be light DOM children (e.g.
 * `<minerva-tab>`) or shadow internals; call `refresh()` after they change.
 */
export class RovingFocusController implements ReactiveController {
  private roving: RovingFocus | null = null;
  private container: HTMLElement | null = null;

  constructor(
    host: ReactiveControllerHost,
    private readonly options: () => RovingFocusOptions,
  ) {
    host.addController(this);
  }

  attach(container: HTMLElement): void {
    if (this.container === container && this.roving) return;
    this.detach();
    this.container = container;
    this.roving = createRovingFocus(container, this.options());
  }

  detach(): void {
    this.roving?.destroy();
    this.roving = null;
    this.container = null;
  }

  refresh(): void {
    this.roving?.refresh();
  }

  setActive(item: HTMLElement | number, options?: { focus?: boolean }): void {
    this.roving?.setActive(item, options);
  }

  getActive(): HTMLElement | null {
    return this.roving?.getActive() ?? null;
  }

  hostDisconnected(): void {
    this.detach();
  }
}
