<script setup lang="ts">
import { ref } from "vue";
import { TagInput, FormField } from "minerva-design/vue";
const tags = ref<string[]>([]);
</script>
<template>
  <FormField
    label="Recipients"
    helper-text="Separate addresses with semicolons or Enter"
    ><TagInput
      v-model="tags"
      :separators="[';', 'Enter']"
      placeholder="name@example.com"
  /></FormField>
</template>
