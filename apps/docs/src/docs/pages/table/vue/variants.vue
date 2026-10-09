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
const variants = ["simple", "striped", "bordered"] as const;
</script>
<template>
  <div style="display: grid; gap: 20px">
    <section v-for="variant in variants" :key="variant">
      <h4>{{ variant }}</h4>
      <Table
        :columns="columns"
        :data="data"
        :row-key="(row) => row.id"
        :variant="variant"
        hoverable
        :aria-label="`${variant} team table`"
      />
    </section>
  </div>
</template>
