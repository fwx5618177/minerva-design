<script setup lang="ts">
import { ref } from "vue";
import { Menu, Button, type MenuEntry } from "minerva-design/vue";
const result = ref("");
const items: MenuEntry[] = [
  { key: "edit", label: "Edit", shortcut: "⌘E" },
  { key: "duplicate", label: "Duplicate" },
  { key: "delete", label: "Delete", disabled: true },
];
</script>
<template>
  <div style="display: flex; gap: 12px">
    <Menu :items="items" disabled><Button>Disabled menu</Button></Menu
    ><Menu :items="items" @select="(item) => (result = String(item.label))"
      ><Button>Disabled Delete action</Button></Menu
    ><output>{{ result }}</output>
  </div>
</template>
