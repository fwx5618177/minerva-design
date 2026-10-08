import type { ReactiveController, ReactiveControllerHost } from "lit";
import {
  applyPosition,
  autoPosition,
  parsePlacement,
  type AnchorElement,
  type AnchoredPositionOptions,
  type AnchoredPositionResult,
  type Placement,
} from "@minerva/dom";

/**
 * Keeps a floating element anchored (core `autoPosition` + `applyPosition`:
 * fixed strategy, flip, shift, optional anchor width / viewport height).
 * The element stays off-screen until its first position is known, and gets
 * `data-side` / `data-align` / `data-placement` for placement-aware styles.
 */
export class AnchoredPositionController implements ReactiveController {
  private stop: (() => void) | null = null;
  /** Last placement after flip (e.g. "top-start"). */
  placement: Placement = "bottom";

  constructor(
    private readonly host: ReactiveControllerHost,
    private readonly options: () => AnchoredPositionOptions & {
      arrowSize?: number;
      onPosition?: (result: AnchoredPositionResult) => void;
    },
  ) {
    host.addController(this);
  }

  start(anchor: AnchorElement, floating: HTMLElement): void {
    this.end();
    floating.style.position = "fixed";
    floating.style.left = "-9999px";
    floating.style.top = "-9999px";
    const { arrowSize, onPosition, ...options } = this.options();
    this.stop = autoPosition(anchor, floating, options, (result) => {
      applyPosition(floating, result, { arrowSize });
      const { side, align } = parsePlacement(result.placement);
      floating.dataset.side = side;
      floating.dataset.align = align;
      floating.dataset.placement = result.placement;
      if (result.placement !== this.placement) {
        this.placement = result.placement;
        this.host.requestUpdate();
      }
      onPosition?.(result);
    });
  }

  end(): void {
    this.stop?.();
    this.stop = null;
  }

  get running(): boolean {
    return this.stop !== null;
  }

  hostDisconnected(): void {
    this.end();
  }
}
