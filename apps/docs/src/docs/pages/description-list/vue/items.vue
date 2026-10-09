<script setup lang="ts">
import { DescriptionList } from "minerva-design/vue";
const items = [
  { key: "owner", label: "Owner", value: "Design team" },
  { key: "members", label: "Members", value: 12 },
  { key: "created", label: "Created", value: "2026-01-15" },
];
</script>
<template>
  <DescriptionList :items="items" />
</template>
