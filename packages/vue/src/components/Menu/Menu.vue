<script setup lang="ts">
/**
 * Menu: an action menu opened from a trigger button (WAI-ARIA menu button).
 * Supports icons, shortcuts, separators, groups, checkbox items, radio
 * groups, submenus, typeahead and full keyboard navigation. For a
 * select-like list of options see Select.
 *
 * - Trigger (the single child of the `trigger` slot, or of the default
 *   slot): click, Enter, Space or ArrowDown open the menu and focus the
 *   first item (a pointer click focuses the panel); ArrowUp focuses the last.
 * - Inside: arrows (wrapping with `loop`), Home / End, typeahead, Enter /
 *   Space activate; Escape closes (a submenu only) and returns focus; Tab
 *   closes the menu and moves on from the trigger.
 * - Submenus open with ArrowRight (ArrowLeft in RTL), Enter, Space or hover,
 *   and stay open while the pointer moves towards them.
 * - `modal` (default): outside pointer events disabled, focus trapped,
 *   scroll locked, the rest of the page hidden from assistive technology.
 *
 * Attributes (`class`, `style`, `data-*`...) go to the menu panel.
 */
import { computed, shallowRef, useId } from "vue";
import { toPlacement } from "@minerva/dom";
import { useControllable } from "../../internal/controllable";
import { useInheritedDirection } from "../../internal/direction";
import { useLayerParent } from "../../internal/scope";
import { unrefElement } from "../../internal/Slot";
import { MenuRoot, TriggerSlot, type FocusIntent } from "./MenuItems";
import type { MenuAction, MenuProps } from "./types";

defineOptions({ name: "Menu", inheritAttrs: false });

const props = withDefaults(defineProps<MenuProps>(), {
  closeOnSelect: true,
  size: "medium",
  align: "end",
  side: "bottom",
  open: undefined,
  defaultOpen: undefined,
  disabled: false,
  modal: true,
  loop: true,
  dir: undefined,
  ariaLabel: undefined,
});
const emit = defineEmits<{
  "update:open": [open: boolean];
  /** The menu opens or closes */
  openChange: [open: boolean];
  /** An action was selected (the original item object) */
  select: [item: MenuAction];
}>();
defineSlots<{
  /** The trigger element (its single child gets the trigger props) */
  trigger?: () => unknown;
  /** Alternative to the `trigger` slot */
  default?: () => unknown;
}>();

const OFFSET = { mainAxis: 6, crossAxis: 0 };

const open = useControllable<boolean>(props, "open", {
  fallback: false,
  name: "Menu",
  onChange: (value) => emit("openChange", value),
});
const trigger = shallowRef<HTMLElement | null>(null);
const setTrigger = (value: unknown) => {
  trigger.value = unrefElement(value);
};
// Without `dir`, the menu (teleported out of the trigger's subtree) follows
// the reading direction inherited by the trigger, read when it opens.
const inheritedDir = useInheritedDirection(
  trigger,
  () => open.value && props.dir === undefined,
);
const dir = computed(() => props.dir ?? inheritedDir.value);
const tabContainer = useLayerParent();
const generatedId = useId();
const contentId = useId();
const placement = computed(() => toPlacement(props.side, props.align));

let intent: FocusIntent = "content";
const consumeIntent = () => {
  const value = intent;
  intent = "content";
  return value;
};
const getRestoreTarget = () => trigger.value;
const setOpen = (value: boolean) => {
  open.value = value;
};
const openWith = (next: FocusIntent) => {
  intent = next;
  setOpen(true);
};

const onKeydown = (event: KeyboardEvent) => {
  if (props.disabled || event.defaultPrevented) return;
  switch (event.key) {
    case "Enter":
    case " ":
      event.preventDefault();
      if (open.value) setOpen(false);
      else openWith("first");
      break;
    case "ArrowDown":
      event.preventDefault();
      openWith("first");
      break;
    case "ArrowUp":
      event.preventDefault();
      openWith("last");
      break;
  }
};

const onClick = (event: MouseEvent) => {
  if (props.disabled || event.defaultPrevented) return;
  if (open.value) setOpen(false);
  // detail 0: a keyboard / programmatic click
  else openWith(event.detail === 0 ? "first" : "content");
};

const selectItem = (item: MenuAction) => emit("select", item);
</script>

<template>
  <TriggerSlot
    :ref="setTrigger"
    hook-component="menu"
    :hook-open="open"
    :hook-disabled="disabled"
    :id="generatedId"
    aria-haspopup="menu"
    :aria-expanded="open ? 'true' : 'false'"
    :aria-controls="open ? contentId : undefined"
    :disabled="disabled || undefined"
    @keydown="onKeydown"
    @click="onClick"
  >
    <slot name="trigger"><slot /></slot>
  </TriggerSlot>
  <MenuRoot
    component="menu"
    :items="items"
    :close-on-select="closeOnSelect"
    :size="size"
    :loop="loop"
    :dir="dir"
    :modal="modal"
    :aria-label="ariaLabel"
    :labelled-by="trigger?.id || generatedId"
    :open="open && !disabled"
    :set-open="setOpen"
    :select-item="selectItem"
    :anchor="trigger"
    :placement="placement"
    :offset="OFFSET"
    :content-id="contentId"
    :trigger="trigger"
    :get-restore-target="getRestoreTarget"
    :consume-intent="consumeIntent"
    :tab-container="tabContainer ?? null"
    :panel-attrs="$attrs"
  />
</template>
