<script setup lang="ts">
import { Card, KanbanBoard, KanbanColumn } from "minerva-design/vue";

const cards = (prefix: string, count: number) =>
  Array.from({ length: count }, (_, index) => `${prefix} ${index + 1}`);
const columns = [
  { title: "Inbox", color: "info", cards: cards("Ticket", 12) },
  { title: "Triaged", color: "warning", cards: cards("Bug", 5) },
  { title: "Fixed", color: "success", cards: cards("Fix", 8) },
];
</script>
<template>
  <KanbanBoard aria-label="Support queue" :height="320">
    <KanbanColumn
      v-for="column in columns"
      :key="column.title"
      :title="column.title"
      :count="column.cards.length"
      :color="column.color"
    >
      <Card v-for="card in column.cards" :key="card" padding="small">{{
        card
      }}</Card>
    </KanbanColumn>
  </KanbanBoard>
</template>
