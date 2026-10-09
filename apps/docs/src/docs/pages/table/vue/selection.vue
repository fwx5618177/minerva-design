<script setup lang="ts">
import { ref } from "vue";
import { Table, VStack } from "minerva-design/vue";
const columns = [
  { key: "name", header: "Name" },
  { key: "role", header: "Role" },
];
const data = [
  { id: 1, name: "Ada", role: "Designer" },
  { id: 2, name: "Grace", role: "Engineer" },
  { id: 3, name: "Alan", role: "Researcher" },
];
const selected = ref<(string | number)[]>([]);
</script>
<template>
  <VStack :gap="3" align="stretch"
    ><Table
      v-model:selected-row-keys="selected"
      :columns="columns"
      :data="data"
      :row-key="(row) => row.id"
      :row-selection="{ getRowLabel: (row) => row.name }"
      aria-label="Select members"
    /><output>Selected IDs: {{ selected.join(", ") || "none" }}</output></VStack
  >
</template>
