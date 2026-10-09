<script setup lang="ts">
defineProps<{ label?: string }>();
</script>
<template>
  <view class="mn-table-cell mn-table-header"
    ><slot>{{ label }}</slot></view
  >
</template>
