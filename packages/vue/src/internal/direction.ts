import { ref, toValue, watch, type MaybeRefOrGetter, type Ref } from "vue";
import {
  getDirection,
  logicalArrowKey,
  resolveDirection,
  type ReadingDirection,
} from "@minerva/dom";

export { getDirection, logicalArrowKey, resolveDirection };
export type { ReadingDirection };

type AnchorLike = Element | { contextElement?: Element } | null | undefined;

const anchorElement = (anchor: AnchorLike): Element | null => {
  if (!anchor) return null;
  if (typeof (anchor as Element).getAttribute === "function") {
    return anchor as Element;
  }
  return (anchor as { contextElement?: Element }).contextElement ?? null;
};

/** Reading direction inherited by `element` (`"ltr"` until mounted). */
export function useInheritedDirection(
  element: MaybeRefOrGetter<Element | null | undefined>,
  enabled: MaybeRefOrGetter<boolean> = true,
): Ref<ReadingDirection> {
  const dir = ref<ReadingDirection>("ltr");
  watch(
    [() => toValue(element), () => toValue(enabled)],
    ([el, on]) => {
      if (on && el) dir.value = getDirection(el);
    },
    { immediate: true, flush: "post" },
  );
  return dir;
}

/**
 * The `dir` a teleported overlay needs to keep its anchor's reading
 * direction: the anchor's when it differs from the portal container's.
 */
export function usePortalDirection(
  floating: MaybeRefOrGetter<Element | null | undefined>,
  anchor: MaybeRefOrGetter<AnchorLike>,
  open: MaybeRefOrGetter<boolean>,
): () => ReadingDirection | undefined {
  const anchorDir = useInheritedDirection(
    () => anchorElement(toValue(anchor)),
    () => toValue(open) && !!toValue(floating),
  );
  const containerDir = useInheritedDirection(
    () => toValue(floating)?.parentElement,
    () => toValue(open) && !!anchorElement(toValue(anchor)),
  );
  return () =>
    anchorDir.value === containerDir.value ? undefined : anchorDir.value;
}
