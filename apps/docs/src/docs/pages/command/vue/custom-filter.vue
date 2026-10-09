<script setup lang="ts">
import { ref } from "vue";
import { CommandDialog, Button } from "minerva-design/vue";
const open = ref(false);
const result = ref("");
const items = [
  {
    id: "new",
    title: "New project",
    description: "Start a new workspace",
    group: "Projects",
    keywords: "create",
  },
  {
    id: "settings",
    title: "Open settings",
    group: "Account",
    keywords: "preferences",
  },
  { id: "disabled", title: "Unavailable command", disabled: true },
];
function filter(
  items: import("minerva-design/vue").CommandItem[],
  query: string,
) {
  return items.filter((item) =>
    item.title.toLowerCase().startsWith(query.toLowerCase()),
  );
}
</script>
<template>
  <Button @click="open = true">Search by title prefix</Button
  ><CommandDialog
    v-model:open="open"
    :items="items"
    :filter="filter"
    placeholder="Type the start of a title…"
    @select="(item) => (result = item.title)"
  /><output>{{ result }}</output>
</template>
