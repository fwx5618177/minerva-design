<script setup lang="ts">
import { ref } from "vue";
import { Menu, Button, type MenuEntry } from "minerva-design/vue";
const result = ref("");
const items: MenuEntry[] = [
  {
    type: "group",
    key: "workspace",
    label: "Workspace",
    items: [
      { key: "new", label: "New project" },
      { key: "open", label: "Open project" },
    ],
  },
  { type: "separator", key: "separator" },
  {
    type: "group",
    key: "account",
    label: "Account",
    items: [
      { key: "profile", label: "Profile" },
      { key: "sign-out", label: "Sign out" },
    ],
  },
];
</script>
<template>
  <div>
    <Menu :items="items" @select="(item) => (result = String(item.label))"
      ><Button>Grouped actions</Button></Menu
    ><output>{{ result }}</output>
  </div>
</template>
