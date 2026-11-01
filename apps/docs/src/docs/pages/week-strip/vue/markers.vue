<script setup lang="ts">
import { VStack, WeekStrip, type WeekStripMarker } from "minerva-design/vue";
const pad = (n: number) => String(n).padStart(2, "0");
const inDays = (offset: number) => {
  const date = new Date();
  date.setDate(date.getDate() + offset);
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
};
// A number shows a count badge, true shows a dot
const markers: Record<string, WeekStripMarker> = {
  [inDays(-1)]: 2,
  [inDays(0)]: 3,
  [inDays(1)]: true,
  [inDays(3)]: 1,
};
const dayLabel = (day: string, marker: WeekStripMarker | undefined) =>
  typeof marker === "number"
    ? `${day}: ${marker} tasks`
    : marker
      ? `${day}: reminder`
      : day;
</script>
<template>
  <VStack :gap="6" align="stretch" style="max-width: 480px"
    ><WeekStrip :default-value="inDays(0)" :markers="markers" /><WeekStrip
      :default-value="inDays(0)"
      :markers="markers"
      :first-day-of-week="0"
      :get-day-label="dayLabel"
      aria-label="Tasks this week (Sunday first)"
  /></VStack>
</template>
