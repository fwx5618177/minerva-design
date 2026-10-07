import type { ReactiveController, ReactiveControllerHost } from "lit";
import { waitForExitAnimation } from "@minerva/core";

/**
 * Keeps an overlay rendered while its exit animation runs (lib-core's
 * `usePresence`): `present` turns true when `open` does, and false once the
 * CSS animation / transition of the element returned by `getElement` has
 * ended after closing (immediately when there is none).
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
