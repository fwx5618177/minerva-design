<script setup lang="ts">
/**
 * FloatingPanel: a teleported, anchored, dismissable panel (Select /
 * AutoComplete / Cascader / TimePicker listboxes, Menu, Popover, Tooltip...):
 * the Vue counterpart of the React `FloatingPanel`. Renders only while
 * `open`; content mounts once the layer element exists (so content focusing
 * itself on mount is already inside the layer). `data-side` / `data-align` /
 * `data-placement` follow the computed placement.
 */
import { computed, provide } from "vue";
import { parsePlacement } from "@minerva/dom";
import Portal from "./Portal";
import { LAYER_KEY } from "./scope";
import {
  useFloatingLayer,
  type UseFloatingLayerOptions,
} from "./floating-layer";
import type { Placement, VirtualElement } from "./anchored-position";

defineOptions({ name: "FloatingPanel", inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    open: boolean;
    anchor: Element | VirtualElement | null | undefined;
    placement?: Placement;
    offset?: { mainAxis?: number; crossAxis?: number };
    flip?: boolean;
    shift?: boolean;
    matchAnchorWidth?: false | "min" | "exact";
    fitViewportHeight?: boolean;
    branches?: () => Array<Element | null | undefined>;
    dismissOnPointerDownOutside?: boolean;
    dismissOnFocusOutside?: boolean;
    returnFocusOnEscape?: () => HTMLElement | null | undefined;
    focusable?: boolean;
    arrowElement?: HTMLElement | null;
  }>(),
  {
    placement: "bottom",
    offset: undefined,
    flip: true,
    shift: true,
    matchAnchorWidth: false,
    fitViewportHeight: false,
    branches: undefined,
    dismissOnPointerDownOutside: true,
    dismissOnFocusOutside: true,
    returnFocusOnEscape: undefined,
    focusable: false,
    arrowElement: undefined,
  },
);
const emit = defineEmits<{
  /** Escape / outside interaction requested closing */
  dismiss: [];
  escapeKeyDown: [event: KeyboardEvent];
}>();
defineSlots<{
  default?: (props: {
    placement: Placement;
    arrowStyles: Record<string, string | undefined>;
  }) => unknown;
}>();

const layer = useFloatingLayer((): UseFloatingLayerOptions => ({
  open: props.open,
  anchor: props.anchor,
  placement: props.placement,
  offset: props.offset,
  flip: props.flip,
  shift: props.shift,
  matchAnchorWidth: props.matchAnchorWidth,
  fitViewportHeight: props.fitViewportHeight,
  arrowElement: props.arrowElement,
  branches: props.branches,
  dismissOnPointerDownOutside: props.dismissOnPointerDownOutside,
  dismissOnFocusOutside: props.dismissOnFocusOutside,
  returnFocusOnEscape: props.returnFocusOnEscape,
  focusable: props.focusable,
  onDismiss: () => emit("dismiss"),
  onEscapeKeyDown: (event) => emit("escapeKeyDown", event),
}));
provide(LAYER_KEY, layer.element);

const setElement = (el: unknown) => {
  layer.element.value = el instanceof HTMLElement ? el : null;
};
const sides = computed(() => parsePlacement(layer.placement.value));

defineExpose({ element: layer.element, placement: layer.placement });
</script>

<template>
  <!-- The teleport stays mounted; only its content toggles. A teleport
       unmounted from inside another layer (a modal) would remove its anchor
       nodes from that layer, which a focus trap reacts to (focus pulled
       back into the modal instead of returning to the trigger). -->
  <Portal>
    <template v-if="open">
      <div
        :ref="setElement"
        :dir="layer.dir.value"
        v-bind="$attrs"
        :data-side="sides.side"
        :data-align="sides.align"
        :data-placement="layer.placement.value"
        :style="layer.floatingStyles.value"
      >
        <slot
          v-if="layer.element.value"
          :placement="layer.placement.value"
          :arrow-styles="
            layer.arrowStyles.value as Record<string, string | undefined>
          "
        />
      </div>
    </template>
  </Portal>
</template>
