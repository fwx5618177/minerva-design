<script setup lang="ts">
defineProps<{
  label?: string;
  value?: string | number;
  description?: string;
  trend?: string;
}>();
</script>
<template>
  <view class="mn-card mn-stat-card"
    ><text class="mn-muted">{{ label }}</text
    ><text class="mn-stat-value">{{ value }}</text
    ><text>{{ trend }}</text
    ><text class="mn-muted">{{ description }}</text
    ><slot
  /></view>
</template>
