<script setup lang="ts">
/** Owns the open state of a compound drawer (`v-model:open`). */
import { computed } from "vue";
import { provideDialog } from "../../internal/dialog";
import { useControllable } from "../../internal/controllable";
import type { DrawerRootProps } from "./types";

defineOptions({ name: "DrawerRoot" });

const props = withDefaults(defineProps<DrawerRootProps>(), {
  open: undefined,
  defaultOpen: undefined,
  modal: true,
});
const emit = defineEmits<{
  "update:open": [open: boolean];
  /** The open state was requested to change (trigger, close, Escape, overlay) */
  openChange: [open: boolean];
}>();
defineSlots<{ default?: () => unknown }>();

const open = useControllable<boolean>(props, "open", {
  fallback: false,
  name: "Drawer",
  onChange: (value) => emit("openChange", value),
});
provideDialog({
  open: computed(() => open.value),
  setOpen: (value) => {
    open.value = value;
  },
  modal: computed(() => props.modal),
});
</script>

<template>
  <slot />
</template>
