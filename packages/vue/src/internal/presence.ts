import {
  computed,
  ref,
  toValue,
  watch,
  type ComputedRef,
  type MaybeRefOrGetter,
} from "vue";
import { getExitAnimationDuration, waitForExitAnimation } from "@minerva/dom";

/**
 * Whether closing content should stay mounted: true while `open`, and after
 * closing until the exit animation of `element` (`data-state="closed"`)
 * ends. No animation (or reduced motion): unmounts right away.
 */
export function usePresence(
  open: MaybeRefOrGetter<boolean>,
  element: MaybeRefOrGetter<Element | null | undefined>,
): ComputedRef<boolean> {
  const mounted = ref(toValue(open));
  watch(
    () => toValue(open),
    (isOpen, _prev, onCleanup) => {
      if (isOpen) {
        mounted.value = true;
        return;
      }
      const el = toValue(element);
      if (!el || getExitAnimationDuration(el) <= 0) {
        mounted.value = false;
        return;
      }
      let cancelled = false;
      onCleanup(() => {
        cancelled = true;
      });
      void waitForExitAnimation(el).then(() => {
        if (!cancelled) mounted.value = false;
      });
    },
    { flush: "post" },
  );
  return computed(() => toValue(open) || mounted.value);
}
