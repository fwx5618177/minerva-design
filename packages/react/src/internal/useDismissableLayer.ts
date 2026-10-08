import { createContext, useContext, useLayoutEffect, useRef } from "react";
import {
  createDismissableLayer,
  type DismissableLayer,
  type DismissableLayerOptions,
} from "@minerva/dom";

/**
 * Element of the closest enclosing dismissable layer (`null` at the top
 * level). Every overlay that registers a layer must provide its own element
 * to its children:
 *
 *   <LayerContext.Provider value={contentElement}>{children}</LayerContext.Provider>
 *
 * so overlays rendered inside it (a Popover / Select / Menu inside a Modal, a
 * submenu) become its child layers even when portalled elsewhere in the DOM,
 * while unrelated overlays stay independent.
 */
export const LayerContext = createContext<Element | null>(null);

/** Element of the closest enclosing layer, `null` at the top level. */
export const useLayerParent = (): Element | null => useContext(LayerContext);

export interface UseDismissableLayerOptions extends Omit<
  DismissableLayerOptions,
  "parent" | "branches"
> {
  /** Register the layer (typically the open state). @default true */
  enabled?: boolean;
  /**
   * Parent layer element. Defaults to the closest enclosing layer from
   * `LayerContext` (`null` at the top level = an independent root layer).
   */
  parent?: Element | null;
  /** Elements treated as part of the layer, e.g. the trigger. */
  branches?: () => Array<Element | null | undefined>;
}

/**
 * Registers `element` as a core dismissable layer while `enabled`:
 * Escape (topmost layer only), pointer down outside and focus outside call
 * the handlers, then `onDismiss` unless one of them called
 * `event.preventDefault()` (or returned `false`).
 *
 * The parent layer comes from `LayerContext` (explicit, never inferred from
 * the stacking order), so layers nested in the React tree are children of
 * their enclosing layer and unrelated overlays are independent. The caller
 * provides `element` to its children via `LayerContext.Provider`.
 *
 * Handlers are read from the latest render (no re-registration on change).
 * Register the layer before activating a focus scope in the same component
 * (hook order), so moving focus into the new layer is not "focus outside" for
 * its parent.
 */
export function useDismissableLayer(
  element: Element | null,
  options: UseDismissableLayerOptions = {},
): void {
  const contextParent = useLayerParent();
  const {
    enabled = true,
    parent = contextParent,
    disableOutsidePointerEvents = false,
  } = options;

  const latest = useRef(options);
  useLayoutEffect(() => {
    latest.current = options;
  });

  const layerRef = useRef<DismissableLayer | null>(null);

  useLayoutEffect(() => {
    if (!enabled || !element) return;
    const layer = createDismissableLayer(element, {
      // `parent` / `disableOutsidePointerEvents` are kept up to date below.
      parent: null,
      onEscapeKeyDown: (event) => latest.current.onEscapeKeyDown?.(event),
      onPointerDownOutside: (event) =>
        latest.current.onPointerDownOutside?.(event),
      onFocusOutside: (event) => latest.current.onFocusOutside?.(event),
      onInteractOutside: (event) => latest.current.onInteractOutside?.(event),
      onDismiss: () => latest.current.onDismiss?.(),
      branches: () => latest.current.branches?.() ?? [],
      excludeFromOutside: (node) => !!latest.current.excludeFromOutside?.(node),
    });
    layerRef.current = layer;
    return () => {
      layer.destroy();
      if (layerRef.current === layer) layerRef.current = null;
    };
  }, [enabled, element]);

  useLayoutEffect(() => {
    layerRef.current?.update({ parent, disableOutsidePointerEvents });
  }, [enabled, element, parent, disableOutsidePointerEvents]);
}
