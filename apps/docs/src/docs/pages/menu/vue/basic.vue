<script setup lang="ts">
import { ref } from "vue";
import { Menu, Button, VStack } from "minerva-design/vue";
const result = ref("");
const items = [
  { key: "edit", label: "Edit", shortcut: "⌘E" },
  { key: "duplicate", label: "Duplicate" },
  { key: "delete", label: "Delete", disabled: true },
];
</script>
<template>
  <VStack :gap="3" align="stretch"
    ><Menu :items="items" @select="(item) => (result = String(item.label))"
      ><Button>Project actions</Button></Menu
    ><output>{{ result }}</output></VStack
  >
</template>
