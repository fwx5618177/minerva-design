<script setup lang="ts">
import { ref } from "vue";
import { Cascader, FormField } from "minerva-design/vue";
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
  <FormField
    label="Shipping region"
    required
    :invalid="!value.length"
    error-message="Select a region"
    ><Cascader
      v-model="value"
      :options="options"
      label="Shipping region"
      name="shipping"
  /></FormField>
</template>
