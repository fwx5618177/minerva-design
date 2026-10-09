<script setup lang="ts">
defineProps<{ title?: string; description?: string; maxWidth?: number }>();
</script>
<template>
  <view
    class="mn-page"
    :style="{ maxWidth: maxWidth ? `${maxWidth}px` : undefined }"
    ><view v-if="title || description || $slots.actions" class="mn-page-header"
      ><text class="mn-page-title">{{ title }}</text
      ><text class="mn-muted">{{ description }}</text
      ><slot name="actions" /></view
    ><slot
  /></view>
</template>
