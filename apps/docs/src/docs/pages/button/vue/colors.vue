<script setup lang="ts">
import { Button, HStack } from "minerva-design/vue";
const colors = [
  "primary",
  "neutral",
  "success",
  "warning",
  "danger",
  "info",
] as const;
</script>
<template>
  <HStack :gap="2" wrap
    ><Button v-for="color in colors" :key="color" :color="color">{{
      color[0].toUpperCase() + color.slice(1)
    }}</Button></HStack
  >
</template>
