<script setup lang="ts">
import { ref } from "vue";
import { AutoComplete, type AutoCompleteOption } from "minerva-design/vue";
const text = ref("");
const selected = ref<string | number>("none");
const open = ref(false);
const options = [
  { label: "Paris", value: "par" },
  { label: "London", value: "lon" },
  { label: "Tokyo", value: "tyo" },
];
</script>
<template>
  <div style="display: grid; gap: 8px; max-width: 320px">
    <AutoComplete
      v-model="text"
      label="City"
      name="city"
      :options="options"
      @select="(option) => (selected = option.value)"
      @dropdown-visible-change="(value) => (open = value)"
    /><output
      >Input: {{ text }} · Selected: {{ selected }} · Dropdown:
      {{ open ? "open" : "closed" }}</output
    >
  </div>
</template>
