<script setup lang="ts">
/** `<tbody>` of a TableRoot (attributes fall through) */
defineOptions({ name: "TableBody" });
defineSlots<{ default?: () => unknown }>();
</script>

<template>
  <tbody>
    <slot />
  </tbody>
</template>
