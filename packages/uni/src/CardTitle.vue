<script setup lang="ts">
defineProps<{ label?: string }>();
</script>
<template>
  <text class="mn-title"
    ><slot>{{ label }}</slot></text
  >
</template>
