// Reading direction (LTR / RTL) of an element, for keyboard handlers whose
// arrow keys follow the visual order. Nothing runs at import time.

/** Reading direction of a piece of UI. */
export type ReadingDirection = "ltr" | "rtl";

/**
 * Parent in the composed (flat) tree: the slot of slotted content, the
 * parent element, or the host of a shadow root.
 */
function composedParent(node: Element): Element | null {
  if (node.assignedSlot) return node.assignedSlot;
  if (node.parentElement) return node.parentElement;
  const root = node.parentNode;
  return root && root.nodeType === 11 && "host" in root
    ? (root as ShadowRoot).host
    : null;
}

/**
 * Resolves the reading direction that applies to `element`: the nearest
 * ancestor (or self) with `dir="ltr"` / `dir="rtl"` wins, walking up through
 * slots and shadow hosts; `dir="auto"` and invalid values are skipped. Then
 * the computed CSS `direction`, then `"ltr"`.
 *
 * Call it lazily (in event handlers / effects), never at import time.
 */
export function getDirection(
  element: Element | null | undefined,
): ReadingDirection {
  for (let node = element ?? null; node; node = composedParent(node)) {
    const dir = node.getAttribute("dir")?.toLowerCase();
    if (dir === "rtl" || dir === "ltr") return dir;
  }
  if (element) {
    const view = element.ownerDocument?.defaultView;
    const computed = view?.getComputedStyle?.(element).direction;
    if (computed === "rtl") return "rtl";
  }
  return "ltr";
}

/**
 * `explicit` when given, otherwise the direction inherited by `element`
 * (see {@link getDirection}).
 */
export function resolveDirection(
  explicit: ReadingDirection | undefined,
  element: Element | null | undefined,
): ReadingDirection {
  return explicit ?? getDirection(element);
}

/**
 * Maps a physical arrow key to its logical meaning for `element`: in RTL,
 * ArrowLeft and ArrowRight are swapped (ArrowLeft = "next"), so handlers can
 * be written once for LTR. Other keys are returned as is.
 */
export function logicalArrowKey(
  key: string,
  element: Element | null | undefined,
  explicit?: ReadingDirection,
): string {
  if (key !== "ArrowLeft" && key !== "ArrowRight") return key;
  if (resolveDirection(explicit, element) !== "rtl") return key;
  return key === "ArrowLeft" ? "ArrowRight" : "ArrowLeft";
}
