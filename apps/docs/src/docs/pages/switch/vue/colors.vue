<script setup lang="ts">
import { Switch, VStack } from "minerva-design/vue";
const colors = ["primary", "success", "info", "warning", "danger"] as const;
</script>
<template>
  <VStack :gap="3"
    ><Switch
      v-for="color in colors"
      :key="color"
      :color="color"
      :label="color"
      default-checked
  /></VStack>
</template>
