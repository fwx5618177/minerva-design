<script setup lang="ts">
import { ref } from "vue";
import { NumberInput, FormField } from "minerva-design/vue";
const value = ref<number | null>(null);
</script>
<template>
  <FormField
    label="Seats"
    required
    :invalid="value === null"
    error-message="Enter a seat count"
    ><NumberInput v-model="value" :min="1" :max="100"
  /></FormField>
</template>
