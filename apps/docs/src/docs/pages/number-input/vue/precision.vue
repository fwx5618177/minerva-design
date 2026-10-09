<script setup lang="ts">
import { ref } from "vue";
import { NumberInput, FormField } from "minerva-design/vue";
const value = ref<number | null>(12.5);
</script>
<template>
  <FormField label="Unit price" helper-text="Steps of 0.25"
    ><NumberInput v-model="value" :step="0.25" :precision="2" :min="0"
  /></FormField>
</template>
