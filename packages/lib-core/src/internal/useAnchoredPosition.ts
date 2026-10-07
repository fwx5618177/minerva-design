import { useState } from "react";
import {
  arrow as arrowMiddleware,
  autoUpdate,
  flip as flipMiddleware,
  offset as offsetMiddleware,
  shift as shiftMiddleware,
  size as sizeMiddleware,
  limitShift,
  useFloating,
  type Middleware,
  type Placement,
  type VirtualElement,
} from "@floating-ui/react-dom";

export type { Placement, VirtualElement };

/** Minimum distance kept between a floating element and the viewport edge. */
export const VIEWPORT_PADDING = 8;

export interface AnchoredPositionOptions {
  /** Whether the floating element is rendered. */
  open: boolean;
  /** Element (or virtual element, e.g. the cursor) to anchor to. */
  anchor: Element | VirtualElement | null;
  /** Preferred placement; may flip to the opposite side when it overflows. */
  placement?: Placement;
  /** Gap from the anchor (main axis) and skid along it (cross axis), in px. */
  offset?: { mainAxis?: number; crossAxis?: number };
  /** Flip to the opposite side when there is not enough room. @default true */
  flip?: boolean;
  /** Shift along the anchor to stay inside the viewport. @default true */
  shift?: boolean;
  /**
   * Size the floating element after the anchor: `"min"` makes it at least as
   * wide as the anchor, `"exact"` exactly as wide. @default false
   */
  matchAnchorWidth?: false | "min" | "exact";
  /** Cap the floating element's height to the space available. @default false */
  fitViewportHeight?: boolean;
  /** Arrow element (positioned along the anchor's center). */
  arrowElement?: HTMLElement | null;
}

/**
 * Anchors a floating element (popper, tooltip, menu, dropdown panel) to an
 * element with flip + shift so it stays in the viewport, and keeps it
 * positioned while scrolling / resizing (`autoUpdate`, cleaned up on close).
 *
 * Uses the `fixed` strategy and top/left (no transform) so component CSS
 * animations can use `transform` freely.
 */
export function useAnchoredPosition({
  open,
  anchor,
  placement = "bottom",
  offset,
  flip = true,
  shift = true,
  matchAnchorWidth = false,
  fitViewportHeight = false,
  arrowElement,
}: AnchoredPositionOptions) {
  const [floating, setFloating] = useState<HTMLElement | null>(null);
  const mainAxis = offset?.mainAxis ?? 8;
  const crossAxis = offset?.crossAxis ?? 0;

  const middleware: Middleware[] = [offsetMiddleware({ mainAxis, crossAxis })];
  if (flip) {
    // "alignment": flip start <-> end before shifting, keep the side otherwise
    middleware.push(
      flipMiddleware({ padding: VIEWPORT_PADDING, crossAxis: "alignment" }),
    );
  }
  if (shift) {
    middleware.push(
      shiftMiddleware({ padding: VIEWPORT_PADDING, limiter: limitShift() }),
    );
  }
  if (matchAnchorWidth || fitViewportHeight) {
    middleware.push(
      sizeMiddleware({
        padding: VIEWPORT_PADDING,
        apply({ rects, availableHeight, availableWidth, elements }) {
          const style = elements.floating.style;
          if (matchAnchorWidth === "exact") {
            style.width = `${rects.reference.width}px`;
          } else if (matchAnchorWidth === "min") {
            style.minWidth = `${rects.reference.width}px`;
          }
          style.maxWidth = `${Math.max(0, availableWidth)}px`;
          if (fitViewportHeight) {
            style.maxHeight = `${Math.max(0, availableHeight)}px`;
          }
        },
      }),
    );
  }
  if (arrowElement) {
    middleware.push(arrowMiddleware({ element: arrowElement, padding: 6 }));
  }

  const result = useFloating({
    open,
    placement,
    strategy: "fixed",
    transform: false,
    middleware,
    elements: { reference: anchor, floating },
    whileElementsMounted: autoUpdate,
  });

  const arrowData = result.middlewareData.arrow;
  const arrowStyles: React.CSSProperties = arrowData
    ? {
        left: arrowData.x != null ? `${arrowData.x}px` : undefined,
        top: arrowData.y != null ? `${arrowData.y}px` : undefined,
      }
    : {};

  return {
    /** Callback ref for the floating element. */
    setFloating,
    /** Inline styles that position the floating element. */
    floatingStyles: result.floatingStyles,
    /** Final placement after flipping. */
    placement: result.placement,
    /** Inline styles (left/top) that center the arrow on the anchor. */
    arrowStyles,
    /** `true` once the first position has been computed. */
    isPositioned: result.isPositioned,
    /** Recompute the position manually. */
    update: result.update,
  };
}

const CAMEL_TO_PLACEMENT: Record<string, Placement> = {};
for (const side of ["top", "bottom", "left", "right"] as const) {
  CAMEL_TO_PLACEMENT[side] = side;
  CAMEL_TO_PLACEMENT[`${side}Start`] = `${side}-start`;
  CAMEL_TO_PLACEMENT[`${side}End`] = `${side}-end`;
}

/** `"bottomStart"` -> `"bottom-start"` (also accepts kebab-case as is). */
export const toPlacement = (value: string): Placement =>
  CAMEL_TO_PLACEMENT[value] ?? (value as Placement);

/** `"bottom-start"` -> `"bottomStart"` */
export const toCamelPlacement = (placement: Placement): string =>
  placement.replace(/-(\w)/, (_, c: string) => c.toUpperCase());
