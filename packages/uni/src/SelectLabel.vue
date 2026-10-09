<script setup lang="ts">
defineProps<{ label?: string }>();
</script>
<template>
  <text class="mn-muted mn-select-label"
    ><slot>{{ label }}</slot></text
  >
</template>
