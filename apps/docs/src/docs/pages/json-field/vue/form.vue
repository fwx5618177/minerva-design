<script setup lang="ts">
import { ref } from "vue";
import { JsonField, FormField } from "minerva-design/vue";
const json = ref('{"project":"demo"}');
</script>
<template>
  <FormField label="Request body" required helper-text="Enter a JSON object"
    ><JsonField v-model="json" :rows="5"
  /></FormField>
</template>
