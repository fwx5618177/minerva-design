<script setup lang="ts">
import { Table, Button, type TableColumn } from "minerva-design/vue";
type Row = { id: number; name: string; role: string; email: string };
const data: Row[] = [
  { id: 1, name: "Ada Lovelace", role: "Designer", email: "ada@example.com" },
  { id: 2, name: "Grace Hopper", role: "Engineer", email: "grace@example.com" },
  { id: 3, name: "Alan Turing", role: "Researcher", email: "alan@example.com" },
];
const columns: TableColumn<Row>[] = [
  { key: "name", header: "Name" },
  { key: "role", header: "Role" },
];
const fixed: TableColumn<Row>[] = [
  { key: "name", header: "Name", width: 180, fixed: "left" },
  { key: "email", header: "Email", width: 350 },
  { key: "role", header: "Role", width: 250 },
  { key: "id", header: "ID", width: 100, fixed: "right" },
];
</script>
<template>
  <div style="max-width: 520px">
    <Table
      :columns="fixed"
      :data="data"
      :row-key="(row) => row.id"
      :scroll="{ x: 880, y: 240 }"
      hoverable
      aria-label="Horizontally scrollable team"
    />
  </div>
</template>
