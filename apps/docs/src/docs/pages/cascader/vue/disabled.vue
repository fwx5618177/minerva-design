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
  <div style="display: grid; gap: 16px">
    <Cascader
      name="disabled-city"
      label="Disabled city"
      :options="options"
      :default-value="['fr', 'idf', 'paris']"
      disabled
    /><Cascader
      name="locked-city"
      label="Read-only city"
      :options="options"
      :default-value="['jp', 'kanto', 'tokyo']"
      read-only
    /><Cascader
      name="available-city"
      label="Disabled leaf (Yokohama)"
      :options="options"
    />
  </div>
</template>
