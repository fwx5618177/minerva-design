<script setup lang="ts">
import { inject, ref, onMounted, onBeforeUnmount } from "vue";
import type { DrawerContext } from "./drawer-types";
defineProps<{ disabled?: boolean }>();
const root = inject<DrawerContext | undefined>("minerva:drawer", undefined);
const element = ref<unknown>();
onMounted(() => {
  if (root) root.trigger.value = element.value;
});
onBeforeUnmount(() => {
  if (root && root.trigger.value === element.value)
    root.trigger.value = undefined;
});
</script>
<template>
  <button
    ref="element"
    class="mn-drawer-trigger mn-button"
    :class="{ 'mn-disabled': disabled }"
    :disabled="disabled"
    @tap="!disabled && root?.setOpen(true)"
  >
    <slot>Open</slot>
  </button>
</template>
