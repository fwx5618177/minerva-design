<script setup lang="ts">
import { AutoComplete, type AutoCompleteOption } from "minerva-design/vue";
const options = [
  { label: "Germany", value: "de" },
  { label: "Denmark", value: "dk" },
  { label: "France", value: "fr" },
  { label: "Finland", value: "fi" },
  { label: "Greece", value: "gr" },
];
const filter = (text: string, option: AutoCompleteOption) =>
  option.label.toLowerCase().startsWith(text.toLowerCase());
const sort = (a: AutoCompleteOption, b: AutoCompleteOption) =>
  a.label.localeCompare(b.label);
</script>
<template>
  <AutoComplete
    label="Country (starts with)"
    :options="options"
    :filter-option="filter"
    :sort-option="sort"
  />
</template>
