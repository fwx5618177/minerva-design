<script setup lang="ts">
import { ref } from "vue";
import { Menu, Button } from "minerva-design/vue";
import type { MenuEntry } from "minerva-design/vue";
const result = ref("");
const items: MenuEntry[] = [
  {
    type: "group",
    key: "project",
    label: "Project",
    items: [
      { key: "new", label: "New project" },
      {
        key: "open",
        label: "Open recent",
        children: [
          { key: "one", label: "Design system" },
          { key: "two", label: "Website" },
        ],
      },
    ],
  },
  { type: "separator", key: "divider" },
  { key: "settings", label: "Settings" },
];
</script>
<template>
  <Menu :items="items" @select="(item) => (result = String(item.label))"
    ><Button>Grouped actions</Button></Menu
  ><output>{{ result }}</output>
</template>
