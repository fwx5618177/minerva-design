import { contains, getFocusables, isTabbable } from "./dom";

/**
 * The tabbable element following `el` in document order (outside `el`,
 * shadow trees and slotted content included), else the one preceding it,
 * else `null`. Used to move focus off an element about to be removed.
 */
export function getAdjacentTabbable(el: HTMLElement): HTMLElement | null {
  const candidates = getFocusables(el.ownerDocument.body).filter(
    (candidate) => !contains(el, candidate) && isTabbable(candidate),
  );
  const next = candidates.find(
    (candidate) =>
      el.compareDocumentPosition(candidate) & Node.DOCUMENT_POSITION_FOLLOWING,
  );
  if (next) return next;
  const previous = candidates.filter(
    (candidate) =>
      el.compareDocumentPosition(candidate) & Node.DOCUMENT_POSITION_PRECEDING,
  );
  return previous[previous.length - 1] ?? null;
}
