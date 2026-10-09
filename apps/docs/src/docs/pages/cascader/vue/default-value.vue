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
    name="initial-city"
    label="Initially selected city"
    :options="options"
    :default-value="['fr', 'idf', 'paris']"
  />
</template>
