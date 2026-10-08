<script setup lang="ts">
/** Owns the open state of a compound modal (`v-model:open`). */
import { computed } from "vue";
import { provideDialog } from "../../internal/dialog";
import { useControllable } from "../../internal/controllable";

defineOptions({ name: "ModalRoot" });

const props = withDefaults(
  defineProps<{
    /** Controlled open state (`v-model:open`) */
    open?: boolean;
    /** Initial open state while uncontrolled. @default false */
    defaultOpen?: boolean;
    /** Focus trap, scroll lock, overlay, page hidden from AT. @default true */
    modal?: boolean;
  }>(),
  { open: undefined, defaultOpen: undefined, modal: true },
);
const emit = defineEmits<{
  "update:open": [open: boolean];
  /** The open state was requested to change */
  openChange: [open: boolean];
}>();
defineSlots<{ default?: () => unknown }>();

const open = useControllable<boolean>(props, "open", {
  fallback: false,
  name: "Modal",
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
