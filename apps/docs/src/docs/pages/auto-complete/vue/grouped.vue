<script setup lang="ts">
import { AutoComplete, type AutoCompleteOption } from "minerva-design/vue";
const options = [
  { label: "Apple", value: "apple", group: "Fruits" },
  { label: "Carrot", value: "carrot", group: "Vegetables" },
  { label: "Banana", value: "banana", group: "Fruits" },
  { label: "Almond", value: "almond", group: "Nuts" },
];
</script>
<template>
  <div style="display: grid; gap: 16px">
    <AutoComplete
      label="Collect matching groups"
      :options="options"
      :group-by="(option) => option.group ?? 'Other'"
      group-mode="first"
    /><AutoComplete
      label="Preserve adjacent groups"
      :options="options"
      :group-by="(option) => option.group ?? 'Other'"
      group-mode="adjacent"
    />
  </div>
</template>
