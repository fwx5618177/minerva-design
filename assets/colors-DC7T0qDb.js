import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t=`<script setup lang="ts">
import { Card, KanbanBoard, KanbanColumn } from "minerva-design/vue";

const columns = [
  { title: "Backlog", color: "neutral", cards: ["Collect feedback"] },
  { title: "Ready", color: "info", cards: ["Pricing page copy"] },
  { title: "In progress", color: "primary", cards: ["Search API", "Avatars"] },
  { title: "Review", color: "warning", cards: ["Dark mode"] },
  { title: "Blocked", color: "danger", cards: ["SSO with Okta"] },
  { title: "Done", color: "success", cards: ["Release 2.4"] },
  { title: "Research", color: "#7c3aed", cards: ["Interview users"] },
];
<\/script>
<template>
  <KanbanBoard aria-label="Product roadmap" :column-width="220" :gap="8">
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
`})))()}n();export{t as default};