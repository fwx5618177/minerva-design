<script setup lang="ts">
import { ref } from "vue";
import { Checkbox, FormField } from "minerva-design/vue";
const accepted = ref(false);
</script>
<template>
  <FormField
    label="Terms"
    required
    :invalid="!accepted"
    error-message="Accept the terms to continue"
    ><Checkbox v-model="accepted" label="I accept the terms" name="terms"
  /></FormField>
</template>
