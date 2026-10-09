<script setup lang="ts">
defineProps<{ label?: string }>();
</script>
<template>
  <view class="mn-divider"
    ><slot>{{ label }}</slot></view
  >
</template>
