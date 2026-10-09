<script setup lang="ts">
import { ref } from "vue";
import { AutoComplete, VStack } from "minerva-design/vue";
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
  <VStack :gap="3" align="stretch"
    ><AutoComplete
      v-model="query"
      label="Framework"
      :options="options"
    /><output>Search: {{ query }}</output></VStack
  >
</template>
