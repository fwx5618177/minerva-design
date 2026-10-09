<script setup lang="ts">
import { Table } from "minerva-design/vue";
const columns = [
  { key: "name", header: "Name" },
  { key: "role", header: "Role" },
];
const data = [
  { id: 1, name: "Ada", role: "Designer" },
  { id: 2, name: "Grace", role: "Engineer" },
  { id: 3, name: "Alan", role: "Researcher" },
];
</script>
<template>
  <Table
    :columns="columns"
    :data="data"
    :row-key="(row) => row.id"
    variant="striped"
    aria-label="Team members"
  />
</template>
