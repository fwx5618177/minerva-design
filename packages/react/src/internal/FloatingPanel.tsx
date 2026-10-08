import {
  useState,
  type CSSProperties,
  type HTMLAttributes,
  type ReactNode,
  type Ref,
  type RefCallback,
} from "react";
import { parsePlacement } from "@minerva/dom";
import { useMergedRefs } from "./mergeRefs";
import { Portal } from "./Portal";
import {
  useAnchoredPosition,
  type AnchoredPositionOptions,
  type Placement,
  type VirtualElement,
} from "./useAnchoredPosition";
import { LayerContext, useDismissableLayer } from "./useDismissableLayer";
import { useFocusScope } from "./useFocusScope";
import { usePortalDirection, type ReadingDirection } from "./direction";

/** Off-screen until the first position is computed (no flash at 0,0). */
const UNPOSITIONED: CSSProperties = { left: -9999, top: -9999 };

export interface UseFloatingLayerOptions extends Omit<
  AnchoredPositionOptions,
  "open" | "anchor"
> {
  /** Whether the floating element is rendered. */
  open: boolean;
  /** Element (or virtual element, e.g. the cursor) to anchor to. */
  anchor: Element | VirtualElement | null;
  /**
   * Elements treated as part of the layer (trigger, input, field wrapper):
   * pointer down / focus on them is not "outside".
   */
  branches?: () => Array<Element | null | undefined>;
  /**
   * The layer asks to close: Escape while topmost, pointer down outside,
   * focus outside (each can be turned off below).
   */
  onDismiss?: () => void;
  /** Escape while topmost; `event.preventDefault()` keeps it open. */
  onEscapeKeyDown?: (event: KeyboardEvent) => void;
  /** Dismiss on a pointer down outside the layer and its branches. @default true */
  dismissOnPointerDownOutside?: boolean;
  /** Dismiss when focus moves outside the layer and its branches. @default true */
  dismissOnFocusOutside?: boolean;
  /**
   * On Escape, when focus is inside the floating element, focus moves to
   * this element (typically the trigger / input) before closing.
   */
  returnFocusOnEscape?: () => HTMLElement | null | undefined;
  /**
   * The content receives focus (focusable options, buttons): registers a
   * non-trapping focus scope so an enclosing focus trap (Modal, Drawer)
   * pauses while it is open. Combobox popups whose focus stays in the input
   * leave it off. @default false
   */
  focusable?: boolean;
}

export interface FloatingLayer {
  /** Callback ref for the floating element. */
  ref: RefCallback<HTMLElement>;
  /** The floating element while mounted. */
  element: HTMLElement | null;
  /**
   * Position styles (`position: fixed`, `left`, `top`, transform origin);
   * off-screen until the first position is computed.
   */
  floatingStyles: CSSProperties;
  /** Final placement after flipping. */
  placement: Placement;
  /** `true` once positioned for this opening. */
  isPositioned: boolean;
  /** Arrow offsets (when `arrowElement` is set). */
  arrowStyles: CSSProperties;
  /**
   * `dir` for the (portalled) floating element: the anchor's reading
   * direction when it differs from the portal container's.
   */
  dir: ReadingDirection | undefined;
}

/**
 * The shared behaviour of the React library's anchored, non-modal overlays (tooltips,
 * combobox / picker popups): `useAnchoredPosition` (flip / shift /
 * match-anchor-width over core positioning) + a core dismissable layer
 * (Escape only when topmost, pointer down / focus outside, the trigger as a
 * branch, nested in the enclosing layer through `LayerContext`).
 *
 * Render the element through `Portal` and provide `element` to its children
 * via `LayerContext.Provider` (or use `FloatingPanel`, which does both).
 */
export function useFloatingLayer({
  open,
  anchor,
  branches,
  onDismiss,
  onEscapeKeyDown,
  dismissOnPointerDownOutside = true,
  dismissOnFocusOutside = true,
  returnFocusOnEscape,
  focusable = false,
  ...position
}: UseFloatingLayerOptions): FloatingLayer {
  const [element, setElement] = useState<HTMLElement | null>(null);
  const anchored = useAnchoredPosition({ open, anchor, ...position });
  const { setFloating } = anchored;
  const ref = useMergedRefs<HTMLElement>(setElement, setFloating);
  const active = open && !!element;
  const dir = usePortalDirection(element, anchor, open);

  useDismissableLayer(element, {
    enabled: active,
    branches,
    onEscapeKeyDown: (event) => {
      onEscapeKeyDown?.(event);
      if (event.defaultPrevented) return;
      const doc = element?.ownerDocument;
      if (element && doc && element.contains(doc.activeElement)) {
        returnFocusOnEscape?.()?.focus();
      }
    },
    // Returning `false` cancels the dismissal without touching the event.
    onPointerDownOutside: () => dismissOnPointerDownOutside,
    onFocusOutside: () => dismissOnFocusOutside,
    onDismiss,
  });
  useFocusScope(element, {
    enabled: active && focusable,
    autoFocus: false,
    restoreFocus: false,
  });

  return {
    ref,
    element,
    floatingStyles: anchored.isPositioned
      ? anchored.floatingStyles
      : { ...anchored.floatingStyles, ...UNPOSITIONED },
    placement: anchored.placement,
    isPositioned: anchored.isPositioned,
    arrowStyles: anchored.arrowStyles,
    dir,
  };
}

export interface FloatingPanelProps
  extends
    Omit<UseFloatingLayerOptions, "arrowElement">,
    Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  /** Ref to the panel element. */
  ref?: Ref<HTMLDivElement>;
  /** Panel content (nested overlays become child layers of the panel). */
  children?: ReactNode;
}

/**
 * FloatingPanel: an anchored, non-modal popup panel (combobox listbox,
 * picker panel). Portalled through the theme-scoped `Portal`, positioned
 * with flip / shift (and optionally sized after the anchor), dismissed by
 * Escape (topmost layer only) and pointer down / focus outside the panel and
 * its `branches`. Renders nothing while closed.
 *
 * Marks the element with `data-side`, `data-align` and `data-placement`
 * (kebab-case) of the final placement.
 *
 * @example
 * <FloatingPanel
 *   open={open}
 *   anchor={field}
 *   placement="bottom-start"
 *   matchAnchorWidth="min"
 *   branches={() => [field]}
 *   onDismiss={() => setOpen(false)}
 * >
 *   <div role="listbox">...</div>
 * </FloatingPanel>
 */
export const FloatingPanel = ({
  ref,
  open,
  anchor,
  placement,
  offset,
  flip,
  shift,
  matchAnchorWidth,
  fitViewportHeight,
  branches,
  onDismiss,
  onEscapeKeyDown,
  dismissOnPointerDownOutside,
  dismissOnFocusOutside,
  returnFocusOnEscape,
  focusable,
  style,
  children,
  ...rest
}: FloatingPanelProps) => {
  const layer = useFloatingLayer({
    open,
    anchor,
    placement,
    offset,
    flip,
    shift,
    matchAnchorWidth,
    fitViewportHeight,
    branches,
    onDismiss,
    onEscapeKeyDown,
    dismissOnPointerDownOutside,
    dismissOnFocusOutside,
    returnFocusOnEscape,
    focusable,
  });
  const mergedRef = useMergedRefs<HTMLDivElement>(layer.ref, ref);
  if (!open) return null;
  const { side, align } = parsePlacement(layer.placement);
  return (
    <Portal>
      <div
        dir={layer.dir}
        {...rest}
        ref={mergedRef}
        data-side={side}
        data-align={align}
        data-placement={layer.placement}
        style={{ ...style, ...layer.floatingStyles }}
      >
        {/* Content mounts once the layer element exists (it registers in
            the same commit), so content focusing itself on mount (e.g. a
            keyboard-opened listbox) is already inside the layer, never
            "focus outside" for an enclosing Modal / Drawer. */}
        {layer.element && (
          <LayerContext.Provider value={layer.element}>
            {children}
          </LayerContext.Provider>
        )}
      </div>
    </Portal>
  );
};

export default FloatingPanel;
