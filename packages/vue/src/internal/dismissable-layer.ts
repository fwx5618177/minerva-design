import { computed, toValue, watch, type MaybeRefOrGetter } from "vue";
import {
  createDismissableLayer,
  type DismissableLayer,
  type DismissableLayerOptions,
} from "@minerva/dom";
import { useLayerParent } from "./scope";

export interface UseDismissableLayerOptions extends Omit<
  DismissableLayerOptions,
  "parent" | "branches"
> {
  /** @default true */
  enabled?: boolean;
  /** Parent layer; defaults to the closest layer of the component tree */
  parent?: Element | null;
  branches?: () => Array<Element | null | undefined>;
}

/**
 * Registers `element` in the shared dismissable layer stack of @minerva/dom
 * (Escape / pointer down / focus outside, topmost layer only) while enabled.
 * `options` is read lazily: callbacks always see the latest values.
 */
export function useDismissableLayer(
  element: MaybeRefOrGetter<Element | null | undefined>,
  options: () => UseDismissableLayerOptions,
): void {
  const contextParent = useLayerParent();
  const enabled = computed(() => options().enabled ?? true);
  let layer: DismissableLayer | null = null;

  watch(
    [enabled, () => toValue(element)],
    ([on, el], _prev, onCleanup) => {
      if (!on || !el) return;
      const created = createDismissableLayer(el, {
        parent: null,
        onEscapeKeyDown: (event) => options().onEscapeKeyDown?.(event),
        onPointerDownOutside: (event) =>
          options().onPointerDownOutside?.(event),
        onFocusOutside: (event) => options().onFocusOutside?.(event),
        onInteractOutside: (event) => options().onInteractOutside?.(event),
        onDismiss: () => options().onDismiss?.(),
        branches: () => options().branches?.() ?? [],
        excludeFromOutside: (node) => !!options().excludeFromOutside?.(node),
      });
      layer = created;
      created.update({
        parent: options().parent ?? contextParent?.value ?? null,
        disableOutsidePointerEvents:
          options().disableOutsidePointerEvents ?? false,
      });
      onCleanup(() => {
        created.destroy();
        if (layer === created) layer = null;
      });
    },
    { immediate: true, flush: "post" },
  );

  watch(
    () => [
      options().parent ?? contextParent?.value ?? null,
      options().disableOutsidePointerEvents ?? false,
    ],
    ([parent, disableOutsidePointerEvents]) => {
      layer?.update({
        parent: parent as Element | null,
        disableOutsidePointerEvents: disableOutsidePointerEvents as boolean,
      });
    },
    { flush: "post" },
  );
}
