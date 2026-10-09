<script setup lang="ts">
import { ref } from "vue";
import { AutoComplete } from "minerva-design/vue";
const options = [
  {
    label: "Vue",
    value: "vue",
    description: "Progressive framework",
    group: "Frontend",
  },
  {
    label: "Angular",
    value: "angular",
    description: "Application platform",
    group: "Frontend",
  },
  {
    label: "Node.js",
    value: "node",
    description: "JavaScript runtime",
    group: "Backend",
  },
];
const query = ref("");
</script>
<template>
  <AutoComplete
    v-model="query"
    label="Technology"
    :options="options"
    :group-by="(option) => option.group || 'Other'"
    auto-highlight
  />
</template>
