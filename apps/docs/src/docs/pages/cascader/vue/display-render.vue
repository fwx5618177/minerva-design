<script setup lang="ts">
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
</script>
<template>
  <Cascader
    name="city-display"
    label="City (last level only)"
    :options="options"
    :default-value="['fr', 'ara', 'lyon']"
    :display-render="(labels) => labels.at(-1) ?? ''"
    :allow-clear="false"
  />
</template>
