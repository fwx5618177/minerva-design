<script setup lang="ts">
withDefaults(
  defineProps<{
    direction?: "horizontal" | "vertical";
    gap?: number | string;
    align?: string;
    justify?: string;
    wrap?: boolean;
  }>(),
  { direction: "vertical", gap: 12, align: "stretch", justify: "flex-start" },
);
</script>
<template>
  <view
    class="mn-stack"
    :style="{
      flexDirection: direction === 'horizontal' ? 'row' : 'column',
      gap: typeof gap === 'number' ? `${gap}px` : gap,
      alignItems: align,
      justifyContent: justify,
      flexWrap: wrap ? 'wrap' : 'nowrap',
    }"
    ><slot
  /></view>
</template>
