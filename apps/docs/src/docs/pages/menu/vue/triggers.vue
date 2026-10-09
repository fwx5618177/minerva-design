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
  <div style="display: flex; gap: 12px; align-items: center">
    <Menu :items="items" @select="(item) => (result = String(item.label))"
      ><Button size="small" variant="ghost" aria-label="More actions"
        >⋯</Button
      ></Menu
    ><Menu :items="items" @select="(item) => (result = String(item.label))"
      ><button
        type="button"
        style="
          border: 1px solid currentColor;
          border-radius: 20px;
          padding: 8px 16px;
          background: transparent;
          color: inherit;
        "
      >
        Custom trigger
      </button></Menu
    ><output>{{ result }}</output>
  </div>
</template>
