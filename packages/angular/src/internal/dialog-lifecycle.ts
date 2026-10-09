import {
  DestroyRef,
  afterRenderEffect,
  inject,
  untracked,
} from "@angular/core";
import { injectIsBrowser } from "./platform";

/** Sources and callbacks of `dialogLifecycle()` */
export interface DialogLifecycleOptions {
  /** The dialog is open */
  isOpen: () => boolean;
  /** The panel is rendered (open, or closing during its exit animation) */
  mounted: () => boolean;
  /** The dialog opened and focus moved in */
  afterOpen: () => void;
  /** The dialog finished closing (after its exit animation) */
  afterClose: () => void;
}

/**
 * The `after-open` / `after-close` notifications of a dialog (the
 * `minerva-after-open` / `minerva-after-close` events of the web
 * components): after-open once the panel rendered and focus moved in (the
 * focus scope activates after rendering), after-close once the exit
 * animation finished and the panel unmounted. Browser only. Call in an
 * injection context.
 */
export function dialogLifecycle(options: DialogLifecycleOptions): void {
  if (!injectIsBrowser()) return;
  let destroyed = false;
  inject(DestroyRef).onDestroy(() => (destroyed = true));
  let wasOpen = false;
  let wasMounted = false;
  afterRenderEffect(() => {
    const open = options.isOpen();
    const mounted = options.mounted();
    untracked(() => {
      if (open && !wasOpen) {
        // after the overlay layer's own after-render work (focus moved in)
        setTimeout(() => {
          if (!destroyed && untracked(options.isOpen)) options.afterOpen();
        });
      }
      if (wasMounted && !mounted && !open) options.afterClose();
      wasOpen = open;
      wasMounted = mounted;
    });
  });
}
