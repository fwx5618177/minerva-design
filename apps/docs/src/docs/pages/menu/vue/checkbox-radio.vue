<script setup lang="ts">
import { ref, computed } from "vue";
import { Menu, Button, VStack } from "minerva-design/vue";
import type { MenuEntry } from "minerva-design/vue";
const grid = ref(true);
const density = ref("comfortable");
const items = computed<MenuEntry[]>(() => [
  {
    type: "checkbox",
    key: "grid",
    label: "Show grid",
    checked: grid.value,
    onCheckedChange: (value) => (grid.value = value),
  },
  {
    type: "radio-group",
    key: "density",
    label: "Density",
    value: density.value,
    onValueChange: (value) => (density.value = value),
    items: [
      { value: "compact", label: "Compact" },
      { value: "comfortable", label: "Comfortable" },
    ],
  },
]);
</script>
<template>
  <VStack :gap="3" align="stretch"
    ><Menu :items="items"><Button>View options</Button></Menu
    ><output
      >Grid: {{ grid ? "on" : "off" }} · Density: {{ density }}</output
    ></VStack
  >
</template>
