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
    name="region-custom"
    label="Region (two levels)"
    :options="options"
    :max-level="2"
    :dropdown-style="{ minWidth: '360px' }"
    :option-style="{ fontWeight: 500 }"
    ><template #option="{ option, level }"
      ><span style="display: inline-flex; gap: 8px"
        ><span aria-hidden="true">{{ level === 0 ? "◎" : "⌖" }}</span
        >{{ option.label }}</span
      ></template
    ></Cascader
  >
</template>
