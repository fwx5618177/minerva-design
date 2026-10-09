<script setup lang="ts">
import { ref } from "vue";
import { MonthCalendar, VStack } from "minerva-design/vue";
const month = ref(new Date(2026, 9, 1));
const day = ref("2026-10-09");
const selected = ref("");
const events = [
  { id: "design", date: "2026-10-09", title: "Design review" },
  { id: "launch", date: "2026-10-09", title: "Launch planning" },
  { id: "retro", date: "2026-10-15", title: "Retrospective" },
];
</script>
<template>
  <VStack :gap="3" align="stretch"
    ><MonthCalendar
      v-model="day"
      v-model:month="month"
      :events="events"
      @event-click="(event) => (selected = event.title)"
    /><output>{{ selected }}</output></VStack
  >
</template>
