/** Parent in the composed tree: parent element, or the host of a shadow root. */
export function composedParent(node: Node): Element | null {
  if ((node as Element).assignedSlot) return (node as Element).assignedSlot;
  if (node.parentElement) return node.parentElement;
  const root = node.parentNode;
  return root && root.nodeType === 11 && "host" in root
    ? (root as ShadowRoot).host
    : null;
}

/**
 * Like `Element.closest`, but crosses shadow boundaries (a slotted element
 * looks through its slot, an element in a shadow root through its host).
 */
export function closestComposed<E extends Element = Element>(
  start: Element,
  selector: string,
): E | null {
  for (let el: Element | null = start; el; el = composedParent(el)) {
    if (el.matches(selector)) return el as E;
  }
  return null;
}

// Writing direction of an element (closest `dir`, crossing shadow roots and
// slots, `dir="auto"` skipped, then CSS `direction`): shared with React.
export { getDirection, logicalArrowKey } from "@minerva/core";

/** Whether the native Popover API (`popover` attribute, top layer) exists. */
function supportsPopover(el: Element): boolean {
  return typeof (el as HTMLElement).showPopover === "function";
}

/**
 * Shows `el` in the top layer when the Popover API is available (the element
 * must carry `popover="manual"`), so overlays escape `overflow: hidden` and
 * stacking contexts while staying in the DOM tree (and so inherit the theme
 * tokens of their host's scope). Without it, CSS positions the element
 * (`position: fixed` + z-index).
 */
export function showTopLayer(el: HTMLElement | null | undefined): void {
  if (!el || !supportsPopover(el) || !el.hasAttribute("popover")) return;
  try {
    if (!el.matches(":popover-open")) el.showPopover();
  } catch {
    // disconnected / already shown by another code path
  }
}

/** Counterpart of `showTopLayer`. */
export function hideTopLayer(el: HTMLElement | null | undefined): void {
  if (!el || !supportsPopover(el) || !el.hasAttribute("popover")) return;
  try {
    if (el.matches(":popover-open")) el.hidePopover();
  } catch {
    // already hidden
  }
}
