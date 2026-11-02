<script setup lang="ts">
import { SegmentedControl, VStack } from "minerva-design/vue";
const options = ["Daily", "Weekly", "Monthly"];
</script>
<template>
  <VStack :gap="4" align="start"
    ><SegmentedControl
      size="small"
      aria-label="Small"
      :options="options"
      default-value="Daily" /><SegmentedControl
      aria-label="Medium"
      :options="options"
      default-value="Weekly" /><SegmentedControl
      size="large"
      aria-label="Large"
      :options="options"
      default-value="Monthly"
  /></VStack>
</template>
