<script setup lang="ts">
import { ref } from "vue";
import { Table, VStack } from "minerva-design/vue";
import type { TableSortState } from "minerva-design/vue";
const sort = ref<TableSortState | null>(null);
const columns = [
  { key: "name", header: "Name", sortable: true },
  { key: "score", header: "Score", sortable: true },
];
const data = [
  { id: 1, name: "Grace", score: 92 },
  { id: 2, name: "Ada", score: 98 },
  { id: 3, name: "Alan", score: 87 },
];
</script>
<template>
  <VStack :gap="3" align="stretch"
    ><Table
      v-model:sort-state="sort"
      :columns="columns"
      :data="data"
      :row-key="(row) => row.id"
      aria-label="Sortable members"
    /><output
      >{{ sort?.key || "No column" }}: {{ sort?.order || "unsorted" }}</output
    ></VStack
  >
</template>
