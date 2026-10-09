<script setup lang="ts">
import { computed } from "vue";
import Skeleton from "./Skeleton.vue";
import { lineCount, spacing } from "./primitives";
const props = withDefaults(
  defineProps<{
    lines?: number;
    lineHeight?: string | number;
    gap?: string | number;
    lastLineWidth?: string;
    animated?: boolean;
    shrinkLast?: boolean;
    animation?: "pulse" | "wave" | "false";
  }>(),
  {
    lines: 3,
    lineHeight: "1em",
    gap: 2,
    shrinkLast: true,
    animated: undefined,
  },
);
const count = computed(() => lineCount(props.lines));
</script>
<template>
  <view
    class="mn-skeleton-text"
    :style="{ gap: spacing(gap) }"
    aria-hidden="true"
    ><Skeleton
      v-for="line in count"
      :key="line"
      decorative
      :height="lineHeight"
      :width="line === count && shrinkLast ? (lastLineWidth ?? '70%') : '100%'"
      :animation="animation ?? (animated === false ? 'false' : 'pulse')"
      data-part="line"
  /></view>
</template>
