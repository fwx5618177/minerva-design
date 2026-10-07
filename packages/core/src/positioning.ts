import {
  arrow as arrowMiddleware,
  autoUpdate,
  computePosition,
  flip as flipMiddleware,
  limitShift,
  offset as offsetMiddleware,
  shift as shiftMiddleware,
  size as sizeMiddleware,
  type AutoUpdateOptions,
  type ElementRects,
  type Middleware,
  type MiddlewareData,
  type Placement,
  type Strategy,
  type VirtualElement,
} from "@floating-ui/dom";

export type { Placement, VirtualElement, Strategy, MiddlewareData };

/** Side of the anchor the floating element sits on. */
export type Side = "top" | "right" | "bottom" | "left";
/** Alignment along the anchor. */
export type Align = "start" | "center" | "end";
/** An element or a virtual element (e.g. the cursor position). */
export type AnchorElement = Element | VirtualElement;

/** Minimum distance kept between a floating element and the viewport edge. */
export const VIEWPORT_PADDING = 8;
/** Padding between the arrow and the floating element's corners. */
export const ARROW_PADDING = 6;

export interface AnchoredPositionOptions {
  /** Preferred placement; may flip when it overflows. @default "bottom" */
  placement?: Placement;
  /**
   * Gap from the anchor (main axis) and skid along it (cross axis), in px.
   * @default { mainAxis: 8, crossAxis: 0 }
   */
  offset?: { mainAxis?: number; crossAxis?: number };
  /** Flip to the opposite side when there is not enough room. @default true */
  flip?: boolean;
  /** Shift along the anchor to stay inside the viewport. @default true */
  shift?: boolean;
  /**
   * Size the floating element after the anchor: `"min"` makes it at least
   * as wide as the anchor, `"exact"` exactly as wide. Also caps `maxWidth`
   * to the available width. @default false
   */
  matchAnchorWidth?: false | "min" | "exact";
  /**
   * Cap the floating element's height (`maxHeight`) to the space available.
   * Also caps `maxWidth` to the available width. @default false
   */
  fitViewportHeight?: boolean;
  /** Arrow element, centered on the anchor. */
  arrowElement?: HTMLElement | null;
  /**
   * Minimum distance kept between the floating element and the viewport
   * edges (collision padding) used by flip, shift and size, in px.
   * @default VIEWPORT_PADDING (8)
   */
  padding?: number;
  /** Options for `autoUpdate` (used by `autoPosition` only). */
  autoUpdate?: AutoUpdateOptions;
}

export interface AnchoredPositionResult {
  /** Left (px, viewport coordinates since the strategy is `fixed`). */
  x: number;
  /** Top (px). */
  y: number;
  /** Final placement, after flipping. */
  placement: Placement;
  strategy: Strategy;
  middlewareData: MiddlewareData;
  /** Arrow offsets (left for top/bottom placements, top for left/right). */
  arrow: { x?: number; y?: number };
  /** Space available for the floating element (from the size middleware). */
  availableWidth?: number;
  availableHeight?: number;
  /** Measured anchor / floating rectangles. */
  rects?: ElementRects;
}

interface SizeData {
  availableWidth: number;
  availableHeight: number;
}

function buildMiddleware(
  options: AnchoredPositionOptions,
  sizeData: Partial<SizeData>,
): Middleware[] {
  const {
    offset,
    flip = true,
    shift = true,
    matchAnchorWidth = false,
    fitViewportHeight = false,
    arrowElement,
    padding = VIEWPORT_PADDING,
  } = options;
  const mainAxis = offset?.mainAxis ?? 8;
  const crossAxis = offset?.crossAxis ?? 0;

  const middleware: Middleware[] = [offsetMiddleware({ mainAxis, crossAxis })];
  if (flip) {
    // "alignment": flip start <-> end before shifting, keep the side otherwise
    middleware.push(flipMiddleware({ padding, crossAxis: "alignment" }));
  }
  if (shift) {
    middleware.push(shiftMiddleware({ padding, limiter: limitShift() }));
  }
  const sizing = !!matchAnchorWidth || fitViewportHeight;
  middleware.push(
    sizeMiddleware({
      padding,
      apply({ rects, availableHeight, availableWidth, elements }) {
        sizeData.availableWidth = availableWidth;
        sizeData.availableHeight = availableHeight;
        if (!sizing) return;
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
  if (arrowElement) {
    middleware.push(
      arrowMiddleware({ element: arrowElement, padding: ARROW_PADDING }),
    );
  }
  middleware.push({
    name: "minervaRects",
    fn: ({ rects }) => ({ data: { ...rects } }),
  });
  return middleware;
}

/**
 * Computes the position of `floating` anchored to `reference` (one shot).
 *
 * Same behaviour as lib-core's `useAnchoredPosition`: `fixed` strategy,
 * offset (default 8px), flip (padding 8, cross-axis `"alignment"`), shift
 * (padding 8 + `limitShift`), optional size constraints and arrow
 * (padding 6). Position with `left` / `top` (see `applyPosition`), never a
 * transform, so CSS animations can use `transform` freely.
 */
export async function computeAnchoredPosition(
  reference: AnchorElement,
  floating: HTMLElement,
  options: AnchoredPositionOptions = {},
): Promise<AnchoredPositionResult> {
  const sizeData: Partial<SizeData> = {};
  const result = await computePosition(reference, floating, {
    placement: options.placement ?? "bottom",
    strategy: "fixed",
    middleware: buildMiddleware(options, sizeData),
  });
  const arrowData = result.middlewareData.arrow;
  return {
    x: result.x,
    y: result.y,
    placement: result.placement,
    strategy: result.strategy,
    middlewareData: result.middlewareData,
    arrow: { x: arrowData?.x, y: arrowData?.y },
    availableWidth: sizeData.availableWidth,
    availableHeight: sizeData.availableHeight,
    rects: result.middlewareData.minervaRects as ElementRects | undefined,
  };
}

/**
 * Keeps `floating` positioned while the anchor / floating element move or
 * resize, or the page scrolls (`autoUpdate`). `onUpdate` receives each new
 * result (typically `(r) => applyPosition(floating, r)`).
 *
 * @returns cleanup function (stops updating; pending results are dropped).
 */
export function autoPosition(
  reference: AnchorElement,
  floating: HTMLElement,
  options: AnchoredPositionOptions,
  onUpdate: (result: AnchoredPositionResult) => void,
): () => void {
  let active = true;
  const stop = autoUpdate(
    reference,
    floating,
    () => {
      void computeAnchoredPosition(reference, floating, options).then(
        (result) => {
          if (active) onUpdate(result);
        },
      );
    },
    options.autoUpdate,
  );
  return () => {
    active = false;
    stop();
  };
}

/** `"bottom-start"` -> `{ side: "bottom", align: "start" }` */
export function parsePlacement(placement: Placement): {
  side: Side;
  align: Align;
} {
  const [side, align] = placement.split("-") as [Side, Align | undefined];
  return { side, align: align ?? "center" };
}

/** `("bottom", "start")` -> `"bottom-start"`; `"center"` -> `"bottom"`. */
export function toPlacement(side: Side, align: Align = "center"): Placement {
  return (align === "center" ? side : `${side}-${align}`) as Placement;
}

const CAMEL_TO_PLACEMENT: Record<string, Placement> = {};
for (const side of ["top", "bottom", "left", "right"] as const) {
  CAMEL_TO_PLACEMENT[side] = side;
  CAMEL_TO_PLACEMENT[`${side}Start`] = `${side}-start`;
  CAMEL_TO_PLACEMENT[`${side}End`] = `${side}-end`;
}

/** `"bottomStart"` -> `"bottom-start"` (kebab-case is returned as is). */
export function fromCamelPlacement(value: string): Placement {
  return CAMEL_TO_PLACEMENT[value] ?? (value as Placement);
}

/** `"bottom-start"` -> `"bottomStart"` */
export function toCamelPlacement(placement: Placement): string {
  return placement.replace(/-(\w)/, (_, c: string) => c.toUpperCase());
}

/**
 * CSS `transform-origin` pointing at the anchor, for scale-in animations.
 * With arrow offsets, the origin is the arrow tip (center of an arrow of
 * `arrowSize` px).
 */
export function getTransformOrigin(
  placement: Placement,
  arrow?: { x?: number; y?: number },
  arrowSize = 0,
): string {
  const { side, align } = parsePlacement(placement);
  const alignPercent = { start: "0%", center: "50%", end: "100%" }[align];
  const vertical = side === "top" || side === "bottom";
  const cross = vertical
    ? arrow?.x != null
      ? `${arrow.x + arrowSize / 2}px`
      : alignPercent
    : arrow?.y != null
      ? `${arrow.y + arrowSize / 2}px`
      : alignPercent;
  // the origin sits on the edge facing the anchor
  const main = { top: "100%", bottom: "0%", left: "100%", right: "0%" }[side];
  return vertical ? `${cross} ${main}` : `${main} ${cross}`;
}

/**
 * Writes a result onto the floating element: `position`, `left`, `top`,
 * `data-side` / `data-align` / `data-placement` and the CSS variables
 * `--minerva-transform-origin`, `--minerva-anchor-width/height`,
 * `--minerva-available-width/height`.
 */
export function applyPosition(
  floating: HTMLElement,
  result: AnchoredPositionResult,
  options: { arrowSize?: number } = {},
): void {
  const { style } = floating;
  const { side, align } = parsePlacement(result.placement);
  style.position = result.strategy;
  style.left = `${result.x}px`;
  style.top = `${result.y}px`;
  floating.setAttribute("data-side", side);
  floating.setAttribute("data-align", align);
  floating.setAttribute("data-placement", result.placement);
  style.setProperty(
    "--minerva-transform-origin",
    getTransformOrigin(result.placement, result.arrow, options.arrowSize),
  );
  const reference = result.rects?.reference;
  if (reference) {
    style.setProperty("--minerva-anchor-width", `${reference.width}px`);
    style.setProperty("--minerva-anchor-height", `${reference.height}px`);
  }
  if (result.availableWidth != null) {
    style.setProperty(
      "--minerva-available-width",
      `${Math.max(0, result.availableWidth)}px`,
    );
  }
  if (result.availableHeight != null) {
    style.setProperty(
      "--minerva-available-height",
      `${Math.max(0, result.availableHeight)}px`,
    );
  }
}
