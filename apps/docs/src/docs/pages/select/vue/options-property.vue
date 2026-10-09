<script setup lang="ts">
import { ref } from "vue";
import { Select, SelectItem } from "minerva-design/vue";
const value = ref("vue");
const options = [
  { value: "vue", label: "Vue" },
  { value: "angular", label: "Angular" },
  { value: "legacy", label: "Legacy", disabled: true },
];
</script>
<template>
  <Select v-model="value" aria-label="Generated options"
    ><SelectItem
      v-for="option in options"
      :key="option.value"
      :value="option.value"
      :disabled="option.disabled"
      >{{ option.label }}</SelectItem
    ></Select
  ><output>{{ value }}</output>
</template>
