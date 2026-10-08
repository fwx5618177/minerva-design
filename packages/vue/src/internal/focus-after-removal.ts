import { isRef, type Ref } from "vue";
import { focusElement, getAdjacentTabbable } from "@minerva/dom";

/** Where focus goes once an element (an alert, a toast...) is removed. */
export type FocusTarget =
  | HTMLElement
  | null
  | Ref<HTMLElement | null | undefined>
  | (() => HTMLElement | null | undefined);

/** Resolves an element, a ref or a getter to an element. */
export function resolveFocusTarget(
  target: FocusTarget | undefined,
): HTMLElement | null {
  if (!target) return null;
  if (typeof target === "function") return target() ?? null;
  if (isRef(target)) return target.value ?? null;
  return target;
}

/**
 * Focuses the nearest ancestor of `el` that can hold focus, making the
 * parent programmatically focusable (`tabindex="-1"`, removed again on blur)
 * when no ancestor is, so focus never falls back to <body> (same as React).
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
