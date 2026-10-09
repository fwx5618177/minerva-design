<script setup lang="ts">
import { ref } from "vue";
import { Menu, Button, type MenuEntry } from "minerva-design/vue";
const result = ref("");
const items: MenuEntry[] = [
  { key: "edit", label: "Edit", shortcut: "⌘E" },
  { key: "duplicate", label: "Duplicate" },
  { key: "delete", label: "Delete", disabled: true },
];
const sides = ["top", "right", "bottom", "left"] as const;
</script>
<template>
  <div style="display: flex; gap: 12px; flex-wrap: wrap; padding: 40px">
    <Menu
      v-for="side in sides"
      :key="side"
      :items="items"
      :side="side"
      align="start"
      @select="(item) => (result = String(item.label))"
      ><Button variant="outline">{{ side }}</Button></Menu
    ><output>{{ result }}</output>
  </div>
</template>
