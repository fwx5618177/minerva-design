<script setup lang="ts">
defineProps<{
  variant?: string;
  size?: string;
  scroll?: { x?: number; y?: number };
}>();
</script>
<template>
  <scroll-view
    scroll-x
    :scroll-y="!!scroll?.y"
    class="mn-table-scroll"
    :style="{ maxHeight: scroll?.y ? `${scroll.y}px` : undefined }"
    ><view
      class="mn-table"
      :class="[
        `mn-table-${variant || 'simple'}`,
        `mn-table-${size || 'medium'}`,
      ]"
      :style="{ minWidth: scroll?.x ? `${scroll.x}px` : undefined }"
      ><slot /></view
  ></scroll-view>
</template>
