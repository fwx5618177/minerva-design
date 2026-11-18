<script setup lang="ts">
import { ref } from "vue";
import { DataTable } from "minerva-design/vue";
const columns = [
  { key: "name", header: "Name" },
  { key: "role", header: "Role" },
];
const page = ref(1);
const pageSize = ref(5);
const changePage = (next: number, size: number) => {
  page.value = Math.min(next, Math.max(1, Math.ceil(rows.length / size)));
  pageSize.value = size;
};
const rows = Array.from({ length: 24 }, (_, index) => ({
  id: index + 1,
  name: `Member ${index + 1}`,
  role: index % 2 ? "Designer" : "Engineer",
}));
</script>
<template>
  <DataTable
    :columns="columns"
    :data="rows.slice((page - 1) * pageSize, page * pageSize)"
    :row-key="(row) => row.id"
    :pagination="{
      current: page,
      pageSize,
      showSizeChanger: true,
      pageSizeOptions: [5, 10, 20],
      showQuickJumper: true,
      showTotal: true,
      totalRender: (total, [from, to]) => `${from}–${to} of ${total} members`,
      total: rows.length,
      onChange: changePage,
    }"
    aria-label="Paginated members"
  />
</template>
