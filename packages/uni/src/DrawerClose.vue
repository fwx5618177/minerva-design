<script setup lang="ts">
import { inject, type ComputedRef } from "vue";
const props = defineProps<{ disabled?: boolean }>();
const emit = defineEmits<{ click: [event: Event] }>();
function close(event: Event) {
  if (props.disabled) return;
  if (typeof event.preventDefault !== "function") {
    Object.assign(event, {
      defaultPrevented: false,
      preventDefault() {
        Object.defineProperty(event, "defaultPrevented", {
          value: true,
          configurable: true,
        });
      },
    });
  }
  emit("click", event);
  if (!event.defaultPrevented) root?.setOpen(false);
}
const root = inject<{
  open: ComputedRef<boolean>;
  setOpen: (v: boolean) => void;
}>("minerva:drawer");
</script>
<template>
  <button
    class="mn-drawer-close mn-close"
    :class="{ 'mn-disabled': disabled }"
    :disabled="disabled"
    @tap="close"
  >
    <slot>×</slot>
  </button>
</template>
