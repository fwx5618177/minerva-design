<script setup lang="ts">
import { ref } from "vue";
import { Textarea, FormField } from "minerva-design/vue";
const text = ref("");
</script>
<template>
  <FormField
    label="Description"
    required
    :invalid="text.length > 120"
    error-message="Use 120 characters or fewer"
    helper-text="Describe your project in a sentence"
    ><Textarea v-model="text" :rows="4"
  /></FormField>
</template>
