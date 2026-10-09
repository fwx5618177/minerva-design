<script setup lang="ts">
import { ref } from "vue";
import { CommandDialog, Button, VStack } from "minerva-design/vue";
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
</script>
<template>
  <VStack :gap="3" align="stretch"
    ><Button @click="open = true">Open command palette</Button
    ><CommandDialog
      v-model:open="open"
      :items="items"
      @select="(item) => (result = item.title)"
    /><output>{{ result }}</output></VStack
  >
</template>
