<script setup lang="ts">
import { ref } from "vue";
import { KeyValueEditor, FormField } from "minerva-design/vue";
const entries = ref([
  { id: "content", key: "Content-Type", value: "application/json" },
]);
</script>
<template>
  <FormField label="Request headers" helper-text="Add a row for each header"
    ><KeyValueEditor
      v-model="entries"
      key-label="Header name"
      value-label="Header value"
  /></FormField>
</template>
