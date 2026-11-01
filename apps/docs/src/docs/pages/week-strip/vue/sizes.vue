<script setup lang="ts">
import { VStack, WeekStrip } from "minerva-design/vue";
const pad = (n: number) => String(n).padStart(2, "0");
const now = new Date();
const markers = {
  [`${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`]: 4,
};
</script>
<template>
  <VStack :gap="6" align="stretch" style="max-width: 480px"
    ><WeekStrip
      size="small"
      :markers="markers"
      aria-label="Small week" /><WeekStrip
      :markers="markers"
      aria-label="Medium week" /><WeekStrip
      size="large"
      :markers="markers"
      aria-label="Large week" /><WeekStrip
      disabled
      :markers="markers"
      aria-label="Disabled week"
  /></VStack>
</template>
