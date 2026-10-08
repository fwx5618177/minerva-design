import {
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import {
  autoPosition,
  computeAnchoredPosition,
  fromCamelPlacement,
  getTransformOrigin,
  toCamelPlacement,
  VIEWPORT_PADDING,
  type AnchoredPositionResult,
  type Placement,
  type VirtualElement,
} from "@minerva/core";

export type { Placement, VirtualElement };
export { VIEWPORT_PADDING, toCamelPlacement };

/** `"bottomStart"` -> `"bottom-start"` (also accepts kebab-case as is). */
export const toPlacement = (value: string): Placement =>
  fromCamelPlacement(value);

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
  /** Minimum distance to the viewport edges, in px. @default 8 */
  padding?: number;
}

export interface AnchoredPosition {
  /** Callback ref for the floating element. */
  setFloating: (node: HTMLElement | null) => void;
  /**
   * Inline styles that position the floating element (`position: fixed`,
   * `left`, `top`, and `--minerva-transform-origin` for scale animations).
   */
  floatingStyles: CSSProperties;
  /** Final placement after flipping (the requested one until positioned). */
  placement: Placement;
  /** Inline styles (left/top) that center the arrow on the anchor. */
  arrowStyles: CSSProperties;
  /** `true` once the first position has been computed for this opening. */
  isPositioned: boolean;
  /** Recompute the position manually. */
  update: () => void;
}

interface PositionState {
  x: number;
  y: number;
  placement: Placement;
  arrow: { x?: number; y?: number };
  /** Identity of the (anchor, floating) pair the result belongs to. */
  key: object | null;
}

const sameState = (a: PositionState, b: PositionState) =>
  a.x === b.x &&
  a.y === b.y &&
  a.placement === b.placement &&
  a.arrow.x === b.arrow.x &&
  a.arrow.y === b.arrow.y &&
  a.key === b.key;

/**
 * Anchors a floating element (popover, tooltip, menu, dropdown panel) to an
 * element with flip + shift so it stays in the viewport, and keeps it
 * positioned while scrolling / resizing (core `autoPosition`, stopped on
 * close). Shared positioning adapter of every React overlay.
 *
 * Uses the `fixed` strategy and `left` / `top` (never a transform) so
 * component CSS animations can use `transform` freely.
 *
 * @example
 * const { setFloating, floatingStyles, placement } = useAnchoredPosition({
 *   open, anchor: triggerElement, placement: "bottom-start",
 * });
 * return open && <div ref={setFloating} style={floatingStyles} />;
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
  padding = VIEWPORT_PADDING,
}: AnchoredPositionOptions): AnchoredPosition {
  const [floating, setFloating] = useState<HTMLElement | null>(null);
  const [state, setState] = useState<PositionState>({
    x: 0,
    y: 0,
    placement,
    arrow: {},
    key: null,
  });
  const mainAxis = offset?.mainAxis ?? 8;
  const crossAxis = offset?.crossAxis ?? 0;

  // A new key per (open, anchor, floating) run: results of a previous run
  // never count as "positioned" for the current one.
  const keyRef = useRef<object | null>(null);
  const [runKey, setRunKey] = useState<object | null>(null);

  const apply = useCallback((result: AnchoredPositionResult, key: object) => {
    const next: PositionState = {
      x: result.x,
      y: result.y,
      placement: result.placement,
      arrow: result.arrow,
      key,
    };
    setState((prev) => (sameState(prev, next) ? prev : next));
  }, []);

  useLayoutEffect(() => {
    if (!open || !anchor || !floating) {
      keyRef.current = null;
      return;
    }
    const key = {};
    keyRef.current = key;
    // Notifies render that a run started (the result arrives asynchronously).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setRunKey(key);
    const stop = autoPosition(
      anchor,
      floating,
      {
        placement,
        offset: { mainAxis, crossAxis },
        flip,
        shift,
        matchAnchorWidth,
        fitViewportHeight,
        arrowElement,
        padding,
      },
      (result) => apply(result, key),
    );
    return () => {
      stop();
      if (keyRef.current === key) keyRef.current = null;
    };
  }, [
    open,
    anchor,
    floating,
    placement,
    mainAxis,
    crossAxis,
    flip,
    shift,
    matchAnchorWidth,
    fitViewportHeight,
    arrowElement,
    padding,
    apply,
  ]);

  const update = useCallback(() => {
    const key = keyRef.current;
    if (!key || !anchor || !floating) return;
    void computeAnchoredPosition(anchor, floating, {
      placement,
      offset: { mainAxis, crossAxis },
      flip,
      shift,
      matchAnchorWidth,
      fitViewportHeight,
      arrowElement,
      padding,
    }).then((result) => {
      if (keyRef.current === key) apply(result, key);
    });
  }, [
    anchor,
    floating,
    placement,
    mainAxis,
    crossAxis,
    flip,
    shift,
    matchAnchorWidth,
    fitViewportHeight,
    arrowElement,
    padding,
    apply,
  ]);

  const isPositioned =
    open && !!anchor && !!floating && runKey !== null && state.key === runKey;
  const finalPlacement = isPositioned ? state.placement : placement;

  const floatingStyles = {
    position: "fixed",
    left: isPositioned ? state.x : 0,
    top: isPositioned ? state.y : 0,
    "--minerva-transform-origin": getTransformOrigin(
      finalPlacement,
      isPositioned ? state.arrow : undefined,
    ),
  } as CSSProperties;

  const arrowStyles: CSSProperties = isPositioned
    ? {
        left: state.arrow.x != null ? `${state.arrow.x}px` : undefined,
        top: state.arrow.y != null ? `${state.arrow.y}px` : undefined,
      }
    : {};

  return {
    setFloating,
    floatingStyles,
    placement: finalPlacement,
    arrowStyles,
    isPositioned,
    update,
  };
}
