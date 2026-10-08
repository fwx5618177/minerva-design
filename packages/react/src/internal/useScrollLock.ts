import { useLayoutEffect } from "react";
import { lockScroll } from "@minerva/core";

/**
 * Locks page scrolling (core `lockScroll`: scrollbar gap compensated with
 * `padding-right` and exposed as `--minerva-scrollbar-gap`) while `enabled`.
 * Nested-safe: locks are reference counted, the page scrolls again once the
 * last one is released.
 *
 * @param enabled - Hold the lock (typically `open && modal`).
 * @param target - Element to lock. @default document.body
 */
export function useScrollLock(enabled: boolean, target?: HTMLElement | null) {
  useLayoutEffect(() => {
    if (!enabled) return;
    return lockScroll(target ?? undefined);
  }, [enabled, target]);
}

export default useScrollLock;
