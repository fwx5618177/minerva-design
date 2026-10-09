<script setup lang="ts">
defineProps<{ label?: string }>();
</script>
<template>
  <view class="mn-table-row"
    ><slot>{{ label }}</slot></view
  >
</template>
