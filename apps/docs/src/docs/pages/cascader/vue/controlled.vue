<script setup lang="ts">
import { ref } from "vue";
import { Cascader, Button } from "minerva-design/vue";
const options = [
  {
    value: "fr",
    label: "France",
    children: [
      {
        value: "idf",
        label: "Île-de-France",
        children: [
          { value: "paris", label: "Paris" },
          { value: "versailles", label: "Versailles" },
        ],
      },
      {
        value: "ara",
        label: "Auvergne-Rhône-Alpes",
        children: [{ value: "lyon", label: "Lyon" }],
      },
    ],
  },
  {
    value: "jp",
    label: "Japan",
    children: [
      {
        value: "kanto",
        label: "Kantō",
        children: [
          { value: "tokyo", label: "Tokyo" },
          { value: "yokohama", label: "Yokohama", disabled: true },
        ],
      },
    ],
  },
];
const value = ref<(string | number)[]>(["fr", "idf", "paris"]);
</script>
<template>
  <div style="display: grid; gap: 12px">
    <Cascader
      v-model="value"
      name="controlled-city"
      label="Controlled city"
      :options="options"
    /><Button variant="outline" @click="value = ['jp', 'kanto', 'tokyo']"
      >Choose Tokyo externally</Button
    ><output>{{ value.join(" / ") || "No city selected" }}</output>
  </div>
</template>
