<script setup lang="ts">
import { ref } from "vue";
import { Rating, FormField } from "minerva-design/vue";
const score = ref(3);
</script>
<template>
  <FormField
    label="Rate your experience"
    helper-text="Use the arrow keys to adjust"
    ><Rating v-model="score" :max="5" show-value aria-label="Experience rating"
  /></FormField>
</template>
