<script setup lang="ts">
import { ref } from "vue";
import { Cascader } from "minerva-design/vue";
const options = [
  {
    value: "eu",
    label: "Europe",
    children: [
      { value: "fr", label: "France" },
      { value: "de", label: "Germany" },
    ],
  },
  {
    value: "asia",
    label: "Asia",
    children: [
      { value: "jp", label: "Japan" },
      { value: "sg", label: "Singapore" },
    ],
  },
];
const value = ref<(string | number)[]>([]);
</script>
<template>
  <Cascader
    v-model="value"
    :options="options"
    label="Search locations"
    name="location"
    show-search
    expand-trigger="hover"
  />
</template>
