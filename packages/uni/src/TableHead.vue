<script setup lang="ts">
defineProps<{ label?: string }>();
</script>
<template>
  <view class="mn-table-head"
    ><slot>{{ label }}</slot></view
  >
</template>
