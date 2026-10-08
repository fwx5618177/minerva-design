// Private copy of the React renderer's internal/tabbing.ts (not part of the
// Vue internals): where Tab leaves a portalled panel.
import { getTabbables } from "@minerva/dom";

/**
 * The tabbable element before / after `anchor` in `container`, in document
 * order (where Tab / Shift+Tab pressed on `anchor` would go). Elements inside
 * `anchor` (or containing it) are skipped.
 */
export function adjacentTabbable(
  anchor: Element,
  container: Element,
  backwards: boolean,
): HTMLElement | null {
  const tabbables = getTabbables(container).filter(
    (el) => el !== anchor && !anchor.contains(el) && !el.contains(anchor),
  );
  const follows = (el: Element) =>
    !!(anchor.compareDocumentPosition(el) & Node.DOCUMENT_POSITION_FOLLOWING);
  return backwards
    ? ([...tabbables].reverse().find((el) => !follows(el)) ?? null)
    : (tabbables.find(follows) ?? null);
}

/**
 * Whether Tab (`backwards` = Shift+Tab) pressed on `focused` would leave
 * `panel`: forwards from its last tabbable, backwards from its first one or
 * the panel itself (and either way when the panel has no tabbables).
 */
export function tabLeavesPanel(
  panel: HTMLElement,
  focused: Element | null,
  backwards: boolean,
): boolean {
  if (!focused || !panel.contains(focused)) return false;
  const tabbables = getTabbables(panel);
  if (tabbables.length === 0) return true;
  if (backwards) return focused === panel || focused === tabbables[0];
  return focused === tabbables[tabbables.length - 1];
}
