<script setup lang="ts">
/** `<thead>` of a TableRoot (attributes fall through) */
defineOptions({ name: "TableHead" });
defineSlots<{ default?: () => unknown }>();
</script>

<template>
  <thead>
    <slot />
  </thead>
</template>
