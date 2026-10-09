<script setup lang="ts">
import Stack from "./Stack.vue";
defineProps<{
  gap?: number | string;
  align?: string;
  justify?: string;
  wrap?: boolean;
}>();
</script>
<template>
  <Stack
    direction="horizontal"
    :gap="gap"
    :align="align"
    :justify="justify"
    :wrap="wrap"
    ><slot
  /></Stack>
</template>
