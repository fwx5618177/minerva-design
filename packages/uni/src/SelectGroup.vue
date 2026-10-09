<script setup lang="ts">
defineProps<{ label?: string }>();
</script>
<template>
  <view class="mn-select-group"
    ><slot>{{ label }}</slot></view
  >
</template>
