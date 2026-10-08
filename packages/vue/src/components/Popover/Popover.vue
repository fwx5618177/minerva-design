<script setup lang="ts">
/**
 * Popover: a click-triggered, interactive floating panel anchored to its
 * trigger (or a `PopoverAnchor`). The primary component for anchored panels:
 * unlike Tooltip it holds focusable content and manages focus, Escape and
 * outside-click dismissal itself. Owns the open state (`v-model:open`).
 */
import { computed, provide, shallowRef, useId } from "vue";
import { useControllable } from "../../internal/controllable";
import { POPOVER_KEY } from "./context";
import type { PopoverProps } from "./types";

defineOptions({ name: "Popover" });

const props = withDefaults(defineProps<PopoverProps>(), {
  open: undefined,
  defaultOpen: undefined,
  modal: false,
});
const emit = defineEmits<{
  "update:open": [open: boolean];
  /** Requested open state (trigger, Escape, outside click, `PopoverClose`) */
  openChange: [open: boolean];
}>();
defineSlots<{
  /** `PopoverTrigger` / `PopoverAnchor` and `PopoverContent` */
  default?: () => unknown;
}>();

const open = useControllable<boolean>(props, "open", {
  fallback: false,
  name: "Popover",
  onChange: (value) => emit("openChange", value),
});

provide(POPOVER_KEY, {
  open: computed(() => open.value),
  setOpen: (value: boolean) => {
    open.value = value;
  },
  modal: computed(() => props.modal),
  contentId: useId(),
  trigger: shallowRef<HTMLElement | null>(null),
  anchor: shallowRef<HTMLElement | null>(null),
});
</script>

<template>
  <slot />
</template>
