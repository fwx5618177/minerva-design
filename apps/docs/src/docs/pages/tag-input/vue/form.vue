<script setup lang="ts">
import { ref } from "vue";
import { TagInput, FormField } from "minerva-design/vue";
const tags = ref<string[]>([]);
</script>
<template>
  <FormField
    label="Project tags"
    required
    :invalid="!tags.length"
    error-message="Add at least one tag"
    ><TagInput
      v-model="tags"
      name="tags"
      :options="['design', 'engineering', 'research']"
  /></FormField>
</template>
