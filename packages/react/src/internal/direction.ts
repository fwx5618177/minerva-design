import { useLayoutEffect, useState } from "react";
import {
  getDirection,
  logicalArrowKey,
  resolveDirection,
  type ReadingDirection,
} from "@minerva/core";

// The direction helpers live in @minerva/core (shared with the web
// components); the React hooks below build on them.

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
