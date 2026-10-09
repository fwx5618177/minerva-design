<script setup lang="ts">
import { ref } from "vue";
import { Cascader, VStack } from "minerva-design/vue";
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
  <VStack :gap="3" align="stretch"
    ><Cascader
      v-model="value"
      :options="options"
      label="Region"
      name="region"
    /><output>{{ value.join(" / ") }}</output></VStack
  >
</template>
