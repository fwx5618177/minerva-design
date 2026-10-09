<script setup lang="ts">
defineProps<{ title?: string; description?: string }>();
</script>
<template>
  <view class="mn-page-header"
    ><text class="mn-page-title">{{ title }}</text
    ><text class="mn-muted">{{ description }}</text
    ><slot /><slot name="actions"
  /></view>
</template>
