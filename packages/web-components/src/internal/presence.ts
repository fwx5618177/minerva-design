import type { ReactiveController, ReactiveControllerHost } from "lit";
import { waitForExitAnimation } from "@minerva/dom";

/**
 * Keeps an overlay rendered while its exit animation runs (the React library's
 * `usePresence`): `present` turns true when `open` does, and false once the
 * CSS animation / transition of the element returned by `getElement` has
 * ended after closing. The element gets `data-state="closed"` before its
 * animation is measured (what React measures after its commit); without
 * an exit animation (none declared, reduced motion, test DOM) `present`
 * turns false right after the closing update (a microtask, no timer), once
 * the overlay released focus and its layers.
 */
export class PresenceController implements ReactiveController {
  /** Whether the overlay should be rendered */
  present = false;
  private token = 0;

  constructor(
    private readonly host: ReactiveControllerHost,
    private readonly getElement: () => Element | null | undefined,
  ) {
    host.addController(this);
  }

  /** Call from `willUpdate` with the new open state. */
  sync(open: boolean): void {
    const token = ++this.token;
    if (open) {
      this.present = true;
      return;
    }
    if (!this.present) return;
    const el = this.getElement();
    if (!el) {
      this.present = false;
      return;
    }
    el.setAttribute("data-state", "closed");
    void waitForExitAnimation(el).then(() => {
      if (token !== this.token) return;
      this.present = false;
      this.host.requestUpdate();
    });
  }

  hostDisconnected(): void {
    this.token++;
    this.present = false;
  }
}
