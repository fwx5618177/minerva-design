import type { ReactiveController, ReactiveControllerHost } from "lit";
import { hideOthers, lockScroll } from "@minerva/dom";

/**
 * Modal side effects of core: body scroll lock (with scrollbar gap
 * compensation) and hiding everything but the dialog from assistive
 * technologies (`aria-hidden` on the siblings of its ancestors).
 */
export class ModalController implements ReactiveController {
  private restoreScroll: (() => void) | null = null;
  private restoreHidden: (() => void) | null = null;

  constructor(host: ReactiveControllerHost) {
    host.addController(this);
  }

  /** `keepVisible`: the element that stays exposed (the dialog's host). */
  activate(keepVisible: Element, options: { lockScroll?: boolean } = {}): void {
    if (this.restoreHidden) return;
    if (options.lockScroll ?? true) this.restoreScroll = lockScroll();
    this.restoreHidden = hideOthers(keepVisible);
  }

  deactivate(): void {
    this.restoreScroll?.();
    this.restoreScroll = null;
    this.restoreHidden?.();
    this.restoreHidden = null;
  }

  get active(): boolean {
    return this.restoreHidden !== null;
  }

  hostDisconnected(): void {
    this.deactivate();
  }
}
