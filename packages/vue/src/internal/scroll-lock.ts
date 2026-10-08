import { toValue, watch, type MaybeRefOrGetter } from "vue";
import { hideOthers, lockScroll, type HideOthersOptions } from "@minerva/dom";

/** Locks the page scroll (shared counter of @minerva/dom) while enabled. */
export function useScrollLock(enabled: MaybeRefOrGetter<boolean>): void {
  watch(
    () => toValue(enabled),
    (on, _prev, onCleanup) => {
      if (!on) return;
      onCleanup(lockScroll());
    },
    { immediate: true, flush: "post" },
  );
}

/**
 * Hides everything but `element` from assistive technology (`aria-hidden`
 * on the siblings up the tree) while enabled.
 */
export function useHideOthers(
  element: MaybeRefOrGetter<Element | null | undefined>,
  enabled: MaybeRefOrGetter<boolean>,
  options?: HideOthersOptions,
): void {
  watch(
    [() => toValue(enabled), () => toValue(element)],
    ([on, el], _prev, onCleanup) => {
      if (!on || !el) return;
      onCleanup(hideOthers(el, options));
    },
    { immediate: true, flush: "post" },
  );
}
