<script setup lang="ts">
/**
 * PopoverContent: the anchored panel (`role="dialog"`); flips / shifts to
 * stay in view.
 *
 * - Focus moves to its first tabbable (or the panel) on open and returns to
 *   the trigger on close.
 * - Escape (topmost layer only), a pointer down outside or focus leaving it
 *   close it; overlays opened inside it are child layers, and a Popover
 *   inside a Modal is a child layer of the Modal.
 * - Non-modal: Tab past its last tabbable (Shift+Tab before its first)
 *   closes it and moves focus to the tabbable after (before) the trigger
 *   in document order; Tab never loops inside the panel.
 * - `modal` (on the root): focus trap (Tab loops inside), scroll lock, the
 *   rest of the page hidden from assistive technology, outside pointer
 *   events disabled.
 * - Stays mounted during the `data-state="closed"` exit animation.
 *
 * Attributes (`class`, `style`, `aria-label`, listeners...) fall through to
 * the panel element.
 */
import {
  computed,
  provide,
  shallowRef,
  useAttrs,
  type CSSProperties,
  type FunctionalComponent,
} from "vue";
import { parsePlacement, toPlacement } from "@minerva/dom";
import styles from "@react-styles/components/Popover/popover.module.scss";
import Portal from "../../internal/Portal";
import { LAYER_KEY, useLayerParent } from "../../internal/scope";
import { useAnchoredPosition } from "../../internal/anchored-position";
import { useDismissableLayer } from "../../internal/dismissable-layer";
import { useFocusScope } from "../../internal/focus-scope";
import { useHideOthers, useScrollLock } from "../../internal/scroll-lock";
import { usePresence } from "../../internal/presence";
import { usePortalDirection } from "../../internal/direction";
import { hooks } from "../../internal/hooks";
import { composeListener, usePopoverContext } from "./context";
import { adjacentTabbable, tabLeavesPanel } from "./tabbing";
import type { PopoverContentProps } from "./types";

defineOptions({ name: "PopoverContent", inheritAttrs: false });

/** Size of the arrow (width x height, px). */
const ARROW_WIDTH = 10;
const ARROW_HEIGHT = 5;
/** Off-screen until the first position is computed (no flash at 0,0). */
const UNPOSITIONED: CSSProperties = { transform: "translate(0, -200%)" };

const props = withDefaults(defineProps<PopoverContentProps>(), {
  side: "bottom",
  align: "center",
  sideOffset: 6,
  alignOffset: 0,
  collisionPadding: 8,
  matchAnchorWidth: false,
  arrow: false,
  portal: true,
  forceMount: false,
});
const emit = defineEmits<{
  /** Before focus moves into the panel on open; `preventDefault()` keeps focus where it is */
  openAutoFocus: [event: Event];
  /** Before focus returns to the trigger on close; `preventDefault()` skips it */
  closeAutoFocus: [event: Event];
  /** Escape pressed while topmost; `preventDefault()` keeps it open */
  escapeKeyDown: [event: KeyboardEvent];
  /** Pointer pressed outside; `preventDefault()` keeps it open */
  pointerDownOutside: [event: PointerEvent];
  /** Focus moved outside; `preventDefault()` keeps it open */
  focusOutside: [event: FocusEvent];
  /** Pointer down or focus outside; `preventDefault()` keeps it open */
  interactOutside: [event: PointerEvent | FocusEvent];
}>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const context = usePopoverContext("PopoverContent");
const { open, modal, trigger, anchor } = context;
// Tab moves on within the enclosing layer (e.g. a Modal), else the page.
const tabContainer = useLayerParent();

const element = shallowRef<HTMLElement | null>(null);
const arrowElement = shallowRef<HTMLElement | null>(null);
const present = usePresence(open, element);
const active = computed(() => open.value && !!element.value);
const anchorElement = computed(() => anchor.value ?? trigger.value);

const position = useAnchoredPosition(() => ({
  open: present.value,
  anchor: anchorElement.value,
  placement: toPlacement(props.side, props.align),
  offset: {
    mainAxis: props.sideOffset + (props.arrow ? ARROW_HEIGHT : 0),
    crossAxis: props.alignOffset,
  },
  matchAnchorWidth: props.matchAnchorWidth,
  padding: props.collisionPadding,
  arrowElement: props.arrow ? arrowElement.value : null,
}));
// Teleported content keeps the reading direction of its anchor.
const dir = usePortalDirection(element, anchorElement, open);
const sides = computed(() => parsePlacement(position.placement.value));

useDismissableLayer(element, () => ({
  enabled: active.value,
  disableOutsidePointerEvents: modal.value,
  branches: () => [trigger.value],
  onEscapeKeyDown: (event) => emit("escapeKeyDown", event),
  onPointerDownOutside: (event) => emit("pointerDownOutside", event),
  // Focus is trapped while modal: never dismiss on focus outside.
  onFocusOutside: (event) => {
    emit("focusOutside", event);
    if (modal.value) event.preventDefault();
  },
  onInteractOutside: (event) => emit("interactOutside", event),
  onDismiss: () => context.setOpen(false),
}));
useFocusScope(element, () => ({
  enabled: active.value,
  trapped: modal.value,
  loop: modal.value,
  restoreFocus: () => trigger.value,
  onMountAutoFocus: (event) => emit("openAutoFocus", event),
  onUnmountAutoFocus: (event) => emit("closeAutoFocus", event),
}));
useScrollLock(() => active.value && modal.value);
useHideOthers(element, () => active.value && modal.value);
provide(LAYER_KEY, element);

// Non-modal: Tab out of the panel continues from the trigger.
const onKeyDown = (event: Event) => {
  const key = event as KeyboardEvent;
  const panel = element.value;
  const triggerEl = trigger.value;
  if (
    modal.value ||
    !panel ||
    !triggerEl ||
    key.key !== "Tab" ||
    key.altKey ||
    key.ctrlKey ||
    key.metaKey
  )
    return;
  const backwards = key.shiftKey;
  // Ignore keys from nested (teleported) layers rendered inside the panel.
  if (!tabLeavesPanel(panel, key.target as Element, backwards)) return;
  key.preventDefault();
  const container = tabContainer?.value ?? triggerEl.ownerDocument.body;
  const next = adjacentTabbable(triggerEl, container, backwards) ?? triggerEl;
  next.focus();
  context.setOpen(false);
};

const setElement = (el: unknown) => {
  element.value = el instanceof HTMLElement ? el : null;
};
const setPositioner = (el: unknown) => {
  position.floating.value = el instanceof HTMLElement ? el : null;
};
const setArrow = (el: unknown) => {
  arrowElement.value = el instanceof HTMLElement ? el : null;
};

const positionerStyle = computed<CSSProperties>(() =>
  position.isPositioned.value
    ? position.floatingStyles.value
    : { ...position.floatingStyles.value, ...UNPOSITIONED },
);
const panelBindings = computed(() => ({
  ...composeListener(attrs, "onKeydown", onKeyDown),
  ...hooks("popover", "content", {
    state: open.value ? "open" : "closed",
    side: sides.value.side,
    align: sides.value.align,
    placement: position.placement.value,
  }),
}));

/** Renders its slot as is (`portal={false}`). */
const Inline: FunctionalComponent = (_props, { slots }) => slots.default?.();

defineExpose({ element });
</script>

<template>
  <!-- The teleport stays mounted (its anchors too): unmounting the panel must
       not mutate an enclosing layer (a trapped Modal would grab the focus). -->
  <component :is="portal ? Portal : Inline">
    <!-- The positioned wrapper keeps `transform` free for the panel animation. -->
    <div
      v-if="present || forceMount"
      :ref="setPositioner"
      :class="styles.positioner"
      :style="positionerStyle"
      :data-side="sides.side"
      :data-align="sides.align"
    >
      <div
        :id="context.contentId"
        :ref="setElement"
        role="dialog"
        :aria-modal="modal || undefined"
        tabindex="-1"
        :dir="dir()"
        :class="styles.content"
        v-bind="panelBindings"
      >
        <slot />
        <span
          v-if="arrow"
          :ref="setArrow"
          :class="styles.arrowWrapper"
          :style="position.arrowStyles.value"
          aria-hidden="true"
          v-bind="hooks('popover', 'arrow')"
        >
          <svg
            :class="styles.arrow"
            :width="ARROW_WIDTH"
            :height="ARROW_HEIGHT"
            viewBox="0 0 30 10"
            preserveAspectRatio="none"
          >
            <polygon points="0,0 30,0 15,10" />
          </svg>
        </span>
      </div>
    </div>
  </component>
</template>
