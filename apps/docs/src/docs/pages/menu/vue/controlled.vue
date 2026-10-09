<script setup lang="ts">
import { ref } from "vue";
import { Menu, Button, type MenuEntry } from "minerva-design/vue";
const result = ref("");
const items: MenuEntry[] = [
  { key: "edit", label: "Edit", shortcut: "⌘E" },
  { key: "duplicate", label: "Duplicate" },
  { key: "delete", label: "Delete", disabled: true },
];
const open = ref(false);
</script>
<template>
  <div style="display: flex; gap: 12px; align-items: center">
    <Button variant="outline" @click="open = !open"
      >{{ open ? "Close" : "Open" }} actions</Button
    ><Menu
      v-model:open="open"
      :items="items"
      :modal="false"
      @select="(item) => (result = String(item.label))"
      ><Button>Controlled menu</Button></Menu
    ><output>{{ result }}</output>
  </div>
</template>
