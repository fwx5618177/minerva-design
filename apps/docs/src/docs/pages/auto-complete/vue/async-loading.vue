<script setup lang="ts">
import { ref } from "vue";
import { AutoComplete, Button, VStack } from "minerva-design/vue";
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
const loaded = ref(false);
const loading = ref(false);
async function load() {
  loading.value = true;
  await new Promise((resolve) => setTimeout(resolve, 500));
  loaded.value = true;
  loading.value = false;
}
</script>
<template>
  <VStack :gap="3" align="stretch"
    ><AutoComplete
      v-model="query"
      label="Remote suggestions"
      :options="loaded ? options : []"
      :loading="loading"
    /><Button @click="load" :loading="loading">Load suggestions</Button></VStack
  >
</template>
