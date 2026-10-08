import { useLayoutEffect } from "react";
import { hideOthers, type HideOthersOptions } from "@minerva/dom";

/**
 * Hides everything but `element` (and its ancestors) from assistive
 * technology while `enabled` (core `hideOthers`: siblings along the path get
 * `aria-hidden="true"`, live regions are kept). Overlays mounted later (a
 * Popover opened inside a Modal) are not affected. Nested-safe: attributes
 * are reference counted and pre-existing ones are preserved on undo.
 *
 * @param element - The modal element to keep visible.
 * @param enabled - Hide the rest (typically `open && modal`).
 */
export function useHideOthers(
  element: Element | null,
  enabled: boolean,
  options?: HideOthersOptions,
) {
  const root = options?.root;
  const attribute = options?.attribute;
  useLayoutEffect(() => {
    if (!enabled || !element) return;
    return hideOthers(element, { root, attribute });
  }, [enabled, element, root, attribute]);
}

export default useHideOthers;
