<script setup lang="ts">
import { ref } from "vue";
import { DataTable } from "minerva-design/vue";
const columns = [
  { key: "name", header: "Name" },
  { key: "role", header: "Role" },
];
const data = [
  { id: 1, name: "Ada", role: "Designer" },
  { id: 2, name: "Grace", role: "Engineer" },
  { id: 3, name: "Alan", role: "Researcher" },
];
const page = ref(1);
const rows = Array.from({ length: 24 }, (_, index) => ({
  id: index + 1,
  name: `Member ${index + 1}`,
  role: index % 2 ? "Designer" : "Engineer",
}));
</script>
<template>
  <DataTable
    :columns="columns"
    :data="rows.slice((page - 1) * 5, page * 5)"
    :row-key="(row) => row.id"
    :pagination="{
      current: page,
      pageSize: 5,
      total: rows.length,
      onChange: (next) => (page = next),
    }"
    aria-label="Paginated members"
  />
</template>
