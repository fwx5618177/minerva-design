<script setup lang="ts">
withDefaults(
  defineProps<{
    primary?: string;
    secondary?: string;
    monospace?: boolean;
    maxWidth?: number | string;
  }>(),
  { maxWidth: 360 },
);
</script>
<template>
  <view
    class="mn-table-cell-content"
    :style="{
      maxWidth: typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth,
    }"
    ><text :class="{ 'mn-code': monospace }">{{ primary }}</text
    ><text v-if="secondary" class="mn-muted">{{ secondary }}</text
    ><slot
  /></view>
</template>
