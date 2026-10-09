<script setup lang="ts">
defineProps<{ label?: string }>();
</script>
<template>
  <text class="mn-muted"
    ><slot>{{ label }}</slot></text
  >
</template>
