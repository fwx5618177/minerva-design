<script setup lang="ts">
import { ref } from "vue";
import { Table, Button, type TableColumn } from "minerva-design/vue";
const loading = ref(true);
const columns = [
  { key: "name", header: "Name" },
  { key: "status", header: "Status" },
];
</script>
<template>
  <div style="display: grid; gap: 12px">
    <Button variant="outline" @click="loading = !loading">{{
      loading ? "Show empty state" : "Show loading state"
    }}</Button
    ><Table
      :columns="columns"
      :data="[]"
      :loading="loading"
      :loading-rows="3"
      empty-text="No jobs yet"
      aria-label="Jobs"
    />
  </div>
</template>
