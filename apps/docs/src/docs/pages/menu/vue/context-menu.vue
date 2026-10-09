<script setup lang="ts">
import { ref } from "vue";
import { ContextMenu, Box } from "minerva-design/vue";
const result = ref("");
const items = [
  { key: "edit", label: "Edit", shortcut: "⌘E" },
  { key: "duplicate", label: "Duplicate" },
  { key: "delete", label: "Delete", disabled: true },
];
</script>
<template>
  <ContextMenu :items="items" @select="(item) => (result = String(item.label))"
    ><Box :p="6" border="1px dashed var(--color-border)" tabindex="0"
      >Right-click here or press Shift+F10</Box
    ></ContextMenu
  ><output>{{ result }}</output>
</template>
