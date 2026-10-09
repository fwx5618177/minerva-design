<script setup lang="ts">
import { computed, provide, ref } from "vue";
import type { MiniTooltipContext } from "./tooltip-context";
const props = withDefaults(
  defineProps<{
    enterDelay?: number;
    leaveDelay?: number;
    skipDelay?: number;
  }>(),
  { enterDelay: 200, leaveDelay: 0, skipDelay: 300 },
);
provide<MiniTooltipContext>("minerva:tooltip", {
  enterDelay: computed(() => props.enterDelay),
  leaveDelay: computed(() => props.leaveDelay),
  skipDelay: computed(() => props.skipDelay),
  lastClosed: ref(-Infinity),
});
</script>
<template>
  <view class="mn-tooltip-provider"><slot /></view>
</template>
