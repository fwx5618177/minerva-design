<script setup lang="ts">
import {
  Table,
  TableCellContent,
  Badge,
  type TableColumn,
} from "minerva-design/vue";
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
</script>
<template>
  <Table
    :columns="columns"
    :data="data"
    :row-key="(row) => row.id"
    aria-label="Rich team cells"
    ><template #cell-name="{ row }"
      ><TableCellContent
        :primary="row.name"
        :secondary="row.email"
        :max-width="260" /></template
    ><template #cell-role="{ row }"><Badge :content="row.role" /></template
  ></Table>
</template>
