<script setup lang="ts">
import { ref } from "vue";
import { AutoComplete, Badge } from "minerva-design/vue";
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
    label="Custom suggestions"
    :options="options"
    mode="custom"
    ><template #option="{ option }"
      ><strong>{{ option.label }}</strong> <Badge>{{ option.group }}</Badge>
      <p>{{ option.description }}</p></template
    ></AutoComplete
  >
</template>
