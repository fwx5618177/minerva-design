<script setup lang="ts">
defineProps<{ label?: string }>();
</script>
<template>
  <view class="mn-toolbar"
    ><slot>{{ label }}</slot></view
  >
</template>
