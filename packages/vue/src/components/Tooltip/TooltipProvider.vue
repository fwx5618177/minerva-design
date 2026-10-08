<script setup lang="ts">
/**
 * Optional provider giving every Tooltip inside default delays. Moving from
 * one tooltip to the next within `skipDelay` opens it immediately. Tooltips
 * work without it.
 */
import { provide } from "vue";
import { TOOLTIP_CONFIG_KEY } from "./context";
import type { TooltipProviderProps } from "./types";

defineOptions({ name: "TooltipProvider" });

const props = withDefaults(defineProps<TooltipProviderProps>(), {
  enterDelay: undefined,
  leaveDelay: undefined,
  skipDelay: 300,
});
defineSlots<{
  /** Content containing tooltips */
  default?: () => unknown;
}>();

let lastClosedAt = 0;
provide(TOOLTIP_CONFIG_KEY, {
  get enterDelay() {
    return props.enterDelay;
  },
  get leaveDelay() {
    return props.leaveDelay;
  },
  markClosed: () => {
    lastClosedAt = Date.now();
  },
  shouldSkipDelay: () => Date.now() - lastClosedAt < props.skipDelay,
});
</script>

<template>
  <slot />
</template>
