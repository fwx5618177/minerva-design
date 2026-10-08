import { computed, type CSSProperties, type ComputedRef, type Ref } from "vue";
import {
  useAnchoredPosition,
  type AnchoredPositionOptions,
  type Placement,
} from "./anchored-position";
import { useDismissableLayer } from "./dismissable-layer";
import { useFocusScope } from "./focus-scope";
import { usePortalDirection, type ReadingDirection } from "./direction";

const UNPOSITIONED: CSSProperties = { left: "-9999px", top: "-9999px" };

export interface UseFloatingLayerOptions extends AnchoredPositionOptions {
  /** Elements that count as inside (the trigger) */
  branches?: () => Array<Element | null | undefined>;
  /** Escape / outside interaction requested closing */
  onDismiss?: () => void;
  onEscapeKeyDown?: (event: KeyboardEvent) => void;
  /** @default true */
  dismissOnPointerDownOutside?: boolean;
  /** @default true */
  dismissOnFocusOutside?: boolean;
  /** Element focused when Escape closes the layer from inside it */
  returnFocusOnEscape?: () => HTMLElement | null | undefined;
  /** Tab moves through the panel's content (no trap). @default false */
  focusable?: boolean;
}

export interface FloatingLayer {
  /** The floating element (template ref) */
  element: Ref<HTMLElement | null>;
  floatingStyles: ComputedRef<CSSProperties>;
  placement: ComputedRef<Placement>;
  isPositioned: ComputedRef<boolean>;
  arrowStyles: ComputedRef<CSSProperties>;
  dir: ComputedRef<ReadingDirection | undefined>;
}

/**
 * A positioned, dismissable floating layer (Popover, Select / AutoComplete
 * listbox, Menu, Tooltip...): anchored position + dismissable layer +
 * optional focus scope, like `useFloatingLayer` of the React renderer.
 * Off-screen until the first position is computed (no flash at 0,0).
 */
export function useFloatingLayer(
  options: () => UseFloatingLayerOptions,
): FloatingLayer {
  const anchored = useAnchoredPosition(options);
  const element = anchored.floating;
  const active = () => options().open && !!element.value;
  const dir = usePortalDirection(
    element,
    () => options().anchor,
    () => options().open,
  );

  useDismissableLayer(element, () => {
    const o = options();
    return {
      enabled: active(),
      branches: o.branches,
      onEscapeKeyDown: (event) => {
        o.onEscapeKeyDown?.(event);
        if (event.defaultPrevented) return;
        const el = element.value;
        const doc = el?.ownerDocument;
        if (el && doc && el.contains(doc.activeElement)) {
          o.returnFocusOnEscape?.()?.focus();
        }
      },
      onPointerDownOutside: () => o.dismissOnPointerDownOutside ?? true,
      onFocusOutside: () => o.dismissOnFocusOutside ?? true,
      onDismiss: o.onDismiss,
    };
  });
  useFocusScope(element, () => ({
    enabled: active() && !!options().focusable,
    autoFocus: false,
    restoreFocus: false,
  }));

  return {
    element,
    floatingStyles: computed(() =>
      anchored.isPositioned.value
        ? anchored.floatingStyles.value
        : { ...anchored.floatingStyles.value, ...UNPOSITIONED },
    ),
    placement: anchored.placement,
    isPositioned: anchored.isPositioned,
    arrowStyles: anchored.arrowStyles,
    dir: computed(() => dir()),
  };
}
