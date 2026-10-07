import { useLayoutEffect, useState } from "react";

export type ReadingDirection = "ltr" | "rtl";

/**
 * Resolves the reading direction that applies to `element`: the nearest
 * ancestor (or self) with `dir="ltr"` / `dir="rtl"` wins (`dir="auto"` is
 * skipped), then the computed CSS `direction`, then `"ltr"`.
 *
 * Call it lazily (in event handlers / effects), never during render, so it is
 * safe on the server.
 */
export function getDirection(
  element: Element | null | undefined,
): ReadingDirection {
  let node: Element | null = element ?? null;
  while (node) {
    const dir = node.getAttribute("dir")?.toLowerCase();
    if (dir === "rtl" || dir === "ltr") return dir;
    node = node.parentElement;
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

type AnchorLike = Element | { contextElement?: Element } | null | undefined;

const anchorElement = (anchor: AnchorLike): Element | null => {
  if (!anchor) return null;
  if (typeof (anchor as Element).getAttribute === "function") {
    return anchor as Element;
  }
  return (anchor as { contextElement?: Element }).contextElement ?? null;
};

/**
 * Reading direction inherited by `element` (`"ltr"` until it is mounted),
 * re-read whenever `element` or `deps` change (e.g. when an overlay opens).
 * For portalled overlays, which leave their trigger's `dir` subtree.
 */
export function useInheritedDirection(
  element: Element | null | undefined,
  enabled = true,
): ReadingDirection {
  const [dir, setDir] = useState<ReadingDirection>("ltr");
  useLayoutEffect(() => {
    if (!enabled || !element) return;
    // Synchronising with the DOM (the `dir` / CSS `direction` inherited by
    // the element), which is only readable after mount; bails out when
    // unchanged, so this re-renders at most once.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDir(getDirection(element));
  }, [element, enabled]);
  return dir;
}

/**
 * The `dir` attribute a portalled overlay needs so it keeps the reading
 * direction of its anchor (portals leave the anchor's `dir` subtree):
 * the anchor's direction when it differs from the portal container's
 * (`document.body` or the theme scope host), otherwise `undefined`.
 */
export function usePortalDirection(
  floating: Element | null | undefined,
  anchor: AnchorLike,
  open: boolean,
): ReadingDirection | undefined {
  const source = anchorElement(anchor);
  const container = floating?.parentElement;
  const anchorDir = useInheritedDirection(source, open && !!floating);
  const containerDir = useInheritedDirection(container, open && !!source);
  return anchorDir === containerDir ? undefined : anchorDir;
}
