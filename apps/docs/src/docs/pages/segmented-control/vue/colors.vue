<script setup lang="ts">
import { SegmentedControl, VStack } from "minerva-design/vue";
const options = [
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
  { value: "system", label: "System", disabled: true },
];
</script>
<template>
  <VStack :gap="4" align="start"
    ><SegmentedControl
      aria-label="Theme (neutral)"
      :options="options"
      default-value="light" /><SegmentedControl
      color="primary"
      aria-label="Theme (primary)"
      :options="options"
      default-value="dark" /><SegmentedControl
      disabled
      aria-label="Theme (disabled)"
      :options="options"
      default-value="light"
  /></VStack>
</template>
