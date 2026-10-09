<script setup lang="ts">
defineProps<{ fullWidth?: boolean; columnSpan?: number; rowSpan?: number }>();
</script>
<template>
  <view
    class="mn-grid-item"
    :style="{
      gridColumn: fullWidth
        ? '1 / -1'
        : columnSpan
          ? `span ${columnSpan}`
          : undefined,
      gridRow: rowSpan ? `span ${rowSpan}` : undefined,
      minWidth: '0',
    }"
    ><slot
  /></view>
</template>
