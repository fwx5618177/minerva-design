<script setup lang="ts">
// #ifdef H5
import H5Slot from "./H5Slot";
// #endif
const h5 = typeof document !== "undefined";
import { inject } from "vue";
import type { MiniPopoverContext } from "./popover-context";
const props = defineProps<{ disabled?: boolean; asChild?: boolean }>();
function close(event: Event) {
  if (!props.disabled && !event.defaultPrevented) root?.setOpen(false);
}
const root = inject<MiniPopoverContext | undefined>(
  "minerva:popover",
  undefined,
);
</script>
<template>
  <!-- #ifdef H5 -->
  <H5Slot
    v-if="asChild && h5"
    class="mn-popover-close"
    :disabled="disabled"
    @click="close"
    ><slot
  /></H5Slot>
  <!-- #endif -->
  <button
    v-if="!(asChild && h5)"
    class="mn-close mn-popover-close"
    :disabled="disabled"
    :class="{ 'mn-disabled': disabled }"
    @tap.stop="!disabled && root?.setOpen(false)"
  >
    <slot>×</slot>
  </button>
</template>
