<script setup lang="ts">
import { ref, computed } from "vue";
import { DataTable, Button } from "minerva-design/vue";
const page = ref(1);
const error = ref("");
const rows = Array.from({ length: 18 }, (_, index) => ({
  id: index + 1,
  name: `Project ${index + 1}`,
  status: index % 3 === 0 ? "Review" : "Ready",
}));
const data = computed(() => rows.slice((page.value - 1) * 5, page.value * 5));
const columns = [
  { key: "name", header: "Project" },
  { key: "status", header: "Status" },
];
</script>
<template>
  <div style="display: grid; gap: 12px">
    <Button
      variant="outline"
      @click="error = 'The request failed. Retry to restore the projects.'"
      >Simulate request failure</Button
    ><DataTable
      :columns="columns"
      :data="data"
      :row-key="(row) => row.id"
      :error="error"
      :pagination="{
        total: rows.length,
        current: page,
        pageSize: 5,
        onChange: (next: number) => (page = next),
      }"
      aria-label="Projects"
      @retry="error = ''"
    />
  </div>
</template>
