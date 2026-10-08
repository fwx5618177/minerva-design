<script setup lang="ts">
/**
 * ContextMenu: the Menu entries opened at the pointer on right click (long
 * press on touch); Shift+F10 or the ContextMenu key open it at the area
 * (the single child of the default slot). A right click while open moves
 * the menu. Focus moves to the first item and returns to the area (or the
 * element focused in it) on close.
 *
 * Attributes (`class`, `style`, `data-*`...) go to the menu panel.
 */
import {
  computed,
  onBeforeUnmount,
  shallowRef,
  useId,
  type CSSProperties,
} from "vue";
import type { Placement, VirtualElement } from "@minerva/dom";
import { useInheritedDirection } from "../../internal/direction";
import { useLayerParent } from "../../internal/scope";
import { unrefElement } from "../../internal/Slot";
import { MenuRoot, TriggerSlot, type FocusIntent } from "./MenuItems";
import { LONG_PRESS_DELAY } from "./constants";
import type { ContextMenuProps, MenuAction } from "./types";

defineOptions({ name: "ContextMenu", inheritAttrs: false });

const props = withDefaults(defineProps<ContextMenuProps>(), {
  closeOnSelect: true,
  size: "medium",
  disabled: false,
  modal: true,
  loop: true,
  dir: undefined,
  ariaLabel: undefined,
});
const emit = defineEmits<{
  /** The menu opens or closes */
  openChange: [open: boolean];
  /** An action was selected (the original item object) */
  select: [item: MenuAction];
}>();
defineSlots<{
  /** The area opening the menu (its single child gets the listeners) */
  default?: () => unknown;
}>();

interface Position {
  anchor: Element | VirtualElement;
  placement: Placement;
  offset: { mainAxis: number; crossAxis: number };
}

const AT_POINTER = { mainAxis: 2, crossAxis: 0 };
const AT_ELEMENT = { mainAxis: 4, crossAxis: 0 };

/** A zero-size anchor at a viewport point (the pointer). */
const pointAnchor = (
  x: number,
  y: number,
  contextElement: Element,
): VirtualElement => ({
  contextElement,
  getBoundingClientRect: () => ({
    x,
    y,
    left: x,
    top: y,
    right: x,
    bottom: y,
    width: 0,
    height: 0,
  }),
});

// Uncontrolled only, like React (`openChange` reports the changes).
const open = shallowRef(false);
const area = shallowRef<HTMLElement | null>(null);
const setArea = (value: unknown) => {
  area.value = unrefElement(value);
};
// Without `dir`, the menu follows the direction inherited by the area.
const inheritedDir = useInheritedDirection(area, () => props.dir === undefined);
const dir = computed(() => props.dir ?? inheritedDir.value);
const position = shallowRef<Position | null>(null);
const tabContainer = useLayerParent();
const contentId = useId();
let restoreTarget: HTMLElement | null = null;
let longPress: ReturnType<typeof setTimeout> | undefined;

const clearLongPress = () => {
  clearTimeout(longPress);
  longPress = undefined;
};
onBeforeUnmount(clearLongPress);

const setOpen = (value: boolean) => {
  if (open.value === value) return;
  open.value = value;
  emit("openChange", value);
};
const openAt = (el: HTMLElement, next: Position) => {
  if (!open.value) {
    const focused = el.ownerDocument.activeElement;
    restoreTarget =
      focused instanceof HTMLElement && el.contains(focused) ? focused : el;
  }
  position.value = next;
  setOpen(true);
};
const openAtPoint = (el: HTMLElement, x: number, y: number) =>
  openAt(el, {
    anchor: pointAnchor(x, y, el),
    placement: dir.value === "rtl" ? "left-start" : "right-start",
    offset: AT_POINTER,
  });

const onContextmenu = (event: MouseEvent) => {
  const el = area.value;
  if (props.disabled || event.defaultPrevented || !el) return;
  event.preventDefault();
  clearLongPress();
  openAtPoint(el, event.clientX, event.clientY);
};

const onKeydown = (event: KeyboardEvent) => {
  const el = area.value;
  if (props.disabled || event.defaultPrevented || !el) return;
  if (event.key === "ContextMenu" || (event.shiftKey && event.key === "F10")) {
    event.preventDefault();
    openAt(el, {
      anchor: el,
      placement: dir.value === "rtl" ? "bottom-end" : "bottom-start",
      offset: AT_ELEMENT,
    });
  }
};

const onPointerdown = (event: PointerEvent) => {
  const el = area.value;
  if (props.disabled || event.pointerType !== "touch" || !el) return;
  clearLongPress();
  const { clientX, clientY } = event;
  longPress = setTimeout(() => {
    longPress = undefined;
    openAtPoint(el, clientX, clientY);
  }, LONG_PRESS_DELAY);
};
const onTouchEnd = (event: PointerEvent) => {
  if (event.pointerType === "touch") clearLongPress();
};

const consumeIntent = (): FocusIntent => "first";
const getRestoreTarget = () => restoreTarget;
const selectItem = (item: MenuAction) => emit("select", item);
const onPointerDownOutside = (event: PointerEvent) => {
  // A right click in the area moves the menu instead of closing it.
  if (
    event.button === 2 &&
    event.target instanceof Node &&
    area.value?.contains(event.target)
  ) {
    event.preventDefault();
  }
};

const areaStyle = computed<CSSProperties | undefined>(() =>
  props.disabled
    ? undefined
    : {
        WebkitTouchCallout: "none",
        // Keep right clicks reaching the area while a modal menu disables
        // pointer events on the page (they move the menu).
        ...(open.value && props.modal ? { pointerEvents: "auto" } : {}),
      },
);
</script>

<template>
  <TriggerSlot
    :ref="setArea"
    hook-component="context-menu"
    :hook-open="open"
    :hook-disabled="disabled"
    :style="areaStyle"
    @contextmenu="onContextmenu"
    @keydown="onKeydown"
    @pointerdown="onPointerdown"
    @pointermove="onTouchEnd"
    @pointerup="onTouchEnd"
    @pointercancel="onTouchEnd"
  >
    <slot />
  </TriggerSlot>
  <MenuRoot
    component="context-menu"
    :items="items"
    :close-on-select="closeOnSelect"
    :size="size"
    :loop="loop"
    :dir="dir"
    :modal="modal"
    :aria-label="ariaLabel"
    :open="open && !disabled && !!position"
    :set-open="setOpen"
    :select-item="selectItem"
    :anchor="position?.anchor ?? null"
    :placement="position?.placement ?? 'right-start'"
    :offset="position?.offset ?? AT_POINTER"
    :content-id="contentId"
    :trigger="null"
    :get-restore-target="getRestoreTarget"
    :consume-intent="consumeIntent"
    :pointer-down-outside="onPointerDownOutside"
    :tab-container="tabContainer ?? null"
    :panel-attrs="$attrs"
  />
</template>
