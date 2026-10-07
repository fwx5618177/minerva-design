import type { RefObject } from "react";
import { focusElement, getFocusables, isTabbable } from "@minerva/core";

/** Where focus goes once an element (an alert, a toast...) is removed. */
export type FocusTarget =
  | HTMLElement
  | null
  | RefObject<HTMLElement | null>
  | (() => HTMLElement | null | undefined);

/** Resolves an element, a ref or a getter to an element. */
export function resolveFocusTarget(
  target: FocusTarget | undefined,
): HTMLElement | null {
  if (!target) return null;
  if (typeof target === "function") return target() ?? null;
  if ("current" in target && !(target instanceof Node)) return target.current;
  return target as HTMLElement;
}

/**
 * The tabbable element following `el` in document order (outside `el`),
 * else the one preceding it, else `null`.
 */
export function getAdjacentTabbable(el: HTMLElement): HTMLElement | null {
  const doc = el.ownerDocument;
  const candidates = getFocusables(doc.body).filter(
    (candidate) => !el.contains(candidate) && isTabbable(candidate),
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

/**
 * Focuses the nearest ancestor of `el` that can hold focus, making the
 * parent programmatically focusable (`tabindex="-1"`, removed again on blur)
 * when no ancestor is, so focus never falls back to <body>.
 */
export function focusContainerOf(el: HTMLElement): boolean {
  const doc = el.ownerDocument;
  let ancestor = el.parentElement;
  while (ancestor && ancestor !== doc.body) {
    if (ancestor.hasAttribute("tabindex") && focusElement(ancestor)) {
      return true;
    }
    ancestor = ancestor.parentElement;
  }
  const parent = el.parentElement;
  if (!parent || parent === doc.body || parent === doc.documentElement) {
    return false;
  }
  parent.setAttribute("tabindex", "-1");
  parent.addEventListener(
    "blur",
    () => {
      if (parent.getAttribute("tabindex") === "-1") {
        parent.removeAttribute("tabindex");
      }
    },
    { once: true },
  );
  return focusElement(parent, { preventScroll: true });
}

/**
 * Moves focus out of `el` before it is removed: to `target` when given,
 * else to the next tabbable after it (or the previous one), else to its
 * container. Returns whether focus moved.
 */
export function moveFocusBeforeRemoval(
  el: HTMLElement,
  target?: FocusTarget,
): boolean {
  const explicit = resolveFocusTarget(target);
  if (explicit?.isConnected && focusElement(explicit)) return true;
  const adjacent = getAdjacentTabbable(el);
  if (adjacent && focusElement(adjacent)) return true;
  return focusContainerOf(el);
}

/** Whether focus is inside `el` or was lost to <body> / nothing. */
export function isFocusInsideOrLost(el: HTMLElement): boolean {
  const active = el.ownerDocument.activeElement;
  return (
    !active ||
    active === el.ownerDocument.body ||
    el.contains(active) ||
    !active.isConnected
  );
}
