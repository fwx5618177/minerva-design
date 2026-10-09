import {
  Component,
  ChangeDetectionStrategy,
  DestroyRef,
  booleanAttribute,
  inject,
  input,
} from "@angular/core";

/** Shares tooltip timing within a subtree. Recently opened tooltips skip the
 * initial delay when the pointer moves between controls. Nested providers isolate timing. */
@Component({
  selector: "mn-tooltip-provider",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: "display: contents" },
  template: `<ng-content />`,
})
export class MnTooltipProvider {
  readonly enterDelay = input(200);
  readonly leaveDelay = input(0);
  readonly skipDelay = input(300);
  readonly disabled = input(false, { transform: booleanAttribute });
  private lastOpen = Number.NEGATIVE_INFINITY;
  private activeClose: (() => void) | undefined;
  constructor() {
    inject(DestroyRef).onDestroy(() => this.activeClose?.());
  }
  /** Delay for the next tooltip in this scope. */
  delay() {
    return Date.now() - this.lastOpen <= Math.max(0, this.skipDelay())
      ? 0
      : Math.max(0, this.enterDelay());
  }
  /** Activates one tooltip at a time and starts the shared warmup interval. */
  activate(close: () => void) {
    if (this.activeClose !== close) this.activeClose?.();
    this.activeClose = close;
    this.lastOpen = Date.now();
  }
  /** Releases the active tooltip without disturbing another tooltip. */
  release(close: () => void) {
    if (this.activeClose === close) {
      this.activeClose = undefined;
      this.lastOpen = Date.now();
    }
  }
}
